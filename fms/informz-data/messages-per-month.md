# Informz Messages Per Month — Raw Volume Data

**Pulled:** 2026-05-25 via Playwright
**Source:** Informz → Messages → Reports → Messages Per Month
**URL:** `/iz/i/admin31/Reports/mailing_summary_reports_nav.asp?type=MailingPerMonth`
**Range visible:** 25 months (rows 1-25 of 25). Captured rows below cover May 2024 onward.

## Last 13 months (May 2025 – May 2026) — the audit window

| Month | Published | Test | Send-to-Friend | Triggered | Total |
|---|---:|---:|---:|---:|---:|
| May 2026 (MTD) | 178,453 | 75 | 0 | 0 | 178,528 |
| Apr 2026 | 230,068 | 96 | 0 | 0 | 230,164 |
| Mar 2026 | 227,212 | 107 | 0 | 0 | 227,319 |
| Feb 2026 | 236,878 | 85 | 0 | 0 | 236,963 |
| Jan 2026 | 185,978 | 104 | 0 | 0 | 186,082 |
| Dec 2025 | 260,893 | 62 | 0 | 0 | 260,955 |
| Nov 2025 | 217,172 | 108 | 0 | 0 | 217,280 |
| Oct 2025 | 264,816 | 105 | 0 | 0 | 264,921 |
| Sep 2025 | 300,611 | 136 | 0 | 0 | 300,747 |
| Aug 2025 | 252,007 | 81 | 0 | 0 | 252,088 |
| Jul 2025 | 221,638 | 98 | 0 | 5 | 221,741 |
| Jun 2025 | 213,838 | 91 | 0 | 22 | 213,951 |
| May 2025 | 268,992 | 111 | 0 | 52 | 269,155 |
| **12-mo total (May 25 – Apr 26)** | **2,879,103** | **1,184** | **0** | **79** | **2,880,366** |

## Observations on volume alone

- **~240,000 published emails per month on average** over the trailing 12 months.
- Peak month: **September 2025 — 300,611 emails.** Sep is conference-prep-heavy (Forum 2025 was June 22-24, recap + post-event nurture; FY25 fall registration drive).
- Lowest month: **January 2026 — 185,978 emails.** Holiday slowdown carryover.
- **Send-to-Friend = 0 across all 13 months.** That feature is either disabled or unused. Removable from any process docs.
- **Triggered emails fell off a cliff:** May 2025 had 52 triggered sends, dropping to 22 in June 2025, then 5 in July 2025, then **zero from August 2025 through May 2026.** Any automated/transactional triggers FMS once had are no longer firing. **This is a real audit finding worth flagging to Jennifer.**
- May 2026 month-to-date (178K through May 25) projects to ~228K for the full month, in line with the running monthly average.

## To pull next (engagement %)

This report shows volume only — not opens, clicks, unsubscribes. Those live in either:
- Message Summary Reports (per-send) — needs date filter that's blocked by a readonly datepicker
- Bounces, Opens or Clicks report
- Dashboard widget (3-month rolling)
