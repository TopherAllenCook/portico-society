import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { SpecialtySchema } from '@/lib/audit/types'
import { runNameCheck } from '@/lib/audit/name-check'
import { checkHoneypot } from '@/lib/security/honeypot'
import { rateLimit, clientIp } from '@/lib/security/ratelimit'

export const runtime = 'nodejs'
export const maxDuration = 60

/**
 * POST /api/name-check/run
 *
 * The free, no-email Name Check bait. Queries the enabled answer engines for
 * "best {trade} in {city}" and returns whether the business is named plus the
 * businesses that come up instead. Calls paid LLM APIs, so it is rate-limited
 * and honeypot-guarded like the other public forms. Deliberately stateless: no
 * lead is captured here, which is what lets the page promise "no email to run
 * it." Capture happens downstream at /audit.
 */
const RunSchema = z.object({
  business: z.string().min(1).max(200),
  city: z.string().min(2).max(120),
  trade: SpecialtySchema,
})

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null)
  if (!body) return NextResponse.json({ error: 'invalid_json' }, { status: 400 })

  // Bot trap: refuse before burning a paid API call.
  if (checkHoneypot(body)) return NextResponse.json({ error: 'invalid' }, { status: 400 })

  const limit = rateLimit(`namecheck:${clientIp(req)}`, { limit: 6, windowMs: 10 * 60_000 })
  if (!limit.ok) {
    return NextResponse.json(
      { error: 'rate_limited' },
      { status: 429, headers: { 'Retry-After': String(limit.retryAfterSec) } },
    )
  }

  const parsed = RunSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'validation_failed', issues: parsed.error.flatten() }, { status: 400 })
  }

  try {
    const result = await runNameCheck(parsed.data)
    return NextResponse.json({ ok: true, result })
  } catch (err) {
    console.error('[name-check/run] failed', err)
    return NextResponse.json({ error: 'engine_unavailable' }, { status: 503 })
  }
}
