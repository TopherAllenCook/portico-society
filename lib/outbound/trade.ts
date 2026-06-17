/**
 * Classify a home-services company into trade families from its business name.
 *
 * The outbound scraper and the n8n "Mockup Autopilot" ICP Gate don't know a
 * prospect's actual trade — the gate hardcodes specialty:'hvac' — so the mockup
 * template was rendering plumbers, electricians, and multi-trade shops as HVAC
 * companies ("Johnson Plumbing" got a "Reno Heating & Air" homepage). The
 * business name is the most reliable trade signal we have, so the preview
 * derives trade from it at render time. Falls back to HVAC (the dominant ICP)
 * when no trade word is present.
 */

export type TradeFamily = 'hvac' | 'plumbing' | 'electrical' | 'roofing'

const PATTERNS: Array<{ family: TradeFamily; re: RegExp }> = [
  { family: 'plumbing', re: /plumb/i },
  { family: 'electrical', re: /electric/i },
  { family: 'roofing', re: /\broof/i },
  {
    family: 'hvac',
    re: /h\.?v\.?a\.?c|heating|cooling|air\s*condition|a\/c|furnace|refrigerat|climate|comfort|mechanical|temperature/i,
  },
]

// Canonical display order when a name spans multiple trades.
const ORDER: TradeFamily[] = ['hvac', 'plumbing', 'electrical', 'roofing']

export interface TradeClassification {
  families: TradeFamily[]
  primary: TradeFamily
  isMulti: boolean
}

export function classifyTrade(name: string | null | undefined): TradeClassification {
  const hay = name ?? ''
  const hits = new Set<TradeFamily>()
  for (const { family, re } of PATTERNS) {
    if (re.test(hay)) hits.add(family)
  }
  const families = ORDER.filter((f) => hits.has(f))
  if (families.length === 0) return { families: ['hvac'], primary: 'hvac', isMulti: false }
  return { families, primary: families[0], isMulti: families.length >= 2 }
}

/** DB-stored specialty value: a single family, or 'multi' for cross-trade shops. */
export function specialtyFor(name: string | null | undefined): TradeFamily | 'multi' {
  const c = classifyTrade(name)
  return c.isMulti ? 'multi' : c.primary
}
