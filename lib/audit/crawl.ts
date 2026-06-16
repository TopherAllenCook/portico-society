import type { CrawlPagePayload, CrawlPayload, SchemaPayload, Specialty } from './types'

/**
 * Firecrawl /v1/scrape and /v1/map. We use map() to discover pages, then scrape()
 * the top N pages for content. Each call has its own cost; cap pages to keep
 * each audit under ~$0.10 of Firecrawl spend.
 *
 * Env: FIRECRAWL_API_KEY
 */
const FIRECRAWL = 'https://api.firecrawl.dev/v1'
const MAX_PAGES = 12

function fcKey() {
  const k = process.env.FIRECRAWL_API_KEY
  if (!k) throw new Error('FIRECRAWL_API_KEY missing')
  return k
}

async function fcPost<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${FIRECRAWL}${path}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${fcKey()}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (!res.ok) throw new Error(`Firecrawl ${path} ${res.status}: ${await res.text()}`)
  return res.json() as Promise<T>
}

interface MapResponse { success: boolean; links: string[] }
interface ScrapeResponse {
  success: boolean
  data?: {
    markdown?: string
    html?: string
    metadata?: {
      title?: string
      description?: string
      sourceURL?: string
      statusCode?: number
      ogTitle?: string
    }
    links?: string[]
  }
}

export async function discoverPages(rootUrl: string): Promise<string[]> {
  const res = await fcPost<MapResponse>('/map', { url: rootUrl, limit: 100 })
  return (res.links ?? []).slice(0, MAX_PAGES)
}

export async function scrapePage(url: string): Promise<CrawlPagePayload> {
  const res = await fcPost<ScrapeResponse>('/scrape', {
    url,
    formats: ['markdown', 'html'],
    onlyMainContent: false,
    waitFor: 1500,
  })
  const html = res.data?.html ?? ''
  const md = res.data?.markdown ?? ''
  const meta = res.data?.metadata ?? {}
  return parsePage(url, html, md, meta)
}

function parsePage(
  url: string,
  html: string,
  markdown: string,
  meta: { title?: string; description?: string; statusCode?: number },
): CrawlPagePayload {
  const h1 = matchAll(html, /<h1[^>]*>([\s\S]*?)<\/h1>/gi).map(stripTags)
  const h2 = matchAll(html, /<h2[^>]*>([\s\S]*?)<\/h2>/gi).map(stripTags)
  const canonical = html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i)?.[1] ?? null
  const internalLinks = matchAll(html, /<a[^>]+href=["']([^"']+)["']/gi).filter((h) => {
    if (!h) return false
    if (h.startsWith('mailto:') || h.startsWith('tel:') || h.startsWith('#')) return false
    return !/^https?:\/\//.test(h) || h.includes(new URL(url).hostname)
  }).length
  const externalLinks = matchAll(html, /<a[^>]+href=["'](https?:\/\/[^"']+)["']/gi).filter((h) => {
    return !h.includes(new URL(url).hostname)
  }).length
  const imgTags = matchAll(html, /<img[^>]*>/gi)
  const imagesMissingAlt = imgTags.filter((t) => !/alt=["'][^"']+["']/i.test(t)).length

  const jsonldBlocks = matchAll(html, /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)
  const jsonldTypes: string[] = []
  for (const block of jsonldBlocks) {
    try {
      const parsed = JSON.parse(block.trim())
      collectTypes(parsed, jsonldTypes)
    } catch {
      // ignore parse errors here; SchemaPayload tracks them separately
    }
  }

  return {
    url,
    status_code: meta.statusCode ?? 200,
    title: meta.title ?? html.match(/<title>([\s\S]*?)<\/title>/i)?.[1]?.trim() ?? null,
    meta_description: meta.description ?? null,
    canonical,
    h1,
    h2,
    word_count: markdown.split(/\s+/).filter(Boolean).length,
    internal_link_count: internalLinks,
    external_link_count: externalLinks,
    has_jsonld: jsonldBlocks.length > 0,
    jsonld_types: [...new Set(jsonldTypes)],
    images_total: imgTags.length,
    images_missing_alt: imagesMissingAlt,
  }
}

function matchAll(s: string, re: RegExp): string[] {
  const out: string[] = []
  let m: RegExpExecArray | null
  while ((m = re.exec(s)) !== null) out.push(m[1] ?? m[0])
  return out
}

function stripTags(s: string): string {
  return s.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim()
}

function collectTypes(node: unknown, out: string[]) {
  if (!node) return
  if (Array.isArray(node)) { node.forEach((n) => collectTypes(n, out)); return }
  if (typeof node !== 'object') return
  const obj = node as Record<string, unknown>
  if (obj['@type']) {
    const t = obj['@type']
    if (Array.isArray(t)) t.forEach((x) => out.push(String(x)))
    else out.push(String(t))
  }
  if (obj['@graph']) collectTypes(obj['@graph'], out)
}

/* ─── robots / sitemap ───────────────────────────────────────────────────── */

export async function probeRobotsAndSitemap(rootUrl: string): Promise<Pick<CrawlPayload, 'robots_txt_present' | 'sitemap_present' | 'sitemap_url_count'>> {
  const origin = new URL(rootUrl).origin
  const robots = await safeFetchText(`${origin}/robots.txt`)
  const sitemap = await safeFetchText(`${origin}/sitemap.xml`)
  const sitemapUrlCount = sitemap ? (sitemap.match(/<loc>/g)?.length ?? null) : null
  return {
    robots_txt_present: !!robots,
    sitemap_present: !!sitemap,
    sitemap_url_count: sitemapUrlCount,
  }
}

async function safeFetchText(url: string): Promise<string | null> {
  try {
    const res = await fetch(url, { redirect: 'follow' })
    if (!res.ok) return null
    return await res.text()
  } catch { return null }
}

/* ─── Schema audit (home-services-specific) ──────────────────────────────── */

// schema.org has a precise LocalBusiness subtype per trade. Recommending the
// exact type (Plumber, Electrician, …) is the highest-value AEO fix, so we lead
// with it and fall back to HomeAndConstructionBusiness for "other".
const TRADE_SCHEMA_TYPE: Record<Specialty, string> = {
  plumbing: 'Plumber',
  hvac: 'HVACBusiness',
  electrical: 'Electrician',
  roofing: 'RoofingContractor',
  other: 'HomeAndConstructionBusiness',
}

// Base types every local home-services site should ship regardless of trade.
const BASE_RECOMMENDED_TYPES = [
  'LocalBusiness',
  'Service',
  'AggregateRating',
  'FAQPage',
  'Organization',
  'WebSite',
  'BreadcrumbList',
]

export function evaluateSchema(pages: CrawlPagePayload[], specialty: Specialty = 'other'): SchemaPayload {
  const recommended = [TRADE_SCHEMA_TYPE[specialty] ?? TRADE_SCHEMA_TYPE.other, ...BASE_RECOMMENDED_TYPES]
  const allTypes = new Set<string>()
  for (const p of pages) for (const t of p.jsonld_types) allTypes.add(t)
  const found = [...allTypes]
  const missing = recommended.filter((t) => !allTypes.has(t))
  return {
    url: pages[0]?.url ?? '',
    found_types: found,
    recommended_types: recommended,
    missing,
    parse_errors: [],
  }
}

/* ─── Full crawl ─────────────────────────────────────────────────────────── */

export async function runCrawl(rootUrl: string): Promise<CrawlPayload> {
  const [discovered, infra] = await Promise.all([
    discoverPages(rootUrl).catch(() => [rootUrl]),
    probeRobotsAndSitemap(rootUrl),
  ])
  const urls = [rootUrl, ...discovered.filter((u) => u !== rootUrl)].slice(0, MAX_PAGES)
  const pages: CrawlPagePayload[] = []
  for (const u of urls) {
    try {
      pages.push(await scrapePage(u))
    } catch (err) {
      pages.push({
        url: u,
        status_code: 0,
        title: null,
        meta_description: null,
        canonical: null,
        h1: [],
        h2: [],
        word_count: 0,
        internal_link_count: 0,
        external_link_count: 0,
        has_jsonld: false,
        jsonld_types: [],
        images_total: 0,
        images_missing_alt: 0,
      })
    }
  }
  return { pages, ...infra }
}
