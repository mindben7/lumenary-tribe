---
title: Sales Navigator Search Script — D4 Verification Pass
date: 2026-05-03
purpose: Replace D4 public-source proxies with Sales Nav verified headcounts before tomorrow's founder pitch
runtime estimate: ~45–60 min for full execution
---

# How to use this script

1. Open Sales Navigator → **Lead Search** (not Account Search)
2. Set the filters in each row exactly as written
3. Record only the **total result count** shown at the top of the results page (e.g. "247 results")
4. Paste back to me as `1. 247`, `2. 89`, `3. 412`, etc. — one number per line, in order
5. **Do not browse profiles.** Counts only. Profile spelunking burns time.
6. If a search returns "10,000+" (Sales Nav's max display), record it as `1. 10000+`

**Important framing for the binder:** these counts represent *LinkedIn-indexed professionals*, which proxies pool size. They are not a census. The binder will phrase it as "Sales Nav indexed N members with [title] in [seniority] across the metro." This is bulletproof.

---

# Phase 1 — Metro Profession Headcounts (must-do, ~25 min)

For ALL Phase 1 searches, set these constants once:

- **Geography:** `Greater Miami Area` (Sales Nav's standard metro label — covers Miami-Dade, Broward, Palm Beach)
- **Seniority Level:** `Owner` + `Partner` + `CXO` + `VP` + `Director` (decision-makers — enforces the 75% principal rule from D2)

Then change only the **Title** filter for each row.

| # | Title filter (use OR between terms) | Maps to D2 seat # |
|---|---|---|
| 1 | `CPA` OR `Certified Public Accountant` | #1 |
| 2 | `Estate Planning Attorney` OR `Trusts and Estates Attorney` | #2 |
| 3 | `Business Attorney` OR `Corporate Attorney` OR `M&A Attorney` | #3 |
| 4 | `Real Estate Attorney` OR `Commercial Real Estate Attorney` | #4 |
| 5 | `Wealth Manager` OR `Private Wealth Advisor` OR `Wealth Advisor` | #5 |
| 6 | `Life Insurance Broker` OR `Estate Planning Insurance` OR `Premium Finance` | #6 |
| 7 | `Commercial Insurance Broker` OR `Commercial P&C` OR `Property and Casualty Broker` | #7 |
| 8 | `Commercial Real Estate Broker` OR `Investment Sales Broker` OR `Tenant Representative` | #8 |
| 9 | `Private Banker` OR `Commercial Lender` OR `SBA Lender` | #10 |
| 10 | `M&A Advisor` OR `Business Broker` OR `Mergers and Acquisitions Advisor` | #12 |
| 11 | `Family Law Attorney` OR `Divorce Attorney` | #13 |
| 12 | `Immigration Attorney` OR `EB-5 Attorney` OR `Investor Visa Attorney` | #14 |
| 13 | `Private Equity` (with Seniority = Partner, Principal, MD only) | #15 |
| 14 | `Family Office` (with Seniority = Partner, Principal, MD only) | #15 |
| 15 | `Fractional CFO` OR `CFO Services` OR `Outsourced CFO` | #16 |

**Phase 1 paste-back format:**
```
1. [number]
2. [number]
...
15. [number]
```

---

# Phase 2 — Brickell + Coral Gables Zone Spot Checks (if time, ~15 min)

These confirm Year-1 launch density per zone. For each row, KEEP the Phase 1 seniority filter, but ADD:

- **Postal Code:** the ZIP listed
- **Within:** `5 miles` radius

(Remove the metro Geography filter when adding postal code — they conflict.)

| # | Title filter | Postal Code | Zone | Maps to |
|---|---|---|---|---|
| 16 | `CPA` OR `Certified Public Accountant` | `33131` | Brickell | #1 |
| 17 | `Business Attorney` OR `Corporate Attorney` OR `M&A Attorney` | `33131` | Brickell | #3 |
| 18 | `Wealth Manager` OR `Private Wealth Advisor` | `33131` | Brickell | #5 |
| 19 | `Commercial Real Estate Broker` OR `Investment Sales Broker` | `33131` | Brickell | #8 |
| 20 | `Private Banker` OR `Commercial Lender` | `33131` | Brickell | #10 |
| 21 | `CPA` OR `Certified Public Accountant` | `33134` | Coral Gables | #1 |
| 22 | `Business Attorney` OR `Corporate Attorney` OR `M&A Attorney` | `33134` | Coral Gables | #3 |
| 23 | `Wealth Manager` OR `Private Wealth Advisor` | `33134` | Coral Gables | #5 |
| 24 | `Commercial Real Estate Broker` OR `Investment Sales Broker` | `33134` | Coral Gables | #8 |
| 25 | `Private Banker` OR `Commercial Lender` | `33134` | Coral Gables | #10 |

---

# Phase 3 — Composition Sanity Check (if extra time, ~3 min)

| # | Filter | Purpose |
|---|---|---|
| 26 | Geography: Greater Miami Area, Seniority: Owner + Partner + CXO + Founder, **no title filter** | Total decision-maker pool in metro — denominator for persona-density math |

---

# Time-box discipline

- **0–25 min:** Phase 1 (15 searches, metro counts)
- **25–40 min:** Phase 2 (10 zone searches) — skip if Phase 1 ran long
- **40–43 min:** Phase 3 (single denominator search)
- **Stop at 60 min regardless.** We have a binder to review and stats to memorize.

If a filter doesn't behave as expected (e.g., title syntax issues), DON'T spend more than 90 seconds debugging — record `?` for that row and move on. We synthesize at the end.
