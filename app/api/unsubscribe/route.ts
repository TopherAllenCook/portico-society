import { NextRequest, NextResponse } from 'next/server'
import { adminSupabase } from '@/lib/audit/supabase'

export const runtime = 'nodejs'

/**
 * GET /api/unsubscribe?token=<share_token>
 *
 * One-click unsubscribe for nurture follow-ups. Sets nurture_paused_at on
 * the matching audit_jobs row, then returns a small branded confirmation
 * page. CAN-SPAM compliant: no auth, no friction.
 *
 * Token here is the per-job share_token (same one used in /audit-report/[token]).
 * That's fine: anyone who can forward the email already has the token, so
 * leaking it via a Forward-to-Unsubscribe pattern can't escalate access.
 */
export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token')
  if (!token) return errorPage('Missing token.', 400)

  const sb = adminSupabase()
  const { data, error } = await sb
    .from('audit_jobs')
    .select('id, clinic_name, nurture_paused_at')
    .eq('share_token', token)
    .single()

  if (error || !data) {
    // Don't leak whether the token existed — always show "you're unsubscribed".
    // Worst case is a forged token gets a friendly page; nothing happens server-side.
    console.warn('[unsubscribe] token not found', { token: token.slice(0, 6) + '…' })
    return confirmedPage(null)
  }

  if (!data.nurture_paused_at) {
    await sb.from('audit_jobs')
      .update({ nurture_paused_at: new Date().toISOString() })
      .eq('id', data.id)
    await sb.from('audit_email_events').insert({
      job_id: data.id,
      event_type: 'unsubscribed',
      payload: { source: 'one_click' },
    })
  }

  return confirmedPage(data.clinic_name)
}

// POST is required by RFC 8058 (List-Unsubscribe-Post one-click); behave the same.
export async function POST(req: NextRequest) {
  return GET(req)
}

function confirmedPage(clinicName: string | null): NextResponse {
  const who = clinicName ? `the contact at ${escapeHtml(clinicName)}` : 'this address'
  const html = `<!doctype html>
<html lang="en"><head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>Unsubscribed — Verve MD</title>
</head>
<body style="margin:0;padding:0;background:#F5EFE3;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#1F1B16;">
  <main style="max-width:520px;margin:80px auto;padding:36px 32px;background:#FBF6EA;border:1px solid #E3DDCB;border-radius:16px;">
    <p style="margin:0 0 12px 0;font-size:11px;font-weight:600;letter-spacing:0.18em;text-transform:uppercase;color:#C44536;">Unsubscribed</p>
    <h1 style="margin:0 0 18px 0;font-family:Georgia,serif;font-size:28px;line-height:1.15;letter-spacing:-0.02em;">You're unsubscribed.</h1>
    <p style="margin:0 0 14px 0;font-size:15px;line-height:1.65;">We won't send ${who} any more nurture follow-ups about the Verve audit.</p>
    <p style="margin:0 0 14px 0;font-size:15px;line-height:1.65;color:#4A4540;">If this was a mistake, reply to any prior email and we'll resume.</p>
    <p style="margin:24px 0 0 0;font-size:13px;color:#4A4540;"><a href="https://vervemd.com" style="color:#C44536;text-decoration:none;">vervemd.com</a></p>
  </main>
</body></html>`
  return new NextResponse(html, { status: 200, headers: { 'Content-Type': 'text/html; charset=utf-8' } })
}

function errorPage(message: string, status: number): NextResponse {
  const html = `<!doctype html>
<html><head><meta charset="utf-8"/><title>Unsubscribe — Verve MD</title></head>
<body style="font-family:-apple-system,sans-serif;background:#F5EFE3;color:#1F1B16;padding:80px 32px;text-align:center;">
  <p>${escapeHtml(message)}</p>
</body></html>`
  return new NextResponse(html, { status, headers: { 'Content-Type': 'text/html; charset=utf-8' } })
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!))
}
