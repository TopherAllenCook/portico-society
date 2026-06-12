import { adminSupabase } from './supabase'
import type { AuditIntake } from './types'
import { auditAckEmail, leadNotifyEmail } from '@/lib/email/templates'
import { sendEmail } from '@/lib/email/send'
import { upsertContact, createDeal } from '@/lib/hubspot/client'

/**
 * Shared audit-intake side effects.
 *
 * Both the public self-serve form (/api/audit/submit) and the admin
 * "New audit" tool (/api/admin/audits/create) create the exact same lead and
 * fire the same downstream work (runner kick, prospect ack, ops notify, HubSpot
 * mirror). Keeping that logic here means the two entry points can never drift
 * apart — and there's a single place the prospect acknowledgement is sent, so
 * we don't double-mail leads.
 */

export function firstNameFrom(full: string): string {
  const trimmed = full.trim()
  if (!trimmed) return 'there'
  const noTitle = trimmed.replace(/^(dr|mr|mrs|ms|mx)\.?\s+/i, '')
  return noTitle.split(/\s+/)[0]
}

/**
 * Insert the audit_jobs row (this row IS the lead). Returns the new id +
 * share_token, or null on failure (logged).
 */
export async function insertAuditJob(
  intake: AuditIntake,
  opts?: { internal?: boolean },
): Promise<{ id: string; share_token: string } | null> {
  const sb = adminSupabase()
  const { data, error } = await sb
    .from('audit_jobs')
    .insert({
      clinic_name: intake.clinic_name,
      website_url: intake.website_url,
      contact_name: intake.contact_name,
      contact_email: intake.contact_email,
      contact_phone: intake.contact_phone ?? null,
      specialty: intake.specialty,
      city: intake.city,
      state: intake.state ?? null,
      challenge: intake.challenge ?? null,
      internal: opts?.internal ?? false,
    })
    .select('id, share_token')
    .single()

  if (error || !data) {
    console.error('[intake] audit_jobs insert failed', error)
    return null
  }
  return data
}

/**
 * Kick the audit runner. Best-effort: the recovery cron picks up any job that
 * was created but whose runner never started.
 */
export async function kickAuditRunner(origin: string, auditId: string): Promise<void> {
  const token = process.env.AUDIT_RUN_TOKEN
  if (!token) {
    console.warn('[intake] AUDIT_RUN_TOKEN not set — job created but runner not kicked')
    return
  }
  const runUrl = new URL('/api/audit/run', origin)
  try {
    await fetch(runUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-audit-run-token': token },
      body: JSON.stringify({ audit_id: auditId }),
    })
  } catch (err) {
    console.error('[intake] runner kick failed', err)
  }
}

/** Lead-facing acknowledgement. Sent exactly once per intake. */
export async function ackLead(intake: AuditIntake, shareToken: string): Promise<void> {
  const base = process.env.PUBLIC_BASE_URL ?? 'https://vervemd.com'
  const unsubscribeUrl = `${base}/api/unsubscribe?token=${encodeURIComponent(shareToken)}`
  const { subject, html, text } = auditAckEmail({
    contact_first_name: firstNameFrom(intake.contact_name),
    clinic_name: intake.clinic_name,
    status_url: `${base}/audit-report/${shareToken}`,
    unsubscribe_url: unsubscribeUrl,
  })
  await sendEmail({
    to: intake.contact_email,
    subject,
    html,
    text,
    replyTo: 'hello@vervemd.com',
    listUnsubscribeUrl: unsubscribeUrl,
  })
}

/** Internal lead notification to the ops inbox. */
export async function notifyOps(intake: AuditIntake, auditId: string): Promise<void> {
  const to = process.env.AUDIT_NOTIFY_EMAIL ?? 'topher.a.cook@gmail.com'
  const base = process.env.PUBLIC_BASE_URL ?? 'https://vervemd.com'
  const { subject, html, text } = leadNotifyEmail({
    clinic_name: intake.clinic_name,
    website_url: intake.website_url,
    city: intake.city,
    state: intake.state ?? null,
    specialty: intake.specialty,
    contact_name: intake.contact_name,
    contact_email: intake.contact_email,
    contact_phone: intake.contact_phone ?? null,
    challenge: intake.challenge ?? null,
    audit_id: auditId,
    admin_url: `${base}/admin/audits/${auditId}`,
  })
  await sendEmail({ to, subject, html, text, replyTo: intake.contact_email })
}

/** Mirror the lead into HubSpot as a contact + deal. Best-effort. */
export async function syncToHubspot(intake: AuditIntake, auditId: string): Promise<void> {
  const [firstname, ...rest] = intake.contact_name.trim().split(/\s+/)
  const lastname = rest.join(' ') || undefined

  const contactId = await upsertContact({
    email: intake.contact_email,
    firstname,
    lastname,
    phone: intake.contact_phone ?? undefined,
    company: intake.clinic_name,
    website: intake.website_url,
    city: intake.city,
    state: intake.state ?? undefined,
    lifecyclestage: 'lead',
    hs_lead_status: 'NEW',
  })

  if (!contactId) return // upsert failed (logged inside) — abort silently

  await createDeal(
    {
      dealname: `Audit: ${intake.clinic_name} (${intake.city})`,
    },
    contactId,
  )

  void auditId
}
