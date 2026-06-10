#!/usr/bin/env node
/**
 * Pre-call triage ("precursor audit") over the HVAC Prospects table.
 *
 * For every prospect that hasn't been triaged yet, run a fast, free pass over
 * the signals a buyer can see from the outside:
 *
 *   website   exists? alive? https? mobile viewport? stale copyright year?
 *             DIY builder fingerprint? analytics? ad pixels? lead capture?
 *   GMB       (optional, needs GOOGLE_PLACES_API_KEY) listing missing website
 *             link, thin profile (few photos / no hours)
 *   table     low review count / weak rating already captured by the scraper
 *
 * Output per prospect, written back to Airtable for Sam's call prep:
 *   Opportunity Score (0-100, higher = more visible pain = better target)
 *   Triage Tier (Hot / Warm / Cool)
 *   Opportunity Flags (the specific gaps, 1:1 with call talking points)
 *   Triage Summary (plain-English readout + which track: AUDIT vs MOCKUP)
 *   Triage Date
 *
 * This pass NEVER contacts the prospect and costs nothing to run (Places API
 * details call only when a key is present). The expensive full audit is fired
 * separately for Hot/Warm leads by scripts/precall-audits.mjs.
 *
 * USAGE:
 *   AIRTABLE_TOKEN=pat... node scripts/triage-prospects.mjs [--limit 20] [--dry-run] [--force] [--concurrency 5]
 *
 *   --force   re-triage rows that already have a Triage Date
 *
 * OFFLINE IO MODE (no Airtable token; lets an MCP client or n8n drive it):
 *   node scripts/triage-prospects.mjs --in records.json --out results.json
 *   records.json: [{ "id": "rec...", "fields": { "Company Name", "Website", "Place ID", "Rating", "Reviews" } }]
 *   results.json: [{ "id", "fields": { triage writeback fields } }]: caller persists them.
 */

import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const REPO_ROOT = join(__dirname, '..')

const BASE_ID = 'appN1lPYk0ptB83Y6' // OS
const PROSPECTS_TABLE = 'tblpVL1Y68lVL0MPO' // HVAC Prospects

/* ── tiny .env.local loader (no dotenv dependency) ───────────────────────── */
function loadEnvLocal() {
  try {
    const raw = readFileSync(join(REPO_ROOT, '.env.local'), 'utf8')
    for (const line of raw.split('\n')) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/)
      if (!m) continue
      const key = m[1]
      const val = m[2].replace(/^["']|["']$/g, '')
      if (!(key in process.env)) process.env[key] = val
    }
  } catch {
    /* no .env.local: rely on real env */
  }
}
loadEnvLocal()

/* ── args ────────────────────────────────────────────────────────────────── */
function arg(name, fallback = undefined) {
  const i = process.argv.indexOf(`--${name}`)
  if (i === -1) return fallback
  const next = process.argv[i + 1]
  if (next === undefined || next.startsWith('--')) return true
  return next
}

const DRY_RUN = Boolean(arg('dry-run', false))
const FORCE = Boolean(arg('force', false))
const LIMIT = arg('limit') ? Number(arg('limit')) : Infinity
const CONCURRENCY = arg('concurrency') ? Number(arg('concurrency')) : 5
const IN_FILE = arg('in')
const OUT_FILE = arg('out')

const AIRTABLE_TOKEN = process.env.AIRTABLE_TOKEN
const PLACES_KEY = process.env.GOOGLE_PLACES_API_KEY ?? process.env.PAGESPEED_API_KEY

function fail(msg) {
  console.error(`\n✖ ${msg}\n`)
  process.exit(1)
}
if (!IN_FILE && !AIRTABLE_TOKEN) fail('AIRTABLE_TOKEN is required (or use --in/--out offline mode).')
if (!PLACES_KEY) console.warn('! GOOGLE_PLACES_API_KEY not set: skipping GMB live checks (website link, photos, hours).')

/* ── Airtable REST helpers ───────────────────────────────────────────────── */
const AT = `https://api.airtable.com/v0/${BASE_ID}`
const atHeaders = { Authorization: `Bearer ${AIRTABLE_TOKEN}`, 'Content-Type': 'application/json' }

async function listAll(tableId) {
  const records = []
  let offset
  do {
    const qs = new URLSearchParams({ pageSize: '100' })
    if (offset) qs.set('offset', offset)
    const res = await fetch(`${AT}/${tableId}?${qs}`, { headers: atHeaders })
    if (!res.ok) fail(`Airtable read ${tableId} failed: ${res.status} ${await res.text()}`)
    const json = await res.json()
    records.push(...json.records)
    offset = json.offset
  } while (offset)
  return records
}

async function patchRecords(updates) {
  // Airtable caps batch PATCH at 10 records.
  for (let i = 0; i < updates.length; i += 10) {
    const chunk = updates.slice(i, i + 10)
    const res = await fetch(`${AT}/${PROSPECTS_TABLE}`, {
      method: 'PATCH',
      headers: atHeaders,
      body: JSON.stringify({ records: chunk, typecast: true }),
    })
    if (!res.ok) console.warn(`  ! writeback failed: ${res.status} ${await res.text()}`)
  }
}

/* ── website checks ──────────────────────────────────────────────────────── */
const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36'

// Statuses that mean "live but bot-protected", not "dead" (kept in sync with lib/triage/analyze.ts).
const BLOCKED_STATUSES = new Set([401, 403, 406, 429])

async function fetchSite(rawUrl) {
  const url = /^https?:\/\//i.test(rawUrl) ? rawUrl : `https://${rawUrl}`
  const tryFetch = async (u) => {
    const ctrl = new AbortController()
    const t = setTimeout(() => ctrl.abort(), 15_000)
    try {
      const res = await fetch(u, { headers: { 'User-Agent': UA }, redirect: 'follow', signal: ctrl.signal })
      const cfBlocked = Boolean(res.headers.get('cf-mitigated') || (res.status === 503 && res.headers.get('cf-ray')))
      const blocked = BLOCKED_STATUSES.has(res.status) || cfBlocked
      const html = res.ok ? await res.text() : ''
      return { ok: res.ok, status: res.status, finalUrl: res.url || u, html, blocked }
    } finally {
      clearTimeout(t)
    }
  }
  try {
    return await tryFetch(url)
  } catch {
    // https failed outright: try plain http before calling it dead
    try {
      return await tryFetch(url.replace(/^https:/i, 'http:'))
    } catch {
      return { ok: false, status: 0, finalUrl: url, html: '', blocked: false }
    }
  }
}

const BUILDER_PATTERNS = [
  ['Wix', /wixstatic\.com|wix\.com\/website/i],
  ['GoDaddy Builder', /wsimg\.com|godaddy\.com\/websites/i],
  ['Weebly', /weebly\.com|editmysite\.com/i],
  ['Squarespace', /squarespace\.com|sqsp\.net/i],
  ['Duda', /dudamobile|duda\.co|cdn-website\.com/i],
  ['Jimdo', /jimdo/i],
  ['SITE123', /site123/i],
  ['Homestead', /homestead\.com/i],
]

function analyzeHtml(html, finalUrl) {
  const flags = []
  const notes = []

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

  const hasAnalytics = /gtag\(|googletagmanager\.com|google-analytics\.com|gtm\.js/i.test(html)
  if (!hasAnalytics) flags.push('No Analytics')

  const hasAdPixels = /AW-\d{6,}|googleadservices|googleads\.g\.doubleclick|fbq\(|connect\.facebook\.net/i.test(html)
  if (!hasAdPixels) flags.push('No Ad Pixels')

  const hasLeadCapture =
    /<form[\s>]/i.test(html) ||
    /href=["']tel:/i.test(html) ||
    /calendly|housecallpro|getjobber|servicetitan|workiz|housecall/i.test(html)
  if (!hasLeadCapture) flags.push('No Lead Capture')

  return { flags, notes }
}

/* ── GMB check (optional) ────────────────────────────────────────────────── */
async function checkGmb(placeId) {
  if (!PLACES_KEY || !placeId) return null
  try {
    const res = await fetch(`https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`, {
      headers: {
        'X-Goog-Api-Key': PLACES_KEY,
        'X-Goog-FieldMask': 'websiteUri,photos,regularOpeningHours,rating,userRatingCount,businessStatus',
      },
    })
    if (!res.ok) return null
    const d = await res.json()
    return {
      website: d.websiteUri ?? null,
      photoCount: Array.isArray(d.photos) ? d.photos.length : 0,
      hoursSet: Boolean(d.regularOpeningHours?.periods?.length),
      status: d.businessStatus ?? null,
    }
  } catch {
    return null
  }
}

/* ── scoring ─────────────────────────────────────────────────────────────── */
const WEIGHTS = {
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

function tierFor(score) {
  if (score >= 40) return 'Hot'
  if (score >= 20) return 'Warm'
  return 'Cool'
}

const FLAG_TALKING_POINTS = {
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

function buildSummary({ flags, notes, score, tier, hasSite }) {
  const track = !hasSite || flags.includes('Dead Website') ? 'MOCKUP' : 'AUDIT'
  const lines = []
  lines.push(`${tier.toUpperCase()} · score ${score} · track: ${track}${track === 'MOCKUP' ? ' (homepage mockup is the door-opener)' : ' (full audit report is the door-opener)'}`)
  const points = flags.slice(0, 5).map((f) => `• ${FLAG_TALKING_POINTS[f] ?? f}`)
  if (points.length) lines.push(...points)
  else lines.push('• Marketing basics look healthy from the outside. Lead with service growth, not gaps.')
  if (notes.length) lines.push(`(${notes.join('; ')})`)
  return lines.join('\n')
}

/* ── per-prospect triage ─────────────────────────────────────────────────── */
async function triage(rec) {
  const f = rec.fields
  const website = f['Website'] ? String(f['Website']).trim() : null
  const flags = []
  const notes = []
  let hasSite = false

  if (!website) {
    flags.push('No Website')
  } else {
    const site = await fetchSite(website)
    if (site.ok) {
      hasSite = true
      const a = analyzeHtml(site.html, site.finalUrl)
      flags.push(...a.flags)
      notes.push(...a.notes)
    } else if (site.blocked) {
      hasSite = true
      notes.push(`site reachable but bot-protected (${site.status}); on-page gaps unverified`)
    } else {
      flags.push('Dead Website')
      notes.push(`fetch failed (${site.status || 'no response'})`)
    }
  }

  const gmb = await checkGmb(f['Place ID'])
  if (gmb) {
    if (!gmb.website) flags.push('GMB Missing Website')
    if (gmb.photoCount < 5 || !gmb.hoursSet) flags.push('GMB Thin Profile')
  }

  const reviews = typeof f['Reviews'] === 'number' ? f['Reviews'] : null
  const rating = typeof f['Rating'] === 'number' ? f['Rating'] : null
  if (reviews !== null && reviews < 15) flags.push('Low Reviews')
  if (rating !== null && rating < 4.2 && (reviews ?? 0) >= 5) flags.push('Weak Rating')

  const score = Math.min(100, flags.reduce((s, fl) => s + (WEIGHTS[fl] ?? 0), 0))
  const tier = tierFor(score)
  const summary = buildSummary({ flags, notes, score, tier, hasSite })

  return {
    id: rec.id,
    fields: {
      'Opportunity Score': score,
      'Triage Tier': tier,
      'Opportunity Flags': flags,
      'Triage Summary': summary,
      'Triage Date': new Date().toISOString().slice(0, 10),
    },
    log: `${tier.padEnd(4)} ${String(score).padStart(3)}  ${f['Company Name'] ?? rec.id}  [${flags.join(', ') || 'clean'}]`,
  }
}

/* ── main ────────────────────────────────────────────────────────────────── */
async function main() {
  console.log(`\nVerve pre-call triage  ·  ${IN_FILE ? 'OFFLINE IO' : DRY_RUN ? 'DRY RUN' : 'LIVE'}  ·  GMB checks ${PLACES_KEY ? 'on' : 'OFF'}\n`)

  const all = IN_FILE ? JSON.parse(readFileSync(IN_FILE, 'utf8')) : await listAll(PROSPECTS_TABLE)
  const queue = all.filter((r) => FORCE || !r.fields['Triage Date']).slice(0, LIMIT)
  console.log(`${all.length} prospects · ${queue.length} to triage\n`)

  const results = []
  for (let i = 0; i < queue.length; i += CONCURRENCY) {
    const batch = queue.slice(i, i + CONCURRENCY)
    const settled = await Promise.allSettled(batch.map(triage))
    for (let j = 0; j < settled.length; j++) {
      const s = settled[j]
      if (s.status === 'fulfilled') {
        results.push(s.value)
        console.log(`  ${s.value.log}`)
      } else {
        console.warn(`  ! triage threw for ${batch[j].id}: ${s.reason?.message ?? s.reason}`)
      }
    }
  }

  if (OUT_FILE) {
    const { writeFileSync } = await import('node:fs')
    writeFileSync(OUT_FILE, JSON.stringify(results.map(({ id, fields }) => ({ id, fields })), null, 2))
    console.log(`\nResults written to ${OUT_FILE} (caller persists to Airtable).`)
  } else if (!DRY_RUN && results.length) {
    await patchRecords(results.map(({ id, fields }) => ({ id, fields })))
  }

  const tally = results.reduce((t, r) => ((t[r.fields['Triage Tier']] = (t[r.fields['Triage Tier']] ?? 0) + 1), t), {})
  console.log(`\nDone. triaged=${results.length}  hot=${tally.Hot ?? 0} warm=${tally.Warm ?? 0} cool=${tally.Cool ?? 0}${DRY_RUN ? '  (nothing written)' : ''}\n`)
}

main().catch((err) => fail(err.stack || String(err)))
