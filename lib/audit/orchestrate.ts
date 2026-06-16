import { adminSupabase } from './supabase'
import { runCrawl, evaluateSchema, scrapePage } from './crawl'
import { runPagespeed } from './pagespeed'
import { runGeo, topCompetitorsFromGeo } from './geo'
import { runPlaces } from './places'
import { auditLeadgenFromHtml } from './leadgen'
import { runDataForSeo } from './dataforseo-runner'
import { synthesizeAudit } from './synthesize'
import type { AuditJobRow, ModuleName } from './types'

/**
 * Audit pipeline:
 *
 *   1. mark job running
 *   2. parallel: crawl, pagespeed, places, geo
 *   3. derive competitors from geo → DataForSEO with that competitor set
 *   4. schema eval over crawl
 *   5. leadgen eval over crawled homepage HTML (re-scrape if needed for raw html)
 *   6. synthesize with Claude
 *   7. write audit_synthesis, mark complete, email
 *
 * Each module writes its own audit_module_results row so partial failures are recoverable.
 */
export async function runAudit(jobId: string) {
  const sb = adminSupabase()
  const { data: jobData, error: jobErr } = await sb.from('audit_jobs').select('*').eq('id', jobId).single()
  if (jobErr || !jobData) throw new Error(`audit job ${jobId} not found: ${jobErr?.message}`)
  const job = jobData as AuditJobRow

  await sb.from('audit_jobs').update({ status: 'running', started_at: new Date().toISOString() }).eq('id', jobId)

  const ourDomain = new URL(job.website_url).hostname.replace(/^www\./, '')

  const [crawl, pagespeed, places, geo] = await Promise.all([
    runModule(sb, jobId, 'crawl', ourDomain, () => runCrawl(job.website_url)),
    runModule(sb, jobId, 'pagespeed', ourDomain, () => runPagespeed(job.website_url)),
    runModule(sb, jobId, 'places', ourDomain, () => runPlaces({ clinicName: job.clinic_name, city: job.city })),
    runModule(sb, jobId, 'geo', ourDomain, () => runGeo({ ourDomain, specialty: job.specialty, city: job.city })),
  ])

  const competitors = geo ? topCompetitorsFromGeo(geo, 3) : []
  await sb.from('audit_jobs').update({ competitors }).eq('id', jobId)

  const schema = crawl ? await runModule(sb, jobId, 'schema', ourDomain, async () => evaluateSchema(crawl.pages, job.specialty)) : null

  // Leadgen needs raw HTML — re-scrape homepage once for that signal.
  const leadgen = await runModule(sb, jobId, 'leadgen', ourDomain, async () => {
    const homepage = await scrapePageHtml(job.website_url)
    return auditLeadgenFromHtml(job.website_url, homepage)
  })

  const dataforseo = await runModule(sb, jobId, 'dataforseo', ourDomain, () =>
    runDataForSeo({
      ourDomain,
      competitorDomains: competitors.map((c) => c.domain),
      specialty: job.specialty,
      city: job.city,
      state: job.state,
    }),
  )

  // Synthesis
  let synthesisError: string | null = null
  try {
    const synth = await synthesizeAudit({
      job,
      crawl,
      pagespeed,
      schema,
      dataforseo,
      geo,
      places,
      leadgen,
    })

    await sb.from('audit_synthesis').upsert({
      job_id: jobId,
      scorecard: synth.output.scorecard,
      competitors: synth.output.competitors,
      prioritized_moves: synth.output.prioritized_moves,
      executive_summary: synth.output.executive_summary,
      narrative_markdown: synth.output.narrative_markdown,
      model: synth.model,
      input_tokens: synth.input_tokens,
      output_tokens: synth.output_tokens,
      cache_read_tokens: synth.cache_read_tokens,
    })
  } catch (err) {
    synthesisError = (err as Error).message
  }

  const moduleStatuses = await sb
    .from('audit_module_results')
    .select('status, module')
    .eq('job_id', jobId)
  const failures = (moduleStatuses.data ?? []).filter((r) => r.status === 'failed').map((r) => r.module)
  const finalStatus = synthesisError ? 'failed' : failures.length > 0 ? 'partial' : 'complete'

  await sb.from('audit_jobs').update({
    status: finalStatus,
    completed_at: new Date().toISOString(),
    error_message: synthesisError ?? (failures.length ? `modules failed: ${failures.join(', ')}` : null),
  }).eq('id', jobId)

  return { jobId, status: finalStatus, failed_modules: failures }
}

async function runModule<T>(
  sb: ReturnType<typeof adminSupabase>,
  jobId: string,
  name: ModuleName,
  target: string,
  fn: () => Promise<T>,
): Promise<T | null> {
  const startedAt = new Date().toISOString()
  const insert = await sb.from('audit_module_results').insert({
    job_id: jobId, module: name, target, status: 'running', started_at: startedAt,
  }).select('id').single()
  const rowId = insert.data?.id
  try {
    const payload = await fn()
    await sb.from('audit_module_results').update({
      status: 'complete',
      payload: payload as unknown as object,
      completed_at: new Date().toISOString(),
    }).eq('id', rowId)
    return payload
  } catch (err) {
    await sb.from('audit_module_results').update({
      status: 'failed',
      error_message: (err as Error).message,
      completed_at: new Date().toISOString(),
    }).eq('id', rowId)
    return null
  }
}

async function scrapePageHtml(url: string): Promise<string> {
  const res = await fetch('https://api.firecrawl.dev/v1/scrape', {
    method: 'POST',
    headers: { Authorization: `Bearer ${process.env.FIRECRAWL_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ url, formats: ['html'], onlyMainContent: false }),
  })
  if (!res.ok) throw new Error(`firecrawl html ${res.status}`)
  const json = await res.json() as { data?: { html?: string } }
  return json.data?.html ?? ''
}

// re-export so the runner module is self-contained
export { scrapePage }
