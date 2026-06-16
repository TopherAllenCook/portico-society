/**
 * DataForSEO client — minimal surface area for the Verve audit.
 *
 * Auth: HTTP Basic with login:password (env: DATAFORSEO_LOGIN, DATAFORSEO_PASSWORD).
 * All endpoints accept an array of "tasks" and return arrays of results.
 * Sandbox base: https://sandbox.dataforseo.com/v3 — Live base: https://api.dataforseo.com/v3
 *
 * Cost-conscious choices below favor "Live" (synchronous) endpoints over Standard (async queue)
 * because a single audit only needs ~10 calls and Live keeps the pipeline simple.
 */

const BASE = process.env.DATAFORSEO_BASE ?? 'https://api.dataforseo.com/v3'

function authHeader(): string {
  const login = process.env.DATAFORSEO_LOGIN
  const pass = process.env.DATAFORSEO_PASSWORD
  if (!login || !pass) throw new Error('DATAFORSEO_LOGIN / DATAFORSEO_PASSWORD missing')
  return 'Basic ' + Buffer.from(`${login}:${pass}`).toString('base64')
}

async function post<T = unknown>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    method: 'POST',
    headers: { Authorization: authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (!res.ok) throw new Error(`DataForSEO ${path} ${res.status}: ${await res.text()}`)
  return res.json() as Promise<T>
}

/* ─── Backlinks ──────────────────────────────────────────────────────────── */

/**
 * Aggregate backlink profile for a domain.
 * Endpoint: /backlinks/summary/live   ~$0.02 per call
 * Returns: backlinks count, referring_domains, referring_main_domains,
 *          rank (DataForSEO authority 0-1000), broken backlinks, etc.
 */
export function backlinksSummary(target: string) {
  return post('/backlinks/summary/live', [{ target, internal_list_limit: 10 }])
}

/**
 * Top referring domains by authority. Use this for the "who actually links to them" list.
 * Endpoint: /backlinks/referring_domains/live   ~$0.02 per call
 */
export function referringDomains(target: string, limit = 50) {
  return post('/backlinks/referring_domains/live', [
    { target, limit, order_by: ['rank,desc'] },
  ])
}

/* ─── Organic search / ranked keywords ───────────────────────────────────── */

/**
 * Every keyword a domain ranks for in a given location.
 * Endpoint: /dataforseo_labs/google/ranked_keywords/live   ~$0.05 per call
 * locationCode: 2840 = US, 2826 = UK. (See /dataforseo_labs/google/locations_and_languages.)
 */
export function rankedKeywords(target: string, locationCode = 2840, limit = 200) {
  return post('/dataforseo_labs/google/ranked_keywords/live', [
    {
      target,
      location_code: locationCode,
      language_code: 'en',
      limit,
      order_by: ['ranked_serp_element.serp_item.rank_group,asc'],
      filters: [
        ['ranked_serp_element.serp_item.rank_group', '<=', 30],
      ],
    },
  ])
}

/**
 * Keywords that competitors rank for and we don't (or rank lower for).
 * Endpoint: /dataforseo_labs/google/domain_intersection/live   ~$0.05 per call
 * Pass `target1` = our domain, `target2` = competitor.
 */
export function domainIntersection(target1: string, target2: string, locationCode = 2840, limit = 100) {
  return post('/dataforseo_labs/google/domain_intersection/live', [
    {
      target1,
      target2,
      location_code: locationCode,
      language_code: 'en',
      include_serp_info: false,
      intersections: false, // false = "in target2 but not target1" — the gap we want
      limit,
    },
  ])
}

/* ─── Keyword research ───────────────────────────────────────────────────── */

/**
 * Search volume + CPC + competition for a batch of keywords.
 * Endpoint: /keywords_data/google_ads/search_volume/live   ~$0.05 / call (up to 1000 kw)
 */
export function searchVolume(keywords: string[], locationCode = 2840) {
  return post('/keywords_data/google_ads/search_volume/live', [
    { keywords, location_code: locationCode, language_code: 'en' },
  ])
}

/**
 * Keyword suggestions for content gap planning.
 * Endpoint: /dataforseo_labs/google/keyword_suggestions/live   ~$0.05 / call
 */
export function keywordSuggestions(seed: string, locationCode = 2840, limit = 100) {
  return post('/dataforseo_labs/google/keyword_suggestions/live', [
    { keyword: seed, location_code: locationCode, language_code: 'en', limit },
  ])
}

/* ─── SERP (Google) ──────────────────────────────────────────────────────── */

/**
 * Live SERP for a single query. Returns organic + AI overview + featured snippet +
 * PAA + local pack + knowledge panel — exactly what AEO needs.
 * Endpoint: /serp/google/organic/live/advanced   ~$0.003 per query
 *
 * locationName lets you target a city directly: "Dallas,Texas,United States".
 */
export function serpGoogle(keyword: string, locationName = 'United States', device: 'desktop' | 'mobile' = 'desktop') {
  return post('/serp/google/organic/live/advanced', [
    {
      keyword,
      location_name: locationName,
      language_code: 'en',
      device,
      depth: 30,
      calculate_rectangles: false,
    },
  ])
}

/**
 * AI Mode / AI Overview snapshot for a query — Google's generative answer block.
 * Endpoint: /serp/google/ai_mode/live/advanced   ~$0.005 per query
 * Use this when you want to see whether Google's generative answer mentions the clinic.
 */
export function serpGoogleAiMode(keyword: string, locationName = 'United States') {
  return post('/serp/google/ai_mode/live/advanced', [
    { keyword, location_name: locationName, language_code: 'en' },
  ])
}

/* ─── Per-audit call plan ────────────────────────────────────────────────── */
/*
 * For one clinic + 3 competitors in one city:
 *
 *   backlinksSummary     × 4 domains          = $0.08
 *   referringDomains     × 4 domains          = $0.08
 *   rankedKeywords       × 4 domains          = $0.20
 *   domainIntersection   × 3 (us vs each)     = $0.15
 *   searchVolume         × 1 (seed batch)     = $0.05
 *   keywordSuggestions   × 2 (specialty+city) = $0.10
 *   serpGoogle           × 25 patient queries = $0.075
 *   serpGoogleAiMode     × 10 high-intent     = $0.05
 *   ─────────────────────────────────────────────────
 *   Total per audit:                            ~$0.80
 */

export const PATIENT_QUERY_TEMPLATES = {
  plumbing: [
    'best plumber in {city}',
    'emergency plumber {city}',
    'water heater repair {city}',
    'drain cleaning {city}',
    'leak detection {city}',
    'plumbing company near me {city}',
    'sewer line repair {city}',
    'tankless water heater installation {city}',
  ],
  hvac: [
    'best hvac company {city}',
    'ac repair {city}',
    'furnace repair {city}',
    'hvac installation {city}',
    'air conditioning service {city}',
    'heating and cooling near me {city}',
  ],
  electrical: [
    'best electrician in {city}',
    'emergency electrician {city}',
    'electrical panel upgrade {city}',
    'ev charger installation {city}',
    'electrical repair {city}',
    'electrician near me {city}',
  ],
  roofing: [
    'best roofing company {city}',
    'roof repair {city}',
    'roof replacement {city}',
    'storm damage roof repair {city}',
    'roofer near me {city}',
    'metal roof installation {city}',
  ],
  // Catch-all for any trade not broken out above (and the batch-import default).
  // Generic high-intent local-service queries so GEO/SERP still have something
  // to rank against instead of throwing on an undefined template.
  other: [
    'best home services company {city}',
    'home repair near me {city}',
    'local contractor {city}',
    'emergency home services {city}',
    'licensed contractor {city}',
    'home services company {city}',
  ],
} as const

export type Specialty = keyof typeof PATIENT_QUERY_TEMPLATES

export function buildPatientQueries(specialty: Specialty, city: string): string[] {
  return PATIENT_QUERY_TEMPLATES[specialty].map((t) => t.replace('{city}', city))
}
