import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null)
  if (!body?.email) {
    return NextResponse.json({ error: 'Email required' }, { status: 400 })
  }

  const { email, website } = body as { email: string; website?: string }
  const apiKey = process.env.RESEND_API_KEY
  const notifyEmail = process.env.AUDIT_NOTIFY_EMAIL ?? 'topher.a.cook@gmail.com'

  if (!apiKey) {
    console.info('[audit-request]', {
      email,
      website: website || null,
      timestamp: new Date().toISOString(),
    })
    return NextResponse.json({ ok: true })
  }

  const html = `
    <p><strong>Email:</strong> ${email}</p>
    ${website ? `<p><strong>Website:</strong> <a href="${website}">${website}</a></p>` : ''}
    <p><strong>Received:</strong> ${new Date().toLocaleString('en-US', { timeZone: 'America/Denver' })} MT</p>
  `

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'Verve <noreply@vervemd.com>',
      to: [notifyEmail],
      subject: `Audit request: ${email}`,
      html,
    }),
  })

  if (!res.ok) {
    const text = await res.text()
    console.error('[audit-request] Resend error:', res.status, text)
    return NextResponse.json({ error: 'Delivery failed' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
