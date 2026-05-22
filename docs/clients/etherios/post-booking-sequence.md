# Etherios — Post-Booking → Pre-Consult Sequence

## Why we're losing them between booking and consult

Drop-off in ketamine and Spravato pipelines is rarely a logistics problem. It's a combination of:

1. **Ambivalence after impulse booking.** Patients book on a bad day. By Tuesday, doubt sets in.
2. **Cost uncertainty.** Spravato has a benefits investigation lag. Cash-pay KAT pricing isn't anchored.
3. **Stigma and family pushback.** They told a partner or parent. The conversation didn't go well.
4. **Treatment confusion.** They don't know if the consult is medical screening or a sales call.
5. **Depression itself.** Follow-through is the symptom we're treating. We can't act surprised when it shows up.
6. **Comparison shopping.** They booked three clinics. We need to be the one they remember as human.

Each touchpoint below is designed to address at least one of these. The sequence assumes a 7–14 day window between booking and consult. Compress proportionally for shorter windows.

---

## Sequence overview

| # | When | Channel | Purpose |
|---|------|---------|---------|
| 1 | T+0 (immediate) | Email | Confirm, set expectations, normalize ambivalence |
| 2 | T+1 hour | Email | Personal note from clinician |
| 3 | T-72 hours | Email | What to expect + cost/insurance clarity |
| 4 | T-24 hours | Email + SMS | Logistics, prep, reschedule link |
| 5 | T-3 hours | SMS | Day-of nudge |
| 6 | T+15 min after start (no-show) | SMS | Warm re-engagement |
| 7 | T+24 hours after no-show | Email | One-tap reschedule, no pressure |

A reschedule link is included in every message. The goal is never to force the original slot. Rescheduling is a win. Ghosting is the loss.

---

## 1. Immediate confirmation email (T+0)

**Subject:** Your Etherios consult is booked — what happens next

**From:** Etherios Care Team <care@etherios.com>

> Hi [First Name],
>
> Your consultation with Etherios is confirmed for **[Day, Date] at [Time, Time Zone]**.
>
> A few things to know before then:
>
> **This is a medical evaluation, not a sales call.** A clinician will review your history, current medications, and what you're hoping to address. If ketamine-assisted therapy or Spravato isn't the right fit, they'll tell you that directly and point you somewhere that is.
>
> **You don't need to have it figured out.** Most people who book a consult feel a mix of hope and hesitation. That's the right starting place. You don't need to commit to anything during the call.
>
> **About cost.** If you're exploring Spravato, we'll start a benefits investigation with your insurer this week and have a number for you before the consult. If you're exploring ketamine-assisted therapy (out-of-pocket), pricing is on [link]. No surprises at the visit.
>
> **If you need to move it:** [Reschedule] takes 30 seconds. We'd rather find a time that works than have you skip it.
>
> We're glad you booked. See you [Day].
>
> — The Etherios Care Team

**Notes for implementation:**
- Send within 2 minutes of booking. Anything longer reads as automated.
- The "medical evaluation, not a sales call" line is the single most important sentence in the whole sequence. Test removing it and watch show rate drop.
- Reschedule link must be one-click into a calendar, not a form.

---

## 2. Personal note from clinician (T+1 hour)

**Subject:** Quick note before your consult

**From:** [Clinician First Name] at Etherios <[firstname]@etherios.com>

> Hi [First Name],
>
> I'm [Clinician Name]. I'll be the one meeting with you on [Day].
>
> I wanted to send a short note so I'm not a stranger when we connect. I've worked with patients who came to ketamine or Spravato after years of trying other things, and patients who came in skeptical. Both are common. Neither is wrong.
>
> Between now and our call, the only thing I'd ask is: bring a list of medications you're currently taking and any past treatments you've tried, even briefly. That makes our 50 minutes together more useful for you.
>
> If anything comes up before then, you can reply to this email and it reaches me directly.
>
> — [Clinician Name]

**Notes:**
- This email is the second-highest leverage point in the sequence. A real name and a real reply-to address signals this isn't a mill.
- If the clinician genuinely reads replies, this becomes the highest-trust touchpoint in the funnel. Worth their 5 min/day.
- If clinician volume doesn't allow that, route replies to a care coordinator and disclose that ("a member of my team monitors this inbox").

---

## 3. What to expect + cost clarity (T-72 hours)

**Subject:** Your consult is Thursday — here's what to expect

> Hi [First Name],
>
> Your consult with [Clinician Name] is **[Day] at [Time]**. A few things to make it useful.
>
> **What we'll cover (about 50 minutes):**
> - Your history and what brought you here
> - Current medications and past treatments
> - Whether ketamine-assisted therapy, Spravato, or something else fits your situation
> - Logistics: schedule, cost, what a typical course looks like
>
> **Your cost picture:**
> - **Spravato:** [Insurance status — e.g., "Your benefits investigation is complete. Estimated patient responsibility is $X per session after deductible." Or: "We're still waiting on your insurer; we'll have a number by Wednesday."]
> - **Ketamine-assisted therapy:** Out-of-pocket. A typical course is 6 sessions at $[X] each. Single sessions are available. We do not require a package commitment.
>
> **What to bring (or have nearby for telehealth):**
> - List of current medications, including dose
> - A short note on past treatments and how they went
> - Any questions you've been holding on to
>
> **One thing people ask a lot:** You will not be asked to make a treatment decision at the consult. The point of the consult is to give you enough information to decide on your own time.
>
> Need to move it? [Reschedule]
>
> — Etherios Care Team

**Notes:**
- The cost section is the unlock. Most ketamine clinics dodge this until the consult. Naming the number ahead of time removes the largest reason for no-shows.
- If benefits investigation isn't back yet, say so. Silence reads as hiding something.

---

## 4. Day-before reminder (T-24 hours)

### 4a. Email

**Subject:** Tomorrow at [Time] with [Clinician First Name]

> Hi [First Name],
>
> Reminder that your consult is **tomorrow, [Day] at [Time, Time Zone]**.
>
> **Telehealth link:** [link]
> **Or in-clinic:** [address, parking note]
>
> If anything has shifted and the time doesn't work, [reschedule] is one tap. We'd much rather find a new time than miss you.
>
> — Etherios Care Team

### 4b. SMS (send ~5pm local the day before)

> Etherios: Hi [First Name], reminder of your consult tomorrow at [Time] with [Clinician First Name]. Link or directions: [short link]. Need to move it? [reschedule link]. Reply STOP to opt out.

**SMS notes:**
- Do not include any clinical terms ("ketamine," "Spravato," "depression") in SMS. Shared phones are a HIPAA and stigma risk.
- "Etherios:" prefix is required so they recognize the sender before they read.
- Keep under 160 characters where possible to avoid multi-part billing and rendering issues.

---

## 5. Day-of nudge (T-3 hours, SMS only)

> Etherios: Quick note — [Clinician First Name] will be ready for you at [Time]. Link: [short link]. If today isn't going to work, tap here to move it: [reschedule]. No questions asked.

**Notes:**
- "No questions asked" is doing a lot of work here. Patients in the middle of an anxious afternoon need permission to move the appointment without explaining themselves.
- Three hours out is the sweet spot. Earlier and they forget. Later and they've already mentally bailed.

---

## 6. No-show recovery — SMS (T+15 min)

> Etherios: We held your slot with [Clinician First Name] and didn't see you. No judgment. Reply with a better day this week or tap here: [reschedule]. We'll keep the door open.

**Notes:**
- Send exactly 15 minutes after the scheduled start, not later. The window where shame hasn't fully set in is short.
- "No judgment" is the load-bearing phrase. Patients who no-show often expect to be written off. Telling them they're not is what gets them back.
- Do not call. A call at this moment feels like a collections agency.

---

## 7. No-show recovery — Email (T+24 hours)

**Subject:** Still here when you're ready

> Hi [First Name],
>
> We missed you yesterday. That happens, and it's not something we hold against anyone — particularly in this work, where the decision to show up is part of what we're treating.
>
> If you want to try again, [pick a new time]. If you'd rather we stop emailing, [unsubscribe] and we'll close out your file.
>
> Whatever you decide, we wish you well.
>
> — [Clinician Name] and the Etherios Care Team

**Notes:**
- This is the final touch in the automated sequence. Anything beyond this becomes pressure.
- The "decision to show up is part of what we're treating" line acknowledges the patient's reality without being saccharine. Test it. It tends to outperform softer alternatives.
- The unsubscribe option matters. It restores agency, which is the entire therapeutic stance.

---

## What we expect this to do

Most ketamine and Spravato clinics see ~40–55% show rate on first consults booked online. Practices that implement a sequence like this typically move to 70–80% within 60 days. The biggest deltas come from:

1. The "this is a medical evaluation, not a sales call" framing (touch #1)
2. Pre-consult cost transparency (touch #3)
3. The day-of "no questions asked" reschedule (touch #5)
4. The "no judgment" recovery SMS (touch #6)

If you can only implement two changes this month, do #1 and #5.

---

## Implementation notes

- **CRM/automation:** This sequence assumes a tool that can branch on no-show events (e.g., the booking platform writes a webhook on missed appointment → triggers SMS #6 and email #7). If the current stack can't do that, the day-of SMS (#5) and recovery SMS (#6) are the ones to wire up first.
- **Compliance:** SMS opt-in must be captured at booking with explicit language ("Etherios may text you about your appointment"). Include STOP language in every SMS. Do not include any clinical content in SMS.
- **Personalization tokens:** Every `[First Name]`, `[Clinician Name]`, `[Time]`, and `[reschedule]` should be a merge field, not hand-typed. Hardcoded names are the most common bug in clinic automation.
- **Voice and signoff:** Pick one signoff and use it everywhere ("Etherios Care Team" or the clinician's name). Inconsistency reads as a mill.
- **What we're not doing:** No countdowns, no urgency language, no "limited spots." Patients in this population read scarcity tactics as predatory and bail.

---

## Open questions for Etherios

1. Is the clinician willing to monitor replies to touch #2, or should those route to a care coordinator?
2. What's the typical lag on Spravato benefits investigations? That sets whether touch #3 names the number or names the timeline.
3. Do we have phone numbers captured at booking today? If not, that's the upstream fix that unlocks half this sequence.
4. What's the current show rate? We need the baseline to measure against in 60 days.
