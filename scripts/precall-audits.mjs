#!/usr/bin/env node
/**
 * Fire silent (internal) full audits for triaged HVAC Prospects so Sam has the
 * complete VerveMD audit report in hand BEFORE the cold call.
 *
 * Selection: Triage Tier in (Hot, Warm) by default, website present and alive
 * (mockup-track leads have nothing to crawl), Audit Link still empty.
 *
 * Each submit hits POST /api/new-audit with internal:true, which:
 *   - runs the full engine (crawl, PageSpeed, Places, GEO, DataForSEO, synthesis)
 *   - sends NOTHING to the prospect (no ack, no ready email, no nurture)
 *   - skips HubSpot + ops notify
 * The report URL is written back to HVAC Prospects."Audit Link".
 *
 * DEPLOY ORDER (one-time): this needs the audit_jobs.internal column
 * (supabase/migrations/20260609_audit_internal_flag.sql) applied to the
 * portico-society Supabase project BEFORE the silent-mode code is deployed.
 *
 * USAGE:
 *   AIRTABLE_TOKEN=pat... node scripts/precall-audits.mjs [--tier Hot] [--limit 5] [--dry-run] [--interval 32]
 *
 * Cost note: the full audit spends DataForSEO + Claude tokens per run: that is
 * exactly why it is gated to Hot/Warm instead of every scraped lead.
 */

import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const REPO_ROOT = join(__dirname, '..')

const BASE_ID = 'appN1lPYk0ptB83Y6' // OS
const PROSPECTS_TABLE = 'tblpVL1Y68lVL0MPO' // HVAC Prospects
const PLACEHOLDER_EMAIL = 'precall@vervemd.com' // internal jobs never email it
const SPECIALTIES = new Set(['plumbing', 'hvac', 'electrical', 'roofing', 'other'])

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

function arg(name, fallback = undefined) {
  const i = process.argv.indexOf(`--${name}`)
  if (i === -1) return fallback
  const next = process.argv[i + 1]
  if (next === undefined || next.startsWith('--')) return true
  return next
}

const DRY_RUN = Boolean(arg('dry-run', false))
const LIMIT = arg('limit') ? Number(arg('limit')) : Infinity
const TIER = arg('tier') // e.g. "Hot": default both Hot and Warm
const INTERVAL_MS = (arg('interval') ? Number(arg('interval')) : 32) * 1000

const AIRTABLE_TOKEN = process.env.AIRTABLE_TOKEN
const APP_BASE = (process.env.PUBLIC_BASE_URL || '').replace(/\/$/, '')

function fail(msg) {
  console.error(`\n✖ ${msg}\n`)
  process.exit(1)
}
if (!AIRTABLE_TOKEN) fail('AIRTABLE_TOKEN is required.')
if (!APP_BASE) fail('PUBLIC_BASE_URL is required (set in .env.local or env).')

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

const AT = `https://api.airtable.com/v0/${BASE_ID}`
const atHeaders = { Authorization: `Bearer ${AIRTABLE_TOKEN}`, 'Content-Type': 'application/json' }

async function listAll(tableId) {
  const records = []
  let offset
  do {
    const qs = new URLSearchParams({ pageSize: '100' })
    if (offset) qs.set('offset', offset)
    const res = await fetch(`${AT}/${tableId}?${qs}`, { headers: atHeaders })
    if (!res.ok) fail(`Airtable read failed: ${res.status} ${await res.text()}`)
    const json = await res.json()
    records.push(...json.records)
    offset = json.offset
  } while (offset)
  return records
}

async function patchRecord(recordId, fields) {
  if (DRY_RUN) return
  const res = await fetch(`${AT}/${PROSPECTS_TABLE}/${recordId}`, {
    method: 'PATCH',
    headers: atHeaders,
    body: JSON.stringify({ fields, typecast: true }),
  })
  if (!res.ok) console.warn(`  ! writeback failed for ${recordId}: ${res.status} ${await res.text()}`)
}

async function main() {
  const tiers = TIER && TIER !== true ? [TIER] : ['Hot', 'Warm']
  console.log(`\nPre-call silent audits  ·  tiers=${tiers.join('+')}  ·  ${DRY_RUN ? 'DRY RUN' : 'LIVE'}`)
  console.log(`Target: ${APP_BASE}/api/new-audit (internal mode) · pacing ${INTERVAL_MS / 1000}s\n`)

  const all = await listAll(PROSPECTS_TABLE)
  const queue = all.filter((r) => {
    const f = r.fields
    const tier = typeof f['Triage Tier'] === 'object' ? f['Triage Tier']?.name : f['Triage Tier']
    const flags = (f['Opportunity Flags'] ?? []).map((x) => (typeof x === 'object' ? x.name : x))
    return (
      tiers.includes(tier) &&
      f['Website'] &&
      !flags.includes('No Website') &&
      !flags.includes('Dead Website') &&
      !f['Audit Link']
    )
  })

  console.log(`${all.length} prospects · ${queue.length} eligible (triaged ${tiers.join('/')}, live site, no audit yet)\n`)

  let done = 0
  const report = { submitted: 0, failed: 0 }

  for (const r of queue) {
    if (done >= LIMIT) break
    const f = r.fields
    const rawSpecialty = String(
      (typeof f['Specialty'] === 'object' ? f['Specialty']?.name : f['Specialty']) ?? '',
    ).toLowerCase()
    const intake = {
      clinic_name: String(f['Company Name'] ?? 'Business').slice(0, 120),
      website_url: /^https?:\/\//i.test(f['Website']) ? f['Website'] : `https://${f['Website']}`,
      contact_name: 'Owner',
      contact_email: PLACEHOLDER_EMAIL,
      specialty: SPECIALTIES.has(rawSpecialty) ? rawSpecialty : 'hvac',
      city: String(f['City'] ?? 'Unknown').slice(0, 80),
      state: f['State'] ? String(f['State']).slice(0, 40) : null,
      run_now: true,
      internal: true,
    }
    if (intake.city.length < 2) intake.city = 'Unknown'

    console.log(`→ ${intake.clinic_name}  ${intake.website_url}  (${intake.city}${intake.state ? ', ' + intake.state : ''})`)

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
        await patchRecord(r.id, { 'Audit Link': reportUrl })
        report.submitted++
      }
    } catch (err) {
      console.warn(`  ! submit threw: ${err.message}`)
      report.failed++
    }

    done++
    if (done < LIMIT && done < queue.length) await sleep(INTERVAL_MS)
  }

  console.log(`\nDone. submitted=${report.submitted} failed=${report.failed}\n`)
}

main().catch((err) => fail(err.stack || String(err)))
