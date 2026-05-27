import Anthropic from '@anthropic-ai/sdk'
import type {
  CompetitorCrawlPayload,
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
const FRAMEWORK = `You are the senior auditor for Verve MD, a clinic marketing agency for longevity, concierge, and aesthetic practices.

Brand voice:
- Restraint over abundance. One precise sentence beats three vague ones.
- Confidence without hyperbole. No "revolutionary," "best-in-class," "unparalleled."
- NEVER use em dashes ("—") or en dashes ("–"). Also not double hyphens ("--"). Use commas, colons, semicolons, periods, or parentheses instead. This applies to every field you return, including narrative_markdown.
- No exclamation points. No emojis. No "we believe" language.
- Outcomes in business terms: inquiry volume, inquiry quality, cost per consult, LTV, revenue per patient.
- Trade-journal tone. Clinical precision. Financial Times, not TechCrunch.

Audit structure (5 pillars):
  SEO   : technical + on-page + authority (backlinks, ranked keywords, schema, Core Web Vitals)
  AEO   : featured snippets, PAA, AI overview presence, FAQ schema, definition-style answers
  GEO   : visibility inside ChatGPT, Claude, Perplexity, Gemini answers
  LEAD  : inquiry architecture (CTAs, forms, booking widget, analytics tagging, mobile friction)
  LOCAL : Google Business Profile completeness, reviews, local pack ranking, NAP consistency

For each pillar return a 0-100 score and a single-sentence rationale grounded in the data provided. Do not invent metrics. If a pillar has no data, score 0 and say "insufficient data, requires manual pass."

Prioritized moves: rank exactly 5 moves by impact/effort ratio. Each move has:
- a title (<=8 words),
- a one-sentence "why" anchored in a specific finding from the data,
- a one-sentence "how" describing what Verve would do,
- a "steps" array of 4-6 concrete sub-tasks the practice's own team could check off (verb-led, specific, plays out in days/weeks, references real tools or platforms by name where relevant).
No generic best-practices. Cite the specific competitor, query, or page that motivates the move. Steps must be actionable enough for a non-marketing operations lead to execute against without further interpretation.

Competitors: name the top 3 by GEO mention frequency. For each, list 2-4 specific edges drawn from the data (e.g. "ranks #1 for 'hormone optimization austin', cited by ChatGPT in 6/8 queries"). When COMPETITOR_CRAWL data is present, prefer edges that cite specific schema types they expose and the practice does not, or word-count / content depth differences from the crawled pages: these are verifiable and stronger than visibility claims.

Executive summary: 3-4 sentences. State where the practice stands relative to the answer-engine landscape, what's broken, and what the single highest-leverage move is.

Overall narrative: ONE sentence (15-30 words). The "what this score means in plain English" line that sits next to the overall readiness number. Grounded in this specific clinic's data, not generic.

Narrative: a 600-900 word piece in markdown covering all five pillars with specifics from the data. Use ## headings per pillar. DO NOT include "How to read the scorecard" or any explainer of the scoring system, the UI shows a separate scoring legend, so this would duplicate.

Recommended package: Verve offers three monthly retainers.
- Essential ($1,500/mo): foundation for visibility. Website upkeep, SEO + AEO, Google Business Profile, automated review requests, live ranking dashboard.
- Growth ($3,500/mo): everything in Essential, plus Google and Meta PPC managed by med-spa specialists, AI ad creative and A/B testing, landing pages + CRO, content engine (4 blogs + monthly email + social copy), AI lead nurture (Day 1, 3, 7, 14 follow-up sequences).
- Full Service ($6,500/mo): everything in Growth, plus AI Patient Agent (24/7 voice, web chat, WhatsApp, Instagram DMs), AI no-show recovery + retention engine, AI social animations and short-form video, dedicated strategy lead.

Pick the best fit for THIS clinic based on the audit:
- "essential" if their main gap is visibility (low SEO, AEO, GEO, weak local presence) and they have minimal paid spend or sales infrastructure to enhance.
- "growth" if visibility is at least adequate but they need active acquisition (PPC, landing pages, content), or they are running ads with no clear attribution, or their inquiry volume is too low to optimize from.
- "full_service" if acquisition exists but they lose leads to slow follow-up, missed calls, no-shows, or weak retention. Signals: clear paid spend or solid SEO baseline but weak leadgen score, low ratings volume, no booking widget, no chat widget.

Output recommended_package with:
- tier: one of essential, growth, or full_service.
- why: ONE sentence anchored to a specific finding from THIS audit (the scorecard, the moves, the competitor evidence, the leadgen state). Not generic.
- estimated_lift: ONE sentence in plain business terms about a realistic outcome (inquiry volume, cost per consult, no-show recovery rate). No hyperbole, no specific dollar promises.

Closing CTA: A 2-3 sentence personalized closing paragraph addressed to the founder. State what you found, what is most urgent, and invite them to book a 15-minute discovery call. Use natural, specific framing for this clinic (their city, their specialty, what is broken). Mention the recommended package by name (Essential, Growth, or Full Service) in context. The UI renders a prominent "Book a 15-minute discovery call" button immediately below this paragraph, so do NOT end with that exact phrase, do not include link text, and do not write a sign-off line. End mid-thought on the strongest, most specific sentence. No exclamation. No emoji. Trade-journal tone.

Return STRICT JSON matching the schema. No preamble. No trailing prose.`

// JSON Schema for tool-use forced structured output. Eliminates malformed-JSON
// failures the previous text-parsing approach was prone to (unescaped chars in
// narrative_markdown, missing commas, trailing commas, etc.).
const scoreObj = {
  type: 'object',
  required: ['score', 'rationale'],
  properties: {
    score: { type: 'integer', minimum: 0, maximum: 100 },
    rationale: { type: 'string' },
  },
} as const

const AUDIT_TOOL_SCHEMA = {
  type: 'object',
  required: [
    'scorecard',
    'competitors',
    'prioritized_moves',
    'executive_summary',
    'narrative_markdown',
    'recommended_package',
    'closing_cta',
  ],
  properties: {
    scorecard: {
      type: 'object',
      required: ['seo', 'aeo', 'geo', 'leadgen', 'local'],
      properties: {
        seo: scoreObj,
        aeo: scoreObj,
        geo: scoreObj,
        leadgen: scoreObj,
        local: scoreObj,
      },
    },
    competitors: {
      type: 'array',
      items: {
        type: 'object',
        required: ['name', 'domain', 'edges'],
        properties: {
          name: { type: 'string' },
          domain: { type: 'string' },
          edges: { type: 'array', items: { type: 'string' } },
        },
      },
    },
    prioritized_moves: {
      type: 'array',
      items: {
        type: 'object',
        required: ['rank', 'title', 'why', 'how', 'impact', 'effort', 'pillar'],
        properties: {
          rank: { type: 'integer', minimum: 1, maximum: 5 },
          title: { type: 'string' },
          why: { type: 'string' },
          how: { type: 'string' },
          impact: { type: 'string', enum: ['high', 'medium', 'low'] },
          effort: { type: 'string', enum: ['low', 'medium', 'high'] },
          pillar: { type: 'string', enum: ['seo', 'aeo', 'geo', 'leadgen', 'local'] },
          steps: { type: 'array', items: { type: 'string' } },
        },
      },
    },
    executive_summary: { type: 'string' },
    overall_narrative: { type: 'string' },
    narrative_markdown: { type: 'string' },
    recommended_package: {
      type: 'object',
      required: ['tier', 'why', 'estimated_lift'],
      properties: {
        tier: { type: 'string', enum: ['essential', 'growth', 'full_service'] },
        why: { type: 'string' },
        estimated_lift: { type: 'string' },
      },
    },
    closing_cta: { type: 'string' },
  },
} as const

export interface SynthesisInput {
  job: Pick<AuditJobRow, 'clinic_name' | 'website_url' | 'specialty' | 'city' | 'state' | 'challenge'>
  crawl: CrawlPayload | null
  pagespeed: PagespeedPayload | null
  schema: SchemaPayload | null
  dataforseo: DataForSeoPayload | null
  geo: GeoPayload | null
  places: PlacesPayload | null
  leadgen: LeadgenPayload | null
  competitor_crawl: CompetitorCrawlPayload | null
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
    // Audit JSON includes a 600-900 word markdown narrative + 5 prioritized
    // moves each with a 4-6 item checklist. 4096 was tight; 8192 leaves room.
    max_tokens: 8192,
    system: [
      {
        type: 'text',
        text: FRAMEWORK,
        cache_control: { type: 'ephemeral' },
      },
    ],
    tools: [
      {
        name: 'submit_audit',
        description: 'Return the structured Verve audit synthesis for this clinic.',
        input_schema: AUDIT_TOOL_SCHEMA as never,
      },
    ],
    tool_choice: { type: 'tool', name: 'submit_audit' },
    messages: [
      {
        role: 'user',
        content: userPayload,
      },
    ],
  })

  const toolUse = msg.content.find((c) => c.type === 'tool_use') as
    | { type: 'tool_use'; input: SynthesisOutput }
    | undefined
  if (!toolUse) {
    throw new Error('synthesis: model did not return submit_audit tool call')
  }
  const usage = msg.usage as {
    input_tokens?: number
    output_tokens?: number
    cache_read_input_tokens?: number
    cache_creation_input_tokens?: number
  }
  return {
    output: toolUse.input,
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
    'CLINIC:',
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
    '',
    'COMPETITOR_CRAWL:',
    JSON.stringify(input.competitor_crawl, null, 2),
  ].join('\n')
}

