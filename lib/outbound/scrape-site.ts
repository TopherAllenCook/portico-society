import { auditLeadgenFromHtml } from '@/lib/audit/leadgen'
import type { TechStack, MarketingSignals, WebsiteEnrichment } from './types'

/**
 * Fetches the clinic website via Firecrawl and extracts:
 *   - tech stack (booking widget, chat widget, CMS, analytics)
 *   - marketing signals (forms, CTAs, schema, blog, pixels)
 *   - owner / team names (cheap regex pass over About / Team / Meet pages)
 *
 * Reuses the regex logic in lib/audit/leadgen.ts so detection stays consistent
 * between inbound audits and outbound scoring.
 */

export async function scrapeSite(websiteUrl: string): Promise<WebsiteEnrichment> {
  const html = await fetchHtml(websiteUrl)

  // Reuse the audit's leadgen detector for the heavy lifting.
  const leadgen = auditLeadgenFromHtml(websiteUrl, html)

  const techStack: TechStack = {
    booking_widget: leadgen.booking_widget,
    chat_widget: leadgen.chat_widget,
    cms: detectCms(html),
    analytics: detectAnalytics(html),
  }

  const marketingSignals: MarketingSignals = {
    has_contact_form: leadgen.forms_found > 0,
    cta_above_fold: leadgen.cta_above_fold,
    primary_cta_text: leadgen.primary_cta_text,
    has_blog: /\/blog\b|\/articles\b|\/news\b/i.test(html),
    has_schema: /application\/ld\+json/i.test(html),
    meta_pixel_present: leadgen.meta_pixel_present,
    phone_clickable: leadgen.phone_clickable,
  }

  const ownerNames = extractOwnerNames(html)
  const description = extractMetaDescription(html)

  return {
    tech_stack: techStack,
    marketing_signals: marketingSignals,
    owner_names: ownerNames,
    description,
  }
}

/* ─── Internal ──────────────────────────────────────────────────────────── */

async function fetchHtml(url: string): Promise<string> {
  const apiKey = process.env.FIRECRAWL_API_KEY
  // Prefer Firecrawl (handles JS-rendered SPAs); fall back to direct fetch.
  if (apiKey) {
    try {
      const res = await fetch('https://api.firecrawl.dev/v1/scrape', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url,
          formats: ['html'],
          onlyMainContent: false,
          waitFor: 1500,
        }),
      })
      if (res.ok) {
        const json = (await res.json()) as { data?: { html?: string } }
        const html = json?.data?.html
        if (html && html.length > 200) return html
      }
    } catch {
      // fall through to direct fetch
    }
  }

  const res = await fetch(url, {
    headers: {
      'user-agent': 'Mozilla/5.0 (compatible; VerveMD-Outbound/1.0; +https://vervemd.com)',
      'accept': 'text/html,application/xhtml+xml',
    },
    redirect: 'follow',
  })
  if (!res.ok) throw new Error(`fetch ${url} → ${res.status}`)
  return await res.text()
}

function detectCms(html: string): string | null {
  const lower = html.toLowerCase()
  if (lower.includes('wp-content/') || lower.includes('wp-includes/') || lower.includes('wordpress')) return 'wordpress'
  if (lower.includes('webflow.com') || lower.includes('w-webflow')) return 'webflow'
  if (lower.includes('squarespace') || lower.includes('static1.squarespace')) return 'squarespace'
  if (lower.includes('wix.com') || lower.includes('static.wixstatic')) return 'wix'
  if (lower.includes('cdn.shopify.com') || lower.includes('shopify')) return 'shopify'
  if (lower.includes('framer.com') || lower.includes('framerusercontent')) return 'framer'
  if (lower.includes('cdn.gohighlevel.com') || lower.includes('msgsndr.com')) return 'gohighlevel'
  return null
}

function detectAnalytics(html: string): string[] {
  const found: string[] = []
  const lower = html.toLowerCase()
  if (/gtag\(['"]config['"],\s*['"]g-/i.test(html) || /googletagmanager\.com\/gtag/.test(html)) found.push('ga4')
  if (/googletagmanager\.com\/gtm/i.test(html)) found.push('gtm')
  if (/connect\.facebook\.net\/.+\/fbevents\.js/i.test(html) || /fbq\(['"]init['"]/i.test(html)) found.push('meta_pixel')
  if (/static\.hotjar\.com/i.test(html) || /hotjar\.com\/c\//i.test(html)) found.push('hotjar')
  if (/clarity\.ms/i.test(html)) found.push('clarity')
  if (lower.includes('plausible.io')) found.push('plausible')
  if (lower.includes('mixpanel.com')) found.push('mixpanel')
  return found
}

/**
 * Pull plausible owner / team names off the homepage. Cheap signal:
 * any "Dr. First Last" or "First Last, MD" pattern within or near sections
 * tagged team / about / meet / leadership / providers.
 */
function extractOwnerNames(html: string): string[] {
  const names = new Set<string>()
  // Constrain the search window to about/team/meet/leadership sections if any.
  const sectionMatches = html.match(
    /<section[^>]*(?:about|team|meet|leadership|provider|doctor|founder)[^>]*>([\s\S]{0,8000})<\/section>/gi,
  )
  const searchSpace = sectionMatches ? sectionMatches.join('\n') : html.slice(0, 20000)

  const drPattern = /\bDr\.?\s+([A-Z][a-z]+(?:\s+[A-Z]\.)?\s+[A-Z][a-z]+)\b/g
  const credPattern = /\b([A-Z][a-z]+(?:\s+[A-Z]\.)?\s+[A-Z][a-z]+),?\s+(?:MD|DO|NP|PA-C|RN|DNP|FACP)\b/g

  let m: RegExpExecArray | null
  while ((m = drPattern.exec(searchSpace)) !== null) names.add(m[1])
  while ((m = credPattern.exec(searchSpace)) !== null) names.add(m[1])

  return Array.from(names).slice(0, 8)
}

function extractMetaDescription(html: string): string | null {
  const m = html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i)
    ?? html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+name=["']description["']/i)
  return m ? m[1].slice(0, 500) : null
}
