import { z } from 'zod'

/* ─── Input ──────────────────────────────────────────────────────────────── */

export const SpecialtySchema = z.enum(['plumbing', 'hvac', 'electrical', 'roofing', 'mixed'])
export type Specialty = z.infer<typeof SpecialtySchema>

export const DiscoverySourceSchema = z.enum(['places', 'apify', 'both'])
export type DiscoverySource = z.infer<typeof DiscoverySourceSchema>

export const ScrapeRequestSchema = z.object({
  city: z.string().min(2).max(80),
  state: z.string().min(2).max(40),
  specialty: SpecialtySchema.optional(),
  max_results: z.number().int().min(1).max(200).default(100),
  source: DiscoverySourceSchema.default('places'),
  auto_audit: z.boolean().optional().default(false),
  auto_audit_threshold: z.number().int().min(0).max(100).optional().default(60),
})
export type ScrapeRequest = z.infer<typeof ScrapeRequestSchema>

/* ─── Normalised clinic record from any source ───────────────────────────── */

/**
 * One clinic record, source-agnostic. Both the Google Places and Apify
 * discoverers normalize to this shape so downstream code (orchestrate.ts,
 * score.ts) doesn't need to know where the record came from.
 *
 * `placeId` is the canonical de-dupe key:
 *   - 'places' source: Google Places ID (stable, globally unique)
 *   - 'apify' source: Apify's placeId/fid/cid (also Google-derived in practice)
 *
 * In the 'both' source mode, records with the same placeId across sources
 * are merged with Places fields taking precedence (Places data is canonical).
 */
export interface RawClinic {
  placeId: string
  title: string
  url?: string             // Google Maps URL
  website?: string
  phone?: string
  address?: string
  city?: string
  state?: string
  postalCode?: string
  totalScore?: number      // rating 1–5
  reviewsCount?: number
  categories?: string[]
  searchString?: string    // the query that surfaced this place
  source: 'places' | 'apify'
}

/**
 * @deprecated use RawClinic instead. Kept as a type alias for backwards-compat
 * with any external references; remove once the codebase is fully migrated.
 */
export type ApifyPlace = RawClinic

/* ─── Enrichment from website scrape ─────────────────────────────────────── */

export interface TechStack {
  booking_widget: string | null    // calendly | acuity | nexhealth | jane | mindbody | null
  chat_widget: string | null       // intercom | drift | hubspot | tawk | null
  cms: string | null               // wordpress | webflow | squarespace | wix | shopify | null
  analytics: string[]              // ga4, gtm, meta_pixel, hotjar, ...
}

export interface MarketingSignals {
  has_contact_form: boolean
  cta_above_fold: boolean
  primary_cta_text: string | null
  has_blog: boolean
  has_schema: boolean
  meta_pixel_present: boolean
  phone_clickable: boolean
}

export interface WebsiteEnrichment {
  tech_stack: TechStack
  marketing_signals: MarketingSignals
  owner_names: string[]            // pulled from About / Team / Meet pages
  description: string | null       // ~1 paragraph site summary
}

/* ─── Email patterns ─────────────────────────────────────────────────────── */

export interface EmailPatterns {
  candidates: string[]             // ranked, most-likely first
  primary: string | null           // top pick (also stored in primary_email column)
  domain: string | null
  mx_verified: boolean
}

/* ─── Scoring ────────────────────────────────────────────────────────────── */

export interface IcpScore {
  score: number                    // 0–100
  reasoning: string                // 1–2 sentences, internal (drives icp_reasoning)
  audit_finding: string            // one prospect-safe sentence for cold email ({{audit_finding}})
}

/* ─── DB rows ────────────────────────────────────────────────────────────── */

export type ScrapeJobStatus = 'queued' | 'running' | 'partial' | 'complete' | 'failed'

export interface OutboundScrapeJobRow {
  id: string
  created_at: string
  city: string
  state: string
  specialty: Specialty | null
  max_results: number
  source: DiscoverySource | null
  auto_audit: boolean
  auto_audit_threshold: number
  status: ScrapeJobStatus
  started_at: string | null
  completed_at: string | null
  apify_actor: string | null   // also used as provider label in places/both modes
  raw_count: number | null
  scored_count: number | null
  error_message: string | null
}

export type LeadWorkflowStatus =
  | 'new'
  | 'reviewing'
  | 'queued'
  | 'sent'
  | 'replied'
  | 'booked'
  | 'rejected'

export interface OutboundLeadRow {
  id: string
  created_at: string
  scrape_job_id: string | null
  apify_place_id: string | null
  clinic_name: string
  specialty: string | null
  website: string | null
  phone: string | null
  address: string | null
  city: string | null
  state: string | null
  postal_code: string | null
  google_place_url: string | null
  google_rating: number | null
  google_review_count: number | null
  categories: string[] | null
  tech_stack: TechStack | null
  marketing_signals: MarketingSignals | null
  owner_names: string[] | null
  primary_email: string | null
  email_patterns: EmailPatterns | null
  mx_verified: boolean | null
  icp_score: number | null
  icp_reasoning: string | null
  audit_finding: string | null
  scored_at: string | null
  status: LeadWorkflowStatus
  reviewed_by: string | null
  notes: string | null
  instantly_campaign_id: string | null
  last_touched_at: string | null
  enriched_at: string | null
  enrichment_error: string | null
  audit_id: string | null
  auto_audit_status: string | null
}
