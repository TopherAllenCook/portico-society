import Anthropic from '@anthropic-ai/sdk'
import type { RawClinic, WebsiteEnrichment, IcpScore } from './types'

/**
 * ICP scoring against PRODUCT.md's stated ideal customer:
 *
 *   - plumbing / HVAC / electrical / roofing / adjacent home services
 *   - revenue $1M+ (or $1k+/mo ad spend), 3+ years operating
 *   - already doing some marketing but not getting enough booked jobs
 *   - frustrated with shared-lead platforms and generalist agencies
 *
 * The signals we have to work with:
 *   - Google rating, review count, categories
 *   - Tech stack (booking widget, CMS, analytics)
 *   - Marketing signals (forms, CTAs, schema, blog, pixels)
 *   - Owner names (proxy for established practice with named providers)
 *
 * What we DON'T have without Clay/Apollo: revenue, employee count, years
 * operating. We proxy these from review count + domain age + categories.
 */

let client: Anthropic | null = null
function getClient(): Anthropic {
  if (client) return client
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) throw new Error('ANTHROPIC_API_KEY missing')
  client = new Anthropic({ apiKey })
  return client
}

const MODEL = 'claude-haiku-4-5-20251001' // cheap, fast scoring model

export interface ScoreArgs {
  place: RawClinic
  enrichment: WebsiteEnrichment | null
}

export async function scoreLead(args: ScoreArgs): Promise<IcpScore> {
  const c = getClient()
  const summary = buildSummary(args.place, args.enrichment)

  const msg = await c.messages.create({
    model: MODEL,
    max_tokens: 400,
    temperature: 0.2,
    system: `You are an ICP scorer for Verve MD, a marketing agency that serves home service businesses: plumbing, HVAC, electrical, roofing, and adjacent trades.

Verve's ideal customer:
- Trade: plumbing / HVAC / electrical / roofing / adjacent home services (not general contractors doing only new construction, not realtors, not retail)
- Revenue: $1M+ annual, or already spending $1,000+/month on ads (proxy: 100+ Google reviews AND professional website AND multiple crews/trucks)
- Maturity: 3+ years operating (proxy: established Google presence, complete About / Service-area pages)
- Already doing some marketing: has analytics installed, has forms, has online booking or a tracked phone number, runs ads or has content
- Frustrated with shared-lead platforms and generic agencies: sites with template/generic marketing infrastructure score higher on the "stuck and underserved" axis

Score 0-100. Anchors:
- 85-100: textbook ICP. Right trade, strong rating, lots of reviews, professional site, marketing infrastructure visible.
- 65-84: clear fit on trade, but some signals weak (e.g. low review count OR weak marketing infra OR generic-looking site).
- 40-64: adjacent trade (handyman or single-service operator) OR right trade but underdeveloped.
- 20-39: tangential (brand-new operator, hobbyist, no real web presence) OR fits trade but tiny/unestablished.
- 0-19: clearly out of scope (new-construction-only GCs, realtors, retail, unrelated businesses).

Be honest. A company with 8 reviews and no Service-area pages is not an 80, even if it's the right trade.

Output ONLY JSON in this exact shape:
{
  "score": <integer 0-100>,
  "reasoning": "<one or two sentences, internal, explaining the score>",
  "audit_finding": "<one prospect-safe sentence, written TO the owner, naming the single most compelling gap you can see>"
}

The "audit_finding" is dropped verbatim into a cold email, so it must follow Verve's voice exactly:
- One sentence, plain English, addressed to the owner ("your shop", "your site", "your business").
- Name a specific, observable gap from the data: not showing up when homeowners ask AI for their trade, no recent review replies, no online booking or fast lead capture, a generic template site, missing service-area pages, or similar. Use what the signals actually show.
- No em dashes, no exclamation points, no emojis, no made-up numbers or statistics, no hyperbole. Never invent specifics you cannot see in the data.
- If the signals are too thin to say anything specific, use exactly: "When homeowners ask AI for the best in your trade and city, the businesses that get named are the ones built to be read, and most shops have never checked where they land."`,
    messages: [{ role: 'user', content: summary }],
  })

  const text = msg.content
    .filter((b) => b.type === 'text')
    .map((b) => (b as { text: string }).text)
    .join('\n')
    .trim()

  return parseScore(text)
}

/* ─── Internal ──────────────────────────────────────────────────────────── */

function buildSummary(place: RawClinic, enrich: WebsiteEnrichment | null): string {
  const lines = [
    `Business: ${place.title}`,
    `Categories: ${(place.categories ?? []).join(', ') || '(none)'}`,
    `Address: ${place.address ?? '(unknown)'}`,
    `Phone: ${place.phone ?? '(none)'}`,
    `Website: ${place.website ?? '(none)'}`,
    `Google rating: ${place.totalScore ?? 'n/a'} (${place.reviewsCount ?? 0} reviews)`,
    `Search query that surfaced this: ${place.searchString ?? '(unknown)'}`,
  ]

  if (enrich) {
    lines.push('')
    lines.push('--- Website signals ---')
    lines.push(`Description: ${enrich.description ?? '(none)'}`)
    lines.push(
      `Tech stack: cms=${enrich.tech_stack.cms ?? 'none'}, booking=${enrich.tech_stack.booking_widget ?? 'none'}, chat=${enrich.tech_stack.chat_widget ?? 'none'}, analytics=[${enrich.tech_stack.analytics.join(', ')}]`,
    )
    lines.push(
      `Marketing: form=${enrich.marketing_signals.has_contact_form}, CTA-above-fold=${enrich.marketing_signals.cta_above_fold}, blog=${enrich.marketing_signals.has_blog}, schema=${enrich.marketing_signals.has_schema}, pixel=${enrich.marketing_signals.meta_pixel_present}`,
    )
    lines.push(`Named providers: ${enrich.owner_names.length > 0 ? enrich.owner_names.join(', ') : '(none found)'}`)
  } else {
    lines.push('')
    lines.push('--- Website signals ---')
    lines.push('(website scrape failed or no website on file)')
  }

  return lines.join('\n')
}

function parseScore(text: string): IcpScore {
  // Strip code fences if Claude wrapped the JSON.
  const cleaned = text.replace(/^```(?:json)?\s*/i, '').replace(/```$/i, '').trim()
  const m = cleaned.match(/\{[\s\S]*\}/)
  if (!m) return { score: 0, reasoning: 'parser failed to find JSON in scorer output', audit_finding: '' }
  try {
    const j = JSON.parse(m[0]) as { score?: unknown; reasoning?: unknown; audit_finding?: unknown }
    const score = typeof j.score === 'number' ? Math.max(0, Math.min(100, Math.round(j.score))) : 0
    const reasoning = typeof j.reasoning === 'string' ? j.reasoning.slice(0, 600) : ''
    const audit_finding = typeof j.audit_finding === 'string' ? j.audit_finding.slice(0, 300) : ''
    return { score, reasoning, audit_finding }
  } catch {
    return { score: 0, reasoning: 'parser failed: invalid JSON in scorer output', audit_finding: '' }
  }
}
