import { NextRequest, NextResponse } from 'next/server'
import { processDueNurture } from '@/lib/audit/nurture'

export const runtime = 'nodejs'
export const maxDuration = 60

/**
 * GET /api/cron/nurture — drained by Vercel Cron.
 *
 * Vercel sends `Authorization: Bearer ${CRON_SECRET}` automatically when the
 * secret is set in env. We also accept an explicit token via header for manual runs.
 */
export async function GET(req: NextRequest) {
  const auth = req.headers.get('authorization')
  const expected = `Bearer ${process.env.CRON_SECRET ?? ''}`
  if (!process.env.CRON_SECRET || auth !== expected) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }
  try {
    const result = await processDueNurture()
    return NextResponse.json({ ok: true, ...result })
  } catch (err) {
    console.error('[cron/nurture] failed', err)
    return NextResponse.json({ error: 'cron_failed', message: (err as Error).message }, { status: 500 })
  }
}

// Allow manual POST trigger from admin actions.
export async function POST(req: NextRequest) {
  return GET(req)
}
