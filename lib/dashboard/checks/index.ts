/**
 * Check registry + runner.
 *
 * Each check is a CheckDef. The runner calls every check in parallel,
 * upserts the result into `health_checks`. Categories: website, email, cron.
 * Manual recurring tasks live in `checklist_items` (not handled here).
 */

import { adminSupabase } from '@/lib/audit/supabase'
import type { CheckDef, CheckResult } from './types'
import { websiteChecks } from './website'
import { emailChecks } from './email'
import { cronChecks } from './cron'

export const allChecks: CheckDef[] = [...websiteChecks, ...emailChecks, ...cronChecks]

export async function runAllChecks(): Promise<{ ok: number; warn: number; fail: number; total: number; results: CheckResult[] }> {
  const settled = await Promise.allSettled(allChecks.map(c => c.run()))
  const results: CheckResult[] = []
  for (let i = 0; i < settled.length; i++) {
    const s = settled[i]
    if (s.status === 'fulfilled') {
      results.push(s.value)
    } else {
      const def = allChecks[i]
      results.push({
        key: def.key,
        category: def.category,
        label: def.label,
        status: 'fail',
        error: s.reason instanceof Error ? s.reason.message : 'unknown',
      })
    }
  }

  await upsertResults(results)

  const counts = results.reduce(
    (acc, r) => ({ ...acc, [r.status]: acc[r.status] + 1 }),
    { ok: 0, warn: 0, fail: 0 }
  )
  return { ...counts, total: results.length, results }
}

async function upsertResults(results: CheckResult[]) {
  if (results.length === 0) return
  const sb = adminSupabase()
  const now = new Date().toISOString()

  const rows = results.map(r => {
    const def = allChecks.find(d => d.key === r.key)
    const nextDue = def ? new Date(Date.now() + def.intervalMinutes * 60000).toISOString() : null
    return {
      key: r.key,
      category: r.category,
      label: r.label,
      status: r.status,
      value: r.value ?? {},
      last_error: r.error ?? null,
      checked_at: now,
      next_check_due: nextDue,
      updated_at: now,
    }
  })

  const { error } = await sb.from('health_checks').upsert(rows, { onConflict: 'key' })
  if (error) console.error('[checks] upsert failed:', error.message)
}
