/**
 * Pre-call triage heuristics: the "precursor audit" that scores how much
 * visible marketing pain a prospect has, from nothing but their website and
 * Google listing. Mirror of scripts/triage-prospects.mjs so the same scoring
 * runs from n8n via POST /api/outbound/triage-lead.
 *
 * Free to run per lead: one HTML fetch + (optionally) one Places details call.
 */

export interface TriageInput {
  website?: string | null
  place_id?: string | null
  rating?: number | null
  reviews?: number | null
}

export interface TriageResult {
  score: number
  tier: 'Hot' | 'Warm' | 'Cool'
  flags: string[]
  summary: string
  track: 'AUDIT' | 'MOCKUP'
  notes: string[]
}

import net from 'node:net'
import dns from 'node:dns/promises'

// HTTP statuses that mean "live but bot-protected", not "dead". A WAF/Cloudflare
// challenge from a datacenter IP is the common case for SMB sites and must NOT
// be scored as Dead Website (which would flip the lead to the mockup track with
// a false "your site is down" talking point).
const BLOCKED_STATUSES = new Set([401, 403, 406, 429])

/** Reject loopback / private / link-local / reserved IPs (SSRF guard). */
function ipIsBlocked(ip: string): boolean {
  const v = ip.startsWith('::ffff:') && ip.includes('.') ? ip.slice(7) : ip
  if (net.isIPv4(v)) {
    const [a, b] = v.split('.').map(Number)
    if (a === 0 || a === 10 || a === 127) return true
    if (a === 169 && b === 254) return true // link-local + 169.254.169.254 metadata
    if (a === 172 && b >= 16 && b <= 31) return true
    if (a === 192 && b === 168) return true
    if (a === 100 && b >= 64 && b <= 127) return true // CGNAT
    if (a >= 224) return true // multicast / reserved
    return false
  }
  if (net.isIPv6(ip)) {
    const lc = ip.toLowerCase()
    if (lc === '::1' || lc === '::') return true
    if (lc.startsWith('fc') || lc.startsWith('fd')) return true // ULA
    if (/^fe[89ab]/.test(lc)) return true // link-local
    return false
  }
  return true
}

async function assertPublicUrl(raw: string): Promise<URL> {
  const u = new URL(raw)
  if (u.protocol !== 'http:' && u.protocol !== 'https:') throw new Error('bad_scheme')
  if (net.isIP(u.hostname)) {
    if (ipIsBlocked(u.hostname)) throw new Error('blocked_host')
    return u
  }
  const recs = await dns.lookup(u.hostname, { all: true })
  if (!recs.length) throw new Error('no_dns')
  for (const r of recs) if (ipIsBlocked(r.address)) throw new Error('blocked_host')
  return u
}

const UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36'

const WEIGHTS: Record<string, number> = {
  'No Website': 40,
  'Dead Website': 35,
  'No HTTPS': 8,
  'Not Mobile Friendly': 12,
  'Dated Site': 8,
  'DIY Site Builder': 6,
  'No Analytics': 8,
  'No Ad Pixels': 10,
  'No Lead Capture': 8,
  'GMB Missing Website': 10,
  'GMB Thin Profile': 8,
  'Low Reviews': 6,
  'Weak Rating': 4,
}

const BUILDER_PATTERNS: Array<[string, RegExp]> = [
  ['Wix', /wixstatic\.com|wix\.com\/website/i],
  ['GoDaddy Builder', /wsimg\.com|godaddy\.com\/websites/i],
  ['Weebly', /weebly\.com|editmysite\.com/i],
  ['Squarespace', /squarespace\.com|sqsp\.net/i],
  ['Duda', /dudamobile|duda\.co|cdn-website\.com/i],
  ['Jimdo', /jimdo/i],
  ['SITE123', /site123/i],
  ['Homestead', /homestead\.com/i],
]

const FLAG_TALKING_POINTS: Record<string, string> = {
  'No Website': 'No website at all: invisible to anyone who searches beyond the map pin.',
  'Dead Website': 'Their website is down or broken: clicks from Google are hitting a wall right now.',
  'No HTTPS': 'Site shows "not secure" in the browser: quiet trust killer.',
  'Not Mobile Friendly': 'Site is not built for phones, where most emergency searches happen.',
  'Dated Site': 'Site looks abandoned (old copyright): easy quick-win conversation.',
  'DIY Site Builder': 'DIY site builder under the hood: nobody owns their web presence.',
  'No Analytics': 'No analytics installed: they have no idea what their marketing does.',
  'No Ad Pixels': 'No ad pixels found: almost certainly not running (or measuring) paid ads.',
  'No Lead Capture': 'No form or click-to-call on the site: visitors have no easy next step.',
  'GMB Missing Website': 'Their Google listing has no website link: free clicks being thrown away.',
  'GMB Thin Profile': 'Google listing is thin (few photos / no hours): looks less alive than competitors.',
  'Low Reviews': 'Light on reviews: losing the comparison to higher-reviewed competitors.',
  'Weak Rating': 'Rating below 4.2: reputation needs attention before ads make sense.',
}

interface SiteFetch {
  ok: boolean
  status: number
  finalUrl: string
  html: string
  blocked: boolean
}

async function fetchSite(rawUrl: string): Promise<SiteFetch> {
  const url = /^https?:\/\//i.test(rawUrl) ? rawUrl : `https://${rawUrl}`
  // Manual redirect handling so every hop is re-validated against the SSRF guard.
  const tryFetch = async (start: string): Promise<SiteFetch> => {
    let cur = start
    for (let hop = 0; hop < 5; hop++) {
      const u = await assertPublicUrl(cur)
      const ctrl = new AbortController()
      const t = setTimeout(() => ctrl.abort(), 15_000)
      try {
        const res = await fetch(u, { headers: { 'User-Agent': UA }, redirect: 'manual', signal: ctrl.signal })
        const loc = res.headers.get('location')
        if (res.status >= 300 && res.status < 400 && loc) {
          cur = new URL(loc, u).toString()
          continue
        }
        const cfBlocked = Boolean(res.headers.get('cf-mitigated') || (res.status === 503 && res.headers.get('cf-ray')))
        const blocked = BLOCKED_STATUSES.has(res.status) || cfBlocked
        const html = res.ok ? await res.text() : ''
        return { ok: res.ok, status: res.status, finalUrl: res.url || u.toString(), html, blocked }
      } finally {
        clearTimeout(t)
      }
    }
    throw new Error('too_many_redirects')
  }
  try {
    return await tryFetch(url)
  } catch {
    try {
      return await tryFetch(url.replace(/^https:/i, 'http:'))
    } catch {
      return { ok: false, status: 0, finalUrl: url, html: '', blocked: false }
    }
  }
}

function analyzeHtml(html: string, finalUrl: string) {
  const flags: string[] = []
  const notes: string[] = []

  if (!/^https:/i.test(finalUrl)) flags.push('No HTTPS')
  if (!/<meta[^>]+name=["']viewport["']/i.test(html)) flags.push('Not Mobile Friendly')

  const years = [...html.matchAll(/(?:©|&copy;|copyright)\s*(?:\d{4}\s*[-–]\s*)?(\d{4})/gi)]
    .map((m) => Number(m[1]))
    .filter((y) => y >= 2000 && y <= 2100)
  const copyrightYear = years.length ? Math.max(...years) : null
  if (copyrightYear && copyrightYear <= new Date().getFullYear() - 2) {
    flags.push('Dated Site')
    notes.push(`copyright says ${copyrightYear}`)
  }

  for (const [name, re] of BUILDER_PATTERNS) {
    if (re.test(html)) {
      flags.push('DIY Site Builder')
      notes.push(`built on ${name}`)
      break
    }
  }

  if (!/gtag\(|googletagmanager\.com|google-analytics\.com|gtm\.js/i.test(html)) flags.push('No Analytics')
  if (!/AW-\d{6,}|googleadservices|googleads\.g\.doubleclick|fbq\(|connect\.facebook\.net/i.test(html)) {
    flags.push('No Ad Pixels')
  }

  const hasLeadCapture =
    /<form[\s>]/i.test(html) ||
    /href=["']tel:/i.test(html) ||
    /calendly|housecallpro|getjobber|servicetitan|workiz|housecall/i.test(html)
  if (!hasLeadCapture) flags.push('No Lead Capture')

  return { flags, notes }
}

async function checkGmb(placeId: string) {
  const key = process.env.GOOGLE_PLACES_API_KEY ?? process.env.PAGESPEED_API_KEY
  if (!key) return null
  try {
    const res = await fetch(`https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`, {
      headers: {
        'X-Goog-Api-Key': key,
        'X-Goog-FieldMask': 'websiteUri,photos,regularOpeningHours,businessStatus',
      },
      signal: AbortSignal.timeout(8000),
    })
    if (!res.ok) return null
    const d = (await res.json()) as {
      websiteUri?: string
      photos?: unknown[]
      regularOpeningHours?: { periods?: unknown[] }
    }
    return {
      website: d.websiteUri ?? null,
      photoCount: Array.isArray(d.photos) ? d.photos.length : 0,
      hoursSet: Boolean(d.regularOpeningHours?.periods?.length),
    }
  } catch {
    return null
  }
}

function tierFor(score: number): TriageResult['tier'] {
  if (score >= 40) return 'Hot'
  if (score >= 20) return 'Warm'
  return 'Cool'
}

function buildSummary(args: { flags: string[]; notes: string[]; score: number; tier: string; hasSite: boolean }) {
  const track: TriageResult['track'] = !args.hasSite || args.flags.includes('Dead Website') ? 'MOCKUP' : 'AUDIT'
  const lines: string[] = []
  lines.push(
    `${args.tier.toUpperCase()} · score ${args.score} · track: ${track}${
      track === 'MOCKUP' ? ' (homepage mockup is the door-opener)' : ' (full audit report is the door-opener)'
    }`,
  )
  const points = args.flags.slice(0, 5).map((f) => `• ${FLAG_TALKING_POINTS[f] ?? f}`)
  if (points.length) lines.push(...points)
  else lines.push('• Marketing basics look healthy from the outside. Lead with service growth, not gaps.')
  if (args.notes.length) lines.push(`(${args.notes.join('; ')})`)
  return { summary: lines.join('\n'), track }
}

export async function triageLead(input: TriageInput): Promise<TriageResult> {
  const flags: string[] = []
  const notes: string[] = []
  let hasSite = false

  const website = input.website?.trim()

  // Site fetch and Places call are independent; run them concurrently so the
  // worst case is max(30s site, 8s places), not their sum.
  const [site, gmb] = await Promise.all([
    website ? fetchSite(website) : Promise.resolve(null),
    input.place_id ? checkGmb(input.place_id) : Promise.resolve(null),
  ])

  if (!website) {
    flags.push('No Website')
  } else if (site && site.ok) {
    hasSite = true
    const a = analyzeHtml(site.html, site.finalUrl)
    flags.push(...a.flags)
    notes.push(...a.notes)
  } else if (site && site.blocked) {
    // Live but WAF/bot-protected: assume up, don't flip to mockup, don't score
    // the (unverifiable) on-page gaps. GMB + review signals still apply.
    hasSite = true
    notes.push(`site reachable but bot-protected (${site.status}); on-page gaps unverified`)
  } else {
    flags.push('Dead Website')
    notes.push(`fetch failed (${site?.status || 'no response'})`)
  }

  if (gmb) {
    if (!gmb.website) flags.push('GMB Missing Website')
    if (gmb.photoCount < 5 || !gmb.hoursSet) flags.push('GMB Thin Profile')
  }

  if (typeof input.reviews === 'number' && input.reviews < 15) flags.push('Low Reviews')
  if (typeof input.rating === 'number' && input.rating < 4.2 && (input.reviews ?? 0) >= 5) flags.push('Weak Rating')

  const score = Math.min(100, flags.reduce((s, f) => s + (WEIGHTS[f] ?? 0), 0))
  const tier = tierFor(score)
  const { summary, track } = buildSummary({ flags, notes, score, tier, hasSite })

  return { score, tier, flags, summary, track, notes }
}
