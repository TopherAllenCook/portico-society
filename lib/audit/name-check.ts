import { providers, extractClinicNames } from './geo'
import type { Specialty } from './types'

/**
 * AI Name Check — the lightweight, top-of-funnel sibling of the full GEO audit.
 *
 * It asks each enabled answer engine ONE homeowner question ("who is the best
 * {trade} near me in {city}?") and reports, honestly, whether the owner's
 * business is named and which businesses come up instead. It reuses the exact
 * same providers as `runGeo`, so the bait and the audit always query the same
 * engines (no seam between what the Name Check shows and what the audit scores).
 *
 * Honesty rules baked in (these are the whole point for a skeptical, burned-by-
 * hype owner):
 *   - We report only the engines that actually returned an answer this run, and
 *     say plainly when one could not be reached.
 *   - We label each engine and whether it answered with a LIVE web search or
 *     from the model's training knowledge. Claude (Anthropic) runs without a
 *     web-search tool here, so its answer is from training knowledge, not a
 *     live homeowner-style search. We surface that distinction rather than
 *     dressing a from-memory answer up as "what your customer sees live."
 */

export interface EngineNameCheck {
  provider: 'openai' | 'anthropic' | 'perplexity' | 'gemini'
  label: string // human-facing engine name
  grounded: boolean // true = answered with a live web search; false = from training knowledge
  reachable: boolean // did it return a usable answer this run
  named: boolean // was the owner's business named
  rank: number | null // 1-based position in the engine's list, if named
  companies: string[] // the businesses the engine named, in order
  latency_ms: number
}

export interface NameCheckResult {
  business: string
  city: string
  trade: Specialty
  query: string
  engines: EngineNameCheck[]
  named_anywhere: boolean
  engines_returned: number
}

const ENGINE_META: Record<EngineNameCheck['provider'], { label: string; grounded: boolean }> = {
  openai: { label: 'ChatGPT', grounded: true },
  anthropic: { label: 'Claude', grounded: false },
  perplexity: { label: 'Perplexity', grounded: true },
  gemini: { label: 'Google (Gemini)', grounded: true },
}

const TRADE_NOUN: Record<Specialty, string> = {
  plumbing: 'plumber',
  hvac: 'HVAC company',
  electrical: 'electrician',
  roofing: 'roofing company',
  other: 'home services company',
}

// Generic words that should not, on their own, count as a name match.
const GENERIC_TOKENS = new Set([
  'the', 'and', 'of', 'for', 'your', 'home', 'services', 'service', 'company', 'co',
  'plumbing', 'plumber', 'hvac', 'heating', 'cooling', 'air', 'electric', 'electrical',
  'electrician', 'roofing', 'roofer', 'mechanical', 'pro', 'pros',
])

function normalizeName(s: string): string {
  return s
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9 ]+/g, ' ')
    .replace(/\b(llc|inc|incorporated|corp|co|company|ltd)\b/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

/**
 * Returns the 1-based rank of the owner's business in a list of named companies,
 * or null if it is not present. Matches on a full normalized substring (either
 * direction) or, as a fallback, on at least two distinctive (non-generic) tokens
 * appearing in a candidate, so a single common word does not trigger a match.
 */
function matchRank(business: string, companies: string[]): number | null {
  const nb = normalizeName(business)
  if (nb.length < 3) return null
  const bizTokens = nb.split(' ').filter((t) => t.length >= 3 && !GENERIC_TOKENS.has(t))
  for (let i = 0; i < companies.length; i++) {
    const nc = normalizeName(companies[i])
    if (!nc) continue
    if (nc.includes(nb) || nb.includes(nc)) return i + 1
    if (bizTokens.length >= 2 && bizTokens.every((t) => nc.includes(t))) return i + 1
  }
  return null
}

export async function runNameCheck(args: {
  business: string
  city: string
  trade: Specialty
}): Promise<NameCheckResult> {
  const noun = TRADE_NOUN[args.trade] ?? TRADE_NOUN.other
  const query =
    `A homeowner in ${args.city} asks an AI assistant: who is the best ${noun} near me? ` +
    `List the specific local businesses you would recommend, by name.`

  const enabled = providers.filter((p) => p.enabled())
  if (enabled.length === 0) {
    throw new Error('No AI engines enabled — set ANTHROPIC_API_KEY at minimum')
  }

  // One call per engine, run concurrently. A single engine failing must not
  // sink the others; it is reported as "could not be reached" instead.
  const settled = await Promise.allSettled(enabled.map((p) => p.call(query)))

  const engines: EngineNameCheck[] = enabled.map((p, i) => {
    const meta = ENGINE_META[p.name]
    const r = settled[i]
    const usable = r.status === 'fulfilled' && !!r.value.text && !r.value.text.startsWith('ERROR')
    if (!usable) {
      return {
        provider: p.name,
        label: meta.label,
        grounded: meta.grounded,
        reachable: false,
        named: false,
        rank: null,
        companies: [],
        latency_ms: r.status === 'fulfilled' ? r.value.latencyMs : 0,
      }
    }
    const companies = extractClinicNames(r.value.text).slice(0, 8)
    const rank = matchRank(args.business, companies)
    return {
      provider: p.name,
      label: meta.label,
      grounded: meta.grounded,
      reachable: true,
      named: rank !== null,
      rank,
      companies,
      latency_ms: r.value.latencyMs,
    }
  })

  return {
    business: args.business,
    city: args.city,
    trade: args.trade,
    query,
    engines,
    named_anywhere: engines.some((e) => e.named),
    engines_returned: engines.filter((e) => e.reachable).length,
  }
}
