import type { DiscoverySource, RawClinic, Specialty } from './types'
import { runPlacesDiscovery } from './discover-places'
import { runApifyDiscovery } from './discover-apify'

/**
 * Unified clinic discovery entry point.
 *
 * `source` decides which provider(s) to call:
 *   - 'places' (default, recommended) — Google Places API. Cheap, already
 *      paid via the audit pipeline's key. ~$0.03/request, 4-12 requests per
 *      city per specialty mix.
 *   - 'apify'                          — Apify google-maps-scraper. $1-3 per
 *      100 leads. Sometimes returns fields Places doesn't (popular times,
 *      photo counts). Useful as fallback or for richer enrichment.
 *   - 'both'                            — Run Places first, then Apify, merge
 *      by placeId. Places fields win on conflict (canonical Google data).
 *      Apify fills any gaps in coverage.
 *
 * All sources normalize to `RawClinic[]` so downstream code (orchestrate,
 * score, persistence) is source-agnostic.
 */

export interface DiscoverArgs {
  source: DiscoverySource
  city: string
  state: string
  specialty?: Specialty
  maxResults: number
}

export interface DiscoverResult {
  source: DiscoverySource
  places: RawClinic[]
  rawCount: number
  /** Per-provider breakdown for logging / billing tracking. */
  providerStats: ProviderStat[]
}

export interface ProviderStat {
  provider: 'places' | 'apify'
  rawCount: number
  /** Places: API request count. Apify: actor name. */
  meta: string
  error?: string
}

export async function discover(args: DiscoverArgs): Promise<DiscoverResult> {
  if (args.source === 'places') {
    const r = await runPlacesDiscovery({
      city: args.city,
      state: args.state,
      specialty: args.specialty,
      maxResults: args.maxResults,
    })
    return {
      source: 'places',
      places: r.places,
      rawCount: r.rawCount,
      providerStats: [
        { provider: 'places', rawCount: r.rawCount, meta: `${r.requestCount} requests` },
      ],
    }
  }

  if (args.source === 'apify') {
    const r = await runApifyDiscovery({
      city: args.city,
      state: args.state,
      specialty: args.specialty,
      maxResults: args.maxResults,
    })
    return {
      source: 'apify',
      places: r.places,
      rawCount: r.rawCount,
      providerStats: [{ provider: 'apify', rawCount: r.rawCount, meta: r.actor }],
    }
  }

  /* ─── 'both' — run in parallel and merge ──────────────────────────────── */

  const stats: ProviderStat[] = []

  const [placesRes, apifyRes] = await Promise.allSettled([
    runPlacesDiscovery({
      city: args.city,
      state: args.state,
      specialty: args.specialty,
      maxResults: args.maxResults,
    }),
    runApifyDiscovery({
      city: args.city,
      state: args.state,
      specialty: args.specialty,
      maxResults: args.maxResults,
    }),
  ])

  const merged = new Map<string, RawClinic>()

  // Places first (preferred — Google canonical data)
  if (placesRes.status === 'fulfilled') {
    stats.push({ provider: 'places', rawCount: placesRes.value.rawCount, meta: `${placesRes.value.requestCount} requests` })
    for (const p of placesRes.value.places) {
      if (p.placeId) merged.set(p.placeId, p)
    }
  } else {
    stats.push({ provider: 'places', rawCount: 0, meta: 'failed', error: (placesRes.reason as Error).message })
  }

  // Apify second — fill gaps + merge missing fields without overwriting
  if (apifyRes.status === 'fulfilled') {
    stats.push({ provider: 'apify', rawCount: apifyRes.value.rawCount, meta: apifyRes.value.actor })
    for (const p of apifyRes.value.places) {
      if (!p.placeId) continue
      const existing = merged.get(p.placeId)
      if (!existing) {
        merged.set(p.placeId, p)
      } else {
        // Backfill empty fields on the Places record from Apify; Places wins
        // on conflicts.
        merged.set(p.placeId, mergePreferringFirst(existing, p))
      }
    }
  } else {
    stats.push({ provider: 'apify', rawCount: 0, meta: 'failed', error: (apifyRes.reason as Error).message })
  }

  const places = Array.from(merged.values()).slice(0, args.maxResults)
  const rawCount = stats.reduce((sum, s) => sum + s.rawCount, 0)

  return { source: 'both', places, rawCount, providerStats: stats }
}

function mergePreferringFirst(primary: RawClinic, secondary: RawClinic): RawClinic {
  return {
    ...secondary,
    ...primary,
    website: primary.website ?? secondary.website,
    phone: primary.phone ?? secondary.phone,
    address: primary.address ?? secondary.address,
    city: primary.city ?? secondary.city,
    state: primary.state ?? secondary.state,
    postalCode: primary.postalCode ?? secondary.postalCode,
    totalScore: primary.totalScore ?? secondary.totalScore,
    reviewsCount: primary.reviewsCount ?? secondary.reviewsCount,
    categories: primary.categories?.length ? primary.categories : secondary.categories,
    url: primary.url ?? secondary.url,
    source: primary.source, // keep primary attribution
  }
}
