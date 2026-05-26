# FMS Deep Public Re-Audit
**Date:** 2026-05-24
**Status:** complete for public artifacts. See Gaps for what requires admin access.
**Audience:** Jennifer Lindberg (Director of Marketing), executing under board-meeting time pressure.
**Method:** Firecrawl scrape/map against fmsinc.org, Wayback Machine snapshots for Forum 25 comparison, direct curl for SEO/tracking, WebSearch for peer follower counts and SERP positioning. No admin access used.

> Companion to `docs/fms/audits/audit-linkedin-public.md`. This extends; it does not repeat. Where the first audit covered LinkedIn engagement, Insight Tag absence, and overall posting mix, this audit goes into Forum 2026 readiness, the events catalog, gated/public content map, SEO/GEO, peer benchmarking, and a fresh LinkedIn re-pass.

---

## TL;DR for Jennifer

1. **Forum 2026 is in 21 days (June 14-16, New Orleans, Hilton Riverside) and the public site shows it is running on autopilot.** The agenda has been frozen at "as of 2/9/26" for 3.5 months. The hotel room block deadline (May 15, 2026) **passed 9 days ago** with no visible extension on the site. The "early bird" / pre-discount window closed quietly; registration is now at FULL RATE ($1,499 member / $2,099 non-member). These are three independent signals that someone stopped tending this conference. They line up with Jules giving notice on May 11. Fix the visible ones this week.
2. **The Forum 26 Attendee Snapshot page still shows Forum 2025 data**, and the headline keynote is a single management-consultant-author speaker (Scott Wise, *AI4Finance*). Forum 25 had Ginger Kerrick, ex-NASA Mission Control. Star power has dropped; the social-shareable hook is weaker. There is no second-day or closing-day named general session keynote — only a "Business Meeting / Roundtable Discussions" block. **Book or surface a second name in the next 14 days,** even an FMS board member, so the agenda reads as 2 keynotes + 1 regulatory panel rather than 1 keynote + a business meeting.
3. **Sponsor count is roughly even with 2025 (~37 unique brand assets) but the mix has rotated:** FMS lost Cherry Bekaert, Forvis Mazars, KBRA, Kafafian, Mercadien, Level1Analytics, McQueen Financial, PPG/PMA, and QwickRate/IntelliCredit. Gained Crowe, CostPerform, FHN Financial, GSB, Invictus, MBS, OptimaFi, PTMA Funding, Trintech. Net: similar count, **but the lost names include several of last year's heavier sponsors (Cherry Bekaert and Forvis Mazars were both speaker-active in 2025).** Worth a 1-1 call from Alana or a board member to each of the 9 lost sponsors before Forum to ask why and to invite them as exhibitors-only.
4. **Public webinar and seminar catalog is dangerously thin:** only **4 upcoming webinars through July 2026** are visible on the public webinars page, and only **2 in-person seminars** (both Call Report on June 15-16, co-located with Forum). The webinar / virtual education / seminar landing pages render as ~1-screen lists with no descriptions, no prices, no speaker names, no testimonials. Compare to ProSight (the new BAI + RMA combined entity) which has a full Industry Insights center, Ask ProSight AI search, and 80+ chapters. **Fix the catalog pages to be conversion surfaces, not directory stubs.**
5. **The single biggest organic content asset FMS has is already sitting on the website and being used for nothing.** `/career-advice-column.html` is a wall of named-board-member testimonials (Terry Bishop UNCLE CU, Bryan Ridgway Empyrean, Kelsey Marquis cPort CU, Dennis Zimmerman Commerce Bank, Mark Haberland DCG, Shannon Croll Franklin Bank, Fred Viaud Ascendia Bank, plus FMS Chairman). This is the exact "named human + specific insight" format that out-performed everything else in the LinkedIn audit (10 likes on the Levey/Ridgway post vs. a 3-like median). **Repackage one quote per week as a LinkedIn carousel with tag-the-board-member CTA.** Zero new content production required.
6. **LinkedIn Insight Tag still missing** (confirmed via direct curl of `fmsinc.org` source — zero `snap.licdn.com` / `insight.linkedin.com` / `li.lms-analytics` hits). This finding has not changed since the prior audit, but every day without it is a day of untraceable, un-retargetable Forum-driven traffic to fmsinc.org. **15-minute paste into the existing GTM container** (`GTM-PC8LPTR`).
7. **FMS does not rank for the obvious search queries.** "community bank cfo association" returns CA Community Banking Network, CFO Leadership, Controllers Council — not FMS. "credit union finance association" doesn't surface FMS at all. The homepage `<title>` is literally `Financial Managers Society - Home` and the meta description is truncated mid-sentence at "With members from commercial banks". This is a free organic-search lever Jennifer can pick up in an afternoon (Weebly lets you edit page-level SEO without re-platforming).

---

## 1. FMS Forum 2026 Readiness

### What's public

| Page | URL | Notes |
|---|---|---|
| Conference home (About) | `/forum26-about.html` | Boilerplate "why attend" cards. Photo gallery is all Forum 2025 imagery (file paths `forum25-*`). No 2026 brand visual. |
| Agenda | `/forum26-agenda.html` | **"As of 2/9/26"** date stamp. 3 keynote/general blocks. 20 named breakout speakers across 3 days. Accounting & Regulatory Panel lists FDIC/Fed/OCC reps as "(Invited)" with the disclaimer "NCUA is unable to attend this year, but is looking forward to coming again soon." |
| General Sessions | `/forum26-general-sessions.html` | **Lists ONE speaker only:** Scott Wise, "AI4Finance: Amplifying Financial Judgement in a Regulated World," Monday June 15 8:30am. Long bio. No Tuesday keynote. |
| Session Descriptions | `/forum26-session-descriptions.html` | 20 breakout sessions, all with speakers and descriptions. This page is in good shape. |
| Pathway to CFO | `/forum26-pathway-to-cfo.html` | Sunday June 14, 12-4pm CT. Speaker: Scott Hildenbrand (Piper Sandler, FMS Board 2021). $450 add-on. Includes a downloadable "Manager Approval Kit" Word doc, smart UX. |
| Attendee Snapshot | `/forum26-attendee-snapshot.html` | **All Forum 2025 data.** Page literally opens with "View the breakdown of financial service professionals who attended The 2025 FMS Forum Annual Conference." Stats: "97% rated experience as excellent or very good." |
| Accommodations | `/forum26-accommodations.html` | Hilton New Orleans Riverside, Two Poydras St. **$269/night single/double. Room block deadline: Friday, May 15, 2026** (passed). Booking link: `book.passkey.com/event/51082816/`. No notice of an extension. |
| Exhibit/Sponsor | `/forum26-exhibit-sponsor.html` | ~37 sponsor logos. Sponsor contact is Nancy Bennett at **schelhornbennett@outlook.com / (703) 408-6080** (personal outlook.com address, not @fmsinc.org). Prospectus PDF and application PDF linked. |
| Register | `/forum26-register.html` | "May 12 - June 9, 2026: FULL RATE. Members $1,499, Non-Members $2,099." Add-on: guest above 12 = $275. Cancellation policy: no refunds after May 9, 2026 (already passed). |

### Compared to FMS Forum 2025 at this point

Forum 2025 was held **June 22-24, 2025** in Orlando, FL (Eagle's Edge venue at Omni). The equivalent timing snapshot is **Wayback May 14-17, 2025** (5-6 weeks pre-event vs. 3 weeks for our 2026 snapshot, so 2026 should be *more* developed, not less).

| Dimension | Forum 25 at May 14-17, 2025 (Wayback) | Forum 26 at May 24, 2026 (today) | Delta |
|---|---|---|---|
| Days before event | 36-38 days | 21 days | F26 is closer to event |
| Agenda "as of" date | **5/15/25** (2 days before snapshot) | **2/9/26** (3.5 months before snapshot) | F26 agenda has been static far longer |
| Nav: Special Events page | Yes (`/forum25-special-events.html`) — included "Par-tee at Eagle's Edge" Welcome Reception, EPCOT evening reception | None. Just generic "Welcome Reception" and "Networking Reception" with sponsor list | F26 is missing themed/branded experiences |
| Nav: Golf Outing | Yes — dedicated `/forum25-golf-outing.html` page | None | Removed (real loss for sponsor activation and CFO bonding) |
| Nav: Collaborate (sponsor) | Yes (`/forum25-collaborate.html`) — ~31 sponsor brand logos at this point | Renamed "Exhibit/Sponsor" — ~24-25 sponsor logos with `_orig.png` extension; ~37 brand assets total when including newer logo path patterns | Net roughly even on count, ~9 brand-name rotations (lost vs. gained) |
| Keynote depth | Ginger Kerrick (first Latina director NASA Mission Control, STEM ambassador, 30-yr Johnson Space Center veteran) Monday + Risk Management Panel Monday afternoon as 2nd general session | 1 keynote (Scott Wise) Monday morning, then "Business Meeting / General Session Roundtable Discussions" Tuesday morning, then "Accounting & Regulatory Panel" Tuesday afternoon | F26 lost a marquee keynote, dropped to one named star |
| Sponsor contact | Internal (would have been Jules) | **Nancy Bennett @ outlook.com personal email** | Likely contractor handoff; weakens "official FMS" signal to sponsors |
| Hotel block | Hyatt Regency Orlando, deadline reasonable | Hilton NOLA Riverside, **deadline May 15 already passed** | Significant — attendees showing up now risk paying rack rate or finding sold-out |

### Risks visible from outside

- **Hotel block deadline passed with no public extension.** Late-decider attendees will get punished. Easy fix: confirm with Hilton whether the block is still honored at $269, then post a notice. If it's no longer extended, FMS needs a Plan B hotel within 2 weeks.
- **Registration page lists "May 12 - June 9, 2026: FULL RATE" but doesn't list any earlier early-bird tier publicly.** Either the early-bird ran from launch to May 11 and was removed silently (typical), or it never existed. Either way, anyone visiting today sees only the top-of-funnel rate and no urgency mechanism beyond "register before June 9." **Add a "Last 21 days" or "Final week" countdown banner on `/forum26-register.html` immediately.**
- **NCUA "unable to attend this year"** publicly stated on the agenda is a credit-union-side credibility hit. FMS pitches itself as serving credit unions equally. Need a credit-union-specific signal added: another CU regulator, a CU CFO panel slot, or a CU-only meetup callout.
- **"(Invited)" status on every regulator panelist** (FDIC, Fed, OCC) means none are confirmed publicly. 3 weeks out, this should read as confirmed. If they are confirmed, just remove "(Invited)" — instant credibility upgrade with zero cost.
- **All photography on the About page is reused 2025 imagery** (file paths literally read `forum25-monpm-general-session-edited`, `forum25-eaglesedge-edited`, etc.). To a returning attendee this signals "nothing new." Worth one professionally captured "NOLA tease" shot.
- **Sponsor email going to a personal outlook.com address** signals to industry-savvy sponsors that the sponsorship function is in flux. Should at minimum forward through info@fmsinc.org with Nancy's signature line.

### Recommended Jennifer-can-action moves (3-week sprint to June 14)

| Priority | Action | Effort | Why now |
|---|---|---|---|
| P0 | Confirm hotel block status and post visible notice (extended date or "no extension, here are 3 nearby alternatives") | 1 hour | Already-passed deadline is bleeding registration confidence |
| P0 | Re-date the agenda page (even if content unchanged, change the "as of" stamp to current week and add 1-2 panelist confirmations) | 30 min | "As of 2/9/26" reads as abandoned |
| P0 | Update Attendee Snapshot to say "Based on Forum 2025" explicitly or update with any Forum 2026 registration mix data available internally | 1 hour | Currently looks like the page just wasn't migrated |
| P0 | Add countdown / urgency banner to register page | 30 min | Last 21 days deserves a CTA, not boilerplate |
| P1 | Strip "(Invited)" from regulator panelists if confirmed; if not confirmed, do the confirmation calls this week | 2-5 hours | The single biggest credibility leak |
| P1 | Personal outreach to the 9 lost-from-2025 sponsors (Cherry Bekaert, Forvis Mazars, KBRA, Kafafian, Mercadien, Level1Analytics, McQueen, PPG/PMA, QwickRate/IntelliCredit) | 9 calls | Even table-only sponsors at this stage are revenue + presence |
| P1 | Replace `schelhornbennett@outlook.com` with `sponsors@fmsinc.org` (or info@) routing to Nancy | 30 min | Domain credibility |
| P2 | Book 1 additional general-session-tier speaker for Tuesday (any FMS board CFO, named) to give the agenda 2 keynotes instead of 1 | 1-2 weeks | Strengthens the social-share story |
| P2 | One short on-site / on-NOLA photo or video tease for social and the About page | 1-3 days | Replaces 2025 photo gallery vibe |
| P3 | Bring back Golf Outing as paid add-on (Hilton Riverside is walking distance to Audubon Park course, plus several others within 15 min) | 1 week to coordinate, can be sold up to event week | Sponsor-friendly, CFO-friendly, easy revenue |

---

## 2. Events & Education Catalog

### Currently listed (publicly visible only)

| Catalog page | Count | Detail |
|---|---|---|
| **Webinars** (`/webinars.html`) | **4 upcoming** | Jun 4 (ALCO Effectiveness), Jun 23 (Regulatory Thresholds), Jul 21 (Reporting Jungle), Jul 30 (CBLR vs Basel III). Page has no speakers, no descriptions, no prices visible. |
| **Virtual Education** (`/virtuals.html`) | **2 upcoming** | Sep 16 (Call Report Refresher Banks), Sep 22 (5300 Call Report Refresher CUs). |
| **Seminars** (`/seminars.html`) | **2 upcoming** | Both Jun 15-16, 2026 (Call Report for Banks + 5300 for CUs). **Both held in New Orleans** = co-located with Forum but not promoted on the Forum page as a bundle. |
| **Conferences** (`/conferences.html`) | 2 | FMS Forum 2026, East Coast Regional 2026 |
| **Call Report Programming** (`/call-report-programming.html`) | 4 events across banks + CUs | Refresher (virtual, Mar 18-24) + In-Person (NOLA, Jun 15-16). Clean two-column layout, this page works. |
| **IRR/Liquidity Funding Programming** (`/irr-programming.html`) | (not scraped, presumed similar shell) | — |
| **Financial Managers School 2026** (`/financial-managers-school-2026.html`) | 1 event | — |
| **East Coast Regional 2026** (`/ecr26-home.html`) | **Home page is literally 1 sentence:** "The FMS Boston and New York/New Jersey Chapters invite you to Annapolis, Maryland for the 2026 East Coast Regional Conference. Join us to exchange ideas and network with colleagues and industry experts." No date on the home page. The accommodations page reveals date proximity via a Navy football game note (Sep 26, 2026), implying ECR is in late Sep. | 

### Pricing transparency

- **Membership pricing IS public** (correcting first audit): $297.50 individual, $312.50 partner. Company pricing is "Inquire for Pricing" (friction).
- **Forum 26 pricing IS public**: $1,499 member / $2,099 non-member / +$450 Pathway to CFO add-on / +$275 guest.
- **Webinar/seminar/virtual pricing is NOT public anywhere.** This is unusual even for associations. ICBA also gates pricing behind their portal but at least lists per-event "Member / Non-Member" tiers on event detail pages. FMS hides pricing until you're inside `web.fmsinc.org/events/...`.
- **The member benefits page reveals** that webinars are "complimentary" to members and "normally priced $299 each" — this is a great value-prop number that appears nowhere else, especially not on the public webinars listing page.

### Registration counts visible publicly?

No. None of the event pages expose attendance, registration count, "Xx seats left," or "Sold out / Waitlist." ICBA does the same — this is a category norm — but it is also a missed urgency lever.

### Findings

- The catalog pages exist but are **directory stubs, not conversion surfaces.** They list 4 webinars and 2 seminars as if that's the entire program for the year. Without descriptions, speakers, or prices, they don't sell anything.
- **The "$299 / free to members" framing buried on member-benefits.html is the single most underused piece of pricing copy on the site.** It belongs on every webinar listing tile: "Members: Free. Non-members: $299." That single edit converts the webinars page from a calendar into a membership-sales funnel.
- **The Q2 Call Report Seminar (named in the member emails Chris received)** is publicly listed only as "Call Report for Banks, Jun 15-16, New Orleans." The "Q2" framing — which is what banks actually search for — isn't in the page title or URL. SEO miss.
- **East Coast Regional Conference page is functionally empty.** Most-visible competitor regional events at this stage have full agendas, speakers, sponsor lists, and registration. 4 months before event with a one-sentence home page is rough.
- **Financial Managers School 2026** has a brochure link, which is good. The school is a multi-day flagship beyond the Forum and deserves equal billing on the homepage, which it doesn't currently get.

---

## 3. Member-only vs. Public Content Map

### Public pages worth highlighting (already public, just underused)

| Page | What it has | Why it's a marketing asset |
|---|---|---|
| `/career-advice-column.html` and `/career-advice-column-735936.html` | 7+ named FMS Board members with personal advice quotes and headshots: Terry Bishop (UNCLE CU SVP & CFO), Bryan Ridgway (Empyrean), Kelsey Marquis (cPort CU CFO & COO), Dennis Zimmerman (Commerce Bank SVP), Mark Haberland (DCG MD), Shannon Croll (Franklin Bank SVP & CFO), Fred Viaud (FMS Chairman, Ascendia Bank CEO) | **This is the single most valuable un-leveraged asset on the site.** Each quote = a LinkedIn carousel slide. Tag the board member, get a guaranteed reshare into their personal network = thousands of CFO-graph impressions for free. |
| `/history.html` | 1948 founding story | Brand depth content, never repurposed |
| `/year-in-review.html` | "2025 by the numbers" digest images | Could be a hero PDF download = lead magnet |
| `/the-fms-team.html` | Named staff with direct phones / emails | Humanizes the brand, currently buried under About |
| `/chapter-in-a-box.html` + `chapter_in_a_box.pdf` | Full playbook for spinning up a local chapter | Could be repositioned as "How a community bank finance team builds peer learning" — content marketing in disguise |
| `/uploads/.../partner_prospectus_2026.pdf` and `forum24_infographic.pdf` | Sponsor and attendee-demographic infographics with great data ("Asset Size: $1B-$4.99B = 43%", "Accounting/Finance: 56%") | This data deserves a public webpage, not a buried PDF |

### Member-only content (worth un-gating for marketing)

| Asset | Currently | Recommendation |
|---|---|---|
| **Thought Leadership Articles** (member-exclusive section per member-benefits page) | Member-gated, partner-supplied | Un-gate the first 3-6 paragraphs of each as previews. Use these as LinkedIn / email content drivers. Industry-standard pattern, used by ProSight, BAI legacy, ICBA Independent Banker. |
| **Monthly Member Recap** (email) | Member-only | Strip out members-only links, publish recap as `/blog/` posts. Each issue = 4 blog posts = SEO surface for 30 days. |
| **FMS Spark community** | Member-only (Circle.so), has a "Sneak Peek" link | Sneak Peek is good. Take 1-2 of the better discussion threads per month, anonymize, publish as "What FMS members are talking about this week." |
| **CPE Webinar archive** | Member-only via FMS Store | Un-gate 1 archived webinar per quarter as a public taste, with a sign-in wall for the rest. Standard playbook. |
| **Membership pricing for companies** | "Inquire for Pricing" | Just publish a tier table. Bands like "<$249M: $X, $250M-$499M: $Y, $500M+: $Z." Removes a sales-call gate. |

### Content gap analysis (what's missing entirely)

- **No public "Resources" or "Insights" hub.** Every other 5000+ member finance association has one. The career advice column is the closest thing FMS has and it's hidden in `/career-advice-column.html` with no nav entry visible.
- **No annual industry survey or benchmark report.** ProSight publishes Statement Studies. ICBA publishes Independent Banker. RMA legacy published Community Bank Survey on interest-rate risk. FMS publishes nothing comparable publicly. This is the biggest white space.
- **No regulator commentary or POV.** The agenda lists FDIC/Fed/OCC panelists but FMS itself never publishes a take on the latest call report change, CECL guidance, etc. ABA Banking Journal and Bank Director own this content territory entirely.
- **No CFO career-path / talent content** beyond the one-quote career-advice column. With finance retention being a stated industry pain (per Chris's lead-magnet draft on 2026-salary-benchmarks.md), this is an open lane.

---

## 4. SEO / GEO Snapshot (light pass)

### Search visibility

Tested 5 queries a community-bank or credit-union CFO might Google:

| Query | FMS rank on Google (page 1 visible) | Top 3 actual results |
|---|---|---|
| "community bank cfo association" | **Not on page 1** | Community Financial System, CA Community Banking Network CFO Forum, CFO Leadership |
| "credit union finance association" | **Not on page 1** | Financial Fitness Association (consumer), MyCreditUnion.gov, generic CU partnerships |
| "CECL training community banks" | Surfaces via event detail pages indirectly (`web.fmsinc.org/events/Call-Report-for-Banks-CECL-Edition-...`) but FMS brand pages don't rank for the topic | Bank Director, BeBpas blog, CSBS, ABA Banking Journal |
| "financial managers society" | **#1** (own brand) | fmsinc.org #1, LinkedIn page #2, chapter sites #3-5 |
| "call report seminar 2026" | **Not on page 1** | Iowa Bankers, CA Community Banking Network, ICBA Advanced Call Report Seminar |

**Read:** FMS ranks for its own name and nothing else. It doesn't show up for the queries its target buyer actually types. ICBA, CA Community Banking Network, and even Iowa Bankers out-rank FMS on its own category terms.

### Mobile + meta basics (homepage)

| Check | Status |
|---|---|
| Viewport meta tag | Present (`width=device-width, initial-scale=1.0`) — mobile responsive |
| `<title>` | `Financial Managers Society - Home` — uses the word "Home" instead of a search term |
| Meta description | Present but **truncated mid-sentence**: "...With members from commercial banks" (cuts off). Weebly likely auto-truncating; needs manual override. |
| Meta keywords | Deprecated tag still in use ("Finance, Banks, credit Unions, fms, financial managers society, forum, fmsinc, banking, association, forum, management, registration, conference"). Harmless but signals legacy SEO. |
| Open Graph image cascade | 10+ `og:image` tags including generic icons. When someone shares fmsinc.org on LinkedIn or Slack, the preview will pick the first image (`ecr26-register-homepage-slider.png`) — fine for now, but no curated social card. |
| Canonical tag | Not visible in the head section pulled |
| Schema.org structured data | Not visible. No Event schema on forum26 pages, no Organization schema. This is a measurable AEO/GEO gap. |
| LinkedIn Insight Tag | **Still not installed** (0 hits on `snap.licdn.com` / `insight.linkedin.com` / `li.lms-analytics`) — unchanged since first audit |
| GA4 | Present (`G-3LY29E9X8M`) |
| Universal Analytics | **Still present and deprecated** (`UA-7870337-1`) — should be removed |

### GEO (AI search) readiness

Quick check: a Perplexity / ChatGPT Search query for "best association for community bank CFO professional development" would surface ICBA, ABA, CFO Leadership, and (now) ProSight before FMS, because:
- FMS has no schema markup that maps `Organization` → `audience: community bank finance leaders`.
- FMS published no AI-citable benchmark data ("X% of community bank CFOs say Y").
- FMS's About page reads as institutional history (founded 1948, non-profit, CPE credits) rather than as a clear positioning statement an LLM can quote.

### Findings

1. **The fastest SEO win is a 5-minute homepage title rewrite** to something like `Financial Managers Society — Education & Community for Community Bank and Credit Union CFOs`.
2. **Fix the truncated meta description.** It is literally cut off in the source.
3. **Add Event schema to all `forum26-*` and event detail pages.** This is the single most under-deployed SEO/GEO upgrade for event-driven associations. Get the JSON-LD into the head and Google Events will start surfacing FMS Forum, Pathway to CFO, and Call Report seminars in event-rich results.
4. **Drop UA tracking.** It is deprecated, sending no useful data, and adds page weight.
5. **Install LinkedIn Insight Tag this week** (this finding pre-dates this audit and remains the single highest-leverage technical change).

---

## 5. Peer Association Benchmark

### Comparison table

| Org | LinkedIn followers | Posting cadence (est.) | Public lead magnet | Content formats used | Notes |
|---|---|---|---|---|---|
| **FMS** | **2,188** | ~10-12 posts/week | None | Text + single image, link shares | Tiny relative to peers; no carousels, no video, no gated download |
| **ProSight (BAI + RMA merged Nov 2024)** | RMA legacy ~35,578 + BAI legacy ~14,220, now consolidating into `linkedin.com/company/prosightfa/` | Heavy multi-channel | Full Industry Insights center (articles, webinars, podcasts) + "Ask ProSight" AI search + ProSight Statement Studies (paid product but with a free preview funnel) | Long-form articles, AI search assistant, podcasts, conferences | **The biggest competitive event of the year for FMS happened 18 months ago and barely registered:** BAI and RMA merged into ProSight Financial Association on Nov 12, 2024. Both `bai.org` and `rmahq.org` now redirect-page traffic to `prosightfa.org`. ProSight has 80+ local chapters. |
| **ICBA (Independent Community Bankers of America)** | **27,112** | Daily on LinkedIn, also operates `independentbanker.org` magazine | Independent Banker magazine (free public read), Annual Convention "ICBA Live," event pricing visible per-event | Magazine, conferences, podcasts, member testimonials | Better SEO surface than FMS on category terms. Their Advanced Call Report Seminar (May 13, 2026) is one of FMS's most direct competitors and outranks FMS on the search term. |

### What peers are doing that FMS isn't

- **Public Insights/Resources content hub.** ProSight Industry Insights, ICBA Independent Banker magazine, ABA Banking Journal. All free, all SEO-rich, all repurposable on LinkedIn. FMS has career-advice-column.html and nothing else.
- **Branded data products.** ProSight Statement Studies, RMA Community Bank Survey. FMS has no equivalent, though the partner_prospectus_2026.pdf has solid demographic infographics that could be the seed for one.
- **AI-search-friendly tools.** ProSight launched "Ask ProSight" (AI search of their content). FMS has zero AI surface area.
- **Per-event pricing transparency on detail pages.** ICBA event pages show member/non-member tiers. FMS hides this until you're inside the registration portal.
- **Sponsor/advertising as published menu, not call-to-inquire.** ProSight has a published sponsorship-opportunities page; FMS has a downloadable PDF prospectus only.
- **Personal-brand amplification by staff and board.** FMS has 22 LinkedIn-listed employees and a board full of named CFOs (per career-advice-column.html). None of them visibly reshare FMS posts.

### What FMS is doing well relative to peers

- **Specialization focus.** FMS exclusively serves community bank, credit union, and thrift finance people. ProSight is now everything-for-everybody after the merger; ICBA covers all of community banking not just finance. FMS's niche is sharper and that should be the marketing wedge.
- **Forum has real attendee credibility.** "97% rated experience excellent or very good" with named past-attendee quotes. ICBA and ProSight don't lead with this stat as prominently.
- **CPE credit infrastructure is solid.** NASBA registered, multi-state agreements, clear documentation. This is table-stakes that ICBA/ProSight match but FMS has parity.
- **Pathway to CFO is a real differentiator.** A small-group, peer-cohort program with a named instructor (Hildenbrand) and a Manager Approval Kit. ProSight and ICBA don't have a comparable CFO-track product visible publicly.
- **New "regional chapters included in national membership" benefit** (Oct 1, 2025) is a genuine feature improvement that ICBA doesn't match. **It is buried on the member-benefits page and mentioned nowhere else.** Should be in the homepage hero rotation.

---

## 6. LinkedIn Re-examination

LinkedIn blocks unauthenticated scrapers (Firecrawl returns an unsupported-site error), so depth here is limited to what surfaces via WebSearch and Google's index. Findings:

- **Engagement holds at first-audit levels.** Median ~3 likes per post on a 2,188-follower base = ~0.1-0.4% engagement, well below the ~2% B2B benchmark. No visible shift since prior audit.
- **Latent advocacy is real but unplugged.** The Career Advice Column board members (Bishop, Ridgway, Marquis, Zimmerman, Haberland, Croll, Viaud) and the Attendee Snapshot quotes are named, credentialed, on-the-record members. None of them visibly reshare the FMS company page. Several Forum 2026 speakers (Hildenbrand/Piper Sandler, Haberland/DCG, Wofford/Kohl) have 1K-10K personal followings and don't appear to be co-promoting their own sessions.
- **Staff distribution layer remains dormant.** 22 employees listed on the company page; Alana Vartanian's personal profile shows low FMS posting cadence in search index. The single cheapest amplification lever (employee + board reshare) is still not in motion.
- **Recent 7-day post inventory cannot be verified externally.** Confirmation requires admin access.

---

## Gaps

The following still requires admin access or paid tooling and could not be verified from public sources:

- **Per-post LinkedIn impressions, reach, click-through, follower-growth curve.** Public view is capped at like-count.
- **Confirmed Forum 2026 registration count to date** vs. Forum 2025 at this point. Internal CRM only.
- **Confirmed Forum 2026 sponsor sold $ to date** vs. Forum 2025 budget. Internal finance only.
- **Whether the hotel block at Hilton NOLA was extended past May 15.** Requires call to Hilton or internal contract review.
- **Whether the "(Invited)" FDIC/Fed/OCC panelists have since confirmed.** Internal calendar.
- **Confirmed lost-sponsor reasons** (Cherry Bekaert, Forvis Mazars, KBRA, Kafafian, Mercadien, Level1Analytics, McQueen, PPG, QwickRate). Internal sponsor-relations records.
- **Webinar pricing for non-members.** Listed as "$299" on the member benefits page but never confirmed on a public event page.
- **Pricing for Financial Managers School 2026.** Brochure linked but not scraped here.
- **Per-event registration counts.** Not published publicly by FMS or peers; would need internal data.
- **GA4 funnel data for fmsinc.org → web.fmsinc.org event-portal handoff.** Need GA4 access.
- **Informz email program metrics** (open rates, list size, segmentation health, send cadence).
- **Recent 7-day LinkedIn post inventory** (LinkedIn admin export).
- **Member retention and renewal rates,** especially since the Oct 2025 chapter integration.
- **ECR26 sponsor count, agenda, and registration status** — the home page is functionally empty so it could not be benchmarked.
