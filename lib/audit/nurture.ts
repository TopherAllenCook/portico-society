import { adminSupabase } from './supabase'
import type { Specialty } from './types'

/**
 * Nurture sequence. Five touches over ~45 days after the audit is delivered.
 *
 * Step copy is specialty-aware. The orchestrator seeds the queue when the
 * "audit ready" email goes out; the cron endpoint dispatches sends.
 *
 * Pause/resume is per-job via audit_jobs.nurture_paused_at. Won/Lost auto-skip.
 */

export interface NurtureStep {
  key: string
  index: number
  dayOffset: number
  subject: (ctx: NurtureContext) => string
  html: (ctx: NurtureContext) => string
}

export interface NurtureContext {
  clinic_name: string
  contact_first_name: string
  city: string
  specialty: Specialty
  report_url: string
  reply_to: string
  call_url: string
}

const FROM = 'Verve <noreply@vervemd.com>'

function shell(inner: string): string {
  return `<div style="font-family:Georgia,serif;color:#1B1B1B;line-height:1.6;max-width:580px">${inner}<p style="margin-top:32px;font-size:13px;color:#666;font-family:-apple-system,sans-serif">Verve MD<br/>AI search authority and inquiry systems for established clinics.</p></div>`
}

function specialtyTerm(s: Specialty): string {
  switch (s) {
    case 'longevity': return 'longevity'
    case 'aesthetic': return 'aesthetic'
    case 'concierge': return 'concierge medicine'
    case 'mixed': return 'longevity and aesthetic'
  }
}

export const NURTURE_STEPS: NurtureStep[] = [
  {
    key: 'day_2_anchor',
    index: 1,
    dayOffset: 2,
    subject: (c) => `One move from your ${c.clinic_name} audit`,
    html: (c) => shell(`
      <p>${c.contact_first_name},</p>
      <p>Quick follow up on the audit we delivered for ${c.clinic_name}.</p>
      <p>Of the five prioritized moves in your report, one carries the most weight: closing the citation gap to the three ${specialtyTerm(c.specialty)} practices AI currently recommends in ${c.city}.</p>
      <p>Everything else (technical SEO, schema, lead-gen polish) sits on top of that foundation. If you only do one thing this quarter, it's that.</p>
      <p>The full report is still here: <a href="${c.report_url}">${c.report_url}</a></p>
      <p>Reply with the move that surprised you most. I read every response.</p>
      <p>— Verve MD</p>
    `),
  },
  {
    key: 'day_5_proof',
    index: 2,
    dayOffset: 5,
    subject: () => `How clinics close the AI gap`,
    html: (c) => shell(`
      <p>${c.contact_first_name},</p>
      <p>What it actually takes to get named by ChatGPT, Perplexity, and Google's AI overview for a ${specialtyTerm(c.specialty)} query in a city like ${c.city}:</p>
      <ol>
        <li>A handful of citations from the right authoritative sources (industry press, specialty directories, journalist roundups). Five to ten well-chosen mentions usually move the needle more than fifty mass-produced backlinks.</li>
        <li>Structured content on your own site that maps to how patients phrase the question. Most clinic sites describe what they do; almost none answer the question a patient is actually asking.</li>
        <li>Schema markup the AI engines actually read. <code>Physician</code>, <code>MedicalClinic</code>, <code>Service</code>, <code>FAQPage</code>. Not generic <code>LocalBusiness</code>.</li>
      </ol>
      <p>That's the work. It's specific and it's measurable. Audit link: <a href="${c.report_url}">${c.report_url}</a></p>
      <p>— Verve MD</p>
    `),
  },
  {
    key: 'day_10_call',
    index: 3,
    dayOffset: 10,
    subject: (c) => `15 minutes to walk through your ${c.clinic_name} audit`,
    html: (c) => shell(`
      <p>${c.contact_first_name},</p>
      <p>Worth 15 minutes? I'll walk you through your audit, show you the AI overview captures behind the GEO score, and answer questions on the prioritized moves.</p>
      <p>No pitch. If we're a fit at the end, we'll talk about it. If not, you keep the audit.</p>
      <p><a href="${c.call_url}" style="display:inline-block;background:#C44536;color:#FFF8EA;padding:12px 22px;border-radius:9999px;text-decoration:none;font-family:-apple-system,sans-serif;font-weight:600">Pick a time</a></p>
      <p>Or just reply with a few windows.</p>
      <p>— Verve MD</p>
    `),
  },
  {
    key: 'day_21_last_check',
    index: 4,
    dayOffset: 21,
    subject: () => `Still relevant?`,
    html: (c) => shell(`
      <p>${c.contact_first_name},</p>
      <p>Closing the loop on the ${c.clinic_name} audit. Two questions:</p>
      <ol>
        <li>Is patient acquisition still a priority this quarter?</li>
        <li>If yes, what's blocking the team from acting on the audit?</li>
      </ol>
      <p>A one-line reply is enough. If now isn't the right moment I'll set this aside and check back in six weeks.</p>
      <p>— Verve MD</p>
    `),
  },
  {
    key: 'day_45_refresh',
    index: 5,
    dayOffset: 45,
    subject: () => `Your AI visibility, six weeks later`,
    html: (c) => shell(`
      <p>${c.contact_first_name},</p>
      <p>The AI search landscape moves fast. Six weeks on, the ${specialtyTerm(c.specialty)} clinics ChatGPT named for ${c.city} may have changed. The clinics on top now will be hard to dislodge in six months.</p>
      <p>If you'd like a refreshed AI visibility snapshot (no charge), reply with the word "refresh" and I'll re-run it.</p>
      <p>Original audit: <a href="${c.report_url}">${c.report_url}</a></p>
      <p>— Verve MD</p>
    `),
  },
]

/**
 * Seed scheduled rows in audit_followups for one job. Called once when
 * the delivery email goes out.
 */
export async function seedNurtureQueue(jobId: string, deliveredAt: Date) {
  const sb = adminSupabase()
  const rows = NURTURE_STEPS.map((s) => ({
    job_id: jobId,
    step_key: s.key,
    step_index: s.index,
    scheduled_for: addDays(deliveredAt, s.dayOffset).toISOString(),
  }))
  await sb.from('audit_followups').upsert(rows, { onConflict: 'job_id,step_key' })
}

function addDays(d: Date, days: number): Date {
  const n = new Date(d)
  n.setDate(n.getDate() + days)
  return n
}

/**
 * Drain due nurture rows. Hit once an hour by /api/cron/nurture.
 */
export async function processDueNurture(): Promise<{ sent: number; failed: number; skipped: number }> {
  const sb = adminSupabase()
  const now = new Date().toISOString()
  const { data: due, error } = await sb
    .from('audit_followups')
    .select('id, job_id, step_key, step_index, scheduled_for')
    .eq('status', 'scheduled')
    .lte('scheduled_for', now)
    .limit(50)
  if (error) throw error

  let sent = 0
  let failed = 0
  let skipped = 0

  for (const row of due ?? []) {
    const { data: job } = await sb
      .from('audit_jobs')
      .select('id, clinic_name, contact_name, contact_email, city, specialty, pipeline_status, nurture_paused_at, share_token')
      .eq('id', row.job_id)
      .single()

    if (!job) { await markStatus(row.id, 'skipped'); skipped++; continue }
    if (job.nurture_paused_at) { await markStatus(row.id, 'paused'); skipped++; continue }
    if (['won', 'lost', 'call_booked', 'proposal'].includes(job.pipeline_status)) {
      await markStatus(row.id, 'skipped'); skipped++; continue
    }

    const step = NURTURE_STEPS.find((s) => s.key === row.step_key)
    if (!step) { await markStatus(row.id, 'skipped'); skipped++; continue }

    const ctx: NurtureContext = {
      clinic_name: job.clinic_name,
      contact_first_name: firstName(job.contact_name),
      city: job.city,
      specialty: job.specialty as Specialty,
      report_url: `${process.env.PUBLIC_BASE_URL ?? 'https://vervemd.com'}/audit-report/${job.share_token}`,
      reply_to: process.env.NURTURE_REPLY_TO ?? 'topher.a.cook@gmail.com',
      call_url: process.env.NURTURE_CALL_URL ?? 'https://cal.com/vervemd/audit-review',
    }

    try {
      const resendId = await sendViaResend({
        to: job.contact_email,
        subject: step.subject(ctx),
        html: step.html(ctx),
        replyTo: ctx.reply_to,
      })
      await sb.from('audit_followups').update({
        status: 'sent', sent_at: new Date().toISOString(), resend_id: resendId,
      }).eq('id', row.id)
      await sb.from('audit_email_events').insert({
        job_id: job.id, followup_id: row.id, event_type: 'sent', payload: { step: row.step_key },
      })
      await sb.from('audit_jobs').update({ last_contact_at: new Date().toISOString() }).eq('id', job.id)
      sent++
    } catch (err) {
      await sb.from('audit_followups').update({
        status: 'failed', error_message: (err as Error).message,
      }).eq('id', row.id)
      failed++
    }
  }

  return { sent, failed, skipped }
}

async function markStatus(id: string, status: 'skipped' | 'paused') {
  await adminSupabase().from('audit_followups').update({ status }).eq('id', id)
}

function firstName(full: string): string {
  const trimmed = full.trim()
  if (!trimmed) return 'there'
  // Strip Dr./Mr./Ms./etc prefixes
  const noTitle = trimmed.replace(/^(dr|mr|mrs|ms|mx)\.?\s+/i, '')
  return noTitle.split(/\s+/)[0]
}

async function sendViaResend(args: { to: string; subject: string; html: string; replyTo: string }): Promise<string> {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) throw new Error('RESEND_API_KEY missing')
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: FROM,
      to: [args.to],
      reply_to: args.replyTo,
      subject: args.subject,
      html: args.html,
    }),
  })
  if (!res.ok) throw new Error(`resend ${res.status}: ${await res.text()}`)
  const json = await res.json() as { id?: string }
  return json.id ?? ''
}
