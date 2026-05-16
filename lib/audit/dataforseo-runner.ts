import type { DataForSeoPayload, SerpQueryResult, Specialty, SerpResultItem } from './types'
import {
  backlinksSummary,
  buildPatientQueries,
  domainIntersection,
  rankedKeywords,
  referringDomains,
  searchVolume,
  serpGoogle,
} from './dataforseo'

interface RunDfsArgs {
  ourDomain: string
  competitorDomains: string[]
  specialty: Specialty
  city: string
  state?: string | null
}

function asArrayResult<T = unknown>(json: unknown): T[] {
  const j = json as { tasks?: Array<{ result?: T[] | null }> }
  return j.tasks?.[0]?.result ?? []
}

function hostFromUrl(url: string): string {
  try { return new URL(url).hostname.replace(/^www\./, '').toLowerCase() } catch { return '' }
}

function normDomain(d: string): string {
  return d.replace(/^https?:\/\//, '').replace(/^www\./, '').replace(/\/.*$/, '').toLowerCase()
}

export async function runDataForSeo(args: RunDfsArgs): Promise<DataForSeoPayload> {
  const our = normDomain(args.ourDomain)
  const locationName = args.state ? `${args.city},${args.state},United States` : `${args.city},United States`

  const [backlinksRaw, refDomsRaw, rankedRaw] = await Promise.all([
    backlinksSummary(our).catch(() => null),
    referringDomains(our, 25).catch(() => null),
    rankedKeywords(our, 2840, 200).catch(() => null),
  ])

  const backlinks = (asArrayResult<{ backlinks?: number; referring_domains?: number; referring_main_domains?: number; rank?: number }>(backlinksRaw)[0]) ?? {}
  const refDoms = asArrayResult<{ items?: Array<{ domain: string; rank: number; backlinks: number }> }>(refDomsRaw)[0]?.items ?? []
  const ranked = asArrayResult<{
    items?: Array<{
      keyword_data?: { keyword?: string; keyword_info?: { search_volume?: number; cpc?: number } }
      ranked_serp_element?: { serp_item?: { rank_group?: number; etv?: number } }
    }>
    items_count?: number
    metrics?: { organic?: { etv?: number } }
  }>(rankedRaw)[0]

  const topKeywords = (ranked?.items ?? []).slice(0, 25).map((row) => ({
    keyword: row.keyword_data?.keyword ?? '',
    rank: row.ranked_serp_element?.serp_item?.rank_group ?? 0,
    volume: row.keyword_data?.keyword_info?.search_volume ?? 0,
    cpc: row.keyword_data?.keyword_info?.cpc ?? 0,
  })).filter((k) => k.keyword)

  // Competitor gap
  const gap = await Promise.all(
    args.competitorDomains.map(async (comp) => {
      try {
        const res = await domainIntersection(our, normDomain(comp), 2840, 50)
        const items = asArrayResult<{
          items?: Array<{
            keyword_data?: { keyword?: string; keyword_info?: { search_volume?: number } }
            second_domain_serp_element?: { serp_item?: { rank_group?: number } }
            first_domain_serp_element?: { serp_item?: { rank_group?: number } }
          }>
        }>(res)[0]?.items ?? []
        return {
          competitor: normDomain(comp),
          gap_keywords: items.slice(0, 25).map((row) => ({
            keyword: row.keyword_data?.keyword ?? '',
            competitor_rank: row.second_domain_serp_element?.serp_item?.rank_group ?? 0,
            our_rank: row.first_domain_serp_element?.serp_item?.rank_group ?? null,
            volume: row.keyword_data?.keyword_info?.search_volume ?? 0,
          })).filter((k) => k.keyword),
        }
      } catch {
        return { competitor: normDomain(comp), gap_keywords: [] }
      }
    }),
  )

  // SERPs for ~12 patient queries (cost cap)
  const specialty = args.specialty === 'mixed' ? 'longevity' : args.specialty
  const queries = buildPatientQueries(specialty, args.city).slice(0, 12)
  const serps: SerpQueryResult[] = []
  for (const q of queries) {
    try {
      const res = await serpGoogle(q, locationName, 'desktop')
      const items = asArrayResult<{
        items?: Array<{ type: string; rank_absolute?: number; rank_group?: number; url?: string; title?: string; domain?: string; text?: string; items?: Array<{ title?: string }> }>
      }>(res)[0]?.items ?? []
      serps.push(parseSerp(q, items, our, args.competitorDomains.map(normDomain)))
    } catch {
      // skip query on error
    }
  }

  return {
    ranked_keywords_count: ranked?.items_count ?? 0,
    estimated_organic_traffic: Math.round(ranked?.metrics?.organic?.etv ?? 0),
    top_keywords: topKeywords,
    backlinks: {
      total: backlinks.backlinks ?? 0,
      referring_domains: backlinks.referring_domains ?? 0,
      referring_main_domains: backlinks.referring_main_domains ?? 0,
      rank: backlinks.rank ?? 0,
    },
    top_referring_domains: refDoms.slice(0, 15).map((r) => ({ domain: r.domain, rank: r.rank, backlinks: r.backlinks })),
    serps,
    competitor_gap: gap,
  }
}

function parseSerp(
  query: string,
  items: Array<{ type: string; rank_absolute?: number; rank_group?: number; url?: string; title?: string; domain?: string; text?: string; items?: Array<{ title?: string }> }>,
  ourDomain: string,
  competitorDomains: string[],
): SerpQueryResult {
  let aiOverviewPresent = false
  let aiOverviewText: string | null = null
  let featured: SerpResultItem | null = null
  const paa: string[] = []
  const localPack: SerpResultItem[] = []
  const organic: SerpResultItem[] = []

  for (const it of items) {
    if (it.type === 'ai_overview') {
      aiOverviewPresent = true
      aiOverviewText = it.text ?? null
    } else if (it.type === 'featured_snippet' && it.url) {
      featured = { rank: it.rank_group ?? 0, url: it.url, domain: it.domain ?? hostFromUrl(it.url), title: it.title ?? '' }
    } else if (it.type === 'people_also_ask') {
      for (const sub of it.items ?? []) if (sub.title) paa.push(sub.title)
    } else if (it.type === 'local_pack' && it.title) {
      localPack.push({ rank: it.rank_group ?? 0, url: it.url ?? '', domain: it.domain ?? '', title: it.title })
    } else if (it.type === 'organic' && it.url) {
      organic.push({ rank: it.rank_group ?? organic.length + 1, url: it.url, domain: it.domain ?? hostFromUrl(it.url), title: it.title ?? '' })
    }
  }

  const ourRank = organic.find((r) => r.domain === ourDomain || r.domain.endsWith(`.${ourDomain}`))?.rank ?? null
  const competitorsHit = [...new Set(organic.map((r) => r.domain).filter((d) => competitorDomains.includes(d)))]
  const aiMentionsUs = aiOverviewText ? new RegExp(`(${ourDomain.replace(/\./g, '\\.')})`, 'i').test(aiOverviewText) : false

  return {
    query,
    ai_overview_present: aiOverviewPresent,
    ai_overview_mentions_us: aiMentionsUs,
    ai_overview_text: aiOverviewText,
    featured_snippet: featured,
    people_also_ask: paa,
    local_pack: localPack,
    organic: organic.slice(0, 10),
    our_rank: ourRank,
    competitor_domains: competitorsHit,
  }
}
