import { z } from 'zod'

export const SpecialtySchema = z.enum(['plumbing', 'hvac', 'electrical', 'roofing', 'other'])
export type Specialty = z.infer<typeof SpecialtySchema>

export const AuditIntakeSchema = z.object({
  clinic_name: z.string().min(2).max(120),
  website_url: z.string().url(),
  contact_name: z.string().min(2).max(120),
  contact_email: z.string().email(),
  contact_phone: z.string().max(40).optional().nullable(),
  specialty: SpecialtySchema,
  city: z.string().min(2).max(80),
  state: z.string().max(40).optional().nullable(),
  challenge: z.string().max(2000).optional().nullable(),
})
export type AuditIntake = z.infer<typeof AuditIntakeSchema>

export type AuditStatus = 'queued' | 'running' | 'partial' | 'complete' | 'failed'
export type ModuleStatus = 'pending' | 'running' | 'complete' | 'failed' | 'skipped'

export type ModuleName =
  | 'crawl'
  | 'pagespeed'
  | 'schema'
  | 'dataforseo'
  | 'geo'
  | 'places'
  | 'leadgen'
  | 'competitor_crawl'

export interface AuditJobRow {
  id: string
  created_at: string
  clinic_name: string
  website_url: string
  contact_name: string
  contact_email: string
  contact_phone: string | null
  specialty: Specialty
  city: string
  state: string | null
  challenge: string | null
  status: AuditStatus
  share_token: string
  competitors: Competitor[] | null
}

/* ─── Module payloads ────────────────────────────────────────────────────── */

export interface CrawlPagePayload {
  url: string
  status_code: number
  title: string | null
  meta_description: string | null
  canonical: string | null
  h1: string[]
  h2: string[]
  word_count: number
  internal_link_count: number
  external_link_count: number
  has_jsonld: boolean
  jsonld_types: string[]
  images_total: number
  images_missing_alt: number
}

export interface CrawlPayload {
  pages: CrawlPagePayload[]
  robots_txt_present: boolean
  sitemap_present: boolean
  sitemap_url_count: number | null
}

export interface PagespeedPayload {
  url: string
  performance: number
  accessibility: number
  best_practices: number
  seo: number
  lcp_ms: number | null
  inp_ms: number | null
  cls: number | null
  ttfb_ms: number | null
}

export interface SchemaPayload {
  url: string
  found_types: string[]
  recommended_types: string[]
  missing: string[]
  parse_errors: string[]
}

export interface SerpResultItem {
  rank: number
  url: string
  domain: string
  title: string
}

export interface SerpQueryResult {
  query: string
  ai_overview_present: boolean
  ai_overview_mentions_us: boolean
  ai_overview_text: string | null
  featured_snippet: SerpResultItem | null
  people_also_ask: string[]
  local_pack: SerpResultItem[]
  organic: SerpResultItem[]
  our_rank: number | null
  competitor_domains: string[]
}

export interface DataForSeoPayload {
  ranked_keywords_count: number
  estimated_organic_traffic: number
  top_keywords: Array<{ keyword: string; rank: number; volume: number; cpc: number }>
  backlinks: {
    total: number
    referring_domains: number
    referring_main_domains: number
    rank: number
  }
  top_referring_domains: Array<{ domain: string; rank: number; backlinks: number }>
  serps: SerpQueryResult[]
  competitor_gap: Array<{
    competitor: string
    gap_keywords: Array<{ keyword: string; competitor_rank: number; our_rank: number | null; volume: number }>
  }>
}

export interface LlmAnswer {
  provider: 'openai' | 'anthropic' | 'perplexity' | 'gemini'
  model: string
  query: string
  raw_text: string
  mentioned_domains: string[]
  mentioned_clinics: string[]
  cited_sources: string[]
  our_clinic_mentioned: boolean
  our_clinic_rank: number | null
  latency_ms: number
}

export interface GeoPayload {
  queries: string[]
  answers: LlmAnswer[]
  visibility_score: number // 0-100: how often we appear across providers x queries
  competitor_mention_counts: Record<string, number>
}

export interface PlacesPayload {
  place_id: string | null
  name: string | null
  address: string | null
  phone: string | null
  website: string | null
  rating: number | null
  user_ratings_total: number | null
  business_status: string | null
  open_now: boolean | null
  hours_set: boolean
  photo_count: number
  attributes: Record<string, unknown>
}

export interface LeadgenPayload {
  url: string
  cta_above_fold: boolean
  primary_cta_text: string | null
  forms_found: number
  form_field_counts: number[]
  phone_in_header: boolean
  phone_clickable: boolean
  booking_widget: string | null  // 'calendly' | 'acuity' | 'nexhealth' | 'jane' | etc.
  chat_widget: string | null
  ga4_present: boolean
  gtm_present: boolean
  meta_pixel_present: boolean
  mobile_form_visible_at_375: boolean
}

export interface Competitor {
  name: string
  domain: string
  source: 'geo' | 'serp' | 'manual'
}

/* ─── Synthesis output ───────────────────────────────────────────────────── */

export interface Scorecard {
  seo: { score: number; rationale: string }
  aeo: { score: number; rationale: string }
  geo: { score: number; rationale: string }
  leadgen: { score: number; rationale: string }
  local: { score: number; rationale: string }
}

export interface PrioritizedMove {
  rank: number
  title: string
  why: string
  how: string
  impact: 'high' | 'medium' | 'low'
  effort: 'low' | 'medium' | 'high'
  pillar: 'seo' | 'aeo' | 'geo' | 'leadgen' | 'local'
}

export interface CompetitorEdge {
  name: string
  domain: string
  edges: string[] // short bullets describing why they win
}

export interface SynthesisOutput {
  scorecard: Scorecard
  competitors: CompetitorEdge[]
  prioritized_moves: PrioritizedMove[]
  executive_summary: string
  narrative_markdown: string
}
