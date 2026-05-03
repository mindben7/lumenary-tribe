---
title: Luminary Tribe BOS — Architecture & Data Spine Design
date: 2026-05-03
status: approved (architecture only); per-slice feature specs follow
parent: docs/00-founding-vision.md
slice_scope: Slice 2 (Helm) + Slice 3 (Tribe Site & Platform). Slice 1 (founder pitch) specced separately. Slices 4–5 deferred.
---

# Architecture & Data Spine

This document locks the architectural foundation that Slice 2 (Helm) and Slice 3
(Tribe Site & Platform) share. Per-slice feature specs are written separately
and inherit decisions from this document. If a feature spec contradicts this
file, this file wins unless the feature spec explicitly amends it.

## Naming conventions used in this document

- **Working project name:** "Luminary Tribe BOS." The actual tribe organization's
  legal/brand name is not yet confirmed by Ben — see Open Questions.
- **Helm:** Slice 2, the operator command center. Single-user (Ben), private,
  optimized for speed of iteration over polish.
- **Tribe Site:** Slice 3, the public website + post-enrollment member platform.
  Public funnel + authed `/member/*` surface. Polished, tracked, SEO/AEO tuned.
- **Person vs. User:** see §3 Data Model. They are not the same.

## 1. Decisions log (what is locked)

| # | Decision | Rationale |
|---|---|---|
| D1 | Two apps, one shared Postgres | User chose option (2). Different design languages, deploy cadences, tracking weights. Shared DB avoids sync bugs. |
| D2 | Turborepo monorepo (Approach A) | Single source of truth for schema; cross-app refactors stay coherent; Vercel deploys each app to its own project natively. |
| D3 | Next.js 16 App Router for both apps | Ben's existing muscle memory; Server Components reduce client-side weight on the public site; PPR/Cache Components are native. |
| D4 | Drizzle ORM | Lighter, more typesafe than Prisma; plays well with shared `packages/db`. |
| D5 | Neon Postgres via Vercel Marketplace | Auto-provisioned env vars; per-PR DB branching; single bill on Vercel invoice; free tier covers Slice 2 entirely. |
| D6 | Clerk via Vercel Marketplace for auth | Same auto-provisioning; multi-org built-in (one org per chapter); free tier covers ~10K MAU. |
| D7 | shadcn/ui (selectively shared) | Move fast, look modern; share only what's truly shared in `packages/ui`. |
| D8 | AI SDK v6 + Vercel AI Gateway | One key, swap models without code changes. Tiered model use enforced in `packages/ai`. |
| D9 | Vercel Blob for assets, Mux for video | Blob for raw uploads + small media; Mux when reels/long-form streaming is wired. |
| D10 | WhatsApp stays as the comm spine | Founders' unanimous choice. We do NOT replace it. We may *integrate* later via the host bot. |

## 2. Repo layout

```
luminary-tribe/
├── apps/
│   ├── helm/                    # Slice 2: operator command center
│   └── tribe-site/              # Slice 3: public funnel + member platform
├── packages/
│   ├── db/                      # Drizzle schema, migrations, typed client
│   ├── ui/                      # shared shadcn primitives (only what's truly shared)
│   ├── ai/                      # AI Gateway client + prompt library + tiered models
│   └── tracking/                # pixel/UTM helpers (consumed by tribe-site)
├── docs/
│   ├── 00-founding-vision.md
│   └── superpowers/specs/
├── turbo.json
└── package.json (workspaces)
```

Each `apps/*` has its own `vercel.json` (or `vercel.ts`) and deploys to its own
Vercel project from the same repo. Migrations run from `packages/db` only.

## 3. Data model spine

The tables below are the day-one core. Indexes and constraint details are
deferred to the implementation plan.

### `people`
Anyone in the orbit, regardless of whether they ever log in.
- `id`, `name`, `email`, `phone`
- `status` ∈ `prospect | applicant | active | paused | alumnus`
- `source` ∈ `chamber | referral | web | event | other` (extensible)
- `assigned_chapter_id` (nullable; for funnel routing)
- `ben_notes` (text, private, Helm-only)
- `created_at`, `updated_at`

### `chapters`
A geographic/regional tribe group.
- `id`, `name`, `region`
- `leader_user_id` (nullable until a leader is assigned)
- `capacity_target` (the "ideal number" Ben referenced — to be researched)
- `location_meta` (JSON: lat/lng, venue, day-of-week)

### `memberships`
Time-bounded relationship between a person and a chapter. A person can have
many memberships over their lifetime.
- `id`, `person_id`, `chapter_id`
- `tier`, `price_paid`, `started_on`, `ended_on`
- `status` ∈ `active | paused | ended`

### `interactions`
Every touchpoint. Critical for Helm's CRM purpose.
- `id`, `person_id`, `type` (note | call | email | whatsapp | meeting | event_attendance)
- `summary`, `occurred_at`, `recorded_by` (user_id), `channel`

### `content_items`
The content production pipeline (replaces Asana for content work).
- `id`, `kind` (reel | interview | longform | ai_explainer | blog | carousel)
- `status` ∈ `idea | scripting | filming | editing | scheduled | published | archived`
- `due_date`, `owner` (user_id)
- `person_subject_id` (nullable; for member-feature content)
- `platforms_published` (JSON: which platforms it's live on)
- `asset_urls` (JSON; pointers into Blob/Mux)

### `resources`
The BOS-as-resource library: SEO/AEO playbooks, ads strategies, checklists.
- `id`, `category`, `title`, `body_md`
- `last_reviewed`, `surface` ∈ `helm | tribe-site | both`

### `events`
Real-world tribe events, eventually with RSVPs.
- `id`, `chapter_id`, `kind`, `occurs_at`, `location`, `capacity`, `signups_count`

### `users`
Humans who log in. Linked to Clerk; linked optionally to a `people` row.
- `id`, `clerk_id`, `role`, `default_chapter_id`, `linked_person_id` (nullable)

**Critical separation:** `people` ≠ `users`. A Chamber prospect Ben logs in Helm
exists as a `people` row long before they have a `users` row. When a person
enrolls on the Tribe Site and creates a Clerk account, we link `users.linked_person_id`
to the existing `people.id` — no duplication, no merge bugs.

## 4. Auth model

- One Clerk app, two app deployments share the session.
- **Helm**: invite-only. Ben is the sole admin. Future: chapter leaders join an
  "operators" Clerk Organization with `role = leader`.
- **Tribe Site**: public visitors browse without auth; enrollment creates a
  Clerk user; members are added to a per-chapter Clerk Organization.
- Authorization in code: thin `requireRole()` helper in `packages/db` reads
  the Clerk session and checks `users.role`.
- Cross-chapter members are supported by Clerk's multi-org membership.

## 5. Hosting & deploys

- **Vercel Project A — Helm**: only Ben whitelisted (Vercel password protection
  + Clerk auth gate as defense in depth).
- **Vercel Project B — Tribe Site**: public; `proxy.ts` (Next.js 16) gates
  `/member/*` routes; PPR / Cache Components for the public funnel pages.
- **Neon Postgres**: branching on. Each PR preview deploy gets its own DB branch;
  merging to main fast-forwards the trunk branch.
- **Vercel Blob**: member uploads + content masters.
- **Mux**: video streaming (deferred until first reel/long-form ships).
- **Cron**: Vercel cron for nightly rollups, abandoned-form recovery emails,
  scheduled host-bot WhatsApp posts.

## 6. AI strategy (architectural surface only)

- All LLM calls route through `packages/ai`.
- Single Vercel AI Gateway key in env across both apps.
- Three named tiers exposed by `packages/ai`:
  - `cheap` → Haiku 4.5 (classification, high-volume bot replies)
  - `default` → Sonnet 4.6 (most generation, summarization, drafting)
  - `deep` → Opus 4.7 (long-form scripts, strategic summaries, content pillars)
- Tiered selection is the *bot's* equivalent of the model-switching discipline
  Ben applies to me. Burning Opus on a WhatsApp greeting is forbidden.
- WhatsApp host-bot implementation deferred to Slice 3. Likely consumed via
  Vercel's chat-sdk package (multi-platform from one codebase).

## 7. Error handling & testing (principles only; details per slice)

- All boundary inputs validated with Zod schemas at the route handler / server
  action layer. No untyped data crosses a boundary.
- Database errors and external-API errors surface as typed `Result<T, E>`
  unions in service modules; UI components receive structured error shapes.
- Smoke tests for every public route on both apps (just verify 2xx + key text).
- Unit tests scoped to `packages/db` query helpers and `packages/ai` tier
  routing. Per-slice specs add their own test plans.
- Sentry (or equivalent) wired to both Vercel projects from day one for
  production observability.

## 8. Open questions (must resolve before / during implementation)

| # | Question | Blocks |
|---|---|---|
| Q1 | What is the tribe organization's actual brand/legal name? | Slice 1 deck wording, Slice 3 marketing copy, repo branding |
| Q2 | When is the founders meeting? Who's in the room? | Slice 1 timeline, deck tone |
| Q3 | What has Ben already verbally committed to the founders? | Slice 1 scope alignment |
| Q4 | Current chapter count, locations, leaders, member counts? | Chapter map, capacity targets |
| Q5 | Confirmed membership pricing tiers? Currently $750/yr — is that flat or tiered? | Pricing modeling, Slice 3 enrollment flow |
| Q6 | Budget Ben is asking for vs. budget founders expect to pay? | Slice 1 deal structure |
| Q7 | What's the "ideal number" of men per group, per Ben's research? | `chapters.capacity_target` |
| Q8 | WhatsApp Cloud API access — does the org already have it, or do we provision? | Host-bot timeline |

## 9. Out of scope for this document

- Per-slice feature lists (live in their own specs)
- UI mockups (live alongside the slice they belong to)
- Marketing copy
- Slice 4 (folded into Slice 3)
- Slice 5 (deferred indefinitely)
