import { NextRequest, NextResponse } from 'next/server'
import { adminSupabase } from '@/lib/audit/supabase'
import { ScrapeRequestSchema } from '@/lib/outbound/types'
import { leadsCreatedToday } from '@/lib/outbound/orchestrate'

export const runtime = 'nodejs'

/**
 * POST /api/outbound/scrape
 * Auth: admin session (gates via admin layout for the UI form) OR
 *       x-outbound-trigger-token header for headless trigger (cron/cli).
 *
 * Body: { city, state, specialty?, max_results? }
 *
 * Validates input, enforces the 100-leads-per-day cap (globally, across all
 * jobs), creates an outbound_scrape_jobs row, fires-and-forgets the runner.
 *
 * Returns: { ok, job_id }
 */
export async function POST(req: NextRequest) {
  // Auth: header token OR admin cookie
  const triggerToken = req.headers.get('x-outbound-trigger-token')
  const hasToken = triggerToken && process.env.OUTBOUND_TRIGGER_TOKEN && triggerToken === process.env.OUTBOUND_TRIGGER_TOKEN
  if (!hasToken) {
    const { isAdmin } = await import('@/lib/admin/auth')
    if (!(await isAdmin())) {
      return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
    }
  }

  const body = await req.json().catch(() => null)
  if (!body) return NextResponse.json({ error: 'invalid_json' }, { status: 400 })

  const parsed = ScrapeRequestSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'validation_failed', issues: parsed.error.flatten() }, { status: 400 })
  }
  const req_ = parsed.data

  // Enforce the daily cap globally
  const usedToday = await leadsCreatedToday()
  const DAILY_CAP = Number(process.env.OUTBOUND_DAILY_CAP ?? 100)
  const remaining = Math.max(0, DAILY_CAP - usedToday)
  if (remaining <= 0) {
    return NextResponse.json(
      { error: 'daily_cap_reached', daily_cap: DAILY_CAP, used_today: usedToday },
      { status: 429 },
    )
  }
  const effectiveCap = Math.min(req_.max_results, remaining)

  const sb = adminSupabase()
  const { data, error } = await sb
    .from('outbound_scrape_jobs')
    .insert({
      city: req_.city,
      state: req_.state,
      specialty: req_.specialty ?? null,
      max_results: effectiveCap,
      source: req_.source,
    })
    .select('id')
    .single()

  if (error || !data) {
    console.error('[outbound/scrape] insert failed', error)
    return NextResponse.json({ error: 'submit_failed' }, { status: 500 })
  }

  // Fire-and-forget the runner.
  const runUrl = new URL('/api/outbound/run', req.nextUrl.origin)
  const token = process.env.OUTBOUND_RUN_TOKEN
  if (token) {
    fetch(runUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-outbound-run-token': token },
      body: JSON.stringify({ job_id: data.id }),
    }).catch((err) => console.error('[outbound/scrape] runner kick failed', err))
  } else {
    console.warn('[outbound/scrape] OUTBOUND_RUN_TOKEN not set — job created but runner not kicked')
  }

  return NextResponse.json({
    ok: true,
    job_id: data.id,
    effective_cap: effectiveCap,
    requested_cap: req_.max_results,
    used_today_before: usedToday,
  })
}
