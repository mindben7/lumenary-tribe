---
title: Chronos Timeline App — Gemini Deep Think Architectural Brief
date: 2026-05-03
status: design-input
audience: Gemini 2.5 Deep Think (or any reasoning-heavy LLM)
purpose: Produce a complete technical + UX design for an MVP build of "Chronos" — an AI-generated interactive horizontal-scroll timeline mind-map app, scoped as a feature of the Lumenary Tribe Business Operating System (BOS). Later, it will be rolled into my entire business timeline for mindbenT media.
---

# Deep Think Brief: "Chronos" — AI-Generated Interactive Timeline Mind-Map

## How to read this brief

You are an expert software architect and product designer. I am giving you a complete project context and a specific deliverable scope. Take your time. Use your full reasoning capacity. The output should be **a single comprehensive design document** that another AI coding agent (Vercel Antigravity, Cursor, or Claude Code) can pick up and execute against without further clarification.

Do not ask me clarifying questions in your response — instead, when you encounter ambiguity, **enumerate the design options, recommend one, and explain why.** I will iterate on your output if needed; your first pass should be complete enough to start building from.

---

## 1. Context — who I am, what I'm building, why Chronos matters

I am Ben, founder of MindBenT Media. I am building a **Business Operating System (BOS) for the Lumenary Tribe** — a high-end men's professional networking organization based in South Florida (Miami / Brickell as the anchor market, with planned expansion across Coral Gables, Aventura, Doral, and other affluent zones over a 36-month rollout).

The BOS has three planned slices:

- **Slice 1: Founder Proposal** — a research binder + pricing strategy + go-to-market plan I'm pitching to the Tribe's existing founders tomorrow (2026-05-04). This is currently complete in `docs/research/00-evidence-binder.md`.
- **Slice 2: Helm** — the operator-facing app I will use day-to-day to run my chapters: prospect pipeline, member CRM, content scheduling, ad campaign tracking, retreat planning, override income tracking. Postgres + Next.js. This is the slice **Chronos belongs to.**
- **Slice 3: Tribe Site** — the public-facing membership site: landing pages, member directory, event calendar, payment/onboarding, affinity-group RSVP. Different audience, different security model.

**Chronos is a Helm v0.3+ feature.** The reason it matters:

1. **My current §4 Miami Launch Sequence** (in the binder) is a static markdown table covering 36 months of chapter launches, override income windows, retreat cadences, and revenue milestones. Reading it as text is fine; **seeing it as an interactive horizontal timeline would make strategic patterns instantly visible** (e.g., the gap between Brickell launch and override-income materialization; the overlap between Aventura launch prep and Doral pre-marketing).
2. **Daily operations need a temporal view.** When I'm running 2-5 chapters simultaneously and have ad campaigns, content drops, retreat dates, member-renewal cycles, and prospect pipelines all active, a flat task list breaks down. A timeline view lets me see what's happening this week vs. next month vs. next quarter at a single glance.
3. **The pattern is generalizable.** Once Chronos exists for chapter operations, the same component renders campaign histories, content production calendars, even personal goals. It becomes the *strategy visualization layer* of the BOS.
4. **Productization potential.** Chronos as a standalone tool — "AI-generated interactive timeline mind-maps from your project folder" — does not exist as a single off-the-shelf product (closest competitors: Tiki-Toki, Aeon Timeline, Heptabase, Knight Lab TimelineJS — none combine mouse-wheel-horizontal-scroll + AI auto-generation + mind-map structure). If the internal version works, this could be a marketable Slice 4 product.

---

## 2. The non-negotiable product requirements

Design the MVP around these. Don't compromise on any of these without explicitly flagging it as a tradeoff.

### 2.1 Horizontal time axis (x-axis = time)

- The primary visual orientation is a **single horizontal time axis** across the screen.
- Time flows **left → right** (earlier on left, later on right) — Western reading convention.
- Multiple "tracks" or "lanes" stack vertically (think: Chapter 1 lane, Chapter 2 lane, Ad Campaigns lane, Content lane). The user can collapse/expand lanes.

### 2.2 Mouse-wheel-as-horizontal-scroll

- **Wheel down → scroll forward in time (rightward).**
- **Wheel up → scroll backward in time (leftward).**
- This is a deliberate departure from default browser behavior (where wheel = vertical scroll). Implement with a `wheel` event handler that translates `deltaY` into `translateX` on the timeline canvas.
- **`Shift + wheel` should preserve normal vertical scroll** for the page chrome (header, sidebar). Only the timeline canvas itself absorbs wheel-as-horizontal-scroll.
- **Trackpad two-finger swipe** should also work natively (most browsers map this to `wheel` events on macOS).
- Consider whether **`Cmd/Ctrl + wheel` should zoom in/out on the time axis** instead of scroll — analyze and recommend.

### 2.3 Mind-map style nodes (not just a Gantt chart)

- Events are not bars. Events are **nodes** — boxes with a label, an optional thumbnail/icon, an optional duration indicator (if it spans time), and edges connecting them to related nodes.
- Edge types: `causes`, `depends-on`, `related-to`, `parent-of` (visual differentiation: solid arrows for causes/depends, dotted lines for related, brackets for parent groupings).
- Nodes can be nested inside parent nodes (e.g., a Brickell chapter node contains child nodes for individual member-touch events).
- **Layout algorithm:** time-axis position is fixed by the event date. Vertical position within a lane is auto-arranged to minimize edge crossings (consider Sugiyama-style layered layout adapted for fixed-x).

### 2.4 AI ingestion from a project folder

- Point Chronos at a folder of markdown files (or a single doc). It uses the Anthropic Claude API to extract events with dates and relationships, generates a timeline JSON, and renders it.
- Use the latest Claude model (as of project start, **`claude-opus-4-7`** for ingestion quality, fall back to `claude-sonnet-4-6` for cost — make the model configurable).
- The ingestion output must conform to a versioned JSON schema (define it in your spec).
- **Structured output is mandatory** — use Anthropic's tool-use feature with a strict JSON schema rather than parsing freeform text.
- **Re-ingestion is incremental** — when source files change, only re-extract events from changed files, not the whole corpus. Cache prior extractions by file hash.

### 2.5 Zoom levels on the time axis

- Continuous zoom from **decade → year → quarter → month → week → day** on a single axis (think Google Maps zoom but for time).
- Zoom level changes node density and label visibility (at decade view, only major milestones; at week view, every event).
- Smooth animation between zoom levels (CSS transforms with `transition`, not jumpy redraws).

### 2.6 Editing and persistence

- Direct manipulation: click a node to edit label/date/notes inline. Drag a node along the time axis to change its date.
- Undo/redo on every edit (CmdZ / CmdShiftZ).
- Auto-save to Postgres after every edit (debounced ~500ms).
- **Source-of-truth toggle:** for AI-ingested timelines, mark whether the source markdown file or the in-app edit is canonical. If the markdown changes, prompt the user before re-ingesting (avoid blowing away manual edits).

---

## 3. The hard constraints (architecture / stack)

These are pre-decided. Don't relitigate.

- **Framework:** Next.js 16+ App Router on Vercel. Server Components for data fetching; Client Components for the interactive timeline canvas.
- **Language:** TypeScript everywhere.
- **Database:** Postgres on Vercel (Neon integration). Use Drizzle ORM.
- **AI:** Anthropic Claude API directly (NOT through Vercel AI Gateway for v0 — keep simple). Use `@anthropic-ai/sdk`.
- **Authentication:** Clerk via Vercel Marketplace integration.
- **Rendering:** evaluate **React Flow** (popular, good for nodes/edges, but axis-bound layout requires custom work) vs. **D3.js + React** (more control, more code) vs. **custom SVG/Canvas** (most control, most work). Recommend one and justify.
- **State management:** Zustand for client-side timeline state. Server Actions for persistence.
- **Styling:** Tailwind CSS + shadcn/ui for chrome (sidebar, toolbar, modals). The timeline canvas itself uses raw CSS/SVG — shadcn doesn't apply there.
- **Deployment:** Vercel, with preview deployments per branch.
- **No external timeline/Gantt libraries** (frappe-gantt, vis-timeline, etc.) — they all bake in assumptions (drag-pan, vertical-scroll, no AI ingestion) that fight us. Build the timeline component from primitives.

---

## 4. The data model (your job to refine)

Existing BOS architecture (already in `docs/superpowers/specs/2026-05-03-lumenary-architecture-design.md`) has these core tables:

- `users` — Helm operators (Ben + future chapter directors)
- `people` — prospects + members + contacts
- `interactions` — touches between operator and people
- `chapters` — geographic chapters (Brickell, Coral Gables, etc.)
- `events` — meetings, retreats, content drops

**Your task:** propose the additional schema needed for Chronos. At minimum:

- `timelines` — a named collection of events with a parent project/scope
- `timeline_events` — individual nodes (date, label, type, parent, source_file, ai_extracted_bool)
- `timeline_event_edges` — relationships between events (causes, depends-on, etc.)
- `ingestion_runs` — audit trail of AI ingestion runs (model used, tokens consumed, files processed, hash)
- `event_extractions` — cached per-file extraction results (file_path, file_hash, extracted_event_ids, model, run_at)

Refine the above. Add fields you think are missing. Specify indexes, constraints, and migration order.

---

## 5. The AI ingestion design (your job to spec)

The ingestion pipeline is the strategic core of Chronos. A great spec for this is what makes the difference between "works" and "wow."

Specify:

1. **Input parsing:** how to walk a project folder, detect markdown vs. other formats, chunk large files for the API.
2. **Extraction prompt:** the exact system prompt + user prompt template for Claude. This must produce structured JSON with strong typing.
3. **Tool definition:** the Anthropic tool-use schema for `extract_timeline_events` — define it in JSON Schema.
4. **Disambiguation:** how the AI handles relative dates ("Q3 2026", "next month", "after Brickell launch") vs. absolute dates. The pipeline must resolve relative references to absolute dates using the project's "anchor date" (configurable; for the BOS, anchor = engagement signing date, defaulting to today if unset).
5. **Confidence scoring:** each extracted event should carry a confidence score; low-confidence events render in the UI with a "review me" indicator.
6. **Conflict resolution:** when AI extracts an event already manually edited in the UI, which wins? Default: manual edit wins, AI flags the discrepancy in a review queue.
7. **Cost discipline:** prompt caching (Anthropic supports it for system prompts and large context blocks). The system prompt + tool schema should be cache-eligible across runs. Estimate per-run token cost for a typical project folder of ~50 markdown files totaling ~100K tokens of content.
8. **Failure modes:** what happens when Claude returns malformed JSON? When the API rate-limits? When a file is too long for context? When the project folder is empty?

---

## 6. The UX spec (your job to design)

Produce a complete UX spec including:

### 6.1 Layout
- Sidebar (left): project list, lane controls, timeline list
- Toolbar (top): zoom controls, time-window jump, ingest button, undo/redo
- Main canvas (center, dominant): the timeline itself
- Inspector (right, collapsible): selected node details, edit form

### 6.2 Keyboard shortcuts
- Wheel: scroll horizontally on time axis (per §2.2)
- Cmd/Ctrl + Wheel: zoom in/out on time axis (recommend or reject — if recommended, define behavior)
- Cmd/Ctrl + F: jump to date / search events by label
- Space + drag: pan (alternate to wheel for trackpad-disabled users)
- Cmd/Ctrl + Z / Shift + Z: undo / redo
- Tab: cycle focus between nodes
- Enter: edit selected node
- Delete: remove selected node (with confirmation)
- Cmd/Ctrl + N: create new event at current time-cursor position

### 6.3 Interactions
- Click a node: select + open inspector
- Double-click a node: inline edit label
- Drag a node horizontally: change its date (with snap-to-grid at the current zoom level)
- Drag from a node's edge handle to another node: create relationship edge
- Right-click: context menu (delete, change type, link to file, etc.)

### 6.4 Loading and ingestion UX
- The ingestion process is async and may take 30s–5min depending on project size. Show progress (e.g., "Processing file 12 of 47" + token count).
- Ingestion runs in the background; user can keep editing existing events while extraction runs.
- New events from ingestion appear with a subtle entrance animation + "AI suggested" badge until acknowledged.

### 6.5 Empty states
- No project selected: gentle prompt to create a new timeline or ingest from folder.
- Project ingested, no events found: explainer ("Your project doesn't appear to contain dated events. Try adding a markdown file with `## Date: 2026-06-15` headers, or create events manually.").
- Project loading: skeleton loader with the time axis visible but empty.

### 6.6 Accessibility
- Full keyboard navigation (per shortcuts above)
- ARIA labels on every node
- Screen reader announces time-axis context ("June 2026, Brickell chapter launch milestone")
- Reduced-motion mode disables animations
- Color contrast meets WCAG AA at minimum

---

## 7. The MVP scope (your job to define)

Be ruthless. The MVP is what I can build in **2 weeks of focused part-time work** alongside operating the Tribe. Feature-creep this and I never ship.

Recommend:
- What's IN the MVP (must-have for first usable version)
- What's IN Phase 2 (nice-to-have, post-launch)
- What's IN Phase 3 (long-term, productization)

I want a **demoable MVP** that can:
1. Ingest the existing `docs/research/00-evidence-binder.md` §4 Miami Launch Sequence
2. Render it as a horizontal scrollable timeline
3. Let me edit a node and have the change persist
4. Look polished enough to show the Tribe founders as a "this is what's coming" preview

---

## 8. Build sequence (your job to plan)

Produce a **week-by-week build plan for the MVP** with:
- Concrete deliverables per week
- Integration testing checkpoints
- A "if I only have 1 week" fallback scope (which features can be cut if I'm time-pressured)

---

## 9. Specific risks and edge cases (your job to enumerate)

I want a list of at least **15 risks/edge cases** with proposed mitigations. Examples to seed your thinking (don't limit to these):

- Mouse-wheel-as-horizontal-scroll fights with users' muscle memory
- Trackpad inertial scrolling causes overshoot
- AI ingestion produces events with conflicting dates
- Two users edit the same timeline concurrently (collaboration is out of MVP scope but the schema should not preclude it)
- Performance: 1,000+ events on a single timeline canvas
- Time-zone handling for events with timestamps
- Daylight-saving boundary events
- Markdown source files renamed or moved
- AI hallucinated events (the binder verification agent already proved Claude hallucinates citations)
- Cost runaway on AI ingestion of large project folders

---

## 10. Cost estimate (your job to compute)

Estimate:
- Vercel hosting (Hobby vs. Pro tier; storage/bandwidth/function-invocation costs)
- Postgres on Vercel (Neon free tier vs. paid; compute hours; storage GB)
- Anthropic Claude API (per-ingestion cost for a typical 100K-token project; per-month if I ingest weekly; cost of caching enabled vs. disabled)
- Total estimated monthly run-cost for me as the only user
- Total estimated dev time in part-time hours to ship MVP

---

## 11. What you should explicitly NOT do

- Do not propose using a third-party timeline library (vis-timeline, frappe-gantt, etc.). I want to own the rendering layer.
- Do not propose Vercel Edge Functions for the AI ingestion. Use Fluid Compute (default).
- Do not propose alternate frameworks (Remix, SvelteKit, Astro). Stack is locked at Next.js.
- Do not propose alternate AI providers (OpenAI, Gemini, Llama). Stack is locked at Anthropic.
- Do not bikeshed on color palettes or typography. Tailwind defaults + shadcn defaults are fine for MVP.
- Do not produce code in your response. **This is a design doc, not an implementation.** Code comes from the next AI agent (Antigravity).

---

## 12. Output format I expect from you

A single response document with these sections, in this order:

1. **Executive summary** (1 paragraph)
2. **Architecture overview** (text diagram or ASCII)
3. **Tech stack table** (with justification per choice)
4. **Data model** (full schema with field types, constraints, indexes)
5. **AI ingestion pipeline** (full design including prompt + tool schema)
6. **UX spec** (per §6 above)
7. **Component breakdown** (the React component tree for the MVP)
8. **MVP scope vs. Phase 2 / Phase 3** (three-column table)
9. **Week-by-week build plan** (2-week MVP)
10. **Risks and edge cases** (≥15 with mitigations)
11. **Cost estimate** (per §10)
12. **Open questions for the human** (anything you genuinely could not decide)

Write at the level of a senior staff engineer briefing a competent contractor. Assume the reader knows React/Next.js/Postgres/TypeScript fluently but does NOT know the specific BOS context — provide enough recap so the doc stands alone.

Take your time. Reason through tradeoffs explicitly. The output should be **complete enough that I can hand it to Vercel Antigravity and have it generate working scaffolding code without further design input.**
