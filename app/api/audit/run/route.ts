import { NextRequest, NextResponse } from 'next/server'
import { runAudit } from '@/lib/audit/orchestrate'
import { adminSupabase } from '@/lib/audit/supabase'
import { seedNurtureQueue } from '@/lib/audit/nurture'
import { auditReadyEmail } from '@/lib/email/templates'
import { sendEmail } from '@/lib/email/send'

export const runtime = 'nodejs'
export const maxDuration = 300 // Vercel Pro: 5min ceiling; Hobby caps at 60s

/**
 * POST /api/audit/run
 * Body: { audit_id }
 * Auth: x-audit-run-token header must match AUDIT_RUN_TOKEN env.
 *
 * In production move this into Trigger.dev / Inngest. For now it works inline
 * for clinics whose audit fits in the Vercel function budget.
 */
export async function POST(req: NextRequest) {
  const token = req.headers.get('x-audit-run-token')
  if (!process.env.AUDIT_RUN_TOKEN || token !== process.env.AUDIT_RUN_TOKEN) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }
  const body = await req.json().catch(() => null) as { audit_id?: string } | null
  if (!body?.audit_id) return NextResponse.json({ error: 'audit_id required' }, { status: 400 })

  try {
    const result = await runAudit(body.audit_id)
    await deliverReadyEmail(body.audit_id).catch((err) => console.error('[audit/run] delivery email failed', err))
    return NextResponse.json({ ok: true, ...result })
  } catch (err) {
    console.error('[audit/run] failure', err)
    return NextResponse.json({ error: 'run_failed', message: (err as Error).message }, { status: 500 })
  }
}

async function deliverReadyEmail(jobId: string) {
  const sb = adminSupabase()
  const { data } = await sb
    .from('audit_jobs')
    .select('clinic_name, contact_email, contact_name, share_token, status, city, internal')
    .eq('id', jobId)
    .single()
  if (!data || data.status === 'failed') return
  // Internal pre-call audits (Sam's triage pipeline) are never delivered to the
  // prospect: no ready email, no nurture. The report is consumed via Airtable.
  if (data.internal) return

  const base = process.env.PUBLIC_BASE_URL ?? 'https://vervemd.com'
  const reportUrl = `${base}/audit-report/${data.share_token}`
  const unsubscribeUrl = `${base}/api/unsubscribe?token=${encodeURIComponent(data.share_token)}`
  const firstName = firstNameFrom(data.contact_name)
  const { subject, html, text } = auditReadyEmail({
    contact_first_name: firstName,
    clinic_name: data.clinic_name,
    report_url: reportUrl,
    city: data.city ?? '',
    unsubscribe_url: unsubscribeUrl,
  })

  let sent: { id: string } | null = null
  try {
    sent = await sendEmail({
      to: data.contact_email,
      subject,
      html,
      text,
      listUnsubscribeUrl: unsubscribeUrl,
    })
  } catch (err) {
    console.error('[audit/run] ready email send threw', err)
  }

  if (!sent) {
    // Don't mark delivered or seed the nurture sequence — the lead never
    // got the report. Recovery cron / admin UI will pick it up.
    await sb.from('audit_jobs')
      .update({ email_delivery_failed_at: new Date().toISOString() })
      .eq('id', jobId)
    console.error('[audit/run] ready email not delivered', { jobId })
    return
  }

  const deliveredAt = new Date()
  await sb.from('audit_jobs')
    .update({ delivered_at: deliveredAt.toISOString(), email_delivery_failed_at: null })
    .eq('id', jobId)
  try {
    await seedNurtureQueue(jobId, deliveredAt)
  } catch (err) {
    console.error('[audit/run] nurture seed failed', err)
  }
}

function firstNameFrom(full: string): string {
  const trimmed = full.trim()
  if (!trimmed) return 'there'
  const noTitle = trimmed.replace(/^(dr|mr|mrs|ms|mx)\.?\s+/i, '')
  return noTitle.split(/\s+/)[0]
}
