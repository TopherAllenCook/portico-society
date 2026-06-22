import Anthropic from '@anthropic-ai/sdk'
import type { GeoPayload, LlmAnswer, Specialty } from './types'
import { buildPatientQueries } from './dataforseo'

/**
 * GEO module — Generative Engine Optimization visibility check.
 *
 * Asks each of the major answer engines a set of "homeowner finding a contractor" questions
 * and parses whether the business + competitors are named.
 *
 * Providers:
 *   - Anthropic (Claude Sonnet 4.6) — required, default
 *   - OpenAI    (ChatGPT)            — optional, env OPENAI_API_KEY
 *   - Perplexity                     — optional, env PERPLEXITY_API_KEY
 *   - Gemini                         — optional, env GOOGLE_API_KEY
 *
 * Each provider gets the same prompt: "give me the top companies for X in {city}."
 * We then extract domain mentions, citation URLs, and the rank of our business if present.
 */

const SYSTEM_PROMPT = `You are a research assistant helping a homeowner choose a local home service company. List up to 8 specific named companies with their websites, ranked by reputation and fit. Output as a JSON array: [{"name": "...", "website": "https://...", "city": "...", "why": "..."}, ...]. Only return the JSON array, no preamble.`

interface ProviderConfig {
  name: LlmAnswer['provider']
  model: string
  enabled: () => boolean
  call: (query: string) => Promise<{ text: string; citations: string[]; latencyMs: number }>
}

export const providers: ProviderConfig[] = [
  {
    name: 'anthropic',
    model: 'claude-sonnet-4-6',
    enabled: () => !!process.env.ANTHROPIC_API_KEY,
    call: async (query) => {
      const t0 = Date.now()
      const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
      const msg = await client.messages.create({
        model: 'claude-sonnet-4-6',
        max_tokens: 1024,
        system: SYSTEM_PROMPT,
        messages: [{ role: 'user', content: query }],
      })
      const text = msg.content.map((c) => (c.type === 'text' ? c.text : '')).join('')
      return { text, citations: [], latencyMs: Date.now() - t0 }
    },
  },
  {
    name: 'openai',
    model: 'gpt-4o-search-preview',
    enabled: () => !!process.env.OPENAI_API_KEY,
    call: async (query) => {
      const t0 = Date.now()
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o-search-preview',
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            { role: 'user', content: query },
          ],
          web_search_options: {},
        }),
      })
      if (!res.ok) throw new Error(`OpenAI ${res.status}: ${await res.text()}`)
      const json = await res.json() as {
        choices?: Array<{
          message?: {
            content?: string
            annotations?: Array<{ type: string; url_citation?: { url: string } }>
          }
        }>
      }
      const msg = json.choices?.[0]?.message
      const text = msg?.content ?? ''
      const citations = (msg?.annotations ?? [])
        .filter((a) => a.type === 'url_citation' && a.url_citation?.url)
        .map((a) => a.url_citation!.url)
      return { text, citations, latencyMs: Date.now() - t0 }
    },
  },
  {
    name: 'perplexity',
    model: 'sonar-pro',
    enabled: () => !!process.env.PERPLEXITY_API_KEY,
    call: async (query) => {
      const t0 = Date.now()
      const res = await fetch('https://api.perplexity.ai/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.PERPLEXITY_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'sonar-pro',
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            { role: 'user', content: query },
          ],
        }),
      })
      if (!res.ok) throw new Error(`Perplexity ${res.status}: ${await res.text()}`)
      const json = await res.json() as {
        choices?: Array<{ message?: { content?: string } }>
        citations?: string[]
      }
      const text = json.choices?.[0]?.message?.content ?? ''
      const citations = json.citations ?? []
      return { text, citations, latencyMs: Date.now() - t0 }
    },
  },
  {
    name: 'gemini',
    model: 'gemini-2.0-flash',
    enabled: () => !!process.env.GOOGLE_API_KEY,
    call: async (query) => {
      const t0 = Date.now()
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GOOGLE_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
            contents: [{ role: 'user', parts: [{ text: query }] }],
            tools: [{ google_search: {} }],
          }),
        },
      )
      if (!res.ok) throw new Error(`Gemini ${res.status}: ${await res.text()}`)
      const json = await res.json() as {
        candidates?: Array<{
          content?: { parts?: Array<{ text?: string }> }
          groundingMetadata?: { groundingChunks?: Array<{ web?: { uri?: string } }> }
        }>
      }
      const candidate = json.candidates?.[0]
      const text = candidate?.content?.parts?.map((p) => p.text).filter(Boolean).join('\n') ?? ''
      const citations = (candidate?.groundingMetadata?.groundingChunks ?? [])
        .map((c) => c.web?.uri)
        .filter((u): u is string => !!u)
      return { text, citations, latencyMs: Date.now() - t0 }
    },
  },
]

function extractDomains(text: string, extra: string[] = []): string[] {
  const urlRe = /https?:\/\/(?:www\.)?([a-z0-9.-]+\.[a-z]{2,})(?:\/[^\s)\]"']*)?/gi
  const out = new Set<string>()
  let m: RegExpExecArray | null
  while ((m = urlRe.exec(text)) !== null) out.add(m[1].toLowerCase())
  for (const c of extra) {
    try { out.add(new URL(c).hostname.replace(/^www\./, '').toLowerCase()) } catch { /* ignore */ }
  }
  return [...out]
}

export function extractClinicNames(text: string): string[] {
  // Pull names from a JSON array if present; otherwise grab title-cased phrases.
  try {
    const match = text.match(/\[[\s\S]*\]/)
    if (match) {
      const arr = JSON.parse(match[0]) as Array<{ name?: string }>
      return arr.map((a) => a.name).filter((n): n is string => !!n)
    }
  } catch { /* fall through */ }
  const names = new Set<string>()
  for (const line of text.split('\n')) {
    const m = line.match(/^\s*\d+\.\s+\*?\*?([A-Z][^*\n:.,]+?)\*?\*?(?:[:.,—-]|\s+\(|\s+is\b|\s+offers\b|$)/)
    if (m) names.add(m[1].trim())
  }
  return [...names]
}

function rankOfDomain(domains: string[], target: string): number | null {
  const norm = target.replace(/^www\./, '').toLowerCase()
  const idx = domains.findIndex((d) => d === norm || d.endsWith(`.${norm}`) || norm.endsWith(`.${d}`))
  return idx === -1 ? null : idx + 1
}

export async function runGeo(args: {
  ourDomain: string
  specialty: Specialty
  city: string
}): Promise<GeoPayload> {
  const specialty = args.specialty === 'other' ? 'plumbing' : args.specialty
  const queries = buildPatientQueries(specialty, args.city)
  const enabled = providers.filter((p) => p.enabled())
  if (enabled.length === 0) throw new Error('No GEO providers enabled — set ANTHROPIC_API_KEY at minimum')

  const answers: LlmAnswer[] = []
  for (const provider of enabled) {
    for (const query of queries) {
      try {
        const { text, citations, latencyMs } = await provider.call(query)
        const mentionedDomains = extractDomains(text, citations)
        const mentionedClinics = extractClinicNames(text)
        answers.push({
          provider: provider.name,
          model: provider.model,
          query,
          raw_text: text,
          mentioned_domains: mentionedDomains,
          mentioned_clinics: mentionedClinics,
          cited_sources: citations,
          our_clinic_mentioned: rankOfDomain(mentionedDomains, args.ourDomain) !== null,
          our_clinic_rank: rankOfDomain(mentionedDomains, args.ourDomain),
          latency_ms: latencyMs,
        })
      } catch (err) {
        answers.push({
          provider: provider.name,
          model: provider.model,
          query,
          raw_text: `ERROR: ${(err as Error).message}`,
          mentioned_domains: [],
          mentioned_clinics: [],
          cited_sources: [],
          our_clinic_mentioned: false,
          our_clinic_rank: null,
          latency_ms: 0,
        })
      }
    }
  }

  const total = answers.length || 1
  const hits = answers.filter((a) => a.our_clinic_mentioned).length
  const visibility = Math.round((hits / total) * 100)

  const competitorCounts: Record<string, number> = {}
  for (const a of answers) {
    for (const d of a.mentioned_domains) {
      if (d.includes(args.ourDomain.replace(/^www\./, ''))) continue
      competitorCounts[d] = (competitorCounts[d] ?? 0) + 1
    }
  }

  return {
    queries,
    answers,
    visibility_score: visibility,
    competitor_mention_counts: competitorCounts,
  }
}

/**
 * Derive the top 3 competitor domains from GEO mention frequency.
 * The orchestrator passes these into the DataForSEO + crawl modules.
 */
export function topCompetitorsFromGeo(geo: GeoPayload, limit = 3): { domain: string; mentions: number }[] {
  return Object.entries(geo.competitor_mention_counts)
    .sort((a, b) => b[1] - a[1])
    .filter(([d]) => !COMMON_NON_BUSINESS_DOMAINS.has(d))
    .slice(0, limit)
    .map(([domain, mentions]) => ({ domain, mentions }))
}

const COMMON_NON_BUSINESS_DOMAINS = new Set([
  'google.com', 'yelp.com', 'wikipedia.org',
  'facebook.com', 'instagram.com', 'youtube.com', 'reddit.com', 'forbes.com',
  'angi.com', 'angieslist.com', 'homeadvisor.com', 'thumbtack.com', 'bbb.org',
  'houzz.com', 'nextdoor.com', 'yellowpages.com', 'porch.com', 'networx.com',
])
