/**
 * Shared types for the ops dashboard check framework.
 *
 * Each check is a function that returns a CheckResult. The runner calls every
 * check in parallel, upserts results into `health_checks` keyed by `key`.
 * The dashboard reads cached results.
 */

export type CheckStatus = 'ok' | 'warn' | 'fail'
export type CheckCategory = 'website' | 'email' | 'cron'

export interface CheckResult {
  key: string
  category: CheckCategory
  label: string
  status: CheckStatus
  value?: Record<string, unknown>
  error?: string
}

export interface CheckDef {
  key: string
  category: CheckCategory
  label: string
  intervalMinutes: number
  run: () => Promise<CheckResult>
}

export function ok(
  key: string,
  category: CheckCategory,
  label: string,
  value?: Record<string, unknown>
): CheckResult {
  return { key, category, label, status: 'ok', value }
}

export function warn(
  key: string,
  category: CheckCategory,
  label: string,
  error: string,
  value?: Record<string, unknown>
): CheckResult {
  return { key, category, label, status: 'warn', error, value }
}

export function fail(
  key: string,
  category: CheckCategory,
  label: string,
  error: string,
  value?: Record<string, unknown>
): CheckResult {
  return { key, category, label, status: 'fail', error, value }
}
