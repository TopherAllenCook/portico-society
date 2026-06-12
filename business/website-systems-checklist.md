# Website systems implementation checklist

Generated from the business-systems audit of www.vervemd.com. Tick boxes as you go. Items grouped by priority and by who owns the action (you vs. me).

Last audit pass shipped in PR #4 (`feat/website-systems-tier-0-1` → `chore/email-pipeline-reliability`).

---

## P0: Ship + verify

Must happen before or right after merge.

- [ ] Review PR #4 (commits `70cabb3`, `a6b2ce2`, `a4910a9`, `342c257`, `6d77e37`)
- [ ] Fix CI typecheck/webpack: either commit the missing `lib/outbound/` and `app/admin/mission-control/{HandshakeRow,RefreshOnInterval,MissionCard}.tsx`, OR widen `tsconfig.json` exclude
- [ ] Merge `feat/website-systems-tier-0-1` → `chore/email-pipeline-reliability`
- [ ] Merge `chore/email-pipeline-reliability` → `master` (when ready)
- [ ] Confirm Vercel auto-deployed production

### Smoke test (incognito on production)

- [ ] `/`, `/audit`, `/contact`, `/faq`, `/about`, `/security`, `/pricing` all render with no console errors
- [ ] Nav links navigate to the right pages on desktop and mobile
- [ ] Footer links work (Services, AI, Pricing, Free Audit, About, FAQ, Contact, Security, Privacy, Terms)
- [ ] Favicon shows in browser tab
- [ ] Paste `https://www.vervemd.com` into Slack/iMessage/LinkedIn; OG image renders
- [ ] `/services` and `/services-2` both 301 to `/pricing`
- [ ] `/sitemap.xml` lists all routes
- [ ] `/robots.txt` references the sitemap
- [ ] Click "Book a call" in nav; Cal.com modal opens to `christopher-cook-jfcxhu/verve-discovery`
- [ ] Click "Talk to founder" in pricing hero; same modal opens
- [ ] Submit `/contact` form with a real message; `hello@vervemd.com` receives the branded notification with replyTo set to the form email
- [ ] Generate a fresh audit; `audit-report/[token]` thank-you shows the "Book the walkthrough" Cal CTA after the report renders
- [ ] Tap `(385) 275-6931` in footer on mobile; `tel:` link works
- [ ] Read `/about` end to end; edit any bio lines that don't sound like you
- [ ] Read `/security` end to end; confirm the four claims are all true today

---

## P1: Activate analytics (within 24h of deploy)

- [ ] Open GA4 Realtime on `G-DRF89N1D8T`; hit the live site; confirm pageviews land
- [ ] In GA4 → Admin → Events, wait for events to populate, then mark any lead events as Conversions
- [ ] **Decide on GTM**: if yes, create container at https://tagmanager.google.com and send me the GTM ID; I move GA into GTM and add conversion tags
- [ ] **Decide on Meta Pixel**: if yes, create Pixel in Business Manager and send me Pixel ID + BM ID; I add via GTM (or direct if no GTM)
- [ ] **Decide on cookie banner**: strict (EU-style, reject = no fire) / soft (US-default-grant) / skip (US-only, no banner)
- [ ] Send me the green light to wire `generate_lead` events into `/api/audit/submit` and `/api/inquiry/submit` (helper at `lib/analytics/track.ts` if/when ready)

---

## P2: Send inputs to unblock the next pass

Each row unblocks a specific build I have queued.

| Need | Format | Unblocks |
|---|---|---|
| Real founder headshot | Drop at `public/brand/founder-headshot.jpg` (or `.png`); 4:5 aspect, min 800x1000 | Swap CC monogram on `/about`; profile-card OG image |
| LinkedIn URL | Single URL | Person JSON-LD `sameAs` + visible link on `/about` |
| `/about` bio edits | Inline edit of the draft, or notes | Production-ready About page |
| Service-area scope | "Nationwide" OR list of states OR list of cities | `areaServed` on schema; future local pages |
| HubSpot credentials | Hub ID + private app token, OR "skip CRM for now" | Push contacts + deals from audit + inquiry submit |
| 1-2 anonymized case studies | `Clinic type · City · Size · Problem · What we did · Result (metric + timeframe) · Optional quote` | `/case-studies` index + detail pages with CaseStudy JSON-LD |
| `/kit` lead magnet ship | "approve" or "wait" | Make `/kit` and `/kit/thanks` reachable in production |

---

## P3: Operational (outside the codebase)

- [ ] **Cal.com event check**: confirm `verve-discovery` event has the right duration (25 min), buffer, availability windows, video link (Google Meet or Zoom), intake questions, calendar sync
- [ ] **Phone routing for (385) 275-6931**: confirm it rings where you want; voicemail greeting that points callers back to `/audit` or Cal
- [ ] **Inbox triage rule**: who reads `hello@vervemd.com` and what's the SLA? Site copy promises one business day from the founder
- [ ] **HIPAA/security review**: glance from a healthcare attorney on `/security` copy before it's load-bearing in a sale
- [ ] **Sitemap submitted**: in Google Search Console and Bing Webmaster Tools

---

## Tracked separately

- Future PR: delete `components/Footer.tsx` and `components/v2/*` (no `app/` imports remain; safe to remove)
- Future pass: build the `/kit` thank-you page CTAs to also fire `generate_lead` (after analytics is fully wired)
- Future pass: add Cal.com booking-completed conversion event via Cal webhook
