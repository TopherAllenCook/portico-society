/**
 * Website health checks. Hits production routes and verifies expected content.
 *
 * Base URL falls back to https://vervemd.com when NEXT_PUBLIC_SITE_URL is unset.
 */

import { fail, ok, warn, type CheckDef, type CheckResult } from './types'

const BASE = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ?? 'https://vervemd.com'
const TIMEOUT_MS = 8000

async function fetchHtml(path: string): Promise<{ status: number; ms: number; html: string }> {
  const url = BASE + path
  const start = Date.now()
  const ctrl = new AbortController()
  const t = setTimeout(() => ctrl.abort(), TIMEOUT_MS)
  try {
    const res = await fetch(url, { signal: ctrl.signal, redirect: 'follow', cache: 'no-store' })
    const html = await res.text()
    return { status: res.status, ms: Date.now() - start, html }
  } finally {
    clearTimeout(t)
  }
}

async function check200(key: string, label: string, path: string, mustInclude?: string): Promise<CheckResult> {
  try {
    const { status, ms, html } = await fetchHtml(path)
    if (status !== 200) {
      return fail(key, 'website', label, `${path} returned HTTP ${status}`, { path, status, ms })
    }
    if (mustInclude && !html.includes(mustInclude)) {
      return warn(key, 'website', label, `200 but missing expected content`, { path, status, ms, looking_for: mustInclude })
    }
    return ok(key, 'website', label, { path, status, ms })
  } catch (e) {
    return fail(key, 'website', label, e instanceof Error ? e.message : 'fetch failed', { path })
  }
}

export const websiteChecks: CheckDef[] = [
  {
    key: 'website.homepage_200',
    category: 'website',
    label: 'Homepage loads',
    intervalMinutes: 15,
    run: () => check200('website.homepage_200', 'Homepage loads', '/', 'VerveMD'),
  },
  {
    key: 'website.audit_form_200',
    category: 'website',
    label: 'Audit form route loads',
    intervalMinutes: 15,
    run: () => check200('website.audit_form_200', 'Audit form route loads', '/audit'),
  },
  {
    key: 'website.contact_200',
    category: 'website',
    label: 'Contact page loads',
    intervalMinutes: 60,
    run: () => check200('website.contact_200', 'Contact page loads', '/contact'),
  },
  {
    key: 'website.faq_200',
    category: 'website',
    label: 'FAQ page loads',
    intervalMinutes: 60,
    run: () => check200('website.faq_200', 'FAQ page loads', '/faq'),
  },
  {
    key: 'website.robots_txt',
    category: 'website',
    label: 'robots.txt valid',
    intervalMinutes: 60,
    run: async (): Promise<CheckResult> => {
      try {
        const { status, html } = await fetchHtml('/robots.txt')
        if (status !== 200) return fail('website.robots_txt', 'website', 'robots.txt valid', `HTTP ${status}`)
        if (!html.toLowerCase().includes('sitemap:')) {
          return warn('website.robots_txt', 'website', 'robots.txt valid', 'no Sitemap directive', { status })
        }
        return ok('website.robots_txt', 'website', 'robots.txt valid', { status })
      } catch (e) {
        return fail('website.robots_txt', 'website', 'robots.txt valid', e instanceof Error ? e.message : 'fetch failed')
      }
    },
  },
  {
    key: 'website.sitemap_xml',
    category: 'website',
    label: 'sitemap.xml valid',
    intervalMinutes: 60,
    run: async (): Promise<CheckResult> => {
      try {
        const { status, html } = await fetchHtml('/sitemap.xml')
        if (status !== 200) return fail('website.sitemap_xml', 'website', 'sitemap.xml valid', `HTTP ${status}`)
        const urlCount = (html.match(/<url>/g) ?? []).length
        if (urlCount === 0) return warn('website.sitemap_xml', 'website', 'sitemap.xml valid', '0 <url> entries', { status })
        return ok('website.sitemap_xml', 'website', 'sitemap.xml valid', { status, url_count: urlCount })
      } catch (e) {
        return fail('website.sitemap_xml', 'website', 'sitemap.xml valid', e instanceof Error ? e.message : 'fetch failed')
      }
    },
  },
  {
    key: 'website.ga4_tag',
    category: 'website',
    label: 'GA4 tag present on homepage',
    intervalMinutes: 60,
    run: async (): Promise<CheckResult> => {
      try {
        const { status, html } = await fetchHtml('/')
        if (status !== 200) return fail('website.ga4_tag', 'website', 'GA4 tag present on homepage', `homepage HTTP ${status}`)
        const expected = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? 'G-DRF89N1D8T'
        if (!html.includes(expected)) {
          return fail('website.ga4_tag', 'website', 'GA4 tag present on homepage', `GA4 id ${expected} not found`, { status })
        }
        return ok('website.ga4_tag', 'website', 'GA4 tag present on homepage', { status, ga4_id: expected })
      } catch (e) {
        return fail('website.ga4_tag', 'website', 'GA4 tag present on homepage', e instanceof Error ? e.message : 'fetch failed')
      }
    },
  },
]
