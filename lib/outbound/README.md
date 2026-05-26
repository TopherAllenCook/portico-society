# Outbound Lead Scraper

The outbound side of the pipeline. Mirrors `lib/audit/` patterns — partial-failure recoverable, idempotent, fire-and-forget runner behind a token-protected route.

```
ICP request → Apify Google Maps → Firecrawl site enrichment
            → email pattern + MX check → Claude ICP scoring
            → outbound_leads table → /admin/outbound (Sam's workspace)
```

## What's in this folder

| File | Job |
|---|---|
| `types.ts` | Zod schemas + TS interfaces. `RawClinic` is the source-agnostic shape every discovery provider returns. |
| `discover.ts` | **Unified entry point.** Takes `source: 'places' \| 'apify' \| 'both'`, returns a `RawClinic[]`. |
| `discover-places.ts` | **Default.** Google Places API area search via `places:searchText`. Reuses `GOOGLE_PLACES_API_KEY` from the audit pipeline. ~$0.03/request, dirt cheap. |
| `discover-apify.ts` | **Alternate.** Apify `apify/google-maps-scraper` actor. ~$1–3 per 100 leads. Sometimes returns fields Places doesn't. |
| `scrape-site.ts` | Firecrawl-backed website scrape + tech/marketing detection (reuses `lib/audit/leadgen.ts` regexes) |
| `email-guess.ts` | Pattern-based email guessing + MX-record verification (free; not address-level) |
| `score.ts` | Claude Haiku-based ICP scoring against PRODUCT.md criteria |
| `orchestrate.ts` | Pipeline runner. Calls `discover()` then enriches each lead. Same partial-failure pattern as `lib/audit/orchestrate.ts` |

## What's outside this folder

| File | Purpose |
|---|---|
| `app/api/outbound/scrape/route.ts` | `POST` — admin-gated job kickoff + 100-lead daily cap |
| `app/api/outbound/run/route.ts` | `POST` — token-gated worker. Vercel `maxDuration = 300` |
| `app/admin/outbound/page.tsx` | Sam's workspace. Kickoff form + scored leads table + status updates |
| `supabase/migrations/20260521_outbound_pipeline.sql` | Schema for `outbound_scrape_jobs` + `outbound_leads` |

## Setup checklist

```bash
# 1. Run the migration in Supabase (Project → SQL → New Query → paste the file)
# 2. Add these env vars:
#
#    OUTBOUND_RUN_TOKEN=$(openssl rand -hex 16)
#    OUTBOUND_TRIGGER_TOKEN=$(openssl rand -hex 16)   # optional, for headless cron triggering
#    OUTBOUND_DAILY_CAP=100                            # optional, default 100
#
#    # Discovery — at least one of these:
#    GOOGLE_PLACES_API_KEY=AIza...   # default 'places' source. Already set if audit pipeline works.
#    APIFY_API_TOKEN=apify_xxx       # only needed for 'apify' or 'both' source modes
#
#    # Already-set in your env (used by both audit + outbound):
#    FIRECRAWL_API_KEY=fc_xxx
#    ANTHROPIC_API_KEY=sk_xxx
#
# 3. Verify the admin page renders at /admin/outbound (needs ADMIN_PASSWORD).
# 4. Run a small test scrape — Salt Lake City, UT, max_results=10, source=places.
```

## End-to-end behaviour

1. Sam (or you) hits `/admin/outbound`, fills the form, clicks **Scrape now**.
2. Server action inserts a row in `outbound_scrape_jobs` and fire-and-forgets `POST /api/outbound/run`.
3. The runner calls Apify Maps with 4 search queries (per specialty mapping in `scrape-maps.ts`), spreading the `max_results` budget across them and de-duping by `placeId`.
4. Raw places land in `outbound_leads` with `status='new'`.
5. For each new lead, the runner sequentially:
   - Scrapes the website via Firecrawl (falls back to direct fetch if Firecrawl is down)
   - Detects CMS, booking widget, chat, analytics, marketing maturity
   - Generates email pattern candidates from owner names + role-based fallbacks
   - Looks up MX records on the domain (free, only confirms domain accepts mail)
   - Scores the lead 0–100 via Claude Haiku against PRODUCT.md ICP
6. Job marked `complete` (or `partial` if any leads errored).
7. Sam refreshes `/admin/outbound`. Leads are sorted by ICP score descending. He filters by city or min-score, reviews each row, sets status, adds notes, copies the email + a personalization note into Instantly.

## Cost notes

| Item | Cost (approx) |
|---|---|
| Google Places `places:searchText` (default) | ~$0.03 / request, 12–24 requests / city / specialty-mix → **<$1 per 100 leads** |
| Apify Maps actor (alternate) | ~$0.50–2 per 100 places |
| Firecrawl scrape (per lead) | ~$0.001 per page (free tier covers ~500/mo) |
| MX lookup | $0 (Node `dns/promises`) |
| Claude Haiku scoring | ~$0.001 per lead (Haiku 4.5 input + output) |
| **Total per 100 leads — `places` source** | **~$1** |
| **Total per 100 leads — `apify` source** | **~$2–3** |
| **Total per 100 leads — `both` source** | **~$2.50–4** (paying both providers; better coverage) |

## What's deliberately NOT included

- **Paid email verification** (Hunter / NeverBounce / Smartlead). We use MX-only because Chris explicitly chose the free tier. Bounce rates will be higher than with paid verification — Instantly's built-in bounce detection has to do the final filtering.
- **LinkedIn enrichment**. Apify has a LinkedIn actor but it's expensive and the data quality varies. Adding later if pattern + Firecrawl don't produce enough signal.
- **Auto-push to Instantly**. The `instantly_campaign_id` column exists, but Sam still manually moves leads into a campaign for now. Worth automating once campaign templates stabilize.

## Daily cap

Enforced globally across all jobs in `app/api/outbound/scrape/route.ts`:

```
remaining = OUTBOUND_DAILY_CAP (default 100) - leads_created_today_UTC
effective_cap = min(requested_max, remaining)
```

If `remaining ≤ 0`, the kickoff returns HTTP 429.

## Where to extend next

- **Hunter/Snov integration** in `email-guess.ts` (paid path) when bounce rate hurts.
- **Clay enrichment** layer between Apify and scoring when role-based emails aren't enough.
- **Per-city scheduled scrapes** via a cron — rotate through SLC / Houston / Atlanta automatically.
- **Auto-Instantly push** when a lead transitions `new → queued`.
