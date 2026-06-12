import { NextRequest, NextResponse } from 'next/server'
import { runAllChecks } from '@/lib/dashboard/checks'

export const runtime = 'nodejs'
export const maxDuration = 60

/**
 * GET /api/cron/dashboard-checks
 *
 * Vercel Cron entry point. Bearer-gated by CRON_SECRET. Runs the full check
 * sweep and writes results to `health_checks`. Schedule: every 15 minutes
 * (see vercel.json).
 */
export async function GET(req: NextRequest) {
  const auth = req.headers.get('authorization')
  const expected = `Bearer ${process.env.CRON_SECRET ?? ''}`
  if (!process.env.CRON_SECRET || auth !== expected) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }
  const summary = await runAllChecks()
  return NextResponse.json({ ok: true, ok_count: summary.ok, warn: summary.warn, fail: summary.fail, total: summary.total })
}
