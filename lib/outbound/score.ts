import Anthropic from '@anthropic-ai/sdk'
import type { RawClinic, WebsiteEnrichment, IcpScore } from './types'

/**
 * ICP scoring against PRODUCT.md's stated ideal customer:
 *
 *   - longevity / concierge medicine / aesthetic practices
 *   - revenue $1M+, 3+ years operating
 *   - already doing some marketing but not getting the right patients
 *   - sophisticated buyers — frustrated with generalist agencies
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
    system: `You are an ICP scorer for Verve MD, a brand strategy agency that serves longevity, concierge medicine, and aesthetic clinics.

Verve's ideal customer:
- Specialty: longevity / concierge medicine / aesthetic medicine (not general primary care, not chiropractors, not dentists)
- Revenue: $1M+ annual (proxy: 100+ Google reviews AND professional website AND named providers)
- Maturity: 3+ years operating (proxy: established Google presence, complete About / Team pages)
- Already doing some marketing: has analytics installed, has forms, has booking widget, has blog or content
- Frustrated with generic agencies: this is harder to detect, but sites with marketing infrastructure that LOOKS template/generic score lower on the "stuck" axis

Score 0-100. Anchors:
- 85-100: textbook ICP. Right specialty, strong rating, lots of reviews, professional site, marketing infrastructure visible.
- 65-84: clear fit on specialty, but some signals weak (e.g. low review count OR weak marketing infra OR generic-looking site).
- 40-64: adjacent specialty (med spa that does aesthetic but no other longevity/concierge signals) OR right specialty but underdeveloped.
- 20-39: tangential (general wellness, IV bars, etc.) OR fits specialty but tiny/unestablished.
- 0-19: clearly out of scope (dental, primary care, dermatology surgical-only, chiropractic, vet, etc.)

Be honest. A clinic with 8 reviews and no Team page is not an 80, even if it's the right specialty.

Output ONLY JSON in this exact shape:
{
  "score": <integer 0-100>,
  "reasoning": "<one or two sentences explaining the score>"
}`,
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
    `Clinic: ${place.title}`,
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
  if (!m) return { score: 0, reasoning: 'parser failed to find JSON in scorer output' }
  try {
    const j = JSON.parse(m[0]) as { score?: unknown; reasoning?: unknown }
    const score = typeof j.score === 'number' ? Math.max(0, Math.min(100, Math.round(j.score))) : 0
    const reasoning = typeof j.reasoning === 'string' ? j.reasoning.slice(0, 600) : ''
    return { score, reasoning }
  } catch {
    return { score: 0, reasoning: 'parser failed: invalid JSON in scorer output' }
  }
}
