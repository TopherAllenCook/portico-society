import { NextRequest, NextResponse } from 'next/server'
import { createHmac, timingSafeEqual } from 'node:crypto'
import { adminSupabase } from '@/lib/audit/supabase'

export const runtime = 'nodejs'

/**
 * POST /api/webhooks/resend
 *
 * Receives Resend (Svix-signed) delivery events. On `email.bounced` or
 * `email.complained` we pause nurture for the matching audit_jobs row.
 * Other events (sent/delivered/opened/clicked) are logged for analytics.
 *
 * Set RESEND_WEBHOOK_SECRET to the `whsec_...` value from the Resend
 * dashboard webhook configuration.
 *
 * Svix signing spec: HMAC-SHA256 over `${svix_id}.${svix_timestamp}.${body}`
 * using the base64-decoded secret. Multiple signatures may be present
 * (space-separated, "v1,<b64>") for key rotation; accept if any matches.
 */
export async function POST(req: NextRequest) {
  const secret = process.env.RESEND_WEBHOOK_SECRET
  if (!secret) {
    console.error('[webhook/resend] RESEND_WEBHOOK_SECRET not set')
    return NextResponse.json({ error: 'not_configured' }, { status: 500 })
  }

  const svixId = req.headers.get('svix-id')
  const svixTimestamp = req.headers.get('svix-timestamp')
  const svixSignature = req.headers.get('svix-signature')
  if (!svixId || !svixTimestamp || !svixSignature) {
    return NextResponse.json({ error: 'missing_signature_headers' }, { status: 400 })
  }

  // Replay window: reject anything older than 5 minutes.
  const tsSeconds = Number(svixTimestamp)
  if (!Number.isFinite(tsSeconds)) {
    return NextResponse.json({ error: 'bad_timestamp' }, { status: 400 })
  }
  const ageMs = Math.abs(Date.now() - tsSeconds * 1000)
  if (ageMs > 5 * 60 * 1000) {
    return NextResponse.json({ error: 'timestamp_out_of_window' }, { status: 400 })
  }

  const rawBody = await req.text()
  if (!verifySvixSignature({ secret, svixId, svixTimestamp, signatureHeader: svixSignature, body: rawBody })) {
    return NextResponse.json({ error: 'invalid_signature' }, { status: 401 })
  }

  let payload: ResendEvent
  try {
    payload = JSON.parse(rawBody) as ResendEvent
  } catch {
    return NextResponse.json({ error: 'bad_json' }, { status: 400 })
  }

  const type = payload.type ?? ''
  const to = extractRecipient(payload)

  if (!to) {
    // Nothing to attribute. Acknowledge so Resend doesn't retry.
    return NextResponse.json({ ok: true, ignored: 'no_recipient' })
  }

  const sb = adminSupabase()
  // contact_email may have multiple jobs (a clinic re-runs an audit). Update all.
  const { data: jobs } = await sb
    .from('audit_jobs')
    .select('id')
    .ilike('contact_email', to)

  const jobIds = (jobs ?? []).map((j) => j.id)

  const shouldPause = type === 'email.bounced' || type === 'email.complained'

  if (shouldPause && jobIds.length > 0) {
    await sb.from('audit_jobs')
      .update({ nurture_paused_at: new Date().toISOString() })
      .in('id', jobIds)
      .is('nurture_paused_at', null)
  }

  if (jobIds.length > 0) {
    const eventType = mapEventType(type)
    if (eventType) {
      const rows = jobIds.map((jobId) => ({
        job_id: jobId,
        event_type: eventType,
        payload: payload as unknown as Record<string, unknown>,
      }))
      await sb.from('audit_email_events').insert(rows)
    }
  }

  return NextResponse.json({ ok: true, type, matched_jobs: jobIds.length, paused: shouldPause && jobIds.length > 0 })
}

interface ResendEvent {
  type?: string
  data?: {
    to?: string[] | string
    email_id?: string
    [k: string]: unknown
  }
}

function extractRecipient(payload: ResendEvent): string | null {
  const to = payload.data?.to
  if (!to) return null
  if (typeof to === 'string') return to
  if (Array.isArray(to) && to.length > 0 && typeof to[0] === 'string') return to[0]
  return null
}

function mapEventType(type: string): string | null {
  switch (type) {
    case 'email.sent':       return 'sent'
    case 'email.delivered':  return 'delivered'
    case 'email.opened':     return 'opened'
    case 'email.clicked':    return 'clicked'
    case 'email.bounced':    return 'bounced'
    case 'email.complained': return 'complained'
    default: return null
  }
}

interface VerifyArgs {
  secret: string
  svixId: string
  svixTimestamp: string
  signatureHeader: string
  body: string
}

function verifySvixSignature({ secret, svixId, svixTimestamp, signatureHeader, body }: VerifyArgs): boolean {
  const stripped = secret.startsWith('whsec_') ? secret.slice(6) : secret
  let keyBytes: Buffer
  try {
    keyBytes = Buffer.from(stripped, 'base64')
  } catch {
    return false
  }

  const signed = `${svixId}.${svixTimestamp}.${body}`
  const expected = createHmac('sha256', keyBytes).update(signed).digest('base64')
  const expectedBuf = Buffer.from(expected, 'utf8')

  // Header is space-separated "v1,<b64sig>" entries. Accept if any v1 matches.
  for (const part of signatureHeader.split(' ')) {
    const [version, sig] = part.split(',')
    if (version !== 'v1' || !sig) continue
    const sigBuf = Buffer.from(sig, 'utf8')
    if (sigBuf.length !== expectedBuf.length) continue
    if (timingSafeEqual(sigBuf, expectedBuf)) return true
  }
  return false
}
