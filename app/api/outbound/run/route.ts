import { NextRequest, NextResponse } from 'next/server'
import { runScrape } from '@/lib/outbound/orchestrate'

export const runtime = 'nodejs'
export const maxDuration = 300 // Vercel Pro: 5min ceiling; Hobby caps at 60s.
// For 100-lead jobs this is often not enough — see lib/outbound/orchestrate.ts
// header comment for the recommended path to move this to Trigger.dev/Inngest.

/**
 * POST /api/outbound/run
 * Body: { job_id }
 * Auth: x-outbound-run-token header must match OUTBOUND_RUN_TOKEN env.
 */
export async function POST(req: NextRequest) {
  const token = req.headers.get('x-outbound-run-token')
  if (!process.env.OUTBOUND_RUN_TOKEN || token !== process.env.OUTBOUND_RUN_TOKEN) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }
  const body = await req.json().catch(() => null) as { job_id?: string } | null
  if (!body?.job_id) return NextResponse.json({ error: 'job_id required' }, { status: 400 })

  try {
    await runScrape(body.job_id)
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[outbound/run] failure', err)
    return NextResponse.json({ error: 'run_failed', message: (err as Error).message }, { status: 500 })
  }
}
