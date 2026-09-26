# My Car — Product Spec

Status: **Phase 0 draft.** This is the scope as given in the Phase 0 brief plus explicitly
marked assumptions. Nothing below has been validated with users yet. Items marked
**[to validate]** are hypotheses about the Uzbekistan market, not facts.

## 1. What it is

A personal car management app for car owners in Uzbekistan. One place to record what a car
costs to run and to be reminded of what is due.

- **Platform:** Android first (dominant platform in the target market). iOS is kept buildable
  but not a launch target.
- **Languages:** Uzbek (Latin script) as the default, Russian as the second language.
  Device language picks the initial language; the user can change it.
- **Currency:** Uzbek soʻm (UZS), whole units.
- **Units:** kilometres, litres; dates as `dd.mm.yyyy`.

## 2. Users

Primary: a private individual who owns one or a few cars and wants to track spending and
not miss deadlines. Fleet / business use is **out of scope** for v1.

## 3. Feature modules (scope)

Each corresponds to a folder in `src/features/`. None is implemented yet.

| Module | Purpose |
|---|---|
| vehicles | Add / edit the user's cars (make, model, year, plate number, odometer). |
| dashboard | Home overview of the selected car: recent spending, upcoming reminders. |
| fuel | Fuel / charging log: date, amount, price, odometer; consumption derived from it. |
| expenses | Other spending: repairs, parts, washing, parking, fines, insurance, etc. |
| maintenance | Service records (oil change, filters, …) with odometer and cost. |
| documents | Expiry-tracked car documents. |
| reminders | Date- and/or mileage-based reminders built on documents and maintenance. |
| analytics | Spending over time, by category; cost per km; fuel consumption. |
| history | Unified chronological feed of all records for a car. |
| settings | Language, theme, account, data export. |

## 4. Market assumptions [to validate]

- Many cars run on **methane (CNG) or propane** alongside or instead of petrol; the fuel log
  must support multiple fuel types per car, including dual-fuel. Petrol grades commonly
  sold include AI‑80, AI‑91/92, AI‑95. EV share is growing.
- Document types owners track: vehicle registration (texpasport), compulsory motor insurance
  (OSAGO), periodic technical inspection, tinting permit, driver's licence, power of
  attorney (ishonchnoma). Exact list and renewal rules need confirmation.
- Users are sensitive to mobile data use and may have unstable connectivity → the app
  should work offline for record entry.

## 5. Non-goals for v1

- Marketplace, service-station booking, payments.
- Fleet / multi-user car sharing.
- Integrations with government services (my.gov.uz, fines databases) — possible later.

## 6. Open product questions

1. Is an account required from day one, or can the app be used locally first and synced
   after sign-up? (Drives the offline/sync architecture — see ARCHITECTURE.md §6.)
2. Sign-in method: phone + SMS OTP (expected norm in UZ) vs. email / Google. SMS needs a
   local provider (e.g. Eskiz, Play Mobile) wired to Supabase Auth.
3. Brand: name "My Car" is a working title; visual identity is not defined.
4. Monetisation: free / freemium / ads — not decided.
