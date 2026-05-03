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

**PRIORITY UPGRADE — 2026-05-03:** Ben purchased a Sales Navigator
quarterly subscription on 2026-05-03 (~$300, active through ~2026-08-03).
He plans active daily use for prospecting over the full 90-day window.
This moves the "LinkedIn Capture" module from a hypothetical future
feature to a **near-term Q3 build**: by ~mid-June we should have at least
a v0 of the guided-collection workflow live so Ben's daily Sales Nav
sessions feed the BOS instead of dying in his head or in scattered notes.

**Concrete v0 scope** (when revisited post-pitch):
- A `prospects` table seeded by paste-in (one Sales Nav profile per row,
  pasted from the right-rail profile view)
- A "today's targets" view that suggests which Sales Nav searches Ben
  should run based on chapter composition gaps
- Tag the prospect with: source (search query name), chapter intent
  (Brickell/Gables/Aventura), seat #, and outreach status
- Daily cadence: Ben spends 30 min in Sales Nav, the BOS captures and
  reminds him of follow-ups
- This is a wedge for the broader Helm CRM — not a standalone tool

### Daily Homework Loop — explicit workflow spec (added 2026-05-03)

Ben surfaced this requirement mid-Sales-Nav-execution: he wants a daily
checklist that tells him exactly who/how-many to connect with each day,
and an EOD recap loop that updates tomorrow's target.

**Morning (≤2 min, BOS-generated):**
- "Today's targets" card with breakdown by seat category, e.g.:
  - 8 CPA partners (Brickell/Gables priority)
  - 5 Estate Planning Attorneys
  - 4 Commercial RE Brokers
  - 3 Wealth Managers
  - **Total: 20 connection requests** (under LinkedIn's safe ~21/day)
- Each line links to a pre-built Sales Nav search URL (no Ben thinking
  required to find the right query)
- Each line has a connection-request template per category (one-line
  hook + opener; Ben edits to personalize)

**Daily execution:**
- Ben opens Sales Nav from the link, sends connection requests, marks
  each in the BOS as sent
- Time budget: 30 min/day for the full daily homework

**End of day (≤3 min, Ben-driven):**
- Ben paste-confirms completions: "Sent 18 of 20. 6 already accepted.
  1 reply. 1 booked discovery call."
- Optionally: paste profile URLs/names for each accept so the prospect
  enters the `people` table for follow-up automation

**BOS recomputation:**
- Recompute remaining-days × needed-members to keep Brickell on track
  for Month-12 target of 25 paid members
- Adjust tomorrow's target distribution (e.g., if CPAs are accepting
  faster than estate attorneys, shift tomorrow's mix)
- Surface red flags: "you're 3 days behind pace on Wealth Managers"

**No external API needed.**
- LinkedIn's official API doesn't expose connection-status data anyway
- Apollo/ZoomInfo APIs ($50–200/mo) pull a different dataset — only
  worth it if Ben wants to ENRICH (find emails, phones, intent signals)
  for prospects already identified via Sales Nav. Defer this decision.
- The minimum-viable loop is: Postgres `prospects` + `connection_actions`
  tables + a small Next.js page. Cost: $0 incremental.

**Reporting Ben needs back:**
- Weekly: pace vs. plan per category, accept rate per category, call
  conversion rate per category
- Monthly: revenue forecast based on current funnel velocity + chapter
  target gap analysis

**Why this matters for the founder pitch tomorrow:**
This loop is one of the concrete BOS features that justifies hiring Ben
vs. a generalist social media person. He should mention it as a *Helm
v0.2 capability* rather than promising it day-one — credibility before
delivery.

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

## Interactive territory-mapping module (Helm / BOS feature)

**Idea:** A custom interactive map inside the BOS that lets Ben define
*territories* — geographic catchment areas as center-point + radius (or
polygon) — and plot prospects/members within them. Each pin represents a
person from the LinkedIn outreach pipeline (or ingested from Sales Nav
exports). Layer filters: profession, seniority, chapter assignment,
referral source, last-touch date. Use cases:
- **Targeting view**: show density of "Accomplished Seeker" prospects per
  ZIP / radius before launching a new chapter
- **Chapter coverage view**: visualize where current Brickell members live
  vs. where the chapter's pull radius actually reaches
- **Expansion planning**: paint a 5-mile geofence around a candidate
  venue, count prospects inside, score the zone
- **Coach-up tool for chapter leaders**: heatmap of underserved ZIPs

**Professional terms in this space:**
- *Territory mapping / sales territory design* (the umbrella discipline)
- *Geofencing* (radius/polygon-based catchment definition)
- *Heatmap visualization* (prospect-density rendering)
- *TAM (Total Addressable Market) mapping* (the strategic frame)
- *Site selection analytics* (for picking chapter-launch venues)

**Tools to study before building:** Maptive, Badger Maps, Geopointe,
Salesforce Maps, ZoomInfo Territory Planning, Mapbox Studio (build-your-
own), Felt (collaborative mapping). For Florida-specific demographic
overlays: Esri ArcGIS Business Analyst, Census Reporter, Placer.ai.

**Why parked:** This is a Slice 2 (Helm) or Slice 3 (Tribe Site) feature.
It is a multi-day build (geocoding pipeline, map UI, prospect data model,
auth) and is not on the critical path for tomorrow's founder pitch. The
binder + Sales Nav verification pass IS the critical path. Sales Nav
itself has a built-in map view for current targeting needs.

**Already referenced in founding vision:** Ben's 2026-05-02 brain dump
explicitly mentioned "a simple map with whatever API or whatever that we
create to show the different groups geographically, to help us understand
what this group would look like on a larger scale." This idea has been
load-bearing from day one — it is a *feature*, not a tangent.

**Next step when revisited:** After founder engagement is signed, spec
"Territory Map" as a Helm module. Decide: native build (Mapbox + Postgres
+ PostGIS) vs. integrated (Maptive embed, Felt embed). Define prospect
data model first (people + interactions tables already exist per
architecture spec) — the map is a view layer over that.

---

## Horizontal-scroll AI-generated timeline mind-map ("Chronos view")

**Idea:** A view inside the BOS that takes any structured content (a
strategy doc, a launch plan, a campaign, a research binder) and
auto-generates an **interactive horizontal timeline** where the x-axis
is time. Behavior:

- **Mouse-wheel** scrolls horizontally (wheel down → forward in time;
  wheel up → backward). Non-standard UX but reduces friction vs.
  click-and-drag panning.
- **Mind-map-style nodes** placed at their respective time positions;
  related nodes connected by edges (cause/effect, depends-on, etc.)
- **Zoom levels:** decade → year → quarter → month → week, all on the
  same continuous axis (think Google Maps zoom but for time)
- **AI ingestion:** point Chronos at a project folder (or a single doc),
  it extracts events with dates/sequence, generates the timeline JSON,
  renders. Powered by Claude API with a structured event-extraction
  prompt.

**Use cases inside the BOS:**
- Render the §4 Miami Launch Sequence (chapters, override windows,
  retreats) as an interactive 36-month timeline
- Member-acquisition cohort tracking (who joined when, who churned when,
  funnel velocity over time)
- Ad campaign sequencing (Meta/LinkedIn campaigns mapped to chapter
  launch dates)
- Personal/Life Engine timeline (deferred to Ben's private namespace)

**Closest existing tools (none match all three: horizontal-scroll +
mind-map + AI auto-generation):**
- Tiki-Toki — commercial interactive web timelines; no AI ingestion
- Aeon Timeline — desktop app, $59, novelist-focused; no AI; no MW scroll
- Heptabase — spatial canvas; can lay out timeline-like but not native
- Knight Lab TimelineJS — free, slide-based, embeds in articles
- Miro / FigJam — infinite canvas with timeline templates, manual
- Notion timeline view — list/table-based, not visual mind-map

**Build estimate (when revisited post-pitch):** 1–2 weeks for a v0:
- Tech stack: Next.js + d3.js (or react-flow for nodes/edges) + Claude
  API (ingestion + event extraction)
- Data model: `events` table with `(id, label, start_date, end_date?,
  type, parent_id?, metadata)` — fits naturally alongside the existing
  `people` and `interactions` tables in the architecture spec
- Renderer: SVG or canvas; horizontal scroll handler converts wheel
  events to translateX
- AI prompt: "Extract events from the following project content. For
  each event provide: label, date (or date range), type (milestone,
  campaign, content piece, member-touch, etc.), and parent event if
  applicable. Return JSON."

**Why parked:** Cool, useful, novel — and explicitly NOT on the path to
tomorrow's founder pitch. The §4 launch sequence already exists in
table form; rendering it as Chronos is a delight upgrade, not a
deliverable upgrade. Belongs in Slice 2 (Helm) v0.3+ as the
"strategy visualization" feature. May also become a marketable feature
of the BOS itself in Slice 4 (productized BOS).

---

## Florida licensed-professional database integration (Slice 2 Helm)

**Idea:** The BOS automatically pulls from public Florida license databases
to seed and enrich the prospect database with verified, ToS-clean,
authoritative data that LinkedIn cannot match. None of BNI, EO, ProVisors,
Vistage, or Tiger 21 currently does this. Strong differentiator.

**Public databases to integrate (all free, public records):**
- **Florida DBPR** — myfloridalicense.com — CPAs, real estate brokers,
  contractors, cosmetologists, etc. Searchable by name, license type,
  county, ZIP. Returns exact licensee counts.
- **The Florida Bar** — floridabar.org/directories/find-mbr — attorney
  directory searchable by city + practice area. Returns Bar number,
  firm affiliation, status, practice area tags.
- **Florida DFS** — myfloridacfo.com — insurance agent license search;
  P&C, life, health licensees by appointment company and county.
- **FINRA BrokerCheck** — brokercheck.finra.org — broker-dealer reps and
  firms; disciplinary history; CRD numbers.
- **SEC IAPD** — adviserinfo.sec.gov — registered investment advisers and
  IAR (investment adviser representative) records.
- **Florida DOH** — flhealthsource.gov — physicians, dentists, ARNPs,
  PAs licensee search.

**Use cases:**
- **True TAM denominator:** "of the 11,400 licensed CPAs in Miami-Dade,
  Sales Nav indexes 139 at decision-maker level — we're targeting the
  top 1.2% of the licensed pool." This number is more credible than
  Sales Nav alone.
- **Verification:** before extending a Tribe membership offer, confirm
  the prospect's license is active and in good standing (no
  disciplinary action). Founders will love this — it's professional
  due diligence at the moneyline.
- **Enrichment:** auto-populate firm affiliation, practice area, license
  vintage. Saves Ben manual research time per prospect.
- **Outreach prioritization:** flag CPAs whose license vintage is
  10–25 years (sweet spot for "founding partner" career stage that
  matches the Accomplished Seeker persona).

**Technical pattern:**
- Most of these databases are JS-rendered or use POST forms. Direct
  scraping is harder than LinkedIn but legally clean.
- Best path: partner with a data vendor that already aggregates these
  (e.g., License Lookup APIs, ProPublica Nonprofit Explorer for org
  data). Search market post-pitch.
- Alternative: lightweight Playwright scripts (server-side) hitting
  each database's public search form; cache results aggressively.

**Tonight's binder use:**
- Don't pull these tonight. Sales Nav data is sufficient for the
  founder pitch with proper framing.
- Phase-2 binder (week-of-engagement): add license-database
  cross-checks for top 5 professions to compute "Sales Nav coverage %
  of licensed pool" stat. This is a sophisticated number that
  differentiates Ben from a generic social-media hire.

**Why parked tonight:** Each database has its own search form, captcha,
and rate limit. Implementing in 60 min is impossible. The methodology is
a Phase-2 binder enhancement, not a Slice-1 deliverable.

---

## Sales Nav title-variant expansion (binder methodology refinement)

**Idea:** The current Sales Nav search script uses 1–3 title variants
per profession. Real practitioners use 5–15 variants. Expanding the
title-variant list per row would 2–5x the indexed count per profession
and produce more accurate cross-row comparisons.

**Example expansion for Estate Planning Attorney (row 2):**
Current: `Estate Planning Attorney`, `Trusts and Estates Attorney`
Expanded: + `Probate Attorney`, `Wills and Trusts Attorney`, `Estate
Planning Counsel`, `Estate Planning Lawyer`, `Tax and Estate Attorney`,
`Trust Officer`, `Fiduciary Officer`, `T&E Attorney`, `Estate & Probate
Attorney`

**Why parked tonight:** Methodology must be locked across all 15 rows
for cross-comparison to work. Expanding mid-stream means re-running
rows 1–2 plus expanding the script for rows 3–15 = ~15–20 min cost
during a tight time-box. Tonight's binder explicitly frames the data
as "exact-title indexed counts" with the systematic undercount
documented as a methodology footnote.

**When revisited (Phase-2 binder, ~week of engagement):**
- Build a comprehensive title-variant taxonomy per profession (one
  source of truth) — store in `docs/research/title-variants.md`
- Re-run all 15 Sales Nav searches with full variant lists
- Cross-check against license-database true counts (see preceding
  sidetracked entry)
- Update binder D4 with the upgraded numbers
- Use the comparative ratio (exact-title : full-variant : licensed)
  as a methodological footnote — demonstrates rigor

---

## Reverse-engineer Swoopa's subscription/pricing model

**Reference:** https://getswoopa.com/subscription-options/

**Idea:** Eventually study Swoopa's subscription tier structure as a model
for how the BOS could package its own subscription options (member tiers,
chapter-leader tiers, add-ons, retreat pricing, etc.). What to extract:
- Tier composition (what's bundled at each level, where the upsell breaks live)
- Pricing anchors and decoy/middle-tier psychology
- Annual vs. monthly framing
- Add-on / a-la-carte mechanics
- Trial / founder / loyalty pricing patterns
- Checkout flow, social proof, and friction reduction tactics

**Why parked:** Pricing recommendation for the founder pitch is already
locked at $1,500 Founders / $1,800 Members (binder §3) — anchored on
direct competitor benchmarks (BNI, ProVisors, EO, Vistage, Tiger 21), not
on Swoopa. Swoopa is interesting as a *packaging* model for Slice 3 (Tribe
Site checkout) and future tier expansion, not as input to Slice 1.

**Next step when revisited:** After Slice 1 ships, scrape the public
Swoopa subscription page, decompose the tier structure, and feed it into
the Slice 3 (Tribe Site) checkout-design spec.

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
