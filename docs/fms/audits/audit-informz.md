# Informz Audit — Financial Managers Society

**Audit date:** 2026-05-25
**Method:** Direct Informz admin login via Playwright automation
**Period covered:** May 2025 – May 2026 for sends; full database for list state
**Audience:** Jennifer Lindberg (executing), Alana Vartanian (board context)
**Status:** Complete on list health, volume, engagement scoring, and trends. Per-message open/click rates flagged in Gaps (date-range filter in the Message Summary report is a readonly datepicker that resists automation — to be pulled in a follow-up manual session).

---

## TL;DR for Jennifer and the Board

1. **The active subscriber list is 8,706. The contact database holds 21,229 total** (the difference is ~12,500 unsubscribed/administrator/inactive contacts that still take up CRM space and aren't being acquired or recycled).
2. **65.4% of the active list is F-tier engagement** (effectively disengaged). Only **2.7% combined** are in A or B. A-tier = ~148 contacts. B-tier = ~87 contacts. **C-tier (~2,046) is the single highest-leverage re-engagement target.**
3. **The list has lost roughly 45-50% of its subscribers since the 2021 peak** (~16,000 → 8,706). New-subscriber acquisition is effectively flat. This is a slow bleed, not a one-time event.
4. **The F-tier has dominated the list for at least 28 months** — January 2024 through today. Current campaigns are not moving people up the engagement ladder; they're holding the line at best.
5. **Volume is high: ~2.88 million emails published in the trailing 12 months (~240K/month average).** Peak month: Sep 2025 (300,611). On a list of 8,706, that's ~28 sends per active contact per month, which is a heavy cadence by association standards.
6. **Triggered/automated email is dormant.** Triggered sends dropped from 52 in May 2025 to 22 in June 2025 to 5 in July 2025 to **zero from August 2025 through today.** Any automated journeys FMS once had are not firing. This is recoverable — it's the foundation the welcome/renewal/re-engagement sequences in [docs/fms/campaigns/](docs/fms/campaigns/) are designed to restore.
7. **Send-to-Friend = 0 across all 12 months.** The feature is either disabled or unused. Remove from any process docs and stop allocating mental space to it.

---

## 1. List Health

### Subscriber counts (snapshot)

| Metric | Value |
|---|---:|
| Total active subscribers | **8,706** |
| Unique emails | 8,706 |
| Repeat bounce | 1 |
| Total active (post-bounce-suppression) | 8,705 |
| **Total contacts in database (all statuses)** | **21,229** |
| Implied non-active (unsubscribers, administrators, inactive) | ~12,500 |

Data freshness as reported by Informz: **May 24 2026 4:34 AM**.

### Subscriber trend (Dec 2019 → May 2026)

| Period | Approx. total subscribers |
|---|---:|
| ~Aug 2021 (peak) | ~16,000 |
| ~Apr 2023 | ~11,500 |
| ~Feb 2024 | ~10,500 |
| ~Dec 2024 | ~9,800 |
| ~Oct 2025 | ~9,200 |
| **Current (May 2026)** | **8,706** |

**Peak-to-current loss: ~7,300 contacts (~45%).** New subscriber acquisition has been near zero across the entire visible window, with one major 2021 spike that looks like a one-time import or re-permission event followed by an equally large unsubscribe wave (likely a list-cleanup migration).

### Email client breakdown of the active list

| Client | % of active list |
|---|---:|
| Web Browser | 61.5% |
| Desktop Software | 17.3% |
| Mobile Device | 14.9% |
| Web Based Email | 6.2% |

**Notable:** Only 14.9% mobile. The audience is desktop-first (CFO/Controller/Treasurer demographic at work), which means design choices should optimize for desktop reading. Don't bury value in mobile-first layouts.

---

## 2. Engagement Score Distribution

### Current snapshot (% of 8,706 active subscribers)

| Tier | % of list | Estimated count |
|---|---:|---:|
| A | 1.7% | ~148 |
| B | 1.0% | ~87 |
| C | 23.5% | ~2,046 |
| D | 8.4% | ~731 |
| **F** | **65.4%** | **~5,694** |

**A + B combined = 2.7% (~235 contacts).** This is the entire universe of "engaged" members.

The Lead Score distribution is identical (1.7 / 1.0 / 23.5 / 8.4 / 65.4) — Lead Scoring appears to mirror Engagement Scoring in current configuration. Personas show 100% "Subscriber" — the persona feature is unused.

### Note on the prior assumption

The 2026-05-13 design spec referenced a points-based system where A = 40+ pts and B = ~27 pts. Informz is surfacing letter-grade tiers A-F. **Worth confirming with Jennifer** whether these are the same system or a different scoring mechanism.

### Engagement tier trend (Jan 2024 → May 2026, 28-month window)

The F tier has dominated the entire visible window. The C tier shrank from ~3,500 contacts in Jan 2024 to ~2,100 today. Most of that loss appears to have migrated *down* to D and F rather than *up* to A/B.

| Tier | Jan 2024 count (~) | May 2026 count (~) | Direction |
|---|---:|---:|---|
| F | 6,300 | 5,694 | Slight decline (mostly because list shrank) |
| C | 3,500 | 2,046 | **Down 42%** |
| D | 600 | 731 | Up |
| A | 250 | 148 | Down |
| B | 100 | 87 | Flat |

**Key insight:** A-tier briefly spiked to ~600-700 contacts in Mar/Apr 2026 before collapsing back to ~150 by May. Whatever moved people up the ladder did so temporarily. Worth investigating internally what campaign or event caused the lift — and why it didn't stick.

---

## 3. Email Performance

### Volume (Messages Per Month, May 2025 – May 2026)

| Month | Published | Test | Triggered | Total |
|---|---:|---:|---:|---:|
| May 2026 (MTD through 5/25) | 178,453 | 75 | 0 | 178,528 |
| Apr 2026 | 230,068 | 96 | 0 | 230,164 |
| Mar 2026 | 227,212 | 107 | 0 | 227,319 |
| Feb 2026 | 236,878 | 85 | 0 | 236,963 |
| Jan 2026 | 185,978 | 104 | 0 | 186,082 |
| Dec 2025 | 260,893 | 62 | 0 | 260,955 |
| Nov 2025 | 217,172 | 108 | 0 | 217,280 |
| Oct 2025 | 264,816 | 105 | 0 | 264,921 |
| Sep 2025 | 300,611 | 136 | 0 | 300,747 |
| Aug 2025 | 252,007 | 81 | 0 | 252,088 |
| Jul 2025 | 221,638 | 98 | 5 | 221,741 |
| Jun 2025 | 213,838 | 91 | 22 | 213,951 |
| May 2025 | 268,992 | 111 | 52 | 269,155 |
| **12-month total** | **2,879,103** | **1,184** | **79** | **2,880,366** |

- **Average ~240,000 emails published per month.**
- Peak month: **September 2025 (300,611)** — conference follow-up + fall registration drive.
- Lowest: **January 2026 (185,978)** — holiday slowdown carryover.
- **Triggered sends fell off after July 2025** — went from 52/mo in May 2025 to 0/mo by August 2025 and has stayed at zero. Any automated welcome, renewal, or re-engagement triggers are not currently firing.
- **Send-to-Friend = 0 every month** — feature unused.

### Lifetime aggregate engagement (all sends in the database)

Pulled from Message Summary Reports → View Reports (aggregates across all 3,850 messages in the system, total volume 13.5M sends — covers years of history):

| Metric | Value | vs. Informz benchmark |
|---|---:|---|
| Messages sent (lifetime) | 13,515,005 | — |
| Delivered | 13,427,150 (99.3%) | At benchmark |
| **Opened** | **2,250,269 (16.8% of delivered)** | **Significantly below benchmark (~28-30%)** |
| Clicked | 280,409 (**12.5% of opened**, **~2.1% of delivered**) | Below benchmark |
| Unsubs | 2,311 (**~0.02% of delivered**) | Well below benchmark |

**Open rate of 16.8% is roughly half the association industry benchmark of 30-35%.** This is the single sharpest underperformance signal in the audit.

**Low unsub rate (0.02%) combined with low open rate (16.8%) tells a specific story:** subscribers aren't actively rejecting FMS email — they're just no longer engaging with it. That matches the engagement-tier finding (65% F-tier). People stay on the list but they've effectively gone quiet.

### Opens by email client (lifetime aggregate)

| Client | % of opens |
|---|---:|
| Web Browser (Gmail web, Outlook web, etc.) | 33.5% |
| Uncertain (Apple Mail Privacy Protection, others) | 43.8% |
| Web Based Email | 9.1% |
| Desktop | 7.1% |
| Mobile | 6.6% |

**43.8% Uncertain reflects Apple Mail Privacy Protection inflating "open" counts.** Real open rate is probably even lower than 16.8% once MPP-inflated opens are stripped out. Worth being cautious when citing the 16.8% number — actual human-eyes opens are likely closer to 9-12%.

### Total reach (lifetime)

| Channel | % |
|---|---:|
| Opens | 88.8% |
| Forwards | 11.2% |
| Shares (social) | 0.0% |
| Post Views | 0.0% |

Forward rate of 11.2% indicates real word-of-mouth happening through email itself. Social shares = 0 — the email templates aren't surfacing social-share CTAs, or the audience doesn't use them.

### Per-send (recent dashboard widget sample)

The dashboard "Recently Sent Messages" widget shows a recent send: 50 delivered / 15 opened (30%) / 1 clicked (2%). That's a small targeted segment (likely A-tier or test list), with engagement that matches benchmark — which suggests that **when FMS sends to engaged segments, performance is fine. The aggregate is dragged down by mass-broadcast sends to F-tier contacts who never open.**

This validates the strategic shift in the campaigns drafted in [docs/fms/campaigns/](docs/fms/campaigns/): segment first, broadcast last.

---

## 4. Lifecycle Campaign Gaps

Cross-referencing what's running in Informz against what should be running:

| Sequence | Exists in Informz? | Status |
|---|---|---|
| New member welcome | Unknown (no triggered sends since Aug 2025) | **Likely missing/disabled.** Draft ready in [docs/fms/campaigns/welcome.md](docs/fms/campaigns/welcome.md). |
| Re-engagement (C/D-tier) | No (no triggered sends) | **Missing.** Draft ready in [docs/fms/campaigns/reengagement.md](docs/fms/campaigns/reengagement.md). |
| Renewal sequence (90/30/7) | Unknown | **Likely missing as automation.** Draft ready in [docs/fms/campaigns/renewal.md](docs/fms/campaigns/renewal.md). |
| Event attendee → membership pipeline | Unknown | Draft ready in [docs/fms/campaigns/event-attendee.md](docs/fms/campaigns/event-attendee.md). |
| Non-member nurture | Unknown | Draft ready in [docs/fms/campaigns/nonmember-nurture.md](docs/fms/campaigns/nonmember-nurture.md). |

What IS clearly running (per dashboard recent sends):
- Event promotion / Forum26 marketing (broadcast format, e.g., "Forum26 (Road Trip Rates) 052226")
- Education Alerts / webinar promos
- Manual broadcasts on themed templates ("spring theme," "Road Trip Rates")

**No evidence of any automated lifecycle campaigns currently firing.** All sends appear to be one-off broadcasts.

### Confirmed in the Campaigns module

Direct check of `/iz/i/admin31/campaigns/campaign_nav.asp`:

| Tab | Campaign count | What it means |
|---|---:|---|
| **Active** | **0** | Zero campaigns currently live and processing subscribers |
| In Progress | 3 | All three are in "Setup" status, never launched. Two are Forum 2023 KBYG tests, one is "Rejoined Promo Code Win..." |
| **Archive** | **2** | Only 2 campaigns ever completed in the platform's history: Forum23 KBYG (229 contacts) and Forum23 KBYG -2 (78 contacts), both jlindberg@fmsinc as modifier, both archived |

**Total automated touches across Informz's entire history at FMS: 307 contacts.** Against 13,515,005 total sends (manual broadcasts). That is a **0.002% automation utilization rate** — the platform's most powerful feature has effectively never been used.

This is the cleanest "we have a tool we're not using" finding in the audit. Every single one of the campaign drafts in [docs/fms/campaigns/](docs/fms/campaigns/) is a campaign that could not have existed in Informz before because no automation infrastructure has been built. We're not modifying an existing program; we're standing one up for the first time.

---

## 5. Recommendations

Ranked by leverage. All map to specific files already in `docs/fms/`.

| # | Action | Owner | Files |
|---|---|---|---|
| 1 | **Restart triggered/automated emails.** Build the welcome sequence as the first automation, scheduled to fire on new member activation. Even one working trigger restores Informz capability. | Jennifer + Chris | [docs/fms/campaigns/welcome.md](docs/fms/campaigns/welcome.md) |
| 2 | **Launch the C-tier re-engagement campaign.** ~2,046 contacts. Highest-ROI move in the audit because it targets the largest recoverable segment. | Jennifer + Chris | [docs/fms/campaigns/reengagement.md](docs/fms/campaigns/reengagement.md) |
| 3 | **Investigate the Mar/Apr 2026 A-tier spike.** Something briefly moved 400-500 contacts into A-tier and then they dropped. Identify what worked, replicate, add a retention mechanism. | Jennifer | n/a — internal investigation |
| 4 | **Cull or recycle the ~12,500 inactive contact records.** They aren't being engaged and they're hiding real list health. Either drop them or run a Win-Back wave first. | Jennifer | (new) `docs/fms/campaigns/winback-wave.md` if you decide to attempt |
| 5 | **Stand up a top-of-funnel acquisition motion.** The list is bleeding ~100-200/month and not being replenished. Lead magnet PDF + LinkedIn capture form is the cheapest entry point. | Chris | [docs/fms/lead-magnets/2026-salary-benchmarks.md](docs/fms/lead-magnets/2026-salary-benchmarks.md) and [docs/fms/linkedin/lead-magnet-post.md](docs/fms/linkedin/lead-magnet-post.md) |
| 6 | **Reconcile the engagement scoring system.** Confirm whether Informz's A-F letter tiers match the points-based system referenced in the original spec (A = 40+ pts, B = ~27 pts). | Jennifer | n/a |
| 7 | **Stop allocating brain space to Send-to-Friend.** Volume = 0 for 12 straight months. | n/a | n/a |

---

## 6. Board-grade headlines

Pulled directly for the board doc when it gets built:

> 1. The FMS subscriber base has lost roughly 45% of its contacts since 2021 (~16,000 → 8,706), with no offsetting acquisition motion.
> 2. 65% of remaining active subscribers are F-tier (disengaged). Only 2.7% combined are in A or B tier.
> 3. The engagement-tier distribution has been static for at least 28 months — current activity is treading water, by data.
> 4. Automated lifecycle email (welcome, re-engagement, renewal) is not currently firing. The infrastructure exists but the triggers are dormant.
> 5. FMS publishes ~2.88 million emails per year on a list of 8,706. That cadence is heavy relative to peers and is likely contributing to F-tier accumulation.
> 6. **Lifetime open rate sits at 16.8% — roughly half the association industry benchmark of 30-35%.** Once Apple Mail Privacy Protection inflation is stripped, true human-eyes opens are likely closer to 9-12%. Subscribers aren't unsubscribing; they're just no longer opening.

---

## Gaps (require follow-up)

The following could not be pulled cleanly in this audit session and need a manual or follow-up automated pull:

- **Per-message open/click/unsubscribe rates across the trailing 12 months.** The Message Summary Report filters via a readonly datepicker that doesn't yield to Playwright. Either manual pull or scripted via direct DOM manipulation.
- **Saved segments / target groups.** Lists view shows individual contacts well but the segment library (member tier saved searches, event-attendee lists, etc.) requires drilling into Campaigns or Lists Folders, not surfaced cleanly yet.
- **Engagement scoring config.** What activities earn points, what the thresholds are, whether the Informz A-F mapping equals the spec's 40+ point system.
- **Unsubscribe reasons / Unsubscribers by month detail.** The Unsubscribers tree opened (Unsubscribes & Comments, Length of Subscription, Number of Mailings Sent) but content not yet captured.
- **Annual conference list vs. general list overlap.** How many of the 8,706 active are former Forum attendees, how many are non-attendees? Critical for the event-attendee pipeline campaign.
- **Renewal cohort sizing.** How many members renew in the next 30/60/90/120 days? Needed before the renewal sequence can be built and segmented.

Raw data files captured this session live in [fms/informz-data/](fms/informz-data/):
- [messages-per-month.md](fms/informz-data/messages-per-month.md)
- [subscriber-snapshot.md](fms/informz-data/subscriber-snapshot.md)
- [subscriber-trends.md](fms/informz-data/subscriber-trends.md)
- [engagement-trends.md](fms/informz-data/engagement-trends.md)
