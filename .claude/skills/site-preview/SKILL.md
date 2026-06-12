---
name: site-preview
description: "Generate a 'what your website could look like' homepage preview for a scraped home-services lead with no website or a poor one. Builds a polished single-file HTML page from VERIFIED business facts only, stages it at vervemd.com/preview/<slug>, and produces the outreach lines that use it. Use for: site preview, website mockup, demo site, spec site, redesign preview, 'build them a better site', no-website leads, poor-website leads. Triggers: site preview, website preview, mockup site, demo homepage, spec work, rebuild their site, preview for [business]"
---

# Site Preview Generator

Turn a weak lead signal (no website, or a bad one) into the strongest close-warmer in the deck: a live, personalized preview of their rebuilt homepage. The audit tells them what's broken. The preview shows them fixed. Both funnel to the same Cal.com discovery call.

**Where this fits:** scraper → `outbound_leads` → (this skill) → preview URL → Sam's call or the audit email P.S. → discovery booked. It never replaces the close; it warms it.

## Step 1 — Pick the target

Three input modes, in order of preference:

1. **A lead row.** Query Supabase `outbound_leads` for candidates:
   ```sql
   select id, clinic_name, specialty, website, phone, city, state,
          google_rating, google_review_count, marketing_signals, icp_score
   from outbound_leads
   where status in ('new','reviewing')
     and icp_score >= 50
     and (
       website is null
       or (marketing_signals->>'cta_above_fold')::boolean is false
       or (marketing_signals->>'has_contact_form')::boolean is false
       or (marketing_signals->>'has_schema')::boolean is false
     )
   order by icp_score desc;
   ```
   "No website + high ICP score" is the golden segment: an established shop ($1M+ proxy signals) running on reputation alone.
2. **A URL or business name** Chris or Sam hands over directly.
3. **An Airtable Contact Info row** from the Internet Scraper base.

ICP floor still applies. Do not build previews for one-truck operators; a beautiful site doesn't fix retainer math.

## Step 2 — Build the fact sheet

Collect ONLY verifiable facts before writing a line of copy:

- From the lead row: name, trade, phone, address, city/state, Google rating, review count, categories, owner names.
- If they have a site: scrape it (firecrawl or curl). Harvest real services offered, service area, hours, license numbers, years in business, real review quotes, their logo and colors.
- If they have no site: Google Business Profile data from the lead row is the whole fact sheet. That's fine; the preview will be leaner.

Write the fact sheet at the top of the working session. Every claim on the preview page must trace back to a line in it.

## Step 3 — Honesty guardrails (hard rules)

- **Never fabricate**: reviews, star ratings, review counts, license numbers, years in business, certifications, guarantees, staff, or before/after photos. If it's not in the fact sheet, it doesn't appear.
- Missing data gets an obvious editable placeholder: `[YOUR LICENSE #]`, `[TEAM PHOTO]`, never realistic-looking fake content.
- Real Google rating/count may be shown only as scraped (e.g. "4.8 stars, 212 Google reviews").
- Stock-feel imagery: use neutral CSS treatments (gradients, solid color bands, simple SVG icons), NOT AI-generated photos of "their" trucks or crew.
- The page footer carries a single small line: "Preview prepared by Verve" linking to vervemd.com. Their brand owns the page; ours signs it.
- `<meta name="robots" content="noindex, nofollow">` always. Previews are unlisted and never enter the sitemap.

## Step 4 — Build the page

One self-contained HTML file (inline CSS, no build step, no external JS) at:

```
public/preview/<kebab-case-business-name>/index.html
```

Design language: their brand, not ours. Derive palette from their logo/site if one exists; otherwise use trade-appropriate defaults (plumbing: deep blue + safety orange accents; HVAC: cool blue/steel; electrical: navy + amber; roofing: charcoal + brick). Never use the Verve Signal palette on a client preview.

Required sections, in order (mobile-first, this is a phone audience):

1. **Sticky call bar**: their real phone number, tap-to-call, visible at every scroll position.
2. **Hero**: trade + city headline ("Salt Lake City's Licensed Plumbers"), one-line trust subhead from real facts, two CTAs: "Call Now" and "Book Online".
3. **Emergency band** (plumbing/HVAC/electrical): "Available 24/7" ONLY if the fact sheet supports it, otherwise "Same-day service" placeholder flagged for their confirmation.
4. **Services grid**: only services they actually offer, 6 max, icon + 1 line each.
5. **Trust strip**: real Google rating + review count, real license number or placeholder, years in business if known.
6. **Real review quotes**: 2-3, verbatim from Google, attributed by first name. Skip the section entirely if none were scraped.
7. **Service area**: their real city list.
8. **Booking section**: form with name/phone/issue (non-functional in preview, labeled "Demo"), framed as what their site is currently missing.
9. **Footer**: NAP exactly as Google has it, plus the Verve signature line.

Include `schema.org/LocalBusiness` JSON-LD built from real NAP only.

## Step 5 — QA, review, ship

1. Open it locally (`npx serve public` or the dev server on port 3000) and screenshot mobile + desktop (playwright MCP if connected).
2. Re-read every visible claim against the fact sheet. Anything unverifiable gets a placeholder or dies.
3. **Show Chris the preview before it deploys.** Same rule as outbound email: nothing client-facing ships unseen.
4. On approval: commit only the preview directory and push to master (auto-deploys ~40s). Verify live at `vervemd.com/preview/<slug>/`.

## Step 6 — Put it to work

- **Sam, live on a call**: "Actually, we already mocked up what your site could look like. I'll text you the link right now, take a look while we talk."
- **Audit email P.S.**: "P.S. We went ahead and built a preview of what [Company]'s site could look like: [link]. Takes 30 seconds to look at."
- **Log it**: note the preview URL on the lead row (`notes` column) so nobody double-builds.

One preview per lead, built fresh. Never recycle another company's preview with the name swapped; the entire value is that it's visibly theirs.
