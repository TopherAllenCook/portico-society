# FMS Membership and Retention Strategy — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Execute a full audit of FMS's email and LinkedIn presence, launch quick-win membership campaigns, and produce a board-ready strategy document — all within 4 weeks of the June board meeting.

**Architecture:** Two parallel tracks. Track 1 builds and launches campaigns immediately. Track 2 audits existing channels and builds the strategy deliverable. Both tracks feed the board document in week 4.

**Tech Stack:** Informz (email platform via Higher Logic), LinkedIn company page, Word/Google Docs for deliverables, git for content versioning.

---

## Deliverable File Map

All draft copy lives in `docs/fms/` for version control before being built in Informz or posted to LinkedIn.

```
docs/fms/
├── audits/
│   ├── audit-informz.md          -- Informz 12-month findings
│   └── audit-linkedin.md         -- LinkedIn 90-day findings
├── campaigns/
│   ├── reengagement.md           -- Re-engagement sequence (3 emails)
│   ├── welcome.md                -- New member welcome sequence (3 emails)
│   ├── event-attendee.md         -- Event attendee pipeline (2 emails)
│   ├── nonmember-nurture.md      -- Non-member nurture sequence (3 emails)
│   ├── referral.md               -- A-tier referral campaign (1 email)
│   ├── corporate-pitch.md        -- Corporate/group membership pitch (1 email)
│   └── renewal.md                -- Renewal sequence (3 emails)
├── linkedin/
│   ├── activation-posts.md       -- Initial 3 LinkedIn posts
│   └── lead-magnet.md            -- Lead magnet content + LinkedIn post
└── board-deliverable.md          -- Final board document (source for Word export)
```

---

## Task 1: Informz Audit

**Files:**
- Create: `docs/fms/audits/audit-informz.md`

- [ ] **Step 1: Log into Informz and pull 12-month send history**

Navigate to: https://financial-managers-society.higherlogic.com/higherlogic/web/
Go to Reports → Email Performance. Pull data for May 2025 – May 2026.
Record for each campaign or broadcast: send date, subject line, list size, open rate, click rate, unsubscribe count.

- [ ] **Step 2: Identify the engagement scoring segments**

In Informz, find the lists or segments tied to the point-based engagement tiers (A = 40+, B = ~27, C, disengaged). Note the size of each segment. If they don't exist as saved segments, flag this — building them will be part of Task 3.

- [ ] **Step 3: Identify non-member contacts and event attendee contacts**

Look for any list or segment containing:
- People who registered for events but are not current members
- Former members (lapsed/non-renewed)
- Any contacts tagged as prospects or non-members
Record list names and sizes. These are the targets for the event attendee pipeline and non-member nurture sequence.

- [ ] **Step 4: Document findings**

Create `docs/fms/audits/audit-informz.md` with this structure:

```markdown
# Informz Audit — Financial Managers Society
**Audit date:** YYYY-MM-DD
**Period covered:** May 2025 – May 2026

## List Health
- Total list size: [N]
- Growth trend: [growing / flat / declining]
- Unsubscribe rate (12-month average): [N%]
- Bounce rate: [N%]

## Email Performance
| Campaign | Date | List Size | Open Rate | CTR | Unsubs |
|---|---|---|---|---|---|
| [name] | [date] | [N] | [N%] | [N%] | [N] |

## Benchmark Comparison
- FMS average open rate: [N%]
- Association industry benchmark: 30–35%
- FMS average CTR: [N%]
- Association industry benchmark: 3–5%

## Campaign Gaps (lifecycle moments with no email)
- [ ] New member welcome sequence: exists / missing / stale
- [ ] Re-engagement campaign: exists / missing / stale
- [ ] Renewal sequence: exists / missing / stale
- [ ] Event follow-up: exists / missing / stale

## Engagement Tier Segments
| Tier | Points | List Size |
|---|---|---|
| A | 40+ | [N] |
| B | ~27 | [N] |
| C | [threshold] | [N] |
| Disengaged | [threshold] | [N] |

## Non-Member Contacts
- Event attendees (non-member): [N]
- Lapsed/former members: [N]
- Other non-member contacts: [N]

## Key Findings
[3–5 bullet observations — what stands out, what needs immediate attention]

## Content Problems
[List any stale campaigns, outdated subject lines, broken links found]
```

- [ ] **Step 5: Review criteria**

Before committing, check:
- Every row in the performance table is filled (no blank cells)
- At least one "Key Findings" bullet speaks directly to open rate trend
- Non-member segment size is recorded (critical for Task 8 scope)
- Campaign gaps are marked clearly

- [ ] **Step 6: Commit**

```bash
git add docs/fms/audits/audit-informz.md
git commit -m "audit: document FMS Informz 12-month findings"
```

---

## Task 2: LinkedIn Audit

**Files:**
- Create: `docs/fms/audits/audit-linkedin.md`

- [ ] **Step 1: Pull LinkedIn analytics**

Go to the FMS LinkedIn company page → Analytics → Content. Set date range to last 90 days.
Record for each post: date, post type (text / image / link / document), impressions, reactions, comments, shares, CTR (if link post).

Also pull: Followers → total count, 90-day growth, follower demographics (job title, industry, company size).

- [ ] **Step 2: Identify top-performing content**

Sort posts by engagement rate (reactions + comments + shares ÷ impressions). Note the top 3 posts. What made them perform? Topic, format, length, hook line?

This determines the lead magnet topic in Task 7.

- [ ] **Step 3: Document findings**

Create `docs/fms/audits/audit-linkedin.md`:

```markdown
# LinkedIn Audit — Financial Managers Society
**Audit date:** YYYY-MM-DD
**Period covered:** Last 90 days

## Follower Snapshot
- Total followers: [N]
- 90-day growth: [+N / -N]
- Top follower job titles: [list top 3]
- Top follower industries: [list top 3]

## Post Performance
| Date | Type | Impressions | Reactions | Comments | Shares | Eng. Rate |
|---|---|---|---|---|---|---|
| [date] | [type] | [N] | [N] | [N] | [N] | [N%] |

## Posting Frequency
- Average posts per week: [N]
- Longest gap without a post: [N days]

## Content Mix
- Educational posts: [N%]
- Event/program promotion: [N%]
- Member or organization news: [N%]
- Other: [N%]

## Top 3 Posts (by engagement rate)
1. [date] — [topic] — [eng. rate] — [why it worked]
2. [date] — [topic] — [eng. rate] — [why it worked]
3. [date] — [topic] — [eng. rate] — [why it worked]

## Lead Magnet Topic Recommendation
Based on top-performing content: [topic]
Rationale: [1–2 sentences]

## Key Findings
[3–5 bullets — consistency, voice, what's missing]
```

- [ ] **Step 4: Review criteria**

- Top 3 posts are identified and the lead magnet topic is chosen
- Posting frequency gap is noted (if > 2 weeks between posts, flag it)
- Follower demographics confirm the audience is financial professionals (not a random following)

- [ ] **Step 5: Commit**

```bash
git add docs/fms/audits/audit-linkedin.md
git commit -m "audit: document FMS LinkedIn 90-day findings"
```

---

## Task 3: Re-engagement Campaign

**Files:**
- Create: `docs/fms/campaigns/reengagement.md`

- [ ] **Step 1: Identify the segment in Informz**

In Informz, find or create a segment: current members with engagement score in C-tier or disengaged. These are active members who have gone quiet — not cancelled. Confirm the segment size before proceeding.

- [ ] **Step 2: Write Email 1 — Surface missing value**

Create `docs/fms/campaigns/reengagement.md` with Email 1:

```markdown
# Re-engagement Campaign

---

## Email 1 — Surface Missing Value

**Subject lines (A/B test these two):**
- What you've been missing at FMS, [First Name]
- A quick note on your FMS membership, [First Name]

**Preview text:** There's a lot happening. Here's what's relevant to you.

**From name:** [Jennifer Lindberg / FMS Team]

**Body:**

Hi [First Name],

You haven't been able to make it to many of our recent events — that happens, especially this time of year.

But we wanted to make sure you know what's coming up that's directly relevant to your work:

- [Upcoming webinar title] — [date] — [1-sentence description]
- [Upcoming seminar or event] — [date] — [1-sentence description]

Both are included in your membership at no additional cost.

[See all upcoming events →]

If there's a topic you've been hoping we'd cover, reply and let us know.

[Signature]
Financial Managers Society
```

- [ ] **Step 3: Write Email 2 — Low-friction re-entry**

Add Email 2 to `docs/fms/campaigns/reengagement.md`:

```markdown
---

## Email 2 — Low-Friction Re-Entry
(Send 5 days after Email 1 to non-openers)

**Subject lines (A/B):**
- One hour on [topic], [First Name] — free for members
- [Webinar title] — this [day], members only

**Preview text:** No pitch. Just [speaker] on [topic].

**Body:**

Hi [First Name],

We're hosting [webinar title] on [date] at [time].

[Speaker name], [title], will walk through [specific topic] — something a lot of our members have been asking about lately.

It's one hour. Members attend free.

[Register here →]

If this one doesn't fit your schedule, here's everything else coming up this month:

[Link to events calendar]

[Signature]
```

- [ ] **Step 4: Write Email 3 — Personal note from Alana**

Add Email 3 to `docs/fms/campaigns/reengagement.md`:

```markdown
---

## Email 3 — Personal Note from Alana
(Send 7 days after Email 2 to non-openers of Emails 1 and 2)

**Subject line:** A note from me, [First Name]
**Preview text:** No agenda — just wanted to check in.
**From name:** Alana Vartanian
**From email:** avartanian@fmsinc.org

**IMPORTANT:** Plain text only. No HTML template, no logo, no button. It must look like a personal email.

**Body:**

Hi [First Name],

I wanted to reach out personally.

I noticed you haven't been able to make it to many of our recent programs. I'm not writing to push anything — I just want to make sure your membership is actually useful to you.

Is there a topic or resource you've been looking for that we haven't covered? A connection I can make? Something we could be doing better?

Just reply to this email. I read everything.

Alana Vartanian
President & CEO
Financial Managers Society
312-630-3423
```

- [ ] **Step 5: Review criteria**

Before building in Informz, check each email:
- No "we miss you" language anywhere
- Email 3 is genuinely plain text (no HTML formatting, no logo)
- Subject lines are specific, not generic ("What you've been missing at FMS" beats "An update from FMS")
- Every CTA links to a real, upcoming event or calendar page
- From name on Email 3 is Alana, not "FMS Team"

- [ ] **Step 6: Build the sequence in Informz**

In Informz, create an automated sequence (or scheduled broadcasts):
1. Set up segment: C-tier + disengaged current members
2. Build Email 1 using the copy above, set delivery date/time
3. Build Email 2 as a follow-up to non-openers of Email 1 (5 days later)
4. Build Email 3 as a follow-up to non-openers of Email 2 (7 days later)
5. Test send to yourself before scheduling

- [ ] **Step 7: Commit**

```bash
git add docs/fms/campaigns/reengagement.md
git commit -m "campaign: add FMS re-engagement sequence copy (3 emails)"
```

---

## Task 4: New Member Welcome Sequence

**Files:**
- Create: `docs/fms/campaigns/welcome.md`

- [ ] **Step 1: Check if a welcome sequence exists in Informz**

Search Informz for any automated welcome email or onboarding sequence. If one exists, document what it says and when it sends. The copy below replaces it.

- [ ] **Step 2: Write Email 1 — Day 1 Welcome**

Create `docs/fms/campaigns/welcome.md`:

```markdown
# New Member Welcome Sequence

---

## Email 1 — Day 1: Welcome and First Action

**Subject:** Welcome to FMS — here's where to start
**Preview text:** One thing to do today that takes 5 minutes.
**Trigger:** Sent automatically on the day membership activates

**Body:**

Hi [First Name],

Welcome to the Financial Managers Society.

Your membership is active. Here's the one thing worth doing today:

Register for an upcoming event.

Attending your first webinar or seminar is the fastest way to get immediate value and connect with other FMS members who work in the same environment you do.

[See upcoming events →]

A few other things now available to you:
- Education resources and certification support
- FMS publications and research
- Peer network across community banks and credit unions nationwide

If you have any questions — or just want to know where to start — reply here.

[Signature]
Financial Managers Society
```

- [ ] **Step 3: Write Email 2 — Day 7: Engagement Score Introduction**

Add to `docs/fms/campaigns/welcome.md`:

```markdown
---

## Email 2 — Day 7: Engagement Score

**Subject:** Your FMS engagement score — and how to build it
**Preview text:** Members who reach A-tier get the most out of FMS. Here's how it works.

**Body:**

Hi [First Name],

One week in. Something worth knowing about how FMS works.

We track member engagement through a points system. Attending webinars, seminars, and the annual conference each earn points. Members who reach A-tier (40+ points) consistently get more out of their membership — they're more connected, better informed, and more visible in the network.

Right now you're just getting started. The fastest path to your first points is registering for an event this month.

[See what's coming up →]

Members who attend their first event within the first 30 days are significantly more likely to stay active through the year. Consider this your window.

[Signature]
```

- [ ] **Step 4: Write Email 3 — Day 30: Check-in**

Add to `docs/fms/campaigns/welcome.md`:

```markdown
---

## Email 3 — Day 30: Check-In

**Subject:** One month in — what's next for you at FMS?
**Preview text:** What's coming up, and a quick check-in.

**Body:**

Hi [First Name],

It's been a month. We hope you've found your footing.

Coming up over the next 60 days:
- [Event 1] — [date]
- [Event 2] — [date]
- [Event 3] — [date]

[Full events calendar →]

If you haven't connected with another FMS member yet, that's worth doing. The peer network is one of the parts of this membership that doesn't advertise itself — you have to use it.

And if there's anything you expected to find that you haven't — just reply.

[Signature]
```

- [ ] **Step 5: Review criteria**

- Email 1 has exactly one primary CTA (upcoming events), not a list of ten things to do
- Email 2 names the point thresholds specifically (A = 40+) — no vague "get more involved"
- Email 3 uses real upcoming event names and dates (update before sending)
- All three are warm but not over-eager — professional peer tone

- [ ] **Step 6: Build in Informz**

Set up as an automated sequence triggered on new member activation:
- Email 1: sends on day 0 (activation day)
- Email 2: sends on day 7
- Email 3: sends on day 30

Test the trigger before activating.

- [ ] **Step 7: Commit**

```bash
git add docs/fms/campaigns/welcome.md
git commit -m "campaign: add FMS new member welcome sequence (3 emails)"
```

---

## Task 5: LinkedIn Activation (3 Posts)

**Files:**
- Create: `docs/fms/linkedin/activation-posts.md`

- [ ] **Step 1: Write Post 1 — Thought Leadership**

Create `docs/fms/linkedin/activation-posts.md`:

```markdown
# LinkedIn Activation Posts

---

## Post 1 — Thought Leadership
**Target:** Senior finance professionals (CFOs, controllers, VPs) at community banks and credit unions
**Format:** Text only (performs better organically than link posts)

**Draft:**

Community bank finance teams are managing a challenge their predecessors didn't face at this scale: a rate environment that changes the math on nearly every product in the portfolio while margin pressure compounds from both sides.

The finance managers navigating this well aren't working alone. Peer benchmarking, shared frameworks, continuing education from people doing the same job at similar institutions — that's not soft value. It's how faster, better-informed decisions get made.

That's what FMS is built for.

**Hashtags:** #CommunityBanking #FinancialManagement #CreditUnions #ProfessionalDevelopment
```

- [ ] **Step 2: Write Post 2 — Event/Program Spotlight**

Add to `docs/fms/linkedin/activation-posts.md`:

```markdown
---

## Post 2 — Event Spotlight
**Format:** Text + link or image

**Draft:**

FMS is hosting [webinar/seminar title] on [date].

[Speaker name], [title at institution], will cover [specific topic] — [one sentence on why it matters to financial managers at community banks and credit unions right now].

Free for members. [Registration fee] for non-members.

[Registration link]

Space is limited. Registration closes [date].

**Hashtags:** #FMS #FinancialManagers #CommunityBanking #[TopicHashtag]
```

- [ ] **Step 3: Write Post 3 — Member Value**

Add to `docs/fms/linkedin/activation-posts.md`:

```markdown
---

## Post 3 — Member Value (Acquisition-Focused)
**Format:** Text only
**Target:** Non-members who encounter it through followers sharing or search

**Draft:**

What FMS membership actually gets you:

Education credits that count toward your professional requirements. A peer network of financial professionals at institutions like yours — not big banks, not generalist associations. Research and resources specific to community banking and credit union finance.

One annual conference. Regular webinars and seminars on topics relevant to your actual work. A community of people who face the same regulatory and operational pressures you do.

If you're a financial manager at a community bank or credit union and you're not a member, it's worth a look.

[Link to membership page]

**Hashtags:** #FinancialManagers #CommunityBanking #CreditUnions #ProfessionalDevelopment #FMS
```

- [ ] **Step 4: Review criteria**

- No exclamation points
- No "we're thrilled to announce" or "excited to share" opener language
- Post 3 does not use the word "amazing," "game-changing," or any superlative
- Post 1 does not mention FMS until the final line — lead with the problem
- All posts are under 250 words (LinkedIn rewards concision)

- [ ] **Step 5: Schedule posts in LinkedIn**

Use LinkedIn's native scheduling tool:
- Post 1: Day 1 of week 2 (Tuesday or Wednesday, 9–11am local time performs best for B2B)
- Post 2: Day 3 of week 2
- Post 3: Day 5 of week 2

- [ ] **Step 6: Commit**

```bash
git add docs/fms/linkedin/activation-posts.md
git commit -m "content: add FMS LinkedIn activation posts (3)"
```

---

## Task 6: Event Attendee Pipeline

**Files:**
- Create: `docs/fms/campaigns/event-attendee.md`

- [ ] **Step 1: Pull the segment from Informz**

Find contacts in Informz who: attended one or more 2025 FMS events AND are not current members. Confirm segment size. If the segment doesn't exist as a saved list, build it using event registration data filtered against current member list.

- [ ] **Step 2: Write Email 1 — Member benefit gap**

Create `docs/fms/campaigns/event-attendee.md`:

```markdown
# Event Attendee Pipeline

---

## Email 1 — What You Didn't Get Access To

**Subject lines (A/B):**
- You attended [Event Name] — here's what members got that you didn't
- Your [Event Name] registration — and what comes with membership

**Preview text:** There's more to FMS than the events.

**Body:**

Hi [First Name],

You attended [event name / an FMS event] last year. Thank you for being there.

As a non-member attendee, you got access to the session. Members who were in the same room also received:

- [Member-only resource or recording from the event]
- Access to the full FMS education library
- Discounted registration for all future events
- Ongoing webinars and programs throughout the year
- A peer network of financial professionals at institutions like yours

Your work doesn't stop when the event does. Neither does ours.

[Learn about FMS membership →]

[Signature]
Financial Managers Society
```

- [ ] **Step 3: Write Email 2 — Direct offer**

Add to `docs/fms/campaigns/event-attendee.md`:

```markdown
---

## Email 2 — Direct Membership Offer
(Send 5 days after Email 1 to non-clickers)

**Subject lines (A/B):**
- FMS membership — here's what it costs, [First Name]
- One thing before your next event, [First Name]

**Preview text:** Straightforward — what it is, what it costs, how to join.

**Body:**

Hi [First Name],

A straightforward note.

FMS membership is [price] per year. It includes:

- Free or discounted registration to all webinars and seminars
- Access to the annual conference at member rate
- Full education and resource library
- A network of peers in the same role at similar institutions

You've already seen what FMS events are like. Membership is the rest of the year.

[Join FMS →]

If you have questions before joining, reply here.

[Signature]
```

- [ ] **Step 4: Review criteria**

- Email 1 names the specific event the contact attended (use merge tag for event name)
- The member benefits listed in Email 1 are real and currently available — remove any that aren't
- Email 2 includes the actual membership price (update before sending)
- No "limited time offer" or artificial urgency

- [ ] **Step 5: Build in Informz and schedule**

Send Email 1 in week 2. Set Email 2 to send 5 days later to non-clickers.

- [ ] **Step 6: Commit**

```bash
git add docs/fms/campaigns/event-attendee.md
git commit -m "campaign: add FMS event attendee pipeline (2 emails)"
```

---

## Task 7: LinkedIn Lead Magnet

**Files:**
- Create: `docs/fms/linkedin/lead-magnet.md`

**Note:** The lead magnet topic comes from the LinkedIn audit (Task 2). Fill in the topic before writing this content.

- [ ] **Step 1: Confirm lead magnet topic from audit findings**

Review `docs/fms/audits/audit-linkedin.md` → Lead Magnet Topic Recommendation. Use that topic. If the audit isn't complete, the top-performing content topic from the LinkedIn analytics is the proxy.

Common high-performing topics for FMS's audience: salary benchmarks, regulatory update summaries, CECL guidance, interest rate risk management frameworks.

- [ ] **Step 2: Write the lead magnet document**

Create `docs/fms/linkedin/lead-magnet.md`:

```markdown
# Lead Magnet — [Topic]

## Document Title
[Topic]: What Financial Managers at Community Banks and Credit Unions Need to Know in 2026

## Format
2–4 page PDF. Clean layout. FMS logo and contact. No long-form prose — scannable headers, short paragraphs, data where available.

## Sections
1. The landscape right now — [2-3 sentences on why this topic matters in 2026]
2. What institutions are doing — [3-5 bullet points on common approaches/findings]
3. What FMS members are seeing — [2-3 anonymized peer observations from events/network]
4. Key considerations for your institution — [3-5 actionable bullets]
5. About FMS — [3 sentences on who FMS is and membership CTA]

## CTA in document
"FMS members get ongoing access to resources like this, plus a peer network of financial professionals at institutions like yours. Learn about membership at fmsinc.org."
```

- [ ] **Step 3: Write the LinkedIn post promoting the lead magnet**

Add to `docs/fms/linkedin/lead-magnet.md`:

```markdown
---

## LinkedIn Post

**Format:** Text + link to download form (or document uploaded natively to LinkedIn)
**Note:** Native document uploads (PDF carousel) get significantly more reach than link posts.

**Draft:**

[Topic] is something every community bank and credit union finance team is dealing with differently right now.

We put together a short resource on what institutions are doing — what's working, what the pressure points are, and what to think about for the rest of 2026.

It's free. Two pages. Worth 10 minutes.

[Download / View the guide →]

(If you find it useful, FMS has more where that came from — fmsinc.org)

**Hashtags:** #CommunityBanking #FinancialManagement #[TopicHashtag] #CreditUnions
```

- [ ] **Step 4: Set up the email capture form**

Option A (preferred): Use a simple Google Form or Typeform. Collect first name, email, institution name. Route submissions into Informz as a new non-member segment. Trigger the non-member nurture sequence (Task 8) on form submit.

Option B: Upload the PDF natively to LinkedIn (no gate). Better reach, no email capture. Use this only if FMS doesn't have a way to connect a form to Informz.

- [ ] **Step 5: Review criteria**

- The document delivers genuine value — it's not a thinly disguised membership pitch
- The LinkedIn post leads with the problem, not "FMS is excited to share"
- CTA in the document is soft, not pushy
- If using Option A: form → Informz connection is tested before the post goes live

- [ ] **Step 6: Post to LinkedIn in week 3**

- [ ] **Step 7: Commit**

```bash
git add docs/fms/linkedin/lead-magnet.md
git commit -m "content: add FMS LinkedIn lead magnet copy and post"
```

---

## Task 8: Non-Member Nurture Sequence

**Files:**
- Create: `docs/fms/campaigns/nonmember-nurture.md`

**Note:** This sequence goes to: lead magnet downloaders (Task 7), event registrants who didn't join (overlaps with Task 6), and any other non-member contacts in Informz. Confirm total segment size from the Informz audit before building.

- [ ] **Step 1: Write Email 1 — Frame the problem**

Create `docs/fms/campaigns/nonmember-nurture.md`:

```markdown
# Non-Member Nurture Sequence

---

## Email 1 — Frame the Problem

**Subject lines (A/B):**
- The thing most community bank finance teams don't have
- What changes when you're not working alone, [First Name]

**Preview text:** Not a pitch. Just an observation.

**Body:**

Hi [First Name],

Finance leadership at community banks and credit unions operates in a narrow lane.

The problems are specific — margin compression, regulatory requirements, interest rate positioning — and the peer group who actually understands them is small. Big bank frameworks don't fit. Generalist associations don't speak the language.

Most finance managers at institutions like yours are solving these problems in isolation. Some are not.

The difference is usually access to a peer network that operates at the same scale, in the same regulatory environment, with the same constraints.

That's what FMS is built around.

More in the next note.

[Signature]
Financial Managers Society
```

- [ ] **Step 2: Write Email 2 — Specific benefit**

Add to `docs/fms/campaigns/nonmember-nurture.md`:

```markdown
---

## Email 2 — Specific High-Value Benefit
(Send 4 days after Email 1)

**Subject lines (A/B):**
- The education credits most finance managers are missing
- What FMS members are doing differently this year

**Preview text:** One specific thing worth knowing.

**Body:**

Hi [First Name],

A specific thing about FMS membership worth knowing:

Every webinar, seminar, and conference session earns continuing education credits toward professional development requirements. For financial managers who need to maintain certifications or demonstrate professional development to their boards, these credits matter.

FMS hosts [N] webinars and seminars per year, plus the annual conference. Members attend at no additional cost.

If you're currently paying out of pocket for CE or professional development elsewhere, that math is worth running.

[See upcoming programs →]

[Signature]
```

- [ ] **Step 3: Write Email 3 — Direct offer**

Add to `docs/fms/campaigns/nonmember-nurture.md`:

```markdown
---

## Email 3 — Membership Offer
(Send 5 days after Email 2 to non-clickers)

**Subject:** FMS membership — straightforward, [First Name]
**Preview text:** What it is, what it costs, how to join.

**Body:**

Hi [First Name],

FMS membership is [price] per year.

It includes:
- Access to all webinars, seminars, and the annual conference
- CE credits for every session attended
- A peer network of financial professionals at community banks and credit unions
- Research, publications, and resources specific to your industry

No long-term contract. No upsell tiers.

If the peer network and education access are useful to your work, the math is straightforward.

[Join FMS →]

Questions? Reply here.

[Signature]
```

- [ ] **Step 4: Review criteria**

- Email 1 makes zero reference to FMS membership until the final line — it's a problem statement, not a pitch
- Email 2 names a specific, tangible benefit (CE credits), not a vague "community" claim
- Email 3 includes the actual price
- The sequence is set so someone who clicks the membership link at any point exits the sequence

- [ ] **Step 5: Build in Informz**

Create the sequence as an automated series. Set the trigger to fire when a contact is added to the non-member segment (from lead magnet form, event registration, or manual list upload). Add a "stop on click" condition so anyone who visits the membership page exits.

- [ ] **Step 6: Commit**

```bash
git add docs/fms/campaigns/nonmember-nurture.md
git commit -m "campaign: add FMS non-member nurture sequence (3 emails)"
```

---

## Task 9: A-Tier Referral Campaign

**Files:**
- Create: `docs/fms/campaigns/referral.md`

- [ ] **Step 1: Pull the A-tier segment from Informz**

Identify members with 40+ engagement points. This is the send list. Confirm size.

- [ ] **Step 2: Write the referral email**

Create `docs/fms/campaigns/referral.md`:

```markdown
# A-Tier Referral Campaign

---

## Email 1 — Specific Referral Ask

**Subject lines (A/B):**
- A quick ask, [First Name] — who should be at the conference this year?
- [First Name], who on your team would benefit from FMS?

**Preview text:** One specific ask. Two minutes.

**From name:** Alana Vartanian (or Jennifer Lindberg — whoever has the better relationship with this group)

**Body:**

Hi [First Name],

You're one of our most engaged members, and I wanted to ask you something directly.

Who in your network — a colleague, a peer at another institution, someone you've worked alongside — would benefit from what FMS offers?

I'm not asking for a bulk email or a LinkedIn share. I'm asking you to think of one specific person who would get genuine value from our peer network or the annual conference, and send them our way.

If someone comes to mind, you can forward them this note:

---

*"Hi [Name], I've been a member of the Financial Managers Society for a while and thought of you. It's a professional association for finance managers at community banks and credit unions — the peer network and continuing education have been useful for me. Worth a look: fmsinc.org"*

---

That's it. No formal referral program, no reward structure — just a direct introduction from someone they trust, which is worth more.

Thank you for being the kind of member we want more of.

[Signature]
```

- [ ] **Step 3: Review criteria**

- The ask is specific ("one person") not vague ("spread the word")
- The forwarding template is pre-written — zero friction for the referrer
- No referral incentive language (it cheapens the ask for this audience)
- From name is a person, not "FMS Team"

- [ ] **Step 4: Schedule in Informz**

Send in week 4. This goes last among the email campaigns so the re-engagement and event attendee campaigns have already run.

- [ ] **Step 5: Commit**

```bash
git add docs/fms/campaigns/referral.md
git commit -m "campaign: add FMS A-tier referral email"
```

---

## Task 10: Corporate/Group Membership Pitch

**Files:**
- Create: `docs/fms/campaigns/corporate-pitch.md`

- [ ] **Step 1: Build the target list**

This email goes to CFOs, controllers, or HR directors at community banks and credit unions — institutions in FMS's existing member geography that do not have multiple members.

Source this list from: existing member institutions (find the company, then find the decision-maker via LinkedIn), or any institutional contacts already in Informz.

Keep the list small and targeted. 20–50 well-targeted recipients outperforms 500 cold contacts.

- [ ] **Step 2: Write the email**

Create `docs/fms/campaigns/corporate-pitch.md`:

```markdown
# Corporate/Group Membership Pitch

---

## Email — Group Membership Offer

**Subject lines (A/B):**
- Your finance team and FMS — a short note
- [Institution Name] and FMS membership

**Preview text:** One membership, multiple team members.

**From:** Alana Vartanian

**Body:**

Hi [First Name],

I'm Alana Vartanian, President and CEO of the Financial Managers Society.

[If existing member connection: One of your colleagues, [Name], is an FMS member and suggested I reach out.]

FMS is a professional association for financial managers at community banks and credit unions. We offer continuing education, an annual conference, and a peer network of finance professionals at institutions like [Institution Name].

I'm reaching out because we work with a number of institutions that bring multiple team members into FMS together. For a finance team — controllers, VPs, analysts — the combination of shared education resources and a national peer network tends to be more useful than individual memberships in isolation.

If this sounds relevant to [Institution Name]'s professional development, I'd be glad to walk you through what a group engagement looks like.

Would a 20-minute call work? I'm happy to work around your schedule.

[Alana's direct line / calendar link]

Alana Vartanian
President & CEO
Financial Managers Society
312-630-3423
```

- [ ] **Step 3: Review criteria**

- The email is from Alana personally — this is an executive-to-executive note, not a marketing send
- It does not lead with features or a price — it leads with relevance to their institution
- The ask is a 20-minute conversation, not a form or a purchase
- Body is under 200 words

- [ ] **Step 4: Send (not via Informz mass send — send individually or via small batch)**

This should feel like a personal outreach, not a blast. Send from Alana's actual email address. If volume is above 20, Informz is fine, but use the plain-text version.

- [ ] **Step 5: Commit**

```bash
git add docs/fms/campaigns/corporate-pitch.md
git commit -m "campaign: add FMS corporate/group membership pitch email"
```

---

## Task 11: Renewal Sequence

**Files:**
- Create: `docs/fms/campaigns/renewal.md`

- [ ] **Step 1: Identify upcoming renewal cohort**

In Informz or FMS's membership system, pull members whose renewal date falls within the next 90–120 days. This is the segment for all three emails.

- [ ] **Step 2: Write Email 1 — 90 days out**

Create `docs/fms/campaigns/renewal.md`:

```markdown
# Renewal Sequence

---

## Email 1 — 90 Days Before Expiration

**Subject:** What's ahead for FMS members this fall, [First Name]
**Preview text:** Your renewal isn't the point of this email — what's coming is.

**Body:**

Hi [First Name],

Your FMS membership renews in about three months. We're not writing to remind you of that — we're writing because there's a lot coming up worth knowing about.

Over the next 90 days, FMS members have access to:

- [Upcoming webinar 1] — [date]
- [Upcoming webinar 2] — [date]
- [Annual conference / major event] — [date] — [location]

If you haven't registered for any of these yet, now is a good time. Member pricing closes [date] for the conference.

[See everything coming up →]

[Signature]
```

- [ ] **Step 3: Write Email 2 — 30 days out**

Add to `docs/fms/campaigns/renewal.md`:

```markdown
---

## Email 2 — 30 Days Before Expiration

**Subject:** Your FMS membership renews next month, [First Name]
**Preview text:** A quick look at what you've used — and what's ahead.

**Body:**

Hi [First Name],

Your membership renews in about 30 days.

Here's a quick look at what you've had access to this year:
- [N] webinars and seminars available to members
- [Events attended by member — if merge data available: "You attended [N] sessions"]
- [Annual conference, publications, resources]

Coming up after your renewal:
- [Upcoming event 1] — [date]
- [Upcoming event 2] — [date]

Renewing keeps your access uninterrupted.

[Renew your membership →]

Questions about renewal? Reply here or call [number].

[Signature]
```

- [ ] **Step 4: Write Email 3 — Final week**

Add to `docs/fms/campaigns/renewal.md`:

```markdown
---

## Email 3 — Final Week

**Subject:** Your FMS membership expires [date], [First Name]
**Preview text:** Straightforward note — action needed.

**Body:**

Hi [First Name],

Your FMS membership expires [date].

If you'd like to continue, renewing takes a few minutes.

[Renew now →]

If you've decided not to renew, no action is needed. If there's something that made FMS less useful to you this year, I'd genuinely like to know — reply here.

[Signature]
Alana Vartanian
President & CEO
```

- [ ] **Step 5: Review criteria**

- Email 1 contains zero "your membership expires" language — it's about upcoming value
- Email 2 personalizes with attendance data if available
- Email 3 is short, direct, and non-pushy — the exit option is offered gracefully
- No "don't lose access!" urgency language in any email

- [ ] **Step 6: Build in Informz**

Set up as an automated sequence triggered on renewal date approach:
- Email 1: 90 days before renewal date
- Email 2: 30 days before renewal date
- Email 3: 7 days before renewal date

Add stop condition: sequence stops when renewal is completed.

- [ ] **Step 7: Commit**

```bash
git add docs/fms/campaigns/renewal.md
git commit -m "campaign: add FMS renewal sequence (3 emails)"
```

---

## Task 12: Trigger-Based Communication Map

**Files:**
- Create: `docs/fms/trigger-map.md`

This task documents the trigger logic for Alana and Jennifer — what fires when, so they can maintain it after the engagement ends.

- [ ] **Step 1: Write the trigger map**

Create `docs/fms/trigger-map.md`:

```markdown
# FMS Trigger-Based Communication Map

This document describes every automated communication sequence, what triggers it, and when it stops.

---

## Sequences and Triggers

| Sequence | Trigger | Stops When |
|---|---|---|
| Welcome (3 emails) | New member activated | Day 30 email sent |
| Re-engagement (3 emails) | Member is C-tier or disengaged for 60+ days | Member attends an event |
| Event attendee pipeline (2 emails) | Contact attended event + is not a member | Contact joins FMS |
| Non-member nurture (3 emails) | Contact added to non-member segment | Contact joins FMS or clicks membership link |
| Renewal sequence (3 emails) | Membership renewal date is 90 days away | Renewal completed |
| Referral campaign (1 email) | A-tier member (40+ points) | One-time send |
| Corporate pitch (1 email) | Manual — Alana sends individually | One-time send |

---

## Ongoing Manual Sends

These are not automated — they require someone to build and send each time:

- Monthly event promotion emails (broadcast to full member list)
- Annual conference campaign (build 8–12 weeks before conference)
- LinkedIn posts (minimum 2x per week to maintain algorithmic reach)
- Lead magnet promotions (quarterly)

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

---

## KPIs to Track Monthly

- Email open rate (target: >30%)
- Email click rate (target: >3%)
- Unsubscribe rate (alert if >0.5% on any single send)
- LinkedIn follower growth (track monthly)
- LinkedIn avg. engagement rate per post (target: >2%)
- Engagement tier distribution (% A, B, C, disengaged)
- Renewal rate (compare to prior year cohort)
```

- [ ] **Step 2: Review criteria**

- Every sequence in the plan appears in the trigger map
- Every stop condition is defined (no sequence runs forever)
- KPI targets are specific numbers, not vague goals

- [ ] **Step 3: Commit**

```bash
git add docs/fms/trigger-map.md
git commit -m "docs: add FMS trigger-based communication map and KPI targets"
```

---

## Task 13: Board Deliverable Document

**Files:**
- Create: `docs/fms/board-deliverable.md`
- Update: `c:/tmp/generate-fms-doc.mjs` (regenerate Word doc from this source)

**Note:** This task happens in week 4, after early campaign data is available. Populate the audit findings and early results sections with real numbers before finalizing.

- [ ] **Step 1: Populate audit findings**

Open `docs/fms/audits/audit-informz.md` and `docs/fms/audits/audit-linkedin.md`. Pull the 2-3 sharpest findings — the numbers the board hasn't seen before. Examples:
- "FMS email open rates are 12% below the association industry benchmark"
- "40% of the member list is in the C-tier or disengaged — no campaign currently targets them"
- "LinkedIn has posted 3 times in the last 90 days — below the minimum to maintain algorithmic reach"

- [ ] **Step 2: Write the board document**

Create `docs/fms/board-deliverable.md`:

```markdown
# FMS Membership and Retention Strategy
**Prepared for:** FMS Board of Directors
**Date:** [June 2026]

---

## Executive Summary

[3–4 sentences. What was the problem, what was done, what is recommended, what are the expected outcomes.]

---

## What We Found

### Email
- Open rate: [N%] (industry benchmark: 30–35%)
- Click rate: [N%]
- [Key finding 1]
- [Key finding 2]
- Lifecycle gaps: [which sequences were missing or stale]

### LinkedIn
- Followers: [N] ([trend])
- Average engagement rate: [N%]
- Posting frequency: [N posts in last 90 days]
- [Key finding]

### Member Engagement Tiers
| Tier | Members | % of Total |
|---|---|---|
| A (40+ pts) | [N] | [N%] |
| B (~27 pts) | [N] | [N%] |
| C | [N] | [N%] |
| Disengaged | [N] | [N%] |

[1–2 sentences on what the tier distribution means for retention risk.]

---

## What We Launched

The following campaigns are active as of [date]:

| Campaign | Target | Status |
|---|---|---|
| Re-engagement sequence | C-tier and disengaged members | Live — [N] sends, [N%] open rate |
| New member welcome sequence | New members | Live — automated on activation |
| Event attendee pipeline | 2025 attendees, non-members | Live — [N] sends |
| LinkedIn activation | General / non-members | [N] posts live, [engagement data] |

Early results: [1–2 sentences on what's working.]

---

## What We Recommend: 90-Day Plan

**Month 1 (complete)**
- Audit complete
- Re-engagement, welcome, and event attendee campaigns live
- LinkedIn cadence established

**Month 2**
- Lead magnet launched and non-member nurture sequence active
- Trigger-based retention system fully operational in Informz
- Renewal sequence built and tested

**Month 3**
- Referral campaign to A-tier members
- Corporate/group membership pitch underway
- Full KPI baseline set — first quarterly review

---

## How We Measure It

| KPI | Current | Target |
|---|---|---|
| Email open rate | [N%] | 30%+ |
| Email click rate | [N%] | 3%+ |
| LinkedIn engagement rate | [N%] | 2%+ |
| A-tier members (% of total) | [N%] | Increase 10% by Q4 |
| Renewal rate | [N%] | Increase vs. prior year cohort |

---

## Appendix: Campaign Copy and Full Audit Data

Available in `docs/fms/` for review.
```

- [ ] **Step 3: Review criteria**

- Every stat in the document has a real number — no placeholders remain
- The "What We Launched" section shows actual send data, not planned data
- Executive summary is 3–4 sentences max
- The tone is board-appropriate: data-led, direct, no marketing language

- [ ] **Step 4: Export to Word**

Update `c:/tmp/generate-fms-doc.mjs` to pull from `docs/fms/board-deliverable.md` content and regenerate the Word doc:

```bash
cd c:/tmp && node generate-fms-doc.mjs
```

Output: `c:/tmp/FMS-Board-Deliverable-[Date].docx`

- [ ] **Step 5: Commit**

```bash
git add docs/fms/board-deliverable.md
git commit -m "deliverable: add FMS board document (draft — populate with live data before finalizing)"
```

---

## Self-Review

**Spec coverage check:**

| Spec Section | Tasks Covering It |
|---|---|
| Audit Framework — Informz | Task 1 |
| Audit Framework — LinkedIn | Task 2 |
| Audit Framework — Engagement Tier Analysis | Task 1, Step 2 |
| Quick Win: Re-engagement campaign | Task 3 |
| Quick Win: Welcome sequence | Task 4 |
| Quick Win: LinkedIn activation | Task 5 |
| Strategy — Retention: tier-to-churn mapping | Task 1 (data), Task 12 (map) |
| Strategy — Retention: trigger-based system | Task 12 |
| Strategy — Retention: renewal sequence | Task 11 |
| Strategy — Acquisition: LinkedIn top-of-funnel | Tasks 5, 7 |
| Strategy — Acquisition: referral activation | Task 9 |
| Strategy — Acquisition: event attendee pipeline | Task 6 |
| Strategy — Acquisition: lead magnet | Task 7 |
| Strategy — Acquisition: non-member nurture | Task 8 |
| Strategy — Acquisition: corporate pitch | Task 10 |
| Board Deliverable | Task 13 |

All spec sections covered. No gaps.
