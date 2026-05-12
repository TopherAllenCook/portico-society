# Airtable Personal OS — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a complete personal operating system in Airtable with 4 tables, 6 automations, and Claude as the primary interface.

**Architecture:** Claude creates the base structure and seeds data via Airtable MCP (Tasks 1–7). Make.com scenarios handle email capture, daily digest, and inbox aging (Tasks 8–11). Airtable's native automation engine handles in-app events like project auto-close and idea promotion (Tasks 12–14). Verification confirms all three capture channels work end-to-end (Task 15).

**Tech Stack:** Airtable (base + native automations), Make.com (external automation), Resend (transactional email), Claude + Airtable MCP (conversational interface)

> **Execution note:** Tasks 1–7 are executed by Claude via Airtable MCP. Tasks 8–15 require manual configuration in Make.com and Airtable UIs, or are performed by Chris.

---

## Phase 1: Airtable Base Construction (Claude via MCP)

---

### Task 1: Create the OS Base

**What:** Create a new Airtable base named "OS" in Chris's workspace.

- [ ] **Step 1: List workspaces to get the workspace ID**

  Use `list_workspaces`. Identify Chris's primary workspace. Note the `workspaceId`.

- [ ] **Step 2: Create the base**

  Use `create_base` with:
  - `name`: `OS`
  - `workspaceId`: (from Step 1)
  - `tables`: single starter table named `Inbox` (required by API — we'll configure fields next)

  Note the returned `baseId` — needed for all subsequent tasks.

- [ ] **Step 3: Verify**

  Use `list_bases` and confirm "OS" appears. Confirm `baseId` matches.

---

### Task 2: Configure Inbox Table Fields

**What:** Add all Inbox fields. The table was created in Task 1 with a default "Name" field — add the remaining 4.

- [ ] **Step 1: Add Source field**

  Use `create_field` with:
  - `baseId`: (from Task 1)
  - `tableId`: Inbox table ID
  - `name`: `Source`
  - `type`: `singleSelect`
  - `options.choices`: `[{name: "Claude"}, {name: "Email"}, {name: "Manual"}]`

- [ ] **Step 2: Add Date Added field**

  Use `create_field`:
  - `name`: `Date Added`
  - `type`: `date`
  - `options.dateFormat`: `{name: "local"}`

- [ ] **Step 3: Add Notes field**

  Use `create_field`:
  - `name`: `Notes`
  - `type`: `multilineText`

- [ ] **Step 4: Add Status field**

  Use `create_field`:
  - `name`: `Status`
  - `type`: `singleSelect`
  - `options.choices`: `[{name: "New"}, {name: "Processed"}]`

- [ ] **Step 5: Verify schema**

  Use `get_table_schema` on Inbox. Confirm 5 fields: Name, Source, Date Added, Notes, Status.

---

### Task 3: Create Projects Table + Fields

**What:** Create the Projects table before Tasks so the link field can reference it.

- [ ] **Step 1: Create Projects table**

  Use `create_table`:
  - `baseId`: (from Task 1)
  - `name`: `Projects`
  - `fields`: `[{name: "Project Name", type: "singleLineText"}]`

  Note the returned `tableId` for Projects — needed in Task 4.

- [ ] **Step 2: Add Area field**

  Use `create_field`:
  - `name`: `Area`
  - `type`: `singleSelect`
  - `options.choices`: `[{name: "Verve MD"}, {name: "Utah Photo Co."}, {name: "Personal"}, {name: "Home"}, {name: "Health"}, {name: "Finance"}, {name: "Learning"}]`

- [ ] **Step 3: Add Status field**

  Use `create_field`:
  - `name`: `Status`
  - `type`: `singleSelect`
  - `options.choices`: `[{name: "Active"}, {name: "On Hold"}, {name: "Someday"}, {name: "Done"}]`

- [ ] **Step 4: Add Goal field**

  Use `create_field`:
  - `name`: `Goal`
  - `type`: `multilineText`

- [ ] **Step 5: Add Due Date field**

  Use `create_field`:
  - `name`: `Due Date`
  - `type`: `date`
  - `options.dateFormat`: `{name: "local"}`

- [ ] **Step 6: Add Notes field**

  Use `create_field`:
  - `name`: `Notes`
  - `type`: `multilineText`

- [ ] **Step 7: Verify schema**

  Use `get_table_schema` on Projects. Confirm 6 fields: Project Name, Area, Status, Goal, Due Date, Notes.

---

### Task 4: Create Tasks Table + Fields

**What:** Create Tasks table with all 8 fields including the linked record field pointing to Projects.

- [ ] **Step 1: Create Tasks table**

  Use `create_table`:
  - `name`: `Tasks`
  - `fields`: `[{name: "Task", type: "singleLineText"}]`

  Note the returned `tableId` for Tasks.

- [ ] **Step 2: Add Project linked field**

  Use `create_field`:
  - `name`: `Project`
  - `type`: `multipleRecordLinks`
  - `options.linkedTableId`: (Projects tableId from Task 3)

- [ ] **Step 3: Add Area field**

  Use `create_field`:
  - `name`: `Area`
  - `type`: `singleSelect`
  - `options.choices`: `[{name: "Verve MD"}, {name: "Utah Photo Co."}, {name: "Personal"}, {name: "Home"}, {name: "Health"}, {name: "Finance"}, {name: "Learning"}]`

- [ ] **Step 4: Add Priority field**

  Use `create_field`:
  - `name`: `Priority`
  - `type`: `singleSelect`
  - `options.choices`: `[{name: "High"}, {name: "Medium"}, {name: "Low"}]`

- [ ] **Step 5: Add Due Date field**

  Use `create_field`:
  - `name`: `Due Date`
  - `type`: `date`
  - `options.dateFormat`: `{name: "local"}`

- [ ] **Step 6: Add Status field**

  Use `create_field`:
  - `name`: `Status`
  - `type`: `singleSelect`
  - `options.choices`: `[{name: "Todo"}, {name: "In Progress"}, {name: "Waiting"}, {name: "Done"}]`

- [ ] **Step 7: Add Notes field**

  Use `create_field`:
  - `name`: `Notes`
  - `type`: `multilineText`

- [ ] **Step 8: Add Created field**

  Use `create_field`:
  - `name`: `Created`
  - `type`: `createdTime`

- [ ] **Step 9: Verify schema**

  Use `get_table_schema` on Tasks. Confirm 8 fields: Task, Project, Area, Priority, Due Date, Status, Notes, Created.

---

### Task 5: Create Ideas Table + Fields

**What:** Create the Ideas table — last of the four core tables.

- [ ] **Step 1: Create Ideas table**

  Use `create_table`:
  - `name`: `Ideas`
  - `fields`: `[{name: "Idea", type: "singleLineText"}]`

- [ ] **Step 2: Add Area field**

  Use `create_field`:
  - `name`: `Area`
  - `type`: `singleSelect`
  - `options.choices`: `[{name: "Verve MD"}, {name: "Utah Photo Co."}, {name: "Personal"}, {name: "Home"}, {name: "Health"}, {name: "Finance"}, {name: "Learning"}]`

- [ ] **Step 3: Add Date field**

  Use `create_field`:
  - `name`: `Date`
  - `type`: `createdTime`

- [ ] **Step 4: Add Status field**

  Use `create_field`:
  - `name`: `Status`
  - `type`: `singleSelect`
  - `options.choices`: `[{name: "Raw"}, {name: "Incubating"}, {name: "Promoted"}]`

- [ ] **Step 5: Add Notes field**

  Use `create_field`:
  - `name`: `Notes`
  - `type`: `multilineText`

- [ ] **Step 6: Verify schema**

  Use `get_table_schema` on Ideas. Confirm 5 fields: Idea, Area, Date, Status, Notes.

---

### Task 6: Verify Full Base Structure

**What:** Confirm all four tables exist with the correct field counts before seeding data.

- [ ] **Step 1: List all tables**

  Use `list_tables_for_base` with the OS baseId. Confirm 4 tables: Inbox, Tasks, Projects, Ideas.

- [ ] **Step 2: Spot-check linked field**

  Use `get_table_schema` on Tasks. Confirm the Project field type is `multipleRecordLinks` and its `linkedTableId` matches the Projects tableId.

- [ ] **Step 3: Commit checkpoint**

  ```bash
  git commit --allow-empty -m "chore: Airtable OS base structure complete (verified)"
  ```

---

### Task 7: Seed Active Projects

**What:** Pre-create 5 active projects so the system feels live on day one.

- [ ] **Step 1: Seed Verve MD projects**

  Use `create_records_for_table` on Projects table with these 3 records:

  ```json
  [
    {
      "Project Name": "Verve website build",
      "Area": "Verve MD",
      "Status": "Active",
      "Goal": "Launch vervemd.com with hero, services, audit CTA, and working form-to-audit pipeline."
    },
    {
      "Project Name": "Audit automation pipeline",
      "Area": "Verve MD",
      "Status": "Active",
      "Goal": "Form submit triggers Firecrawl scrape → Claude draft → Resend to Topher → Airtable log, end-to-end without manual steps."
    },
    {
      "Project Name": "First client acquisition",
      "Area": "Verve MD",
      "Status": "Active",
      "Goal": "Sign the first Verve Engagement client at $4,500–$6,500/mo retainer."
    }
  ]
  ```

- [ ] **Step 2: Seed Utah Photo Co. projects**

  Use `create_records_for_table` on Projects table with these 2 records:

  ```json
  [
    {
      "Project Name": "Portfolio site",
      "Area": "Utah Photo Co.",
      "Status": "Active",
      "Goal": "Launch chriscookphoto.com with portfolio gallery, booking CTA, and contact form live."
    },
    {
      "Project Name": "Mini session calendar",
      "Area": "Utah Photo Co.",
      "Status": "Active",
      "Goal": "Publish next mini session date with online booking and confirmed client signups."
    }
  ]
  ```

- [ ] **Step 3: Verify records**

  Use `list_records_for_table` on Projects. Confirm 5 records, all Status = Active.

---

## Phase 2: Make.com Scenarios (Manual Configuration)

> These steps are performed by Chris in the Make.com UI at make.com. Each scenario is a separate Make.com scenario.

---

### Task 8: Scenario — Email → Inbox

**What:** Any email forwarded to a Make.com address lands in the Airtable Inbox.

- [ ] **Step 1: Create a new scenario**

  In Make.com: click **Create a new scenario**. Name it `OS — Email to Inbox`.

- [ ] **Step 2: Add Email trigger module**

  Search for **Email > Watch Emails**.
  - Create a new Email connection (Make.com provides a unique `@hook.make.com` address).
  - **Copy this address** — this is your capture email.
  - Maximum number of results: `1`
  - Mark messages as read: `Yes`
  - Criteria: `ALL MAIL`

- [ ] **Step 3: Add Airtable module**

  Search for **Airtable > Create a Record**.
  - Connection: (your existing Airtable connection or create new)
  - Base: `OS`
  - Table: `Inbox`
  - Fields:
    - **Name** → `{{1.subject}}`
    - **Source** → `Email` (type literal)
    - **Notes** → `{{1.text}}`
    - **Status** → `New` (type literal)

- [ ] **Step 4: Save and test**

  Send a test email to the capture address. Run the scenario once manually. Confirm a record appears in Airtable Inbox with Source = Email, Status = New.

- [ ] **Step 5: Activate scenario**

  Turn the scenario ON. Set scheduling to **Immediately** (runs whenever a new email arrives).

- [ ] **Step 6: Save capture address**

  Note the `@hook.make.com` address somewhere you can forward to easily (add it as a contact named "OS Inbox").

---

### Task 9: Scenario — Daily Digest at 8am

**What:** Every morning at 8am, pull today's + overdue + in-progress tasks and email a digest to topher.a.cook@gmail.com via Resend.

- [ ] **Step 1: Create a new scenario**

  Name it `OS — Daily Digest`.

- [ ] **Step 2: Add Schedule trigger**

  Search for **Tools > Set up a schedule** (or Clock/Schedule module).
  - Run: `Every day`
  - Time: `08:00`
  - Timezone: `America/Denver` (Mountain Time)

- [ ] **Step 3: Add Airtable search — Tasks due today**

  Search for **Airtable > Search Records**.
  - Base: `OS`, Table: `Tasks`
  - Filter by formula:
    ```
    AND(IS_SAME({Due Date}, TODAY(), 'day'), {Status} != 'Done')
    ```
  - Store as: module 2 (results array)

- [ ] **Step 4: Add Airtable search — Overdue tasks**

  Add another **Airtable > Search Records**.
  - Base: `OS`, Table: `Tasks`
  - Filter by formula:
    ```
    AND(IS_BEFORE({Due Date}, TODAY()), {Status} != 'Done', {Due Date} != '')
    ```
  - Store as: module 3

- [ ] **Step 5: Add Airtable search — In Progress tasks**

  Add another **Airtable > Search Records**.
  - Base: `OS`, Table: `Tasks`
  - Filter by formula:
    ```
    {Status} = 'In Progress'
    ```
  - Store as: module 4

- [ ] **Step 6: Add Text Aggregator for each search result**

  For each of modules 2, 3, 4: add a **Tools > Text Aggregator** to join the task names into a readable list.
  - Row separator: `\n`
  - Text: `• {{Task}} [{{Area}}]{{if(Due Date, " — due " & Due Date, "")}}`

- [ ] **Step 7: Add HTTP module — send via Resend**

  Search for **HTTP > Make a Request**.
  - URL: `https://api.resend.com/emails`
  - Method: `POST`
  - Headers:
    - `Authorization`: `Bearer {{your_RESEND_API_KEY}}`
    - `Content-Type`: `application/json`
  - Body type: `Raw`
  - Content type: `JSON (application/json)`
  - Request content:
    ```json
    {
      "from": "OS <os@vervemd.com>",
      "to": ["topher.a.cook@gmail.com"],
      "subject": "Daily brief — {{formatDate(now; 'MMMM D')}}",
      "html": "<h2>Good morning.</h2><h3>Due today</h3><pre>{{6.text}}</pre><h3>Overdue</h3><pre>{{7.text}}</pre><h3>In Progress</h3><pre>{{8.text}}</pre>"
    }
    ```
    *(Adjust module numbers 6/7/8 to match your Text Aggregator module numbers.)*

- [ ] **Step 8: Test and activate**

  Run manually. Confirm email arrives at topher.a.cook@gmail.com. Activate scenario.

---

### Task 10: Scenario — Inbox Aging Alert

**What:** If any Inbox item has been sitting New for more than 24 hours, send a nudge email.

- [ ] **Step 1: Create a new scenario**

  Name it `OS — Inbox Aging Alert`.

- [ ] **Step 2: Add Schedule trigger**

  - Run: `Every day`
  - Time: `09:00`
  - Timezone: `America/Denver`

- [ ] **Step 3: Add Airtable search — stale inbox items**

  **Airtable > Search Records**:
  - Base: `OS`, Table: `Inbox`
  - Filter by formula:
    ```
    AND({Status} = 'New', IS_BEFORE({Date Added}, DATEADD(TODAY(), -1, 'days')))
    ```

- [ ] **Step 4: Add a Filter module**

  **Tools > Filter** — only continue if records were found:
  - Label: `Has stale items`
  - Condition: `{{length(3.records)}}` Greater than `0`
  *(Adjust module number to match your Airtable search module.)*

- [ ] **Step 5: Add HTTP module — send via Resend**

  **HTTP > Make a Request**:
  - URL: `https://api.resend.com/emails`
  - Method: `POST`
  - Headers: `Authorization: Bearer {{RESEND_API_KEY}}`, `Content-Type: application/json`
  - Body:
    ```json
    {
      "from": "OS <os@vervemd.com>",
      "to": ["topher.a.cook@gmail.com"],
      "subject": "Inbox check — {{length(3.records)}} item(s) waiting",
      "html": "<p>You have <strong>{{length(3.records)}} unprocessed item(s)</strong> in your Inbox that have been sitting for more than 24 hours. Open Airtable and process them.</p>"
    }
    ```

- [ ] **Step 6: Activate scenario**

---

### Task 11: Wire Verve Audit Form → OS Task

**What:** Add a step to the existing Verve audit Make.com scenario so each new audit submission drops a task in the OS.

- [ ] **Step 1: Open the existing Verve audit scenario in Make.com**

  Find the scenario that handles the audit form submission (form → Firecrawl → Claude → Resend → Airtable lead log).

- [ ] **Step 2: Add a new Airtable module at the end**

  After the lead log step, add **Airtable > Create a Record**:
  - Base: `OS`
  - Table: `Tasks`
  - Fields:
    - **Task** → `Process audit for {{practice_name}}` *(use the practice name field from your form module)*
    - **Area** → `Verve MD`
    - **Priority** → `High`
    - **Status** → `Todo`

- [ ] **Step 3: Test with a dummy form submission**

  Submit a test audit form. Confirm the task appears in OS Tasks with Area = Verve MD, Priority = High, Status = Todo.

- [ ] **Step 4: Save the scenario**

---

## Phase 3: Airtable Native Automations (Manual in Airtable UI)

> Go to the OS base in Airtable → click **Automations** in the top nav for each task below.

---

### Task 12: Automation — Project Auto-Close

**What:** When all tasks linked to a project are marked Done, the project status flips to Done automatically.

- [ ] **Step 1: Add "Is Open" formula field to Tasks**

  In the Tasks table, click **+** to add a field:
  - Name: `Is Open`
  - Field type: `Formula`
  - Formula: `IF({Status} != "Done", 1, 0)`
  - Click **Save**. This field returns 1 for any task not yet done, 0 for done.

- [ ] **Step 2: Add Open Tasks rollup field to Projects**

  In the Projects table, click **+** to add a field:
  - Name: `Open Tasks`
  - Field type: `Rollup`
  - Linked records field: `Tasks` (Airtable auto-creates a reverse link on Projects when you created the link field in Task 4)
  - Field to rollup: `Is Open`
  - Aggregation: `SUM`
  - Click **Save**. This field now shows the count of non-Done tasks linked to the project.

- [ ] **Step 2: Create automation**

  In Automations, click **+ New automation**.
  - Name: `Auto-close project when all tasks done`

- [ ] **Step 3: Configure trigger**

  - Trigger: **When a record matches conditions**
  - Table: `Projects`
  - Conditions:
    - `Open Tasks` is `0`
    - `Status` is not `Done`

- [ ] **Step 4: Configure action**

  - Action: **Update record**
  - Table: `Projects`
  - Record: (the triggering record)
  - Field to update: `Status` → `Done`

- [ ] **Step 5: Test**

  Create a test project with 1 linked task. Set the task to Done. Confirm the project Status changes to Done within a few seconds.

- [ ] **Step 6: Turn automation ON**

---

### Task 13: Automation — Idea Promotion Creates Task

**What:** When an Idea's status changes to Promoted, automatically create a Task from it.

- [ ] **Step 1: Create automation**

  In Automations, click **+ New automation**.
  - Name: `Idea promoted → create task`

- [ ] **Step 2: Configure trigger**

  - Trigger: **When a record matches conditions**
  - Table: `Ideas`
  - Conditions:
    - `Status` is `Promoted`

- [ ] **Step 3: Configure action**

  - Action: **Create record**
  - Table: `Tasks`
  - Fields:
    - `Task` → insert field: `Idea` (from the triggering Ideas record)
    - `Area` → insert field: `Area` (from the triggering Ideas record)
    - `Priority` → `Medium`
    - `Status` → `Todo`

- [ ] **Step 4: Test**

  Create a test Idea with Area = Personal. Change its Status to Promoted. Confirm a Task is created with the same name, same area, Priority = Medium, Status = Todo.

- [ ] **Step 5: Turn automation ON**

---

## Phase 4: Verification

---

### Task 14: End-to-End Capture Test

**What:** Confirm all three capture channels work.

- [ ] **Step 1: Test Claude capture**

  Say to Claude: `Add task: test task from Claude, Verve MD, high priority, due tomorrow`.
  Claude should use Airtable MCP to create a record in Tasks.
  Verify in Airtable: Task = "test task from Claude", Area = Verve MD, Priority = High, Status = Todo.

- [ ] **Step 2: Test email capture**

  Forward any email to the Make.com capture address from Task 8.
  Wait up to 5 minutes. Verify a record appears in Airtable Inbox with Source = Email, Status = New.

- [ ] **Step 3: Test manual capture**

  Open Airtable on mobile. Add a record to Inbox manually with Name = "test manual entry", Source = Manual.
  Verify it appears.

- [ ] **Step 4: Test daily digest**

  In Make.com, run the Daily Digest scenario manually.
  Confirm email arrives at topher.a.cook@gmail.com with the correct format.

- [ ] **Step 5: Test idea promotion automation**

  In Airtable, create an Idea: "test promotion idea", Area = Personal.
  Change Status to Promoted.
  Confirm a Task is auto-created in Tasks table within 10 seconds.

- [ ] **Step 6: Final commit**

  ```bash
  git commit --allow-empty -m "feat: Airtable personal OS live — all channels verified"
  ```

---

## Reference: Field Summary

| Table | Field | Type |
|---|---|---|
| Inbox | Name | Single line text |
| Inbox | Source | Single select: Claude, Email, Manual |
| Inbox | Date Added | Date (auto) |
| Inbox | Notes | Long text |
| Inbox | Status | Single select: New, Processed |
| Tasks | Task | Single line text |
| Tasks | Project | Link → Projects |
| Tasks | Area | Single select (7 values) |
| Tasks | Priority | Single select: High, Medium, Low |
| Tasks | Due Date | Date |
| Tasks | Status | Single select: Todo, In Progress, Waiting, Done |
| Tasks | Notes | Long text |
| Tasks | Created | Created time (auto) |
| Tasks | Is Open | Formula: `IF({Status} != "Done", 1, 0)` (used by rollup) |
| Projects | Project Name | Single line text |
| Projects | Area | Single select (7 values) |
| Projects | Status | Single select: Active, On Hold, Someday, Done |
| Projects | Goal | Long text |
| Projects | Due Date | Date |
| Projects | Notes | Long text |
| Projects | Open Tasks | Rollup (count of non-Done tasks) |
| Ideas | Idea | Single line text |
| Ideas | Area | Single select (7 values) |
| Ideas | Date | Created time (auto) |
| Ideas | Status | Single select: Raw, Incubating, Promoted |
| Ideas | Notes | Long text |

---

## Areas Reference (used across all tables)

`Verve MD` · `Utah Photo Co.` · `Personal` · `Home` · `Health` · `Finance` · `Learning`
