import type { PlacesPayload } from './types'

/**
 * Google Places API (New) — find a clinic's GBP and pull the signals patients see.
 * Env: GOOGLE_PLACES_API_KEY (can be same key as PageSpeed if the project enables both APIs).
 */
const PLACES_BASE = 'https://places.googleapis.com/v1'

function key() {
  const k = process.env.GOOGLE_PLACES_API_KEY ?? process.env.PAGESPEED_API_KEY
  if (!k) throw new Error('GOOGLE_PLACES_API_KEY missing')
  return k
}

interface SearchResponse {
  places?: Array<{ id?: string; displayName?: { text?: string } }>
}

interface DetailsResponse {
  id?: string
  displayName?: { text?: string }
  formattedAddress?: string
  internationalPhoneNumber?: string
  websiteUri?: string
  rating?: number
  userRatingCount?: number
  businessStatus?: string
  regularOpeningHours?: { openNow?: boolean; periods?: unknown[] }
  photos?: unknown[]
  primaryType?: string
}

export async function runPlaces(args: { clinicName: string; city: string }): Promise<PlacesPayload> {
  const search = await fetch(`${PLACES_BASE}/places:searchText`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': key(),
      'X-Goog-FieldMask': 'places.id,places.displayName',
    },
    body: JSON.stringify({ textQuery: `${args.clinicName} ${args.city}` }),
  })
  if (!search.ok) throw new Error(`Places search ${search.status}: ${await search.text()}`)
  const list = (await search.json()) as SearchResponse
  const placeId = list.places?.[0]?.id
  if (!placeId) {
    return {
      place_id: null,
      name: null,
      address: null,
      phone: null,
      website: null,
      rating: null,
      user_ratings_total: null,
      business_status: null,
      open_now: null,
      hours_set: false,
      photo_count: 0,
      attributes: {},
    }
  }

  const detail = await fetch(`${PLACES_BASE}/places/${placeId}`, {
    headers: {
      'X-Goog-Api-Key': key(),
      'X-Goog-FieldMask': 'id,displayName,formattedAddress,internationalPhoneNumber,websiteUri,rating,userRatingCount,businessStatus,regularOpeningHours,photos,primaryType',
    },
  })
  if (!detail.ok) throw new Error(`Places detail ${detail.status}: ${await detail.text()}`)
  const d = (await detail.json()) as DetailsResponse

  return {
    place_id: d.id ?? null,
    name: d.displayName?.text ?? null,
    address: d.formattedAddress ?? null,
    phone: d.internationalPhoneNumber ?? null,
    website: d.websiteUri ?? null,
    rating: d.rating ?? null,
    user_ratings_total: d.userRatingCount ?? null,
    business_status: d.businessStatus ?? null,
    open_now: d.regularOpeningHours?.openNow ?? null,
    hours_set: !!d.regularOpeningHours?.periods?.length,
    photo_count: d.photos?.length ?? 0,
    attributes: { primary_type: d.primaryType ?? null },
  }
}
