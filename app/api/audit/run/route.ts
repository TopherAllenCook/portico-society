import { NextRequest, NextResponse } from 'next/server'
import { runAudit } from '@/lib/audit/orchestrate'
import { adminSupabase } from '@/lib/audit/supabase'
import { seedNurtureQueue } from '@/lib/audit/nurture'

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
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) return
  const sb = adminSupabase()
  const { data } = await sb
    .from('audit_jobs')
    .select('clinic_name, contact_email, contact_name, share_token, status')
    .eq('id', jobId)
    .single()
  if (!data || data.status === 'failed') return

  const reportUrl = `${process.env.PUBLIC_BASE_URL ?? 'https://vervemd.com'}/audit-report/${data.share_token}`
  const html = `
    <p>${data.contact_name},</p>
    <p>Your AEO + marketing audit for ${data.clinic_name} is ready.</p>
    <p><a href="${reportUrl}" style="background:#C44536;color:#FFF8EA;padding:12px 20px;text-decoration:none;border-radius:9999px;font-weight:600">View your audit</a></p>
    <p style="color:#666;font-size:13px">Link is private to your inbox. Reply with questions and we'll walk you through it.</p>
    <p>Verve MD</p>
  `
  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: 'Verve <noreply@vervemd.com>',
      to: [data.contact_email],
      subject: `Your Verve audit: ${data.clinic_name}`,
      html,
    }),
  })
  const deliveredAt = new Date()
  await sb.from('audit_jobs').update({ delivered_at: deliveredAt.toISOString() }).eq('id', jobId)
  try {
    await seedNurtureQueue(jobId, deliveredAt)
  } catch (err) {
    console.error('[audit/run] nurture seed failed', err)
  }
}
