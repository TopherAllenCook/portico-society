# Pre-call triage system (Sam's call-prep pipeline)

Every scraped prospect gets a free precursor audit before Sam ever dials. The
results live on the HVAC Prospects table (OS base) so call prep is one screen.

## The three stages

1. **Triage (every lead, free, automatic)** : `scripts/triage-prospects.mjs`
   checks the website (alive, HTTPS, mobile viewport, copyright year, DIY
   builder fingerprint, analytics, ad pixels, lead capture), GMB signals via
   Place ID when `GOOGLE_PLACES_API_KEY` is set, and the scraper's own
   rating/review columns. Writes Opportunity Score (0-100), Triage Tier
   (Hot/Warm/Cool), Opportunity Flags, Triage Summary, Triage Date.

2. **Silent full audit (Hot/Warm only, paid APIs)** : `scripts/precall-audits.mjs`
   fires the real audit engine via `POST /api/new-audit` with `internal: true`.
   Internal mode runs everything but sends nothing to the prospect (no ack, no
   ready email, no nurture, no HubSpot). The report URL lands in "Audit Link".
   Requires the `audit_jobs.internal` migration applied BEFORE deploy
   (`supabase/migrations/20260609_audit_internal_flag.sql`).

3. **Mockup track (No Website / Dead Website leads)** : these leads cannot get
   a crawl-based audit; the deliverable is a homepage mockup instead. Process:

   - Source material: GMB listing (name, phone, city, reviews, photos) plus
     anything salvageable from the dead site via the Wayback Machine.
   - Build: one-page homepage in the VerveMD stack using the home-services
     section rhythm (hero with trade imagery, services band, review proof,
     click-to-call + form). One shared template, per-prospect config
     (name, city, phone, review count, brand color pulled from their logo).
   - Host: `vervemd.com/preview/<slug>` (noindex), or full-page screenshot
     attached to the follow-up email when hosting feels too heavy.
   - Deliver: link goes in "Mockup Link"; Sam references it on the call
     ("we already drafted what your homepage could look like") and the
     follow-up email carries the visual.

## Sam's view of the world

Sort HVAC Prospects by Opportunity Score descending, work top down:

- **Triage Summary** = the pre-call readout (lead angle + track).
- **Opportunity Flags** = talking points, one gap per chip.
- **Audit Link** = full report to skim before dialing (Hot/Warm).
- **Mockup Link** = the visual for no-site/dead-site leads.
- Existing Call Status / Call Notes / Talking Points fields keep working as before.

## Operating cadence (automated since 2026-06-10)

The n8n workflow **"Verve: Mockup Autopilot"** (ID `ArG74YuZ4dhfhZ1k`) runs
weekdays at 8am and 1pm, right behind the HVAC Area Driver scrape:

1. **Triage phase**: rows with no Triage Date → `POST /api/outbound/triage-lead`
   (same heuristics as the script, ported to `lib/triage/analyze.ts`) → Score,
   Tier, Flags, Summary, Triage Date written back to Airtable.
2. **Mockup phase**: rows passing the ICP gate with no Mockup Link →
   `POST /api/outbound/mockup` → config upserted to `mockup_previews`
   (Supabase) → `vervemd.com/preview/<slug>` written to Mockup Link.

**ICP gate** (tunable in the workflow's "ICP Config" node):
`min_reviews: 20`, `min_rating: 4.0`, `allowed_specialties: [residential]`,
plus pain fit: `Opportunity Score >= 20` OR any of
No Website / Dead Website / Not Mobile Friendly / Dated Site.
Safety caps: 40 triages + 10 mockups per run.

Both endpoints auth with `x-outbound-trigger-token == OUTBOUND_TRIGGER_TOKEN`.
Everything is idempotent: triage skips rows with a Triage Date, mockups skip
rows with a Mockup Link, failed calls retry on the next scheduled run.

Manual fallbacks still work:
- `AIRTABLE_TOKEN=pat... node scripts/triage-prospects.mjs` (offline `--in/--out` too)
- `AIRTABLE_TOKEN=pat... node scripts/precall-audits.mjs --tier Hot --limit 10`
