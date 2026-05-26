# Informz Subscriber Snapshot

**Pulled:** 2026-05-25 via Playwright
**Source:** Informz → Contacts → Reports → Summary → Overview/Snapshot
**Data freshness shown by Informz:** "Updated: May 24 2026 4:34 AM"

## Counts

| Metric | Value |
|---|---:|
| Total subscribers | **8,706** |
| Unique emails | 8,706 |
| Repeat bounce | 1 |
| **Total active** | **8,705** |

## Engagement Score distribution (full list)

| Tier | % of list | Estimated count |
|---|---:|---:|
| A | 1.7% | ~148 |
| B | 1.0% | ~87 |
| C | 23.5% | ~2,046 |
| D | 8.4% | ~731 |
| **F (disengaged)** | **65.4%** | **~5,694** |

## Lead Score distribution (full list — looks identical to engagement)

Same A/B/C/D/F shape (1.7% / 1.0% / 23.5% / 8.4% / 65.4%). Lead scoring may simply mirror engagement scoring as currently configured.

## Personas

Single segment labeled "Subscriber" = 100%. Personas feature is unused.

## Critical finding for the board

**65.4% of the 8,706-contact Informz list is F-tier (disengaged). Only 2.7% are A or B tier combined.**

- The dashboard widget on the home page shows 30% open rate / 2% click rate, but that's on the **most recent 50-send batches** — those go to engaged segments. **The full-list reality is much worse.**
- This explains why the absolute volume (~2.88M emails/yr) generates relatively few member touchpoints: most of the volume is hitting people who don't open.
- The C-tier (23.5%, ~2,046 contacts) is the highest-leverage re-engagement segment — large enough to be material, not so disengaged they're unreachable. **This is the exact audience the re-engagement sequence in `docs/fms/campaigns/reengagement.md` targets.**
- The A-tier (~148 contacts) is the entire referral campaign send list. Now we know it's small enough that a personal note from Alana to each one would be feasible at higher cost.

## Note on prior assumption

The membership spec assumed engagement tiers were point-based (A = 40+ points, B ≈ 27). Informz is showing letter-grade tiers (A through F) which may be a different system, or may be the same system surfaced differently. Worth confirming with Jennifer whether the Engagement Score system shown here matches the "40+ points" definition Alana referenced.
