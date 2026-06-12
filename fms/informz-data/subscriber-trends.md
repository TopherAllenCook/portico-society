# Informz Subscriber Trends — Chart Reading

**Pulled:** 2026-05-25 via Playwright
**Source:** Informz → Contacts → Reports → Summary → Overview → Subscriber Trends
**Chart x-axis:** 12/2019 → ~current
**Chart y-axis:** 0-20K subscribers
**Three series:** New Subscribers (blue), Unsubscribers (orange), Total Subscribers (red)

## What the chart shows

| Period | Total Subscribers | Notes |
|---|---:|---|
| 12/2019 | ~0 visible (chart starts here) | |
| ~8/2021 | **Peak: ~16,000** with a major spike in new subscribers (blue line jumps to ~15K, orange unsubs spike to ~13K) | Looks like a one-time large list import or platform migration that triggered both massive subscriber count AND massive unsubscribe event simultaneously — likely a re-permission campaign that pruned a lot at once |
| ~4/2023 | ~11,000-12,000 | Step down — possibly another cleanup |
| ~2/2024 | ~10,500 | Continued decline |
| ~12/2024 | ~9,800 | |
| ~10/2025 | ~9,200 | |
| Current (5/2026) | **~8,706** | |

## The decline

- **Peak to current: ~16,000 → ~8,706 = roughly 45-50% loss of total subscribers since the 2021 peak.**
- The blue New Subscribers line is **almost flat near zero** across the entire visible window — no significant acquisition spikes since the 2021 import.
- The orange Unsubscribers line shows steady low-level attrition. No specific death spiral, just consistent erosion.
- **Net change per month** estimated at -100 to -200 contacts per month over the last 2 years.

## What this means for the audit

This is the second board-grade finding from this session (the first being 65.4% F-tier engagement).

**FMS doesn't just have a quality problem (most of the list is dead). It has a quantity problem (the list is shrinking and not being replenished).**

Without a top-of-funnel acquisition motion:
- Every quarter ~300-600 contacts are net lost.
- The membership pipeline cannot fill itself purely from member referrals.
- This is exactly why the lead magnet (salary benchmarks PDF) and the event-attendee → non-member nurture sequences are critical, not optional.

The acquisition strategy in `docs/superpowers/specs/2026-05-13-fms-membership-retention-design.md` was framed as growth. Given this data, it should be reframed as **stop the bleeding first, growth second.**

## Recommended next-pull

Hover over recent data points to get exact numbers for the last 12 months. The Highcharts library this chart uses typically supports a "view in data table" or "export CSV" option via the hamburger menu visible in the bottom-right of the chart.
