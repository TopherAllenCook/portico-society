# FMS Trigger-Based Communication Map

This document describes every automated communication sequence, what triggers it, when it stops, and how it should be maintained after the engagement ends. Hand to Alana and Jennifer at engagement close.

---

## Sequences and Triggers

| Sequence | Trigger | Stops When |
|---|---|---|
| Welcome (3 emails) | New member activated | Day 30 email sent |
| Re-engagement (3 emails) | Member is C-tier or disengaged for 60+ days | Member attends an event |
| Event attendee pipeline (2 emails) | Contact attended event AND is not a member | Contact joins FMS |
| Non-member nurture (3 emails) | Contact added to non-member segment | Contact joins FMS or clicks membership link |
| Renewal sequence (3 emails) | Membership renewal date is 90 days away | Renewal completed |
| Referral campaign (1 email) | A-tier member (40+ points) | One-time send |
| Corporate pitch (1 email) | Manual — Alana sends individually | One-time send |

---

## Ongoing Manual Sends

These are not automated. They require someone to build and send each time:

- Monthly event promotion emails (broadcast to full member list)
- Annual conference campaign (build 8-12 weeks before conference)
- LinkedIn posts (per the audit recommendation, 6-8 per week with deliberate format mix; see `docs/fms/linkedin/activation-posts.md`)
- Lead magnet promotions (quarterly cadence)

---

## Segments to Maintain in Informz

| Segment Name | Definition | Review Frequency |
|---|---|---|
| A-tier members | 40+ engagement points | Quarterly |
| B-tier members | ~27 engagement points | Quarterly |
| C-tier members | Below B threshold | Quarterly |
| Disengaged members | No activity 90+ days | Monthly |
| Non-member contacts | In Informz, not a current member | Monthly |
| Event attendees (non-member) | Attended event, not a member | After each event |
| Lead magnet downloaders | Submitted lead magnet form, not a member | Weekly during active LinkedIn campaign |

---

## KPIs to Track Monthly

| KPI | Target | Source |
|---|---|---|
| Email open rate | >30% | Informz Message Summary |
| Email click rate | >3% | Informz Message Summary |
| Unsubscribe rate | <0.5% per send | Informz Message Summary |
| LinkedIn follower growth | Monthly delta tracked | LinkedIn Page Analytics |
| LinkedIn engagement rate per post | >2% | LinkedIn Page Analytics |
| Engagement tier distribution | % A, B, C, disengaged | Informz segments |
| Renewal rate | Year-over-year cohort comparison | Membership system |

---

## Annual Maintenance Checklist

| When | Action |
|---|---|
| Quarterly | Re-segment A/B/C tiers based on prior 12-month activity |
| After each event | Move new event attendees who aren't members into the event-attendee segment |
| Monthly | Sweep for new lead magnet downloaders and ensure they entered the non-member nurture sequence |
| Before each renewal cycle | Confirm renewal email templates still reference real upcoming events |
| Annually | Refresh the welcome sequence event references |
| Annually | Refresh the lead magnet (or rotate to a new topic if engagement has plateaued) |
