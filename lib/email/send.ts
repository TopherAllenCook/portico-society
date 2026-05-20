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
  /**
   * If set, adds RFC 2369 List-Unsubscribe and RFC 8058 List-Unsubscribe-Post
   * headers. Required by Gmail/Yahoo bulk-sender rules; also fuels inbox UI
   * one-click unsubscribe in most clients.
   */
  listUnsubscribeUrl?: string
}

export async function sendEmail(args: SendEmailArgs): Promise<{ id: string } | null> {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    // In production a missing key means every transactional email
    // silently disappears (key rotation, misconfigured env, etc.).
    // Fail loudly so we notice instead of losing leads.
    if (process.env.NODE_ENV === 'production') {
      throw new Error('[email] RESEND_API_KEY missing in production')
    }
    console.warn('[email] RESEND_API_KEY missing — skipping send (non-production)')
    return null
  }
  const from = process.env.EMAIL_FROM ?? 'Verve MD <noreply@vervemd.com>'

  const headers: Record<string, string> = {}
  if (args.listUnsubscribeUrl) {
    headers['List-Unsubscribe'] = `<${args.listUnsubscribeUrl}>, <mailto:hello@vervemd.com?subject=unsubscribe>`
    headers['List-Unsubscribe-Post'] = 'List-Unsubscribe=One-Click'
  }

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
      ...(Object.keys(headers).length > 0 ? { headers } : {}),
    }),
  })

  if (!res.ok) {
    const detail = await res.text()
    throw new Error(`Resend ${res.status}: ${detail}`)
  }

  const json = (await res.json()) as { id?: string }
  return { id: json.id ?? '' }
}
