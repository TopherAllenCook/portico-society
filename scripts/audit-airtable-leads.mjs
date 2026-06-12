#!/usr/bin/env node
/**
 * One-off batch: read Verve leads from the "Internet Scraper" Airtable base and
 * fire an audit for each via POST /api/new-audit (same pipeline as the public
 * form: insert lead -> run audit -> ack email -> ready report + nurture -> HubSpot).
 *
 * It reads the Contact Info table (URL + Email) and joins the Results table on
 * URL to recover a business name (Title). Fields the scraper never captured are
 * filled with ship-now defaults:
 *   contact_name -> "there"      specialty -> "other"      city -> --city flag
 *
 * The audit's own crawl enriches the rest. The share_token returned per lead is
 * written back to Airtable (Contact Info.Status -> "Audited" + token in a note)
 * so you can see which leads were processed and open their report.
 *
 * USAGE:
 *   AIRTABLE_TOKEN=pat... node scripts/audit-airtable-leads.mjs --city "London" [--dry-run] [--limit 10] [--status Scrape]
 *
 * Required env (AIRTABLE_TOKEN here; the rest are read from .env.local):
 *   AIRTABLE_TOKEN   Airtable personal access token with data.records:read+write on the base
 *   PUBLIC_BASE_URL  e.g. https://vervemd.com (the deployed app that owns /api/new-audit)
 *
 * Throttle: /api/new-audit allows 20 requests / 10 min per IP, so we pace at one
 * submit every ~32s. Override with --interval <seconds> if you raised the limit.
 */

import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const REPO_ROOT = join(__dirname, '..')

const BASE_ID = 'appioAsBByFpkGbWc' // Internet Scraper
const CONTACT_TABLE = 'tbl9NeMTMm7F52FI3' // Contact Info
const RESULTS_TABLE = 'tbll6e0kmMEie6JA7' // Results
const DEFAULT_SPECIALTY = 'other' // one of: plumbing | hvac | electrical | roofing | other (AuditIntakeSchema, lib/audit/types.ts)
const DEFAULT_CONTACT_NAME = 'there'

/* ── tiny .env.local loader (no dotenv dependency) ───────────────────────── */
function loadEnvLocal() {
  try {
    const raw = readFileSync(join(REPO_ROOT, '.env.local'), 'utf8')
    for (const line of raw.split('\n')) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/)
      if (!m) continue
      const key = m[1]
      let val = m[2].replace(/^["']|["']$/g, '')
      if (!(key in process.env)) process.env[key] = val
    }
  } catch {
    /* no .env.local — rely on real env */
  }
}
loadEnvLocal()

/* ── args ────────────────────────────────────────────────────────────────── */
function arg(name, fallback = undefined) {
  const i = process.argv.indexOf(`--${name}`)
  if (i === -1) return fallback
  const next = process.argv[i + 1]
  if (next === undefined || next.startsWith('--')) return true // boolean flag
  return next
}

const CITY = arg('city')
const DRY_RUN = Boolean(arg('dry-run', false))
const LIMIT = arg('limit') ? Number(arg('limit')) : Infinity
const STATUS_FILTER = arg('status', 'Scrape') // Contact Info.Status to pick up
const INTERVAL_MS = (arg('interval') ? Number(arg('interval')) : 32) * 1000

const AIRTABLE_TOKEN = process.env.AIRTABLE_TOKEN
const APP_BASE = (process.env.PUBLIC_BASE_URL || '').replace(/\/$/, '')

function fail(msg) {
  console.error(`\n✖ ${msg}\n`)
  process.exit(1)
}
if (!AIRTABLE_TOKEN) fail('AIRTABLE_TOKEN is required (Airtable personal access token).')
if (!APP_BASE) fail('PUBLIC_BASE_URL is required (set in .env.local or env).')
if (!CITY || CITY === true) fail('--city "<City>" is required. Your scraped leads have no city; it appears in the lead email.')

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

/* ── Airtable REST helpers ───────────────────────────────────────────────── */
const AT = `https://api.airtable.com/v0/${BASE_ID}`
const atHeaders = { Authorization: `Bearer ${AIRTABLE_TOKEN}`, 'Content-Type': 'application/json' }

async function listAll(tableId, params = {}) {
  const records = []
  let offset
  do {
    const qs = new URLSearchParams({ pageSize: '100', ...params })
    if (offset) qs.set('offset', offset)
    const res = await fetch(`${AT}/${tableId}?${qs}`, { headers: atHeaders })
    if (!res.ok) fail(`Airtable read ${tableId} failed: ${res.status} ${await res.text()}`)
    const json = await res.json()
    records.push(...json.records)
    offset = json.offset
  } while (offset)
  return records
}

async function patchStatus(recordId, fields) {
  if (DRY_RUN) return
  const res = await fetch(`${AT}/${CONTACT_TABLE}/${recordId}`, {
    method: 'PATCH',
    headers: atHeaders,
    body: JSON.stringify({ fields, typecast: true }), // typecast lets "Audited" be added to the singleSelect
  })
  if (!res.ok) console.warn(`  ! writeback failed for ${recordId}: ${res.status} ${await res.text()}`)
}

/* ── normalisation ───────────────────────────────────────────────────────── */
function firstEmail(raw) {
  if (!raw) return null
  const m = String(raw).match(/[^\s,;]+@[^\s,;]+\.[^\s,;]+/)
  return m ? m[0].trim() : null
}
function businessNameFrom(title, url) {
  if (title && title.trim().length >= 2) {
    // Titles are often "Joe's Plumbing | Home". Keep the lead segment.
    return title.split(/[|–\-–—:]/)[0].trim().slice(0, 120)
  }
  try {
    const host = new URL(url).hostname.replace(/^www\./, '')
    return host.split('.')[0].replace(/[-_]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()).slice(0, 120)
  } catch {
    return 'Business'
  }
}

/* ── main ────────────────────────────────────────────────────────────────── */
async function main() {
  console.log(`\nVerve audit batch  ·  city="${CITY}"  ·  status="${STATUS_FILTER}"  ·  ${DRY_RUN ? 'DRY RUN' : 'LIVE'}`)
  console.log(`Target: ${APP_BASE}/api/new-audit  ·  pacing ${INTERVAL_MS / 1000}s between submits\n`)

  const [contacts, results] = await Promise.all([listAll(CONTACT_TABLE), listAll(RESULTS_TABLE)])

  // URL -> Title from Results, to recover a business name.
  const titleByUrl = new Map()
  for (const r of results) {
    const u = r.fields['URL']
    if (u && r.fields['Title']) titleByUrl.set(String(u).replace(/\/$/, ''), r.fields['Title'])
  }

  const queue = contacts.filter((c) => {
    const status = c.fields['Status']
    return status === STATUS_FILTER
  })

  console.log(`${contacts.length} contacts · ${queue.length} match status "${STATUS_FILTER}"\n`)

  let done = 0
  const report = { submitted: 0, skipped: 0, failed: 0 }

  for (const c of queue) {
    if (done >= LIMIT) break
    const url = c.fields['URL']
    const email = firstEmail(c.fields['Email'])

    if (!url || !email) {
      console.log(`- skip ${c.id}: missing ${!url ? 'URL' : 'email'}`)
      report.skipped++
      continue
    }

    const title = titleByUrl.get(String(url).replace(/\/$/, ''))
    const intake = {
      clinic_name: businessNameFrom(title, url), // API field key is still clinic_name (lib/audit/types.ts)
      website_url: String(url),
      contact_name: DEFAULT_CONTACT_NAME,
      contact_email: email,
      specialty: DEFAULT_SPECIALTY,
      city: CITY,
      run_now: true,
    }

    console.log(`→ ${intake.clinic_name}  (${intake.contact_email})  ${url}`)

    if (DRY_RUN) {
      report.submitted++
      done++
      continue
    }

    try {
      const res = await fetch(`${APP_BASE}/api/new-audit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(intake),
      })
      const json = await res.json().catch(() => ({}))
      if (!res.ok) {
        console.warn(`  ! ${res.status} ${JSON.stringify(json)}`)
        report.failed++
      } else {
        const reportUrl = `${APP_BASE}/audit-report/${json.share_token}`
        console.log(`  ✓ audit ${json.audit_id}  →  ${reportUrl}`)
        await patchStatus(c.id, { Status: 'Audited' })
        report.submitted++
      }
    } catch (err) {
      console.warn(`  ! submit threw: ${err.message}`)
      report.failed++
    }

    done++
    if (done < LIMIT) await sleep(INTERVAL_MS)
  }

  console.log(`\nDone. submitted=${report.submitted} skipped=${report.skipped} failed=${report.failed}\n`)
}

main().catch((err) => fail(err.stack || String(err)))
