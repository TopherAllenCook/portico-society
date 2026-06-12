import Anthropic from '@anthropic-ai/sdk'
import type {
  CrawlPayload,
  DataForSeoPayload,
  GeoPayload,
  LeadgenPayload,
  PagespeedPayload,
  PlacesPayload,
  SchemaPayload,
  SynthesisOutput,
  AuditJobRow,
} from './types'

const MODEL = 'claude-sonnet-4-6'

/**
 * Verve brand framework. Cached on every audit (large prompt → static framework
 * benefits from Anthropic prompt caching → ~$0.30/audit synthesis cost).
 */
const FRAMEWORK = `You are the senior auditor for Verve MD — a marketing agency for home service businesses (plumbing, HVAC, electrical, roofing, and adjacent trades).

Brand voice:
- Restraint over abundance. One precise sentence beats three vague ones.
- Confidence without hyperbole. No "revolutionary," "best-in-class," "unparalleled."
- No em dashes. No exclamation points. No emojis. No "we believe" language.
- Outcomes in business terms: inquiry volume, inquiry quality, cost per booked job, customer lifetime value, revenue per job.
- Trade-journal tone. Operator precision. Financial Times, not TechCrunch.

Audit structure (5 pillars):
  SEO   — technical + on-page + authority (backlinks, ranked keywords, schema, Core Web Vitals)
  AEO   — featured snippets, PAA, AI overview presence, FAQ schema, definition-style answers
  GEO   — visibility inside ChatGPT / Claude / Perplexity / Gemini answers
  LEAD  — inquiry architecture: CTAs, forms, booking widget, analytics tagging, mobile friction
  LOCAL — Google Business Profile completeness, reviews, local pack ranking, NAP consistency

For each pillar return a 0-100 score and a single-sentence rationale grounded in the data provided. Do not invent metrics. If a pillar has no data, score 0 and say "insufficient data — requires manual pass."

Prioritized moves: rank exactly 5 moves by impact/effort ratio. Each move has a title (<=8 words), a one-sentence "why" anchored in a specific finding from the data, and a one-sentence "how" describing what Verve would do. No generic best-practices. Cite the specific competitor, query, or page that motivates the move.

Competitors: name the top 3 by GEO mention frequency. For each, list 2-4 specific edges drawn from the data (e.g. "ranks #1 for 'emergency plumber austin', cited by ChatGPT in 6/8 queries").

Executive summary: 3-4 sentences. State where the business stands relative to the answer-engine landscape, what's broken, and what the single highest-leverage move is.

Narrative: a 600-900 word piece in markdown covering all five pillars with specifics from the data. Use ## headings per pillar.

Return STRICT JSON matching the schema. No preamble. No trailing prose.`

const JSON_SCHEMA = `{
  "scorecard": {
    "seo": { "score": 0-100, "rationale": "string" },
    "aeo": { "score": 0-100, "rationale": "string" },
    "geo": { "score": 0-100, "rationale": "string" },
    "leadgen": { "score": 0-100, "rationale": "string" },
    "local": { "score": 0-100, "rationale": "string" }
  },
  "competitors": [
    { "name": "string", "domain": "string", "edges": ["string", "string", ...] }
  ],
  "prioritized_moves": [
    { "rank": 1-5, "title": "string", "why": "string", "how": "string",
      "impact": "high|medium|low", "effort": "low|medium|high",
      "pillar": "seo|aeo|geo|leadgen|local" }
  ],
  "executive_summary": "string",
  "narrative_markdown": "string"
}`

export interface SynthesisInput {
  job: Pick<AuditJobRow, 'clinic_name' | 'website_url' | 'specialty' | 'city' | 'state' | 'challenge'>
  crawl: CrawlPayload | null
  pagespeed: PagespeedPayload | null
  schema: SchemaPayload | null
  dataforseo: DataForSeoPayload | null
  geo: GeoPayload | null
  places: PlacesPayload | null
  leadgen: LeadgenPayload | null
}

export interface SynthesisResult {
  output: SynthesisOutput
  model: string
  input_tokens: number
  output_tokens: number
  cache_read_tokens: number
}

export async function synthesizeAudit(input: SynthesisInput): Promise<SynthesisResult> {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) throw new Error('ANTHROPIC_API_KEY missing')
  const client = new Anthropic({ apiKey })

  const userPayload = buildUserPayload(input)

  const msg = await client.messages.create({
    model: MODEL,
    max_tokens: 4096,
    system: [
      {
        type: 'text',
        text: FRAMEWORK + '\n\nResponse JSON schema:\n' + JSON_SCHEMA,
        cache_control: { type: 'ephemeral' },
      },
    ],
    messages: [
      {
        role: 'user',
        content: userPayload,
      },
    ],
  })

  const text = msg.content.map((c) => (c.type === 'text' ? c.text : '')).join('')
  const json = extractJson(text)
  const usage = msg.usage as { input_tokens?: number; output_tokens?: number; cache_read_input_tokens?: number; cache_creation_input_tokens?: number }
  return {
    output: json,
    model: MODEL,
    input_tokens: usage.input_tokens ?? 0,
    output_tokens: usage.output_tokens ?? 0,
    cache_read_tokens: usage.cache_read_input_tokens ?? 0,
  }
}

function buildUserPayload(input: SynthesisInput): string {
  // Strip noise: we hand the model trimmed JSON, not raw HTML or LLM transcripts.
  const trimmedGeo = input.geo ? {
    visibility_score: input.geo.visibility_score,
    queries: input.geo.queries,
    top_competitors_by_mention: Object.entries(input.geo.competitor_mention_counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([domain, count]) => ({ domain, count })),
    answers: input.geo.answers.map((a) => ({
      provider: a.provider,
      query: a.query,
      our_clinic_mentioned: a.our_clinic_mentioned,
      our_clinic_rank: a.our_clinic_rank,
      mentioned_clinics: a.mentioned_clinics.slice(0, 8),
      mentioned_domains: a.mentioned_domains.slice(0, 8),
    })),
  } : null

  const trimmedCrawl = input.crawl ? {
    page_count: input.crawl.pages.length,
    robots_txt_present: input.crawl.robots_txt_present,
    sitemap_present: input.crawl.sitemap_present,
    sitemap_url_count: input.crawl.sitemap_url_count,
    pages: input.crawl.pages.map((p) => ({
      url: p.url,
      title: p.title,
      meta_description: p.meta_description,
      h1_count: p.h1.length,
      h2_count: p.h2.length,
      word_count: p.word_count,
      has_jsonld: p.has_jsonld,
      jsonld_types: p.jsonld_types,
      images_missing_alt: p.images_missing_alt,
      images_total: p.images_total,
    })),
  } : null

  return [
    'BUSINESS:',
    JSON.stringify({
      name: input.job.clinic_name,
      website: input.job.website_url,
      specialty: input.job.specialty,
      city: input.job.city,
      state: input.job.state,
      challenge: input.job.challenge,
    }, null, 2),
    '',
    'CRAWL:',
    JSON.stringify(trimmedCrawl, null, 2),
    '',
    'PAGESPEED:',
    JSON.stringify(input.pagespeed, null, 2),
    '',
    'SCHEMA:',
    JSON.stringify(input.schema, null, 2),
    '',
    'DATAFORSEO:',
    JSON.stringify(input.dataforseo, null, 2),
    '',
    'GEO:',
    JSON.stringify(trimmedGeo, null, 2),
    '',
    'PLACES:',
    JSON.stringify(input.places, null, 2),
    '',
    'LEADGEN:',
    JSON.stringify(input.leadgen, null, 2),
  ].join('\n')
}

function extractJson(text: string): SynthesisOutput {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/)
  const candidate = (fenced?.[1] ?? text).trim()
  const firstBrace = candidate.indexOf('{')
  const lastBrace = candidate.lastIndexOf('}')
  if (firstBrace === -1 || lastBrace === -1) throw new Error('synthesis: no JSON in model output')
  return JSON.parse(candidate.slice(firstBrace, lastBrace + 1)) as SynthesisOutput
}
