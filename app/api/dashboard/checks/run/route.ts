import { NextRequest, NextResponse } from 'next/server'
import { isAdmin } from '@/lib/admin/auth'
import { runAllChecks } from '@/lib/dashboard/checks'

export const runtime = 'nodejs'
export const maxDuration = 60

/**
 * POST /api/dashboard/checks/run
 *
 * Runs every registered check and upserts results into `health_checks`.
 * Allowed callers:
 *   - admin session (the "Run now" button on /admin/dashboard)
 *   - Vercel cron via Authorization: Bearer ${CRON_SECRET}
 */
export async function POST(req: NextRequest) {
  const auth = req.headers.get('authorization')
  const cronToken = `Bearer ${process.env.CRON_SECRET ?? ''}`
  const isCron = process.env.CRON_SECRET && auth === cronToken
  const isAdminCall = !isCron && (await isAdmin())
  if (!isCron && !isAdminCall) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  const summary = await runAllChecks()
  return NextResponse.json({
    success: true,
    ok_count: summary.ok,
    warn: summary.warn,
    fail: summary.fail,
    total: summary.total,
    sampled: summary.results.slice(0, 3),
  })
}
