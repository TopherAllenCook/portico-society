/**
 * Email pipeline health checks. DNS lookups + Resend domain status.
 *
 * DNS expectations:
 *   - vervemd.com TXT contains "v=spf1" with "include:_spf.mx.cloudflare.net" (CF Email Routing)
 *     and "include:amazonses.com" or "include:resend" (Resend outbound on send.vervemd.com).
 *   - send._domainkey.vervemd.com or resend._domainkey.send.vervemd.com TXT contains DKIM key
 *   - _dmarc.vervemd.com TXT starts with "v=DMARC1"
 */

import dns from 'node:dns/promises'
import { fail, ok, warn, type CheckDef, type CheckResult } from './types'

const DNS_TIMEOUT_MS = 5000

async function resolveTxtWithTimeout(host: string): Promise<string[][]> {
  const ctrl = new AbortController()
  const timeout = new Promise<never>((_, reject) => {
    const t = setTimeout(() => {
      ctrl.abort()
      reject(new Error(`DNS timeout for ${host}`))
    }, DNS_TIMEOUT_MS)
    ctrl.signal.addEventListener('abort', () => clearTimeout(t))
  })
  return Promise.race([dns.resolveTxt(host), timeout])
}

export const emailChecks: CheckDef[] = [
  {
    key: 'email.spf',
    category: 'email',
    label: 'SPF record at vervemd.com',
    intervalMinutes: 60,
    run: async (): Promise<CheckResult> => {
      try {
        const records = await resolveTxtWithTimeout('vervemd.com')
        const flat = records.map(r => r.join(''))
        const spf = flat.find(r => r.startsWith('v=spf1'))
        if (!spf) return fail('email.spf', 'email', 'SPF record at vervemd.com', 'no v=spf1 record found')
        return ok('email.spf', 'email', 'SPF record at vervemd.com', { record: spf })
      } catch (e) {
        return fail('email.spf', 'email', 'SPF record at vervemd.com', e instanceof Error ? e.message : 'dns lookup failed')
      }
    },
  },
  {
    key: 'email.dmarc',
    category: 'email',
    label: 'DMARC record at _dmarc.vervemd.com',
    intervalMinutes: 60,
    run: async (): Promise<CheckResult> => {
      try {
        const records = await resolveTxtWithTimeout('_dmarc.vervemd.com')
        const flat = records.map(r => r.join(''))
        const dmarc = flat.find(r => r.startsWith('v=DMARC1'))
        if (!dmarc) return fail('email.dmarc', 'email', 'DMARC record at _dmarc.vervemd.com', 'no v=DMARC1 record found')
        return ok('email.dmarc', 'email', 'DMARC record at _dmarc.vervemd.com', { record: dmarc })
      } catch (e) {
        return fail('email.dmarc', 'email', 'DMARC record at _dmarc.vervemd.com', e instanceof Error ? e.message : 'dns lookup failed')
      }
    },
  },
  {
    key: 'email.dkim_send',
    category: 'email',
    label: 'DKIM key on send.vervemd.com',
    intervalMinutes: 60,
    run: async (): Promise<CheckResult> => {
      const candidates = ['resend._domainkey.send.vervemd.com', 'send._domainkey.vervemd.com']
      for (const host of candidates) {
        try {
          const records = await resolveTxtWithTimeout(host)
          const flat = records.map(r => r.join(''))
          const dkim = flat.find(r => r.includes('k=rsa') || r.includes('p='))
          if (dkim) return ok('email.dkim_send', 'email', 'DKIM key on send.vervemd.com', { host, length: dkim.length })
        } catch {
          // try next candidate
        }
      }
      return fail('email.dkim_send', 'email', 'DKIM key on send.vervemd.com', 'no DKIM TXT found at known selectors')
    },
  },
  {
    key: 'email.recent_audit_delivery',
    category: 'email',
    label: 'An audit email delivered in last 48h',
    intervalMinutes: 30,
    run: async (): Promise<CheckResult> => {
      try {
        const { adminSupabase } = await import('@/lib/audit/supabase')
        const sb = adminSupabase()
        const since = new Date(Date.now() - 48 * 3600 * 1000).toISOString()
        const { count, error } = await sb
          .from('audit_jobs')
          .select('*', { count: 'exact', head: true })
          .gte('delivered_at', since)
        if (error) return warn('email.recent_audit_delivery', 'email', 'An audit email delivered in last 48h', error.message)
        if ((count ?? 0) === 0) return warn('email.recent_audit_delivery', 'email', 'An audit email delivered in last 48h', '0 deliveries in last 48h')
        return ok('email.recent_audit_delivery', 'email', 'An audit email delivered in last 48h', { delivered_count_48h: count })
      } catch (e) {
        return fail('email.recent_audit_delivery', 'email', 'An audit email delivered in last 48h', e instanceof Error ? e.message : 'unknown')
      }
    },
  },
  {
    key: 'email.no_bounce_spike',
    category: 'email',
    label: 'Bounce rate under 5% (last 7d)',
    intervalMinutes: 60,
    run: async (): Promise<CheckResult> => {
      try {
        const { adminSupabase } = await import('@/lib/audit/supabase')
        const sb = adminSupabase()
        const since = new Date(Date.now() - 7 * 24 * 3600 * 1000).toISOString()
        const { data, error } = await sb
          .from('audit_email_events')
          .select('event_type')
          .gte('created_at', since)
        if (error) return warn('email.no_bounce_spike', 'email', 'Bounce rate under 5% (last 7d)', error.message)
        const events = data ?? []
        const sent = events.filter(e => e.event_type === 'sent' || e.event_type === 'delivered').length
        const bounced = events.filter(e => e.event_type === 'bounced').length
        if (sent === 0) return warn('email.no_bounce_spike', 'email', 'Bounce rate under 5% (last 7d)', 'no sends in last 7d')
        const rate = bounced / sent
        if (rate >= 0.05) return fail('email.no_bounce_spike', 'email', 'Bounce rate under 5% (last 7d)', `bounce rate ${(rate * 100).toFixed(1)}%`, { sent, bounced })
        return ok('email.no_bounce_spike', 'email', 'Bounce rate under 5% (last 7d)', { sent, bounced, rate_pct: +(rate * 100).toFixed(2) })
      } catch (e) {
        return fail('email.no_bounce_spike', 'email', 'Bounce rate under 5% (last 7d)', e instanceof Error ? e.message : 'unknown')
      }
    },
  },
]
