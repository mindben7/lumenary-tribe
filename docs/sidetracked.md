---
title: Sidetracked — parked ideas
status: park-and-revisit
purpose: Things Ben wants to come back to but should not derail current focus.
---

# Sidetracked

A holding pen. Items here are not abandoned; they are deliberately deferred so
the current focus stays clean. Each item should grow into its own spec when
the time comes.

## Habit-Stacking Professor skill (Spanish + Business Negotiation)

**Idea:** A custom Claude skill that acts as a daily-cadence professor —
teaching business / negotiation in tandem with Spanish, using habit-stacking
principles (anchor each lesson to existing daily habits like coffee, gym,
commute).

**Feasibility:** Yes — Claude Code supports custom skills (see the
`superpowers:writing-skills` skill). Skill could live under
`~/.claude/skills/` or be plugin-distributed. Would need: lesson library,
spaced-repetition tracking, daily prompt schedule (likely via `/loop` or a
scheduled routine), cross-reference between Spanish vocabulary and business
concepts (e.g., "today's word: *escritura* — also today's term sheet
section").

**Next step when revisited:** Brainstorm scope (which negotiation framework,
which Spanish CEFR level, daily time budget) → write skill spec → implement.

---

## Life Engine (personal capital allocation map)

**Idea:** Ben's private administrative view inside (or alongside) Helm. As
income flows in from tribe chapters, ad management fees, IP royalty, and
other streams, the Life Engine maps where each dollar goes — savings,
reinvestment into the next chapter launch, ad spend, equipment, his own
education, etc. Possibly visualized as a Sankey diagram or interactive
mind-map, where launching a chapter triggers cascading allocation rules.

**Why parked:** This is Ben-only, not tribe-org. It's a personal financial
operating system, not a BOS feature. Should not bleed into Slice 2 (Helm)
because Helm may eventually be used by other chapter leaders.

**Likely home:** A separate private app, or a strictly Ben-scoped namespace
within Helm with hard role-gate. Decide later.

**Next step when revisited:** Brainstorm scope (which inputs, what
visualization, what allocation rules) → spec as its own slice.

---

## Guided Competitor Analysis tool (assisted browsing co-pilot)

**Idea:** A workflow where Claude directs Ben through a research tour —
pointing to specific URLs to investigate, requesting Ben take screen control
for login/captcha-walled pages (LinkedIn Sales Navigator, paid databases,
member portals), then resuming synthesis on what Ben pastes back. Pair-
programming for research.

**Why parked as a tool:** We can already DO this collaboratively right now
for the Monday research push (no tool required). The tool itself —
codifying it as a repeatable BOS feature — is a future Slice 2 (Helm)
addition, not a prerequisite.

**Captured for later:** "Guided Research Mode" in Helm. AI-led tour, human-
assisted data entry, structured capture into the Resources library.

**Next step when revisited:** After we've done a few of these manually,
identify the friction points and spec the tool to remove them.

---

## Spiritual / holistic / alternative-wellness positioning angle

**Idea:** Strong member targeting bias toward entrepreneurs who are
spiritually inclined, value alternative medicine, holistic therapies,
conscious-business practices, and are open to psychedelic-assisted journeys
(psilocybin under licensed facilitators), breath work, plant medicine, and
ritual practice. Differentiates the tribe from BNI/EO/ProVisors which are
religiously neutral / secular-professional.

**Status:** NOT sidetracked — pulled into the Monday research scope as a
required filter. Comparable orgs to study: Conscious Capitalism, Mankind
Project, Sacred Sons, EVRYMAN, Authentic Relating chapters, MAPS-adjacent
professional networks, Florida-specific psychedelic integration circles.

**Why mentioned here:** Captured as a positioning thread that should
eventually have its own brand-positioning spec when we get past Slice 1.

---

## LinkedIn / Sales Navigator integration (Slice 2 Helm — with legal constraint)

**Idea:** A BOS module that captures LinkedIn / Sales Navigator data into
the Resources library and triggers strategy-doc updates as new prospect
data arrives. Ben sees this as central to his unique contribution — a
research-and-action loop that no BNI/EO/ProVisors operator runs today.

**Hard constraint — LinkedIn ToS:**
- LinkedIn explicitly prohibits scraping in its User Agreement
- *HiQ Labs v. LinkedIn* (9th Cir. 2022; SCOTUS denied cert) clarified
  that public-profile scraping is not a CFAA violation, but it remains a
  ToS breach with civil liability and account termination risk
- Sales Navigator scraping is more clearly forbidden than public scraping
- Automated headless-browser scraping of LinkedIn = account termination
  risk + plausible legal exposure for Ben personally

**What's clean:**
- **Manual data entry**: Ben searches Sales Nav, copies findings, the BOS
  structures and acts on what he pasted. Fully ToS-compliant.
- **LinkedIn API (limited)**: very restricted; mostly for posting / OAuth
  identity, not for prospect search at the granularity Sales Nav offers.
- **Apollo, ZoomInfo, Crunchbase** as alternative B2B data sources with
  legitimate APIs — paid, but legal. Worth considering.
- **A "guided collection" pattern**: BOS shows Ben exactly which Sales
  Nav search to run; he runs it; he pastes structured output back; BOS
  ingests. This is the *Guided Research Mode* idea already in this file.

**Next step when revisited:** Slice 2 spec for Helm should include a
"LinkedIn Capture" module that follows the guided-collection pattern, NOT
the scraping pattern. The value Ben pitches to the founders should
emphasize the structured CAPTURE-AND-ACT loop, not "we scrape LinkedIn"
(which would lose credibility with the lawyer founders the moment they
googled it).

---

## Captured BOS requirements (for Slice 2/3 specs, not now)

These are real product requirements Ben surfaced during Slice 1 work. They
are NOT sidetracked in the "abandon" sense — they belong in the eventual
Slice 2 (Helm) and Slice 3 (Tribe Site) feature specs. Captured here so
they don't get lost while we focus on Monday research.

### Category-locked payment flow (Slice 3)
At checkout, member must declare profession/category. If that category is
already filled in the requested chapter (per the BNI-style "one per
category" rule we'll validate in Monday research), the system either:
(a) blocks payment with a "this category is full — choose another chapter"
flow, (b) waitlists them, or (c) routes them to the nearest chapter where
the category is open. Specific behavior to be designed in Slice 3 spec.
This enforces composition rules at the moneyline — the most reliable
enforcement point.

### Payment + escrow integration (Slice 3)
Architecture says "Stripe via Vercel Marketplace" by default. Open question:
do we need a true escrow layer (e.g., for chapter-launch pre-pay scenarios,
or for refund-on-failed-launch member protection)? Most networking orgs
use plain Stripe + a clear refund policy. Escrow only adds value if we're
doing committed pre-launch fundraising. Default: Stripe. Reconsider if
membership pricing strategy includes pre-launch chapter cohort funding.

### Lead pipeline as a first-class CRM view (Slice 2 Helm)
The `people` + `interactions` data already supports this; what's needed
is the UI: kanban-style board showing prospect → discovery call →
applicant → paid → active, with filters by source (chamber, referral,
web, event) and chapter assignment. Replaces a HubSpot/Salesforce setup
for Ben's day-to-day. Should be the *default* Helm landing screen.

---

## Affinity sub-groups — rollerblading, embodied movement, journey circles

**Idea:** Beyond traditional networking meetings, the tribe should host
**affinity-based recurring activities** that draw the same kind of
spiritually-curious, alternative-wellness-aligned professionals. First
example: **rollerblading groups** — Ben has identified this as a strong
filter for like-minded, interesting minds. Other candidates: breath-work
sessions, sound baths, ice baths, journey integration circles, hiking
trips, surfing meetups.

**Why this matters strategically:** affinity groups are a *softer entry
point* than a paid networking meeting. People show up for the activity,
discover they're around their kind of people, then convert to paying
membership. Lower-friction acquisition funnel + stronger retention because
the bond is deeper than transactional referrals.

**Research note:** Monday research should include a quick scan of which
professions correlate with openness to psychedelic-assisted therapy,
breath work, and embodied practice (likely: tech founders, creatives,
therapists, integrative health practitioners, modern-spirituality
entrepreneurs). This narrows the targeting filter.

**Next step when revisited:** After Slice 1 ships, spec "Affinity Groups"
as a Tribe Site (Slice 3) feature — public events calendar, RSVP, light-
weight membership-adjacent funnel.
