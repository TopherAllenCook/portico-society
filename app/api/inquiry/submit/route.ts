import { after, NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { sendEmail } from '@/lib/email/send'
import { upsertContact, addNoteToContact } from '@/lib/hubspot/client'
import { adminSupabase } from '@/lib/audit/supabase'
import { checkHoneypot } from '@/lib/security/honeypot'
import { rateLimit, clientIp } from '@/lib/security/ratelimit'

export const runtime = 'nodejs'

const InquirySchema = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email().max(320),
  practice: z.string().max(200).optional().nullable(),
  message: z.string().min(1).max(5000),
})

const escape = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

/**
 * POST /api/inquiry/submit
 *
 * Contact-form endpoint. Persists the inquiry to the `inquiries` table (so no
 * lead is ever lost to an email/HubSpot hiccup), sends a notification email to
 * hello@vervemd.com, and mirrors the inquiry into HubSpot as a contact + note.
 * HubSpot runs via after() so it never blocks the user-facing response.
 */
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null)
  if (!body) return NextResponse.json({ error: 'invalid_json' }, { status: 400 })

  // Bot trap: pretend success, do nothing.
  if (checkHoneypot(body)) return NextResponse.json({ ok: true })

  const limit = rateLimit(`inquiry:${clientIp(req)}`, { limit: 5, windowMs: 10 * 60_000 })
  if (!limit.ok) {
    return NextResponse.json(
      { error: 'rate_limited' },
      { status: 429, headers: { 'Retry-After': String(limit.retryAfterSec) } },
    )
  }

  const parsed = InquirySchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'validation_failed', issues: parsed.error.flatten() }, { status: 400 })
  }

  const { name, email, practice, message } = parsed.data
  const subject = `New inquiry: ${name}${practice ? ` (${practice})` : ''}`

  // Persist first — the DB row is the durable record of the lead. Best-effort:
  // a storage hiccup must not lose the email/HubSpot notification below.
  let inquiryId: string | null = null
  try {
    const { data, error } = await adminSupabase()
      .from('inquiries')
      .insert({ name, email, practice: practice ?? null, message, source: 'contact_form' })
      .select('id')
      .single()
    if (error) console.error('[inquiry/submit] persist failed', error)
    else inquiryId = data?.id ?? null
  } catch (err) {
    console.error('[inquiry/submit] persist threw', err)
  }

  const fieldRow = (label: string, value: string) =>
    `<tr>
      <td style="padding:10px 0;border-bottom:1px solid #d8cfbb;vertical-align:top;width:38%;font-size:11px;font-weight:600;letter-spacing:0.14em;text-transform:uppercase;color:#5b524a;">${escape(label)}</td>
      <td style="padding:10px 0;border-bottom:1px solid #d8cfbb;vertical-align:top;font-size:14px;color:#211c18;">${escape(value)}</td>
    </tr>`

  const html = `<!doctype html><html><body style="margin:0;padding:32px;background:#f1ead9;font-family:-apple-system,BlinkMacSystemFont,'Helvetica Neue',Arial,sans-serif;">
    <div style="max-width:560px;margin:0 auto;background:#fff;border:1px solid #d8cfbb;border-radius:12px;padding:32px;">
      <p style="margin:0 0 6px 0;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#a14823;font-weight:600;">New contact form</p>
      <h1 style="margin:0 0 18px 0;font-family:Georgia,serif;font-size:22px;color:#211c18;letter-spacing:-0.01em;">${escape(name)} just reached out.</h1>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-top:1px solid #d8cfbb;">
        ${fieldRow('Name', name)}
        ${fieldRow('Email', email)}
        ${practice ? fieldRow('Practice', practice) : ''}
        ${fieldRow('Message', message)}
      </table>
      <p style="margin:24px 0 0 0;font-size:13px;color:#5b524a;">
        Reply directly to this email; it goes to ${escape(email)}.
      </p>
    </div>
  </body></html>`

  const text =
    `New contact form inquiry\n\n` +
    `Name: ${name}\n` +
    `Email: ${email}\n` +
    (practice ? `Practice: ${practice}\n` : '') +
    `\nMessage:\n${message}\n\n` +
    `Reply directly to this email; it goes to ${email}.`

  try {
    await sendEmail({
      to: 'hello@vervemd.com',
      subject,
      html,
      text,
      replyTo: email,
    })
  } catch (err) {
    console.error('[inquiry/submit] send failed', err)
    // The lead is already persisted, so it isn't lost — but surface the failure
    // so the form can prompt a retry / the email fallback.
    return NextResponse.json({ error: 'send_failed' }, { status: 500 })
  }

  after(async () => {
    try {
      const [firstname, ...rest] = name.trim().split(/\s+/)
      const lastname = rest.join(' ') || undefined
      const contactId = await upsertContact({
        email,
        firstname,
        lastname,
        company: practice ?? undefined,
        lifecyclestage: 'lead',
        hs_lead_status: 'NEW',
      })
      if (contactId) {
        await addNoteToContact(
          contactId,
          `<p><strong>Inbound inquiry from vervemd.com contact form</strong></p>` +
            (practice ? `<p><em>Practice:</em> ${escape(practice)}</p>` : '') +
            `<p>${escape(message).replace(/\n/g, '<br>')}</p>`,
        )
        if (inquiryId) {
          await adminSupabase()
            .from('inquiries')
            .update({ hubspot_contact_id: contactId })
            .eq('id', inquiryId)
        }
      }
    } catch (err) {
      console.error('[inquiry/submit] hubspot sync failed', err)
    }
  })

  return NextResponse.json({ ok: true })
}
