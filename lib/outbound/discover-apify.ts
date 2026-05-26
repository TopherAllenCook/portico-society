import type { RawClinic, Specialty } from './types'

/**
 * Apify Google Maps scraper integration.
 *
 * Actor: apify/google-maps-scraper (the cheaper actor — does NOT include
 * email/social details; we discover contacts via website scrape + pattern
 * guessing in scrape-site.ts + email-guess.ts).
 *
 * Pricing: ~$0.50–2 per 100 places depending on density and how much detail
 * the actor pulls.
 *
 * For the cheap default path use discover-places.ts (Google Places API).
 * This module stays available as an alternate / fallback source.
 */

const ACTOR = 'apify/google-maps-scraper'
const APIFY_BASE = 'https://api.apify.com/v2'

/* ─── Search-string mapping ─────────────────────────────────────────────── */

const SPECIALTY_QUERIES: Record<Specialty, string[]> = {
  longevity: [
    'longevity clinic',
    'longevity medicine',
    'anti-aging clinic',
    'preventive medicine clinic',
  ],
  concierge: [
    'concierge medicine',
    'concierge doctor',
    'private medical practice',
    'membership medicine',
  ],
  aesthetic: [
    'aesthetic medicine',
    'medical spa',
    'med spa',
    'cosmetic medicine clinic',
  ],
  mixed: [
    'longevity clinic',
    'concierge medicine',
    'med spa',
    'aesthetic clinic',
  ],
}

/* ─── Public API ────────────────────────────────────────────────────────── */

export interface RunMapsArgs {
  city: string
  state: string
  specialty?: Specialty
  maxResults: number
}

export interface MapsResult {
  actor: string
  places: RawClinic[]
  rawCount: number
}

export async function runApifyDiscovery(args: RunMapsArgs): Promise<MapsResult> {
  const token = process.env.APIFY_API_TOKEN
  if (!token) throw new Error('APIFY_API_TOKEN missing')

  const queries = SPECIALTY_QUERIES[args.specialty ?? 'mixed']
  const locationQuery = `${args.city}, ${args.state}`
  // Spread the budget across queries.
  const perQuery = Math.max(5, Math.ceil(args.maxResults / queries.length))

  const input = {
    searchStringsArray: queries,
    locationQuery,
    maxCrawledPlacesPerSearch: perQuery,
    language: 'en',
    skipClosedPlaces: true,
    includeWebResults: false,
    scrapeReviewsPersonalData: false,
    scrapeContacts: false, // explicitly off; we discover via website
  }

  // Use the synchronous run-and-get-dataset-items endpoint. Apify keeps the
  // connection open until the run completes (or times out at 5 min for free
  // tier; bump to 'run-sync-get-dataset-items' with timeout=900 on paid).
  const url = `${APIFY_BASE}/acts/${encodeURIComponent(ACTOR.replace('/', '~'))}/run-sync-get-dataset-items?token=${token}&timeout=600&clean=true`

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(input),
  })

  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`Apify Maps run failed: ${res.status} ${res.statusText} — ${text.slice(0, 300)}`)
  }

  const raw = (await res.json()) as unknown
  if (!Array.isArray(raw)) throw new Error('Apify Maps returned non-array payload')

  // Normalize to our shape; the actor's field names occasionally drift.
  const places: RawClinic[] = raw.map((row) => normalizePlace(row, args.specialty))

  // De-dupe by placeId (queries can overlap on the same business).
  const seen = new Set<string>()
  const deduped = places.filter((p) => {
    if (!p.placeId) return false
    if (seen.has(p.placeId)) return false
    seen.add(p.placeId)
    return true
  })

  // Trim to the requested cap (queries × perQuery can exceed maxResults).
  const trimmed = deduped.slice(0, args.maxResults)

  return {
    actor: ACTOR,
    places: trimmed,
    rawCount: raw.length,
  }
}

/* ─── Internal ──────────────────────────────────────────────────────────── */

function normalizePlace(row: unknown, specialty?: Specialty): RawClinic {
  const r = row as Record<string, unknown>
  const cityFromAddress = inferCity(r)
  const stateFromAddress = inferState(r)

  return {
    placeId: stringOrEmpty(r.placeId ?? r.fid ?? r.cid) || stringOrEmpty(r.title) + '|' + stringOrEmpty(r.address),
    title: stringOrEmpty(r.title ?? r.name),
    url: stringOrUndefined(r.url),
    website: stringOrUndefined(r.website),
    phone: stringOrUndefined(r.phone ?? r.phoneUnformatted),
    address: stringOrUndefined(r.address),
    city: cityFromAddress,
    state: stateFromAddress,
    postalCode: stringOrUndefined(r.postalCode),
    totalScore: numberOrUndefined(r.totalScore ?? r.rating),
    reviewsCount: numberOrUndefined(r.reviewsCount ?? r.reviewsTotal),
    categories: Array.isArray(r.categories) ? (r.categories as string[]) : undefined,
    searchString: stringOrUndefined(r.searchString) ?? (specialty ? `${specialty}` : undefined),
    source: 'apify',
  }
}

function inferCity(r: Record<string, unknown>): string | undefined {
  if (typeof r.city === 'string') return r.city
  // Apify often packs city into a structured object under "location" or splits
  // address into components. We do a cheap parse from address text as a fallback.
  const addr = typeof r.address === 'string' ? r.address : ''
  const parts = addr.split(',').map((s) => s.trim()).filter(Boolean)
  if (parts.length >= 3) return parts[parts.length - 3]
  return undefined
}

function inferState(r: Record<string, unknown>): string | undefined {
  if (typeof r.state === 'string') return r.state
  const addr = typeof r.address === 'string' ? r.address : ''
  const parts = addr.split(',').map((s) => s.trim()).filter(Boolean)
  if (parts.length >= 2) {
    // typical US address tail: "City, STATE ZIP, USA"
    const second = parts[parts.length - 2]
    const m = second.match(/^([A-Z]{2})\s+\d/)
    if (m) return m[1]
  }
  return undefined
}

function stringOrUndefined(v: unknown): string | undefined {
  return typeof v === 'string' && v.trim().length > 0 ? v.trim() : undefined
}
function stringOrEmpty(v: unknown): string {
  return typeof v === 'string' ? v.trim() : ''
}
function numberOrUndefined(v: unknown): number | undefined {
  return typeof v === 'number' && Number.isFinite(v) ? v : undefined
}
