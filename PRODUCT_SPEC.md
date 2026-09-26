# My Car — Product Spec

Status: **Phase 1 — specification complete, not yet implemented.** Items marked
**[to validate]** are assumptions about the Uzbekistan market that need confirmation with real
users. Section 8 lists the decisions that are still open.

| Detail | Where |
|---|---|
| User journey, navigation, returning user | [docs/user-flows/core-journey.md](docs/user-flows/core-journey.md) |
| Empty and error states | [docs/user-flows/states.md](docs/user-flows/states.md) |
| User stories + acceptance criteria | [docs/user-stories.md](docs/user-stories.md) |
| Business rules and formulas | [docs/business-rules/](docs/business-rules/README.md) |

## 1. Product principle

> **Know your car. Know what it costs. Never miss maintenance.**

Every MVP feature exists to answer one of three questions:

| Question | Answered by |
|---|---|
| 1. How much is my car costing me? | Fuel, Expenses, Dashboard monthly cost, Analytics (monthly, categories, cost per km) |
| 2. What maintenance is coming next? | Maintenance plans, Documents, Reminders, Dashboard status and upcoming list |
| 3. What happened to my car historically? | History timeline, maintenance records, fuel history |

A feature that answers none of them does not belong in the MVP.

## 2. Market and locale

| Aspect | Decision |
|---|---|
| Market | Uzbekistan |
| Platform | Android first; iOS kept buildable, not a launch target |
| Languages | **Uzbek (Latin) — default**, Russian, English. Uzbek is preselected at first launch; the user can change it at any time |
| Currency | **UZS (soʻm)**, whole units only. No multi-currency in the MVP |
| Units | Kilometres; litres, m³ (methane) or kWh depending on fuel (FUEL-1) |
| Formats | `1 250 000 soʻm` · `12 500 km` · `26.09.2026` |
| Time | Device local date; Uzbekistan is UTC+5 with no DST (GEN-5) |

## 3. Users

**Primary:** a private owner of one or a few cars who pays for fuel, service and documents
personally and wants control over costs and deadlines.

**Not targeted by the MVP:** fleets, taxi companies, dealerships, mechanics.

## 4. MVP scope

| Area | MVP capabilities | Stories |
|---|---|---|
| Onboarding | Language, welcome, first vehicle, suggested maintenance, key documents | ONB-S1…4 |
| Vehicle | Create, edit, archive, delete; multiple vehicles with one selected | VEH-S1…5 |
| Fuel | Add, edit, delete; fuel history; price per unit; consumption (full-tank method) | FUEL-S1…4 |
| Expenses | Add, edit, delete; fixed categories; monthly totals | EXP-S1…4 |
| Maintenance | Records; plans with mileage- and date-based due; status | MNT-S1…5 |
| Odometer | Manual updates; validation shared by all records | via ODO rules |
| Documents | Add, renew; expiry date; status; reminders | DOC-S1…4 |
| Reminders | Derived from documents and plans; local notifications; reminders list | REM-S1…2 |
| History | Unified timeline with month totals and filters | HIST-S1 |
| Dashboard | Car status, monthly cost, upcoming maintenance, recent activity | DASH-S1…5 |
| Analytics | Monthly expenses (12 months), category breakdown, cost per km, consumption trend | ANL-S1…4 |
| Settings | Language, theme, notifications, account, version | SET-S1…4 |

## 5. Not in the MVP (future roadmap)

Explicitly **excluded** from the MVP. Each item needs its own product decision before it is picked up.

| Item | Why excluded now |
|---|---|
| Marketplace (parts, cars) | Different business; does not serve the three questions |
| Social features (feeds, sharing, comparisons) | Not needed for personal tracking |
| Mechanic / service-station marketplace and booking | Requires partners, supply side and moderation |
| GPS tracking | Battery, privacy, background-location permissions |
| OBD diagnostics | Hardware dependency |
| Insurance purchase | Regulated; requires insurer partnerships |
| Financing (loans, leasing) | Regulated |
| Payments (fines, fuel, services) | Regulated; requires payment providers |
| AI assistant | Not needed to answer the three questions reliably |

Also deferred (smaller, candidates for after the MVP): custom user-defined reminders, document
photos, receipt scanning, data export (CSV), multi-currency, aggregated analytics across all
vehicles, shared access to a vehicle (family), home-screen widgets.

## 6. Key product rules (summary)

Full formulas with worked examples are in [docs/business-rules](docs/business-rules/README.md).

| Topic | Rule in one line |
|---|---|
| Mileage validation | A reading must lie between the highest earlier reading and the lowest later one (ODO-4); > 1 500 km/day needs confirmation (ODO-8) |
| Fuel price | Stored: volume + total; price per unit = total / volume (FUEL-4) |
| Fuel consumption | Full-tank to full-tank: fuel added after the first fill ÷ km × 100; segments with a missed fill or < 50 km are ignored (FUEL-8…12) |
| Monthly expense | Sum of fuel + maintenance + expenses dated in the calendar month (COST-4) |
| Cost per km | Period cost ÷ period distance, shown only from 100 km (COST-6/7) |
| Maintenance due | Baseline + interval (km and/or months). Overdue at ≤ 0 km or past the date; due soon at ≤ 1 000 km or ≤ 30 days (MNT-5…10) |
| Document status | Expired after the expiry date; expires soon within lead days (default 30) (DOC-5) |
| Reminder timing | 09:00 local time. Documents: lead/7/1/0 days before and 7 after. Maintenance: 14/3/0 before and 7 after. Km-based: in-app only (REM-2…6) |

## 7. Glossary (UI terms)

[to validate] Final wording to be checked with native speakers.

| Concept | Oʻzbekcha | Русский | English |
|---|---|---|---|
| Fuel | Yoqilgʻi | Топливо | Fuel |
| Expense | Xarajat | Расход | Expense |
| Maintenance | Texnik xizmat | Техобслуживание | Maintenance |
| Odometer / mileage | Probeg | Пробег | Odometer |
| Document | Hujjat | Документ | Document |
| Reminder | Eslatma | Напоминание | Reminder |
| History | Tarix | История | History |
| Analytics | Tahlil | Аналитика | Analytics |

## 8. Open decisions

These must be settled before or during Phase 2. Recommendations are given but not decided.

| # | Decision | Options | Recommendation |
|---|---|---|---|
| D1 | Data strategy | (a) online-only; (b) online with an offline write queue; (c) local-first with optional sync | **(b)**: data is safe when the phone is lost, and entries at a fuel station still work offline |
| D2 | Sign-in method | Phone + SMS OTP; Google; email magic link | Phone + SMS OTP (local norm). Needs an SMS provider and cost estimate. Google as a fallback |
| D3 | Account required at start? | Required in onboarding vs. optional later | Follows D1: required for (a)/(b) |
| D4 | Android application id | `uz.mycar.app` (placeholder) | Confirm brand/domain; it is permanent once published |
| D5 | Charts in Analytics | `react-native-svg`-based library vs. hand-drawn bars | Decide when Analytics is built; bars only need simple SVG |
| D6 | Local notifications | `expo-notifications` (requires a development build, not Expo Go) | Adopt; switch the team to development builds |
| D7 | Storing decimals and dates | Volume as `numeric(8,2)`; record date as a SQL `date` column | Adopt, to satisfy GEN-4/GEN-6 exactly |
| D8 | Market lists | Fuel grades, document types, plate formats, default intervals | Validate with 5–10 target users before release |
