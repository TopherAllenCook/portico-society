/**
 * Auto-audit bridge: transforms a scored outbound lead into an audit engine
 * submission. Called from the orchestrator after enrichment + scoring when the
 * job's `auto_audit` flag is true and the lead's ICP score meets the threshold.
 */

import { adminSupabase } from '@/lib/audit/supabase'
import { insertAuditJob, kickAuditRunner } from '@/lib/audit/intake'
import type { AuditIntake, Specialty as AuditSpecialty } from '@/lib/audit/types'
import type { OutboundLeadRow } from './types'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ?? 'https://vervemd.com'

/** Normalise outbound specialty to the audit engine's Specialty enum. */
function mapSpecialty(raw: string | null): AuditSpecialty {
  const s = (raw ?? '').toLowerCase()
  if (['plumbing', 'hvac', 'electrical', 'roofing'].includes(s)) return s as AuditSpecialty
  return 'other'
}

/** Build a contact name: prefer owner name discovery, fall back to clinic name. */
function contactName(lead: OutboundLeadRow): string {
  if (lead.owner_names && lead.owner_names.length > 0) return lead.owner_names[0]
  // Extract a reasonable contact name from the clinic name (first word + "Team")
  const first = lead.clinic_name.trim().split(/\s+/)[0]
  return `${first} Owner`
}

/** Transform an OutboundLeadRow into the AuditIntake shape. */
function toAuditIntake(lead: OutboundLeadRow): AuditIntake {
  return {
    clinic_name: lead.clinic_name,
    website_url: lead.website ?? '',
    contact_name: contactName(lead),
    contact_email: lead.primary_email ?? '',
    contact_phone: lead.phone ?? null,
    specialty: mapSpecialty(lead.specialty),
    city: lead.city ?? '',
    state: lead.state ?? null,
    challenge: lead.icp_reasoning ?? null,
  }
}

export interface AutoAuditResult {
  audit_id: string | null
  status: 'created' | 'failed' | 'skipped'
  reason: string
}

/**
 * Submit a scored lead to the audit engine.
 *
 * Guards:
 *  - Must have a website (audit engine needs a URL to crawl).
 *  - Must have at least a primary_email (required contact field).
 *  - Score must meet the configured threshold.
 *
 * Uses internal=true so no prospect emails or HubSpot mirroring are triggered
 * from the scraper pipeline — the audit is a cold internal assessment, not a
 * prospect-facing submission.
 */
export async function autoSubmitLeadToAudit(
  lead: OutboundLeadRow,
  threshold: number,
): Promise<AutoAuditResult> {
  // --- guards ---
  if (!lead.website) {
    return { audit_id: null, status: 'skipped', reason: 'no website' }
  }
  if (!lead.primary_email) {
    return { audit_id: null, status: 'skipped', reason: 'no email' }
  }
  if ((lead.icp_score ?? 0) < threshold) {
    return { audit_id: null, status: 'skipped', reason: `score ${lead.icp_score} below threshold ${threshold}` }
  }

  // --- submit ---
  const intake = toAuditIntake(lead)
  try {
    // Internal audit: no prospect ack, no ops notify, no HubSpot.
    const job = await insertAuditJob(intake, { internal: true })
    if (!job) {
      return { audit_id: null, status: 'failed', reason: 'insertAuditJob returned null' }
    }

    // Kick the runner (best-effort).
    kickAuditRunner(BASE_URL, job.id).catch(err =>
      console.error(`[auto-audit] runner kick failed for ${job.id}`, err),
    )

    return { audit_id: job.id, status: 'created', reason: 'ok' }
  } catch (err) {
    const msg = (err as Error).message
    console.error(`[auto-audit] submit failed for ${lead.id}`, msg)
    return { audit_id: null, status: 'failed', reason: msg.slice(0, 300) }
  }
}
