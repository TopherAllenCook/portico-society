import { after, NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { AuditIntakeSchema } from '@/lib/audit/types'
import { insertAuditJob, kickAuditRunner, ackLead, notifyOps, syncToHubspot } from '@/lib/audit/intake'
import { checkHoneypot } from '@/lib/security/honeypot'
import { rateLimit, clientIp } from '@/lib/security/ratelimit'

export const runtime = 'nodejs'

/**
 * POST /api/new-audit
 *
 * Login-free internal tool endpoint for creating an audit (the lead) on a
 * prospect's behalf. Deliberately unauthenticated — the public /audit form
 * already lets anyone create + run an audit, so this exposes nothing new — but
 * it keeps the same bot protections (honeypot + per-IP throttle) so it can't be
 * scripted into spinning the paid-API pipeline or emailing arbitrary addresses
 * at scale.
 */
const CreateSchema = AuditIntakeSchema.extend({
  run_now: z.boolean().optional().default(true),
})

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null)
  if (!body) return NextResponse.json({ error: 'invalid_json' }, { status: 400 })

  if (checkHoneypot(body)) return NextResponse.json({ ok: true })

  const limit = rateLimit(`new-audit:${clientIp(req)}`, { limit: 20, windowMs: 10 * 60_000 })
  if (!limit.ok) {
    return NextResponse.json(
      { error: 'rate_limited' },
      { status: 429, headers: { 'Retry-After': String(limit.retryAfterSec) } },
    )
  }

  const parsed = CreateSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'validation_failed', issues: parsed.error.flatten() }, { status: 400 })
  }
  const { run_now, ...intake } = parsed.data

  const job = await insertAuditJob(intake)
  if (!job) {
    return NextResponse.json({ error: 'create_failed' }, { status: 500 })
  }

  // Same capture + downstream as the public form. Prospect-facing email is tied
  // to actually running the audit: run_now on (default) mirrors the public flow
  // exactly (ack now, ready report + nurture from the runner); save-only skips
  // the "your audit is being prepared" email for an audit that isn't running.
  after(() => notifyOps(intake, job.id).catch((err) => console.error('[new-audit] notify failed', err)))
  after(() => syncToHubspot(intake, job.id).catch((err) => console.error('[new-audit] hubspot sync failed', err)))
  if (run_now) {
    after(() => ackLead(intake, job.share_token).catch((err) => console.error('[new-audit] ack failed', err)))
    after(() => kickAuditRunner(req.nextUrl.origin, job.id))
  }

  return NextResponse.json({ ok: true, audit_id: job.id, share_token: job.share_token, run_now })
}
