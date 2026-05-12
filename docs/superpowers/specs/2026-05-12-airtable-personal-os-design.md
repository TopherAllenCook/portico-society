# Airtable Personal OS — Design Spec
**Date:** 2026-05-12
**Status:** Approved

---

## Overview

A single Airtable base ("OS") that serves as the complete personal operating system for Chris Cook across three active areas: Verve MD, Utah Photo Co., and Personal. All captures route in through Claude, email, or manual entry. Automations keep the system moving without manual maintenance. Claude acts as the primary conversational interface.

---

## 1. Base Structure

One base: **OS**

| Table | Purpose |
|---|---|
| **Inbox** | Raw capture — everything lands here first, unprocessed |
| **Tasks** | Actionable items linked to a project and area |
| **Projects** | Multi-step work with a goal, status, and due date |
| **Ideas** | Non-actionable captures — someday/maybe |

---

## 2. Fields

### Inbox
| Field | Type | Notes |
|---|---|---|
| Name | Single line text | The raw capture |
| Source | Single select | `Claude`, `Email`, `Manual` |
| Date Added | Date | Auto-populated on creation |
| Notes | Long text | Body of email or extra context |
| Status | Single select | `New`, `Processed` |

### Tasks
| Field | Type | Notes |
|---|---|---|
| Task | Single line text | What to do |
| Project | Link to Projects | Which project this belongs to |
| Area | Single select | `Verve MD`, `Utah Photo Co.`, `Personal`, `Home`, `Health`, `Finance`, `Learning` |
| Priority | Single select | `High`, `Medium`, `Low` |
| Due Date | Date | |
| Status | Single select | `Todo`, `In Progress`, `Waiting`, `Done` |
| Notes | Long text | |
| Created | Date | Auto-populated |

### Projects
| Field | Type | Notes |
|---|---|---|
| Project Name | Single line text | |
| Area | Single select | Same values as Tasks |
| Status | Single select | `Active`, `On Hold`, `Someday`, `Done` |
| Goal | Long text | One sentence: what does done look like? |
| Due Date | Date | |
| Notes | Long text | |

### Ideas
| Field | Type | Notes |
|---|---|---|
| Idea | Single line text | |
| Area | Single select | Same values as Tasks |
| Date | Date | Auto-populated |
| Status | Single select | `Raw`, `Incubating`, `Promoted` |
| Notes | Long text | |

---

## 3. Seeded Projects at Launch

Active projects pre-created so the system feels live from day one:

**Verve MD**
- Verve website build
- Audit automation pipeline
- First client acquisition

**Utah Photo Co.**
- Portfolio site
- Mini session calendar
- (Additional active projects to be added by Chris)

**Personal**
- (Chris to populate at launch)

---

## 4. Capture Channels

Three ways items enter the system:

**1. Claude (primary)**
Conversational capture via Airtable MCP. Chris speaks naturally; Claude writes the record to the correct table with correct fields.

Examples:
- "Add task: follow up with Dr. Kim, Verve MD, high priority, due Friday"
- "Log an idea: Utah Photo Co. mini sessions for medical practices"
- "I have a bunch of things on my mind — let me dump them"

**2. Email**
A Make.com webhook email address (e.g. `inbox@hook.make.com`) acts as the capture address. Forward any email to it and Make.com parses it into an Inbox record: subject → Name, body → Notes, source tagged `Email`.

**3. Manual**
Airtable web or mobile app for direct entry when already in the system.

---

## 5. Automations

All six automations use Make.com or Airtable's native automation engine (both already in the Verve tech stack).

| # | Trigger | Action | Tool |
|---|---|---|---|
| 1 | Email forwarded to capture address | Parse and create Inbox record | Make.com |
| 2 | Inbox item `New` for >24 hours | Send nudge email via Resend | Make.com |
| 3 | Daily at 8am | Pull today's tasks + overdue + in-progress → send digest via Resend to topher.a.cook@gmail.com | Make.com |
| 4 | All Tasks linked to a Project reach `Done` | Flip Project status to `Done` | Airtable native |
| 5 | Idea status changes to `Promoted` | Auto-create a Task from the Idea | Airtable native |
| 6 | Verve audit form submitted | Create Task: "Process audit for [practice name]" | Make.com (existing pipeline) |

---

## 6. Claude as Interface

Claude reads and writes Airtable via MCP. No middleware required for the Claude channel.

### Capture
- "Add task: [task], [area], [priority], due [date]"
- "Log an idea: [idea]"
- "Brain dump — I'll list things, you add them all"

### Query
- "What's on my plate for Verve this week?"
- "What's in my inbox?"
- "Where are things with Utah Photo Co.?"
- "What's overdue?"

### Update
- "Mark [task] as done"
- "Move [project] to On Hold"
- "Promote the mini sessions idea to a task"

### Weekly Review
- "Give me a weekly review" → Claude queries all areas and returns: done this week, overdue, stalled projects, next actions per area

---

## 7. What This Is Not

- Not a docs/wiki system (use a separate tool for meeting notes, writing, reference)
- Not a calendar (tasks with due dates ≠ calendar events — Phase 2 if needed)
- Not a CRM (Verve lead logging stays in the existing Airtable CRM base)

---

## 8. Success Criteria

- Zero tasks living only in Chris's head
- Daily digest arrives at 8am with today's priorities pre-loaded
- Claude can add, query, and update any record in under 10 seconds of conversation
- System requires no manual maintenance beyond processing the inbox

---

## Next Steps

1. Create the OS base in Airtable with tables and fields as specified
2. Configure Make.com scenarios (email capture, daily digest, inbox aging alert)
3. Configure Airtable native automations (project auto-close, idea promotion)
4. Seed active projects for all three areas
5. Wire Verve audit form to OS Task creation
6. Test all capture channels end-to-end
