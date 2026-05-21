import { NextRequest, NextResponse } from 'next/server'
import { adminSupabase } from '@/lib/audit/supabase'

export const runtime = 'nodejs'
export const maxDuration = 60

/**
 * GET /api/cron/audit-recovery — drained by Vercel Cron every 10 minutes.
 *
 * The audit runner is fire-and-forget from /api/audit/submit. If the runner
 * kick fails (network blip, AUDIT_RUN_TOKEN missing, function timeout
 * before delivery) the job sits in `queued`/`running` forever and the lead
 * never gets the report. This cron re-kicks anything stuck.
 *
 * Re-kick rules:
 *   - status='queued' AND created_at older than 5 min
 *   - status='running' AND started_at older than 15 min
 *     (runner maxDuration is 300s; 15 min gives 3× headroom)
 *   - status='complete' AND delivered_at IS NULL AND email_delivery_failed_at
 *     present (Resend hiccup, key rotation, etc.) — just retry the delivery
 *     side-effect by re-kicking /api/audit/run, which is idempotent.
 *
 * Give-up rule: don't requeue jobs older than 6 hours. Past that, ops
 * needs to look at them manually via /admin.
 */
export async function GET(req: NextRequest) {
  const auth = req.headers.get('authorization')
  const expected = `Bearer ${process.env.CRON_SECRET ?? ''}`
  if (!process.env.CRON_SECRET || auth !== expected) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  const runToken = process.env.AUDIT_RUN_TOKEN
  if (!runToken) {
    console.error('[cron/audit-recovery] AUDIT_RUN_TOKEN missing — cannot kick runner')
    return NextResponse.json({ error: 'run_token_missing' }, { status: 500 })
  }

  const sb = adminSupabase()
  const now = Date.now()
  const fiveMinAgo = new Date(now - 5 * 60 * 1000).toISOString()
  const fifteenMinAgo = new Date(now - 15 * 60 * 1000).toISOString()
  const sixHoursAgo = new Date(now - 6 * 60 * 60 * 1000).toISOString()

  // queued past the 5-min window
  const { data: queued, error: qErr } = await sb
    .from('audit_jobs')
    .select('id, status, created_at, started_at')
    .eq('status', 'queued')
    .lt('created_at', fiveMinAgo)
    .gt('created_at', sixHoursAgo)
    .limit(25)

  // running past the 15-min window
  const { data: running, error: rErr } = await sb
    .from('audit_jobs')
    .select('id, status, created_at, started_at')
    .eq('status', 'running')
    .lt('started_at', fifteenMinAgo)
    .gt('created_at', sixHoursAgo)
    .limit(25)

  // completed but email never delivered (Resend hiccup)
  const { data: undelivered, error: uErr } = await sb
    .from('audit_jobs')
    .select('id, status, created_at, started_at')
    .eq('status', 'complete')
    .is('delivered_at', null)
    .not('email_delivery_failed_at', 'is', null)
    .gt('created_at', sixHoursAgo)
    .limit(25)

  if (qErr || rErr || uErr) {
    console.error('[cron/audit-recovery] query failure', { qErr, rErr, uErr })
    return NextResponse.json({ error: 'query_failed' }, { status: 500 })
  }

  const stuck = [...(queued ?? []), ...(running ?? []), ...(undelivered ?? [])]
  const runUrl = new URL('/api/audit/run', req.nextUrl.origin)

  const results = await Promise.allSettled(stuck.map(async (job) => {
    const res = await fetch(runUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-audit-run-token': runToken },
      body: JSON.stringify({ audit_id: job.id }),
    })
    return { id: job.id, status: res.status, prior: job.status }
  }))

  const requeued: Array<{ id: string; prior: string }> = []
  const failed: Array<{ id: string; error: string }> = []
  for (let i = 0; i < results.length; i++) {
    const r = results[i]
    const job = stuck[i]
    if (r.status === 'fulfilled' && r.value.status >= 200 && r.value.status < 500) {
      requeued.push({ id: job.id, prior: job.status })
    } else {
      const err = r.status === 'rejected' ? String(r.reason) : `HTTP ${r.value.status}`
      failed.push({ id: job.id, error: err })
      console.error('[cron/audit-recovery] requeue failed', { jobId: job.id, err })
    }
  }

  return NextResponse.json({
    ok: true,
    scanned: stuck.length,
    requeued: requeued.length,
    failed: failed.length,
    requeued_jobs: requeued,
    failed_jobs: failed,
  })
}

export async function POST(req: NextRequest) {
  return GET(req)
}
