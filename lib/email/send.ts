/**
 * Thin Resend wrapper. Caller passes a rendered subject/html/text.
 *
 * Reads RESEND_API_KEY and a configurable from address (defaults to
 * Verve <noreply@vervemd.com>). The from-domain must be verified in
 * Resend for delivery to succeed; until then sends will be rejected
 * and this function will throw.
 */
export interface SendEmailArgs {
  to: string
  subject: string
  html: string
  text?: string
  replyTo?: string
}

export async function sendEmail(args: SendEmailArgs): Promise<{ id: string } | null> {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.warn('[email] RESEND_API_KEY missing — skipping send')
    return null
  }
  const from = process.env.EMAIL_FROM ?? 'Verve MD <noreply@vervemd.com>'

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [args.to],
      subject: args.subject,
      html: args.html,
      text: args.text,
      reply_to: args.replyTo,
    }),
  })

  if (!res.ok) {
    const detail = await res.text()
    throw new Error(`Resend ${res.status}: ${detail}`)
  }

  const json = (await res.json()) as { id?: string }
  return { id: json.id ?? '' }
}
