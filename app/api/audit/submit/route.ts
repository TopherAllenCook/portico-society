import { after, NextRequest, NextResponse } from 'next/server'
import { AuditIntakeSchema } from '@/lib/audit/types'
import { insertAuditJob, kickAuditRunner, ackLead, notifyOps, syncToHubspot } from '@/lib/audit/intake'
import { checkHoneypot } from '@/lib/security/honeypot'
import { rateLimit, clientIp } from '@/lib/security/ratelimit'

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

  // Bot trap: a filled hidden field means a bot. Pretend success so we don't
  // teach the bot what tripped it, but do no work (no lead, no paid-API spend).
  if (checkHoneypot(body)) return NextResponse.json({ ok: true })

  // Per-IP throttle. The audit pipeline hits several paid APIs per run, so a
  // single source hammering this endpoint is a real cost risk.
  const limit = rateLimit(`audit:${clientIp(req)}`, { limit: 5, windowMs: 10 * 60_000 })
  if (!limit.ok) {
    return NextResponse.json(
      { error: 'rate_limited' },
      { status: 429, headers: { 'Retry-After': String(limit.retryAfterSec) } },
    )
  }

  const parsed = AuditIntakeSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'validation_failed', issues: parsed.error.flatten() }, { status: 400 })
  }
  const intake = parsed.data

  const job = await insertAuditJob(intake)
  if (!job) {
    return NextResponse.json({ error: 'submit_failed' }, { status: 500 })
  }

  // Background work after the response is sent. `after()` keeps the
  // serverless function alive long enough for these to complete instead
  // of getting nuked when the request returns (the old fire-and-forget
  // pattern was racing the function shutdown — caused ~30% of audits to
  // never start until the recovery cron picked them up). See:
  //   https://nextjs.org/docs/app/api-reference/functions/after
  after(() => kickAuditRunner(req.nextUrl.origin, job.id))
  after(() => notifyOps(intake, job.id).catch((err) => console.error('[audit/submit] notify failed', err)))
  after(() => ackLead(intake, job.share_token).catch((err) => console.error('[audit/submit] ack failed', err)))
  after(() => syncToHubspot(intake, job.id).catch((err) => console.error('[audit/submit] hubspot sync failed', err)))

  return NextResponse.json({ ok: true, audit_id: job.id, share_token: job.share_token })
}
