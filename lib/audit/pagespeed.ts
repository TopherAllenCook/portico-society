import type { PagespeedPayload } from './types'

/**
 * Google PageSpeed Insights API — free with API key (high quota).
 * Env: PAGESPEED_API_KEY
 *
 * Strategy: run mobile (this is what most patients see) and pull the four
 * Lighthouse category scores + Core Web Vitals from the loadingExperience block.
 */
export async function runPagespeed(url: string): Promise<PagespeedPayload> {
  const key = process.env.PAGESPEED_API_KEY
  const endpoint = new URL('https://www.googleapis.com/pagespeedonline/v5/runPagespeed')
  endpoint.searchParams.set('url', url)
  endpoint.searchParams.set('strategy', 'mobile')
  for (const cat of ['performance', 'accessibility', 'best-practices', 'seo']) {
    endpoint.searchParams.append('category', cat)
  }
  if (key) endpoint.searchParams.set('key', key)

  const res = await fetch(endpoint.toString())
  if (!res.ok) throw new Error(`PageSpeed ${res.status}: ${await res.text()}`)
  const json = await res.json() as {
    lighthouseResult?: {
      categories?: Record<string, { score?: number }>
    }
    loadingExperience?: {
      metrics?: Record<string, { percentile?: number }>
    }
  }

  const cats = json.lighthouseResult?.categories ?? {}
  const cwv = json.loadingExperience?.metrics ?? {}

  return {
    url,
    performance: Math.round((cats.performance?.score ?? 0) * 100),
    accessibility: Math.round((cats.accessibility?.score ?? 0) * 100),
    best_practices: Math.round((cats['best-practices']?.score ?? 0) * 100),
    seo: Math.round((cats.seo?.score ?? 0) * 100),
    lcp_ms: cwv['LARGEST_CONTENTFUL_PAINT_MS']?.percentile ?? null,
    inp_ms: cwv['INTERACTION_TO_NEXT_PAINT']?.percentile ?? null,
    cls: cwv['CUMULATIVE_LAYOUT_SHIFT_SCORE']?.percentile != null
      ? cwv['CUMULATIVE_LAYOUT_SHIFT_SCORE'].percentile / 100
      : null,
    ttfb_ms: cwv['EXPERIMENTAL_TIME_TO_FIRST_BYTE']?.percentile ?? null,
  }
}
