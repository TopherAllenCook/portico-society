# FMS LinkedIn + Public Web Audit
**Date:** 2026-05-24
**Method:** Public-only (no Informz, no LinkedIn admin access). Pulled via Firecrawl/WebFetch against the LinkedIn company page, public post URLs surfaced through Google, and the fmsinc.org homepage source.
**Status:** partial. Per-post engagement is throttled to like-counts only without auth; impressions, reach, and follower-growth curves require LinkedIn Page admin. See Gaps.

## Snapshot
- **LinkedIn followers:** 2,188
- **Listed employees on LinkedIn:** 22
- **Org size band:** 11-50 employees
- **Founded:** 1948 (77 years old)
- **Posting cadence (visible window):** ~10 posts in 6 days at time of pull, i.e. ~1.5-2 posts/day, roughly 10-12 per week. High volume.
- **One-line takeaway:** FMS posts a lot, but it is almost exclusively promotional broadcast (events, sponsors, courses) with single-digit likes. The follower base is small for a 77-year-old national association, the content mix is conversion-focused with almost no thought leadership, and the website has GA4 + GTM but **no LinkedIn Insight Tag**, which means none of that paid-worthy traffic is being retargeted on LinkedIn.

## LinkedIn Findings

### Content cadence
At the time of pull, 10 posts were visible inside a 6-day window. That extrapolates to roughly **50-60 posts per month**, which is heavy by association-marketing standards (peers typically run 8-15/month). The cadence is consistent but front-loaded around event launches and sponsor announcements rather than spread evenly across topic pillars.

### Content mix (last ~10 visible posts)
| Bucket | Count | Examples |
|---|---|---|
| Promotional (event reg, store, sponsors) | 5 | FMS Spark app, Fiserv sponsorship, Piper Sandler sponsorship, FMS Online Store, FMS National membership |
| Educational (webinar/course promos) | 4 | ALCO webinar w/ Empyrean, A/L Management 5-day course, Profitability analytics webinar, Call Report seminars |
| Event invite | 1 | FMS Forum (New Orleans) |
| Member spotlight / community | 0 | — |
| Original thought leadership (op-ed, data, POV) | 0 | — |
| Video / native carousel / document PDF | 0 confirmed | All visible posts read as text-with-image or link share |

Mix is roughly **50% promotional / 40% education-as-promotion / 10% event invites / 0% community / 0% thought leadership**. Even the "educational" posts are course/webinar promos with a CTA, not standalone teaching.

### Engagement patterns
Public per-post likes on the sampled URLs:
- "FMS Forum 2025 — dynamic 3-day event" (Apr 2025, 7315435042611044352): **3 likes**
- "Warmest wishes / Happy New Year" (Dec 2024, 7277019646078173185): **2 likes**
- "FTP webinar w/ Empyrean — Kenneth Levey & Bryan Ridgway" (Jun 2024, 7205993886027010051): **10 likes** (highest of the sample)
- "ALM Strategic Decisions w/ Darling Consulting" (Jun 2023, 7069721453423718400): **1 like**
- "2023 FMS Forum exhibitor benefits" (Feb 2023, 7029900054463188992): **4 likes**

Median is ~3 likes on a 2,188-follower base. That is a **~0.1-0.4% engagement rate**, well below the ~2% benchmark for B2B association pages. Comments and reposts are not publicly counted but were not visibly populated.

### Top performers
The FTP webinar co-promotion with named human experts (Levey + Ridgway, Empyrean) hit 10 likes — 3-5x the median. The pattern: **named humans + a specific technical topic** beats generic event-brand posts. This is the only post in the sample that even hinted at a "thought leader by proxy" play.

### Worst / stale-feeling
- The "Warmest wishes" holiday post (2 likes) is generic.
- The ALM Darling Consulting post (1 like) is a textbook example of feature-list-and-CPE-hours copy with no hook.
- Pure sponsor-announcement posts (Fiserv, Piper Sandler) read as transactional and likely produce minimal engagement.

### Gaps and opportunities
- **No video.** Nothing in the visible window is native video. LinkedIn is heavily privileging video in 2025-2026 distribution.
- **No native document carousels (PDF swipes).** Carousels are still the highest-saved format on LinkedIn for B2B.
- **No member spotlights.** A 1,500+ member association generating zero "here's how Member X used FMS to..." stories is a major missed reservoir of free, high-trust content.
- **No personal-brand amplification.** The 22 employees listed on LinkedIn are almost certainly the cheapest distribution lever FMS has. Posts from the FMS handle are not visibly re-shared by staff.
- **Topic concentration is narrow.** Call Report, ALM, FTP, profitability — all valuable, all event-tethered. Nothing on broader CFO/Controller-of-a-community-bank lifestyle, career, regulatory commentary, or industry POV.

## Website Findings (fmsinc.org)

### Value prop
Three pillars: **Education, Network, Resources** for finance professionals at community banks, credit unions, thrifts, and investment banks. Tagline emphasizes 75+ years of non-profit standing and "first-class education." Positioning is institutional and credentialed (CPE-heavy) rather than benefit-led ("here's what you'll *do* differently after this").

### Lead capture
- Newsletter "SUBSCRIBE" CTA visible.
- "Create an Account" and "Sign in" present.
- "Become a Member" and "Join FMS" CTAs.
- **No visible gated lead magnet** (no "Download the 2026 Community Bank CFO Benchmark Report," no "Get the Call Report Cheat Sheet PDF"). The site moves traffic straight to membership or events, skipping the low-friction email-capture rung of the funnel.

### LinkedIn Insight Tag status
**Not installed.** Confirmed by direct source inspection of fmsinc.org:
- `snap.licdn.com` / `insight.linkedin.com` / `li.lms-analytics`: **0 hits**
- Installed instead: GA4 (`G-3LY29E9X8M`), Google Tag Manager (`GTM-PC8LPTR`), and legacy Universal Analytics (`UA-7870337-1`, which has been deprecated since July 2023 and should be removed).

This is a major Track 2 opportunity. FMS is running LinkedIn organic *and* presumably some paid promotion through sponsors, but cannot retarget any website visitor on LinkedIn, cannot build a website-custom-audience, and cannot measure LinkedIn-attributed conversions. The fix is a ~15-minute paste into GTM.

### Other observations
- Site is on **Weebly/Square Online** (the `snowday` / `_W.Analytics` markers and `/uploads/1/3/8/7/138734414/` paths are Weebly signatures, with site_id `138734414`). This constrains how much custom tracking, A/B testing, and form intelligence can be layered on without a re-platform conversation.
- Nav is conventional (About / Education / Get Involved / My FMS / FMS Store). No "Resources" or "Insights" hub for ungated content.
- Membership pricing is **not public** (the membership page returned 404 on the direct slug; pricing appears to live behind an authenticated portal).
- Events are visible and prominent (2026 FMS Forum, 2026 East Coast Regional Conference, Financial Managers School, Q2 Call Report Seminars). Total stated catalog: **46 events / 264 CPE hours** (vs. the LinkedIn About claim of "50+ events / 120 CPE hours" — those two numbers don't reconcile and should be unified).

## Recommendations for Track 2 (board-deliverable input)

1. **Install the LinkedIn Insight Tag this week.** Zero engineering cost via the existing GTM container (`GTM-PC8LPTR`). Unlocks website retargeting audiences, conversion tracking, and matched-audience uploads. Single highest-leverage public-facing fix in this audit.
2. **Cut posting volume by 40-50% and reallocate to formats LinkedIn actually distributes.** Move from ~12 posts/week of single-image promos to ~6-8/week with a deliberate mix: 2 carousel/document posts, 1 native video, 2 educational text posts authored *by named FMS staff or board members*, 1-2 promos. Engagement should rise even as volume drops.
3. **Launch a "Member in the Field" series.** A 1,500+ member base is sitting on the most credible content FMS could publish. One short interview post per week (member name, role, institution, one specific FMS resource they used, one business outcome) will out-perform every sponsor announcement on the page.
4. **Build one gated lead magnet on fmsinc.org and route every LinkedIn educational post to it.** Example: "2026 Community Bank CFO Benchmark Brief." Captures emails before the membership ask, gives Informz/email a real top-of-funnel feed, and gives every LinkedIn post a destination that isn't "register for event."
5. **Activate the 22 listed employees as a distribution layer.** Even a lightweight monthly "here are this month's 4 posts, here's a one-tap reshare link" Slack/email to staff will multiply organic reach. Pair with a board-member version for amplification into the CFO/controller peer graph.

## Gaps

The following could not be verified from public sources and require Informz or LinkedIn Page admin access:
- **Per-post impressions, reach, click-through, and follower growth curve.** Public view is capped at like-count and (sometimes not even) comment-count.
- **Full 30/60/90-day post inventory.** LinkedIn's public posts URL renders no feed without auth; the sample here is what Google has indexed plus the most recent 6-day window surfaced via the company page snapshot.
- **Confirmed presence/absence of native video and document carousels across the full window.** None observed in the sample, but a full admin export would confirm.
- **Email program metrics** (Informz open rates, list size, segment health, send cadence).
- **Member/website conversion funnel** (signup → member, event-page → register) since GA4 access wasn't provided.
- **Paid LinkedIn spend, if any, and its attribution path.**
- **Actual membership pricing** (not public on fmsinc.org; lives behind the member portal).
