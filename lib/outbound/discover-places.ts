import type { RawClinic, Specialty } from './types'

/**
 * Google Places API (New) area discovery.
 *
 * Uses the same `places:searchText` endpoint as lib/audit/places.ts, but
 * shaped for AREA queries ("longevity clinic Salt Lake City UT") instead of
 * single-clinic lookups. This is the cheap default — the GOOGLE_PLACES_API_KEY
 * is already paid for by the audit pipeline and has a generous free tier.
 *
 * Per query: up to 20 results per page, pageable up to ~60 total via
 * nextPageToken. Across 4 specialty queries: ~240 candidates per city
 * before de-dup.
 *
 * Pricing (Google Places "Text Search Essentials" SKU): $0.032 per request
 * after the free monthly quota. Even at 4 cities × 4 queries × 3 pages = 48
 * requests/day, daily cost stays under $1.50. Much cheaper than Apify.
 */

const PLACES_BASE = 'https://places.googleapis.com/v1'

/* ─── Search-string mapping (mirrors discover-apify.ts) ─────────────────── */

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

/* ─── Field mask (controls which fields are billed + returned) ──────────── */

const FIELD_MASK = [
  'places.id',
  'places.displayName',
  'places.formattedAddress',
  'places.shortFormattedAddress',
  'places.addressComponents',
  'places.location',
  'places.googleMapsUri',
  'places.websiteUri',
  'places.nationalPhoneNumber',
  'places.internationalPhoneNumber',
  'places.rating',
  'places.userRatingCount',
  'places.types',
  'places.primaryType',
  'places.primaryTypeDisplayName',
  'places.businessStatus',
  'nextPageToken',
].join(',')

/* ─── Public API ────────────────────────────────────────────────────────── */

export interface PlacesDiscoveryArgs {
  city: string
  state: string
  specialty?: Specialty
  maxResults: number
}

export interface PlacesDiscoveryResult {
  source: 'places'
  places: RawClinic[]
  rawCount: number
  /** Number of paid Places API requests made. Useful for cost tracking. */
  requestCount: number
}

export async function runPlacesDiscovery(args: PlacesDiscoveryArgs): Promise<PlacesDiscoveryResult> {
  const apiKey = key()
  const queries = SPECIALTY_QUERIES[args.specialty ?? 'mixed']
  const perQuery = Math.max(20, Math.ceil(args.maxResults / queries.length))

  // Hoist across all queries, then de-dupe + trim.
  const collected: RawClinic[] = []
  let totalRaw = 0
  let requestCount = 0

  for (const baseQuery of queries) {
    const textQuery = `${baseQuery} ${args.city}, ${args.state}`
    let pageToken: string | undefined
    let pulledFromQuery = 0

    while (pulledFromQuery < perQuery) {
      const body: Record<string, unknown> = {
        textQuery,
        pageSize: Math.min(20, perQuery - pulledFromQuery),
      }
      if (pageToken) body.pageToken = pageToken

      const res = await fetch(`${PLACES_BASE}/places:searchText`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': apiKey,
          'X-Goog-FieldMask': FIELD_MASK,
        },
        body: JSON.stringify(body),
      })
      requestCount++

      if (!res.ok) {
        const text = await res.text().catch(() => '')
        throw new Error(`Places searchText ${res.status}: ${text.slice(0, 300)}`)
      }
      const json = (await res.json()) as SearchTextResponse
      const batch = json.places ?? []
      totalRaw += batch.length
      pulledFromQuery += batch.length

      for (const place of batch) {
        collected.push(normalizePlace(place, baseQuery, args))
      }

      pageToken = json.nextPageToken
      if (!pageToken || batch.length === 0) break

      // Google requires a short delay (~1.5–2s) before nextPageToken activates.
      await delay(2000)
    }
  }

  // De-dupe by placeId, preserve insertion order.
  const seen = new Set<string>()
  const deduped = collected.filter((p) => {
    if (!p.placeId) return false
    if (seen.has(p.placeId)) return false
    seen.add(p.placeId)
    return true
  })

  return {
    source: 'places',
    places: deduped.slice(0, args.maxResults),
    rawCount: totalRaw,
    requestCount,
  }
}

/* ─── Internal ──────────────────────────────────────────────────────────── */

interface PlaceComponent {
  longText?: string
  shortText?: string
  types?: string[]
}

interface PlaceRecord {
  id?: string
  displayName?: { text?: string }
  formattedAddress?: string
  addressComponents?: PlaceComponent[]
  googleMapsUri?: string
  websiteUri?: string
  nationalPhoneNumber?: string
  internationalPhoneNumber?: string
  rating?: number
  userRatingCount?: number
  types?: string[]
  primaryType?: string
  primaryTypeDisplayName?: { text?: string }
  businessStatus?: string
}

interface SearchTextResponse {
  places?: PlaceRecord[]
  nextPageToken?: string
}

function normalizePlace(p: PlaceRecord, query: string, args: PlacesDiscoveryArgs): RawClinic {
  const components = p.addressComponents ?? []
  const city =
    findComponent(components, 'locality') ??
    findComponent(components, 'postal_town') ??
    findComponent(components, 'sublocality') ??
    args.city
  const state =
    findComponent(components, 'administrative_area_level_1', 'shortText') ??
    args.state
  const postalCode = findComponent(components, 'postal_code')

  const categories = [
    p.primaryTypeDisplayName?.text,
    ...(p.types ?? []).map(prettyType),
  ].filter((c): c is string => !!c)

  return {
    placeId: p.id ?? '',
    title: p.displayName?.text ?? '',
    url: p.googleMapsUri,
    website: p.websiteUri,
    phone: p.nationalPhoneNumber ?? p.internationalPhoneNumber,
    address: p.formattedAddress,
    city,
    state,
    postalCode,
    totalScore: p.rating,
    reviewsCount: p.userRatingCount,
    categories: categories.length > 0 ? Array.from(new Set(categories)) : undefined,
    searchString: query,
    source: 'places',
  }
}

function findComponent(
  components: PlaceComponent[],
  type: string,
  prefer: 'longText' | 'shortText' = 'longText',
): string | undefined {
  for (const c of components) {
    if (c.types?.includes(type)) {
      return c[prefer] ?? c.longText ?? c.shortText
    }
  }
  return undefined
}

function prettyType(t: string): string {
  return t.replace(/_/g, ' ')
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function key(): string {
  const k = process.env.GOOGLE_PLACES_API_KEY ?? process.env.PAGESPEED_API_KEY
  if (!k) throw new Error('GOOGLE_PLACES_API_KEY missing')
  return k
}
