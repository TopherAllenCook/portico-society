import { NextRequest, NextResponse } from 'next/server'
import { adminSupabase } from '@/lib/audit/supabase'
import { AuditIntakeSchema, type AuditIntake } from '@/lib/audit/types'
import { auditAckEmail, leadNotifyEmail } from '@/lib/email/templates'
import { sendEmail } from '@/lib/email/send'

function firstNameFrom(full: string): string {
  const trimmed = full.trim()
  if (!trimmed) return 'there'
  const noTitle = trimmed.replace(/^(dr|mr|mrs|ms|mx)\.?\s+/i, '')
  return noTitle.split(/\s+/)[0]
}

export const runtime = 'nodejs'

/**
 * POST /api/audit/submit
 *
 * Validates intake, creates an audit_jobs row, fires-and-forgets the runner.
 * The runner is a separate route so it can be deployed behind a longer
 * function timeout (Vercel Pro: 300s) or moved to Trigger.dev/Inngest later.
 *
 * Returns: { ok, audit_id, share_token } so the form can redirect to a
 * "your audit is being prepared" page that polls for status.
 */
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null)
  if (!body) return NextResponse.json({ error: 'invalid_json' }, { status: 400 })

  const parsed = AuditIntakeSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'validation_failed', issues: parsed.error.flatten() }, { status: 400 })
  }
  const intake = parsed.data

  const sb = adminSupabase()
  const { data, error } = await sb.from('audit_jobs').insert({
    clinic_name: intake.clinic_name,
    website_url: intake.website_url,
    contact_name: intake.contact_name,
    contact_email: intake.contact_email,
    contact_phone: intake.contact_phone ?? null,
    specialty: intake.specialty,
    city: intake.city,
    state: intake.state ?? null,
    challenge: intake.challenge ?? null,
  }).select('id, share_token').single()

  if (error || !data) {
    console.error('[audit/submit] insert failed', error)
    return NextResponse.json({ error: 'submit_failed' }, { status: 500 })
  }

  // Fire-and-forget the runner. In production this should be queued
  // (Trigger.dev / Inngest / QStash). For now we hit the run endpoint
  // with an internal token so the function survives the request returning.
  const runUrl = new URL('/api/audit/run', req.nextUrl.origin)
  const token = process.env.AUDIT_RUN_TOKEN
  if (token) {
    fetch(runUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-audit-run-token': token },
      body: JSON.stringify({ audit_id: data.id }),
    }).catch((err) => console.error('[audit/submit] runner kick failed', err))
  } else {
    console.warn('[audit/submit] AUDIT_RUN_TOKEN not set — job created but runner not kicked')
  }

  // Notify ops
  notifyOps(intake, data.id).catch((err) => console.error('[audit/submit] notify failed', err))

  // Lead-facing acknowledgement. Best-effort: never block the response.
  ackLead(intake, data.share_token).catch((err) => console.error('[audit/submit] ack failed', err))

  return NextResponse.json({ ok: true, audit_id: data.id, share_token: data.share_token })
}

async function ackLead(intake: AuditIntake, shareToken: string) {
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

async function notifyOps(intake: AuditIntake, auditId: string) {
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
