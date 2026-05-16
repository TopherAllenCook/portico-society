# Verve Audit Pipeline

Production pipeline for the AEO + GEO + SEO + Lead-Gen audit offered at `/audit`.

## Flow

```
/audit form
   │  POST /api/audit/submit  (Zod-validated intake)
   ▼
audit_jobs row created (Supabase, status: queued)
   │  POST /api/audit/run  (token-gated, fire-and-forget from submit)
   ▼
orchestrator (lib/audit/orchestrate.ts)
   ├─ crawl       (Firecrawl /map + /scrape, up to 12 pages)
   ├─ pagespeed   (Google PageSpeed Insights, mobile strategy)
   ├─ places      (Google Places API, GBP signals)
   ├─ geo         (multi-LLM patient queries: Claude required, others optional)
   │     │ derive top 3 competitors from mention frequency
   │     ▼
   ├─ schema      (JSON-LD audit over crawled pages)
   ├─ leadgen     (CTA/form/booking/analytics detection from homepage HTML)
   └─ dataforseo  (backlinks + ranked keywords + competitor gap + 12 SERPs)
   ▼
synthesize (Claude Sonnet 4.6, prompt-cached framework)
   ▼
audit_synthesis row + Resend "audit ready" email + shareable /audit-report/[token]
```

## Required env vars

| Var | Required? | Notes |
|---|---|---|
| `SUPABASE_URL` | yes | https://zchhxmgziiiszxuaymga.supabase.co |
| `SUPABASE_SERVICE_ROLE_KEY` | yes | Service role — server-only |
| `ANTHROPIC_API_KEY` | yes | Claude Sonnet 4.6 for GEO + synthesis |
| `FIRECRAWL_API_KEY` | yes | Site crawl + scrape |
| `DATAFORSEO_LOGIN` | yes | Backlinks, keywords, SERPs |
| `DATAFORSEO_PASSWORD` | yes | " |
| `PAGESPEED_API_KEY` | recommended | Higher quota; works without but throttled |
| `GOOGLE_PLACES_API_KEY` | recommended | Falls back to `PAGESPEED_API_KEY` if same Google Cloud project has Places enabled |
| `RESEND_API_KEY` | recommended | Delivery emails |
| `AUDIT_NOTIFY_EMAIL` | optional | Default: topher.a.cook@gmail.com |
| `AUDIT_RUN_TOKEN` | yes | Shared secret between submit → run routes |
| `PUBLIC_BASE_URL` | recommended | Used in delivery emails; default https://vervemd.com |
| `OPENAI_API_KEY` | optional | Adds ChatGPT to GEO panel |
| `PERPLEXITY_API_KEY` | optional | Adds Perplexity to GEO panel |
| `GOOGLE_API_KEY` | optional | Adds Gemini (web-grounded) to GEO panel |

Recommended for first launch: Supabase, Anthropic, Firecrawl, DataForSEO, PageSpeed (key optional), Resend, AUDIT_RUN_TOKEN. That stack delivers a complete audit. The other three GEO providers are additive — each one runs the same query set and strengthens the visibility score.

## Cost per audit (approximate)

| Module | Cost |
|---|---|
| Firecrawl (12 page scrapes + 1 leadgen scrape + map) | ~$0.05 |
| PageSpeed | $0 |
| Places | $0.017 (1 search + 1 details) |
| GEO (Claude only, 8 queries) | ~$0.05 |
| GEO (4 providers × 8 queries) | ~$0.20 |
| DataForSEO (full plan in dataforseo.ts) | ~$0.80 |
| Claude synthesis (cached system + 30K input + 4K output) | ~$0.30 |
| **Total (Claude-only GEO)** | **~$1.20** |
| **Total (all 4 GEO providers)** | **~$1.40** |

## Scaling beyond the Vercel 300s function budget

The runner is intentionally a single HTTP route so it can be hot-swapped:
- **Trigger.dev**: convert `runAudit(jobId)` into a `task()` and call it from the submit route instead of fetching `/api/audit/run`.
- **Inngest**: same pattern with `inngest.send({ name: 'audit/run', data: { audit_id } })`.
- **QStash**: queue a delayed POST to `/api/audit/run`.

No other code has to change — modules don't know they're running inside a job system.

## Adding modules

1. Add a new module name to `ModuleName` in [types.ts](../lib/audit/types.ts).
2. Add a payload type alongside the existing ones.
3. Create the module file under `lib/audit/<name>.ts` that returns the payload.
4. Add a `runModule(...)` call in [orchestrate.ts](../lib/audit/orchestrate.ts).
5. Add the trimmed input to `buildUserPayload` in [synthesize.ts](../lib/audit/synthesize.ts) so Claude can use it.

## Admin / CRM

Internal-only routes for reviewing every audit before a call:

- [/admin](../app/admin/page.tsx) — list view with pipeline filters + search
- [/admin/audits/[id]](../app/admin/audits/[id]/page.tsx) — intake, raw module data, synthesized report, internal notes, pipeline status, nurture queue, pause toggle
- [/admin/login](../app/admin/login/page.tsx) — password gate (env `ADMIN_PASSWORD`)

Pipeline statuses: `new` → `reviewed` → `contacted` → `call_booked` → `proposal` → `won` | `lost`. `nurture` is a parking lane for re-engagement.

The admin viewer renders the same scorecard + competitor edges as the client report, plus collapsible blocks of raw module JSON so you can sanity-check the numbers before getting on the call.

## Nurture cycle

Five-touch sequence over ~45 days, seeded automatically when the audit delivery email goes out. Driven by Vercel Cron hitting [/api/cron/nurture](../app/api/cron/nurture/route.ts) once a day (14:00 UTC).

| Day | Step | Subject |
|---|---|---|
| +2 | `day_2_anchor` | One move from your {clinic} audit |
| +5 | `day_5_proof` | How clinics close the AI gap |
| +10 | `day_10_call` | 15 minutes to walk through your {clinic} audit |
| +21 | `day_21_last_check` | Still relevant? |
| +45 | `day_45_refresh` | Your AI visibility, six weeks later |

Copy lives in [lib/audit/nurture.ts](../lib/audit/nurture.ts). All five emails are specialty-aware (longevity / concierge / aesthetic / mixed). Body uses brand voice from PRODUCT.md — no em dashes, no hype, signed Verve MD.

Auto-skip rules:
- `pipeline_status` ∈ `won`, `lost`, `call_booked`, `proposal` → step marked `skipped`
- `nurture_paused_at` set → step marked `paused` (re-arms on resume)

Pause is one click in the admin detail view. Resume re-schedules all paused steps.

### Additional env vars

| Var | Required? | Notes |
|---|---|---|
| `ADMIN_PASSWORD` | yes | Single-operator gate for `/admin` |
| `CRON_SECRET` | yes | Vercel Cron bearer token — required for nurture sender to fire |
| `NURTURE_REPLY_TO` | optional | Inbox to route replies to (default: topher.a.cook@gmail.com) |
| `NURTURE_CALL_URL` | optional | Calendar link in day-10 email (default: https://cal.com/vervemd/audit-review) |

## Open follow-ups

- Trigger.dev or Inngest migration once audit volume exceeds a couple per hour.
- Playwright-based mobile-viewport check for the leadgen `mobile_form_visible_at_375` field (currently a placeholder).
- PDF rendering — easiest path is Playwright printing the `/audit-report/[token]` route. Defer until clients ask.
- Competitor crawl/PageSpeed pass — currently we run DataForSEO against competitors but not crawl/PageSpeed; add a `competitor_crawl` module when the audit page has room for side-by-side comparison.
- Status polling on the success state so users see live progress instead of an inline "running" copy.
