/**
 * Cron + workflow health checks.
 *
 * These query Supabase for evidence that crons recently fired and surface
 * stuck/failed jobs that would otherwise rot silently.
 */

import { fail, ok, warn, type CheckDef, type CheckResult } from './types'

export const cronChecks: CheckDef[] = [
  {
    key: 'cron.no_stuck_audits',
    category: 'cron',
    label: 'No audit jobs stuck >30 min',
    intervalMinutes: 15,
    run: async (): Promise<CheckResult> => {
      try {
        const { adminSupabase } = await import('@/lib/audit/supabase')
        const sb = adminSupabase()
        const { data, error } = await sb
          .from('audit_jobs')
          .select('id, status, started_at, created_at')
          .in('status', ['queued', 'running'])
        if (error) return warn('cron.no_stuck_audits', 'cron', 'No audit jobs stuck >30 min', error.message)
        const now = Date.now()
        const stuck = (data ?? []).filter(j => {
          const ref = j.started_at ?? j.created_at
          return (now - new Date(ref).getTime()) / 60000 >= 30
        })
        if (stuck.length === 0) return ok('cron.no_stuck_audits', 'cron', 'No audit jobs stuck >30 min', { stuck: 0 })
        return fail('cron.no_stuck_audits', 'cron', 'No audit jobs stuck >30 min', `${stuck.length} stuck`, {
          stuck: stuck.length,
          ids: stuck.slice(0, 5).map(j => j.id),
        })
      } catch (e) {
        return fail('cron.no_stuck_audits', 'cron', 'No audit jobs stuck >30 min', e instanceof Error ? e.message : 'unknown')
      }
    },
  },
  {
    key: 'cron.no_failed_followups_24h',
    category: 'cron',
    label: 'No failed audit followups (24h)',
    intervalMinutes: 30,
    run: async (): Promise<CheckResult> => {
      try {
        const { adminSupabase } = await import('@/lib/audit/supabase')
        const sb = adminSupabase()
        const since = new Date(Date.now() - 24 * 3600 * 1000).toISOString()
        const { count, error } = await sb
          .from('audit_followups')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'failed')
          .gte('scheduled_for', since)
        if (error) return warn('cron.no_failed_followups_24h', 'cron', 'No failed audit followups (24h)', error.message)
        if ((count ?? 0) > 0) return fail('cron.no_failed_followups_24h', 'cron', 'No failed audit followups (24h)', `${count} failed`, { count })
        return ok('cron.no_failed_followups_24h', 'cron', 'No failed audit followups (24h)', { count: 0 })
      } catch (e) {
        return fail('cron.no_failed_followups_24h', 'cron', 'No failed audit followups (24h)', e instanceof Error ? e.message : 'unknown')
      }
    },
  },
  {
    key: 'cron.audit_pipeline_throughput',
    category: 'cron',
    label: 'Audit pipeline ran in last 7d',
    intervalMinutes: 60,
    run: async (): Promise<CheckResult> => {
      try {
        const { adminSupabase } = await import('@/lib/audit/supabase')
        const sb = adminSupabase()
        const since = new Date(Date.now() - 7 * 24 * 3600 * 1000).toISOString()
        const { count, error } = await sb
          .from('audit_jobs')
          .select('*', { count: 'exact', head: true })
          .gte('created_at', since)
        if (error) return warn('cron.audit_pipeline_throughput', 'cron', 'Audit pipeline ran in last 7d', error.message)
        if ((count ?? 0) === 0) return warn('cron.audit_pipeline_throughput', 'cron', 'Audit pipeline ran in last 7d', '0 audits in last 7d')
        return ok('cron.audit_pipeline_throughput', 'cron', 'Audit pipeline ran in last 7d', { jobs_7d: count })
      } catch (e) {
        return fail('cron.audit_pipeline_throughput', 'cron', 'Audit pipeline ran in last 7d', e instanceof Error ? e.message : 'unknown')
      }
    },
  },
  {
    key: 'cron.outbound_scrape_health',
    category: 'cron',
    label: 'No outbound scrape jobs stuck or failed (24h)',
    intervalMinutes: 30,
    run: async (): Promise<CheckResult> => {
      try {
        const { adminSupabase } = await import('@/lib/audit/supabase')
        const sb = adminSupabase()
        const since = new Date(Date.now() - 24 * 3600 * 1000).toISOString()
        const { data, error } = await sb
          .from('outbound_scrape_jobs')
          .select('id, status, created_at')
          .gte('created_at', since)
        if (error) return warn('cron.outbound_scrape_health', 'cron', 'No outbound scrape jobs stuck or failed (24h)', error.message)
        const now = Date.now()
        const failed = (data ?? []).filter(j => j.status === 'failed')
        const stuck = (data ?? []).filter(
          j => ['queued', 'running'].includes(j.status) && (now - new Date(j.created_at).getTime()) / 60000 >= 60,
        )
        if (failed.length || stuck.length) {
          return fail('cron.outbound_scrape_health', 'cron', 'No outbound scrape jobs stuck or failed (24h)',
            `${failed.length} failed, ${stuck.length} stuck >60min`,
            { failed: failed.length, stuck: stuck.length, ids: [...failed, ...stuck].slice(0, 5).map(j => j.id) })
        }
        return ok('cron.outbound_scrape_health', 'cron', 'No outbound scrape jobs stuck or failed (24h)', { jobs_24h: data?.length ?? 0 })
      } catch (e) {
        return fail('cron.outbound_scrape_health', 'cron', 'No outbound scrape jobs stuck or failed (24h)', e instanceof Error ? e.message : 'unknown')
      }
    },
  },
  {
    key: 'cron.outbound_lead_flow',
    category: 'cron',
    label: 'Scraper produced leads in last 7d',
    intervalMinutes: 60,
    run: async (): Promise<CheckResult> => {
      try {
        const { adminSupabase } = await import('@/lib/audit/supabase')
        const sb = adminSupabase()
        const since = new Date(Date.now() - 7 * 24 * 3600 * 1000).toISOString()
        const { count, error } = await sb
          .from('outbound_leads')
          .select('id', { count: 'exact', head: true })
          .gte('created_at', since)
        if (error) return warn('cron.outbound_lead_flow', 'cron', 'Scraper produced leads in last 7d', error.message)
        // Warn, not fail: scraping is bursty and an idle week can be a choice.
        // The point is that silence is now visible instead of invisible.
        if (!count) return warn('cron.outbound_lead_flow', 'cron', 'Scraper produced leads in last 7d', '0 leads in 7 days')
        return ok('cron.outbound_lead_flow', 'cron', 'Scraper produced leads in last 7d', { leads_7d: count })
      } catch (e) {
        return fail('cron.outbound_lead_flow', 'cron', 'Scraper produced leads in last 7d', e instanceof Error ? e.message : 'unknown')
      }
    },
  },
  {
    key: 'cron.outbound_auto_audit_throughput',
    category: 'cron',
    label: 'Scraper → audit bridge throughput (24h)',
    intervalMinutes: 30,
    run: async (): Promise<CheckResult> => {
      try {
        const { adminSupabase } = await import('@/lib/audit/supabase')
        const sb = adminSupabase()
        const since = new Date(Date.now() - 24 * 3600 * 1000).toISOString()

        // Count leads scraped in last 24h
        const { count: scrapedCount, error: scrapeErr } = await sb
          .from('outbound_leads')
          .select('id', { count: 'exact', head: true })
          .gte('scored_at', since)
        if (scrapeErr) return warn('cron.outbound_auto_audit_throughput', 'cron', 'Scraper → audit bridge throughput (24h)', scrapeErr.message)

        // Count auto-audits triggered (created)
        const { count: autoCreated, error: createdErr } = await sb
          .from('outbound_leads')
          .select('id', { count: 'exact', head: true })
          .gte('scored_at', since)
          .eq('auto_audit_status', 'created')
        if (createdErr) return warn('cron.outbound_auto_audit_throughput', 'cron', 'Scraper → audit bridge throughput (24h)', createdErr.message)

        // Count auto-audit failures
        const { count: autoFailed, error: failedErr } = await sb
          .from('outbound_leads')
          .select('id', { count: 'exact', head: true })
          .gte('scored_at', since)
          .eq('auto_audit_status', 'failed')
        if (failedErr) return warn('cron.outbound_auto_audit_throughput', 'cron', 'Scraper → audit bridge throughput (24h)', failedErr.message)

        const value = {
          leads_scored_24h: scrapedCount ?? 0,
          auto_audits_created_24h: autoCreated ?? 0,
          auto_audits_failed_24h: autoFailed ?? 0,
        }

        if ((autoFailed ?? 0) > 0) {
          return warn('cron.outbound_auto_audit_throughput', 'cron', 'Scraper → audit bridge throughput (24h)',
            `${autoFailed} auto-audit failures`, value)
        }

        return ok('cron.outbound_auto_audit_throughput', 'cron', 'Scraper → audit bridge throughput (24h)', value)
      } catch (e) {
        return fail('cron.outbound_auto_audit_throughput', 'cron', 'Scraper → audit bridge throughput (24h)', e instanceof Error ? e.message : 'unknown')
      }
    },
  },
  {
    key: 'cron.checks_self',
    category: 'cron',
    label: 'Ops check sweep ran in last 30 min',
    intervalMinutes: 15,
    run: async (): Promise<CheckResult> => {
      try {
        const { adminSupabase } = await import('@/lib/audit/supabase')
        const sb = adminSupabase()
        const { data, error } = await sb
          .from('health_checks')
          .select('checked_at')
          .neq('key', 'cron.checks_self')
          .order('checked_at', { ascending: false })
          .limit(1)
        if (error) return warn('cron.checks_self', 'cron', 'Ops check sweep ran in last 30 min', error.message)
        const latest = data?.[0]?.checked_at
        if (!latest) return warn('cron.checks_self', 'cron', 'Ops check sweep ran in last 30 min', 'no prior sweep recorded')
        const ageMin = (Date.now() - new Date(latest).getTime()) / 60000
        if (ageMin > 30) return fail('cron.checks_self', 'cron', 'Ops check sweep ran in last 30 min', `last sweep ${Math.round(ageMin)} min ago`)
        return ok('cron.checks_self', 'cron', 'Ops check sweep ran in last 30 min', { last_sweep_min_ago: Math.round(ageMin) })
      } catch (e) {
        return fail('cron.checks_self', 'cron', 'Ops check sweep ran in last 30 min', e instanceof Error ? e.message : 'unknown')
      }
    },
  },
]
