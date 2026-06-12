import { adminSupabase } from '@/lib/audit/supabase'
import { discover, type ProviderStat } from './discover'
import { scrapeSite } from './scrape-site'
import { guessEmails } from './email-guess'
import { scoreLead } from './score'
import { autoSubmitLeadToAudit } from './auto-audit'
import type {
  DiscoverySource,
  OutboundScrapeJobRow,
  RawClinic,
  WebsiteEnrichment,
  IcpScore,
  OutboundLeadRow,
} from './types'

/**
 * Outbound pipeline:
 *
 *   1. mark job running
 *   2. Apify Google Maps scrape → insert raw rows into outbound_leads
 *   3. for each new lead:
 *        a. Firecrawl website scrape + tech/marketing detection
 *        b. email pattern guess + MX check
 *        c. Claude ICP scoring
 *        d. update lead row
 *        e. auto-submit to audit engine (when job.auto_audit is true and
 *           ICP score >= auto_audit_threshold)
 *   4. mark job complete (or partial if any leads errored)
 *
 * Enrichment runs sequentially per-lead to avoid hammering Firecrawl/Anthropic
 * and to keep memory low. If the job has a large max_results, expect this
 * to take 10-30 min to complete for 100 leads.
 */

export async function runScrape(jobId: string): Promise<void> {
  const sb = adminSupabase()

  const { data: jobData, error: jobErr } = await sb
    .from('outbound_scrape_jobs')
    .select('*')
    .eq('id', jobId)
    .single()
  if (jobErr || !jobData) throw new Error(`scrape job ${jobId} not found: ${jobErr?.message}`)
  const job = jobData as OutboundScrapeJobRow

  await sb
    .from('outbound_scrape_jobs')
    .update({ status: 'running', started_at: new Date().toISOString() })
    .eq('id', jobId)

  /* ─── Phase 1: discovery (Places / Apify / both) ────────────────────── */

  let places: RawClinic[]
  let rawCount = 0
  let providerLabel = ''
  let providerStats: ProviderStat[] = []
  try {
    const result = await discover({
      source: (job.source as DiscoverySource | null) ?? 'places',
      city: job.city,
      state: job.state,
      specialty: job.specialty ?? undefined,
      maxResults: job.max_results,
    })
    places = result.places
    rawCount = result.rawCount
    providerStats = result.providerStats
    providerLabel = providerStats.map((s) => `${s.provider}:${s.rawCount}`).join(' / ')
  } catch (err) {
    await sb
      .from('outbound_scrape_jobs')
      .update({
        status: 'failed',
        completed_at: new Date().toISOString(),
        error_message: `Discovery failed: ${(err as Error).message}`.slice(0, 1000),
      })
      .eq('id', jobId)
    throw err
  }

  await sb
    .from('outbound_scrape_jobs')
    .update({ raw_count: rawCount, apify_actor: providerLabel })
    .eq('id', jobId)

  /* ─── Phase 2: Insert raw leads ─────────────────────────────────────── */

  if (places.length === 0) {
    await sb
      .from('outbound_scrape_jobs')
      .update({ status: 'complete', completed_at: new Date().toISOString(), scored_count: 0 })
      .eq('id', jobId)
    return
  }

  const inserts = places.map((p) => ({
    scrape_job_id: jobId,
    apify_place_id: p.placeId,
    clinic_name: p.title || 'Unknown',
    specialty: job.specialty,
    website: p.website ?? null,
    phone: p.phone ?? null,
    address: p.address ?? null,
    city: p.city ?? job.city,
    state: p.state ?? job.state,
    postal_code: p.postalCode ?? null,
    google_place_url: p.url ?? null,
    google_rating: p.totalScore ?? null,
    google_review_count: p.reviewsCount ?? null,
    categories: p.categories ?? null,
    status: 'new',
  }))

  // upsert handles the (scrape_job_id, apify_place_id) unique constraint
  // gracefully — if a place was already inserted (e.g. on retry), it's skipped.
  const { error: insertErr } = await sb
    .from('outbound_leads')
    .upsert(inserts, { onConflict: 'scrape_job_id,apify_place_id', ignoreDuplicates: true })
  if (insertErr) {
    await sb
      .from('outbound_scrape_jobs')
      .update({
        status: 'failed',
        completed_at: new Date().toISOString(),
        error_message: `Lead insert failed: ${insertErr.message}`.slice(0, 1000),
      })
      .eq('id', jobId)
    throw new Error(insertErr.message)
  }

  /* ─── Phase 3: Enrich + score each lead ─────────────────────────────── */

  const autoAudit = job.auto_audit === true
  const autoAuditThreshold = job.auto_audit_threshold ?? 60

  const { data: insertedLeads } = await sb
    .from('outbound_leads')
    .select('id, website, clinic_name, address, phone, city, state, postal_code, google_rating, google_review_count, categories, apify_place_id')
    .eq('scrape_job_id', jobId)
    .is('scored_at', null)

  let scoredCount = 0
  const errors: string[] = []
  for (const lead of insertedLeads ?? []) {
    try {
      await enrichAndScore(jobId, lead as EnrichLeadRow, autoAudit, autoAuditThreshold)
      scoredCount++
    } catch (err) {
      const msg = (err as Error).message
      errors.push(`${(lead as { clinic_name: string }).clinic_name}: ${msg}`)
      await sb
        .from('outbound_leads')
        .update({
          enrichment_error: msg.slice(0, 500),
          enriched_at: new Date().toISOString(),
        })
        .eq('id', (lead as { id: string }).id)
    }
  }

  /* ─── Phase 4: Finalize ─────────────────────────────────────────────── */

  const finalStatus = errors.length === 0
    ? 'complete'
    : errors.length === (insertedLeads?.length ?? 0)
      ? 'failed'
      : 'partial'

  await sb
    .from('outbound_scrape_jobs')
    .update({
      status: finalStatus,
      completed_at: new Date().toISOString(),
      scored_count: scoredCount,
      error_message: errors.length > 0 ? errors.slice(0, 5).join(' | ').slice(0, 1000) : null,
    })
    .eq('id', jobId)
}

/* ─── Internal ──────────────────────────────────────────────────────────── */

interface EnrichLeadRow {
  id: string
  website: string | null
  clinic_name: string
  apify_place_id: string | null
}

async function enrichAndScore(
  jobId: string,
  lead: EnrichLeadRow,
  autoAudit: boolean,
  autoAuditThreshold: number,
): Promise<void> {
  const sb = adminSupabase()

  let enrichment: WebsiteEnrichment | null = null
  if (lead.website) {
    try {
      enrichment = await scrapeSite(lead.website)
    } catch {
      // continue without enrichment — score will reflect missing signals
      enrichment = null
    }
  }

  const emails = await guessEmails({
    websiteUrl: lead.website,
    ownerNames: enrichment?.owner_names ?? [],
  })

  // Rebuild the RawClinic shape for the scorer from the DB row
  const { data: dbRow } = await sb
    .from('outbound_leads')
    .select('clinic_name, address, phone, website, google_rating, google_review_count, categories, google_place_url, apify_place_id, scrape_job_id')
    .eq('id', lead.id)
    .single()
  const place: RawClinic = {
    placeId: dbRow?.apify_place_id ?? lead.apify_place_id ?? lead.id,
    title: dbRow?.clinic_name ?? lead.clinic_name,
    website: dbRow?.website ?? lead.website ?? undefined,
    phone: dbRow?.phone ?? undefined,
    address: dbRow?.address ?? undefined,
    url: dbRow?.google_place_url ?? undefined,
    totalScore: dbRow?.google_rating ?? undefined,
    reviewsCount: dbRow?.google_review_count ?? undefined,
    categories: dbRow?.categories ?? undefined,
    source: 'places', // source isn't stored per-lead; default to 'places' for scoring purposes
  }

  let score: IcpScore
  try {
    score = await scoreLead({ place, enrichment })
  } catch (err) {
    score = { score: 0, reasoning: `scorer error: ${(err as Error).message}`.slice(0, 400) }
  }

  await sb
    .from('outbound_leads')
    .update({
      tech_stack: enrichment?.tech_stack ?? null,
      marketing_signals: enrichment?.marketing_signals ?? null,
      owner_names: enrichment?.owner_names ?? null,
      primary_email: emails.primary,
      email_patterns: emails,
      mx_verified: emails.mx_verified,
      icp_score: score.score,
      icp_reasoning: score.reasoning,
      scored_at: new Date().toISOString(),
      enriched_at: new Date().toISOString(),
      enrichment_error: null,
    })
    .eq('id', lead.id)

  /* ─── Auto-audit bridge ─────────────────────────────────────────────── */
  if (autoAudit) {
    // Re-fetch the full lead row so autoSubmitLeadToAudit has all fields.
    const { data: fullLead, error: fetchErr } = await sb
      .from('outbound_leads')
      .select('*')
      .eq('id', lead.id)
      .single()
    if (!fetchErr && fullLead) {
      const result = await autoSubmitLeadToAudit(fullLead as OutboundLeadRow, autoAuditThreshold)
      await sb
        .from('outbound_leads')
        .update({
          audit_id: result.audit_id,
          auto_audit_status: result.status,
        })
        .eq('id', lead.id)
    } else {
      await sb
        .from('outbound_leads')
        .update({ auto_audit_status: 'failed' })
        .eq('id', lead.id)
    }
  }
}

/* ─── Daily cap helper ──────────────────────────────────────────────────── */

/**
 * Returns how many leads were created today (UTC) across all jobs.
 * Use this before kicking off a new job to enforce the 100-leads/day cap.
 */
export async function leadsCreatedToday(): Promise<number> {
  const sb = adminSupabase()
  const { data, error } = await sb.from('outbound_leads_today').select('count').single()
  if (error || !data) return 0
  return (data as { count: number }).count
}
