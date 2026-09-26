# Maintenance

Two concepts:

- **Maintenance record**: something that was done (date, odometer, one or more service types, cost).
- **Maintenance plan**: something to repeat for a service type, with a kilometre and/or month interval. Plans produce reminders.

## Service types

| ID | Rule |
|---|---|
| MNT-1 | Service types in the MVP, with **suggested** default intervals (the user can change them): |

| Service type | Default km | Default months |
|---|---|---|
| Engine oil & oil filter | 10 000 | 12 |
| Air filter | 20 000 | 24 |
| Cabin filter | 15 000 | 12 |
| Brake pads | — | — |
| Brake fluid | — | 24 |
| Spark plugs | 30 000 | — |
| Timing belt | 60 000 | 48 |
| Coolant | — | 36 |
| Transmission oil | 60 000 | — |
| Tyres (seasonal change) | — | — |
| Battery | — | — |
| Other (free text) | — | — |

[to validate] The default intervals are generic starting points, not manufacturer guidance. A type with no default gets no plan unless the user sets an interval.

## Records

| ID | Rule |
|---|---|
| MNT-2 | A maintenance record has a date (≤ today), an odometer (required, validated by ODO-4), **one or more** service types, a cost (LIM-1, may be 0), and optionally a provider and a note. One visit may cover several service types (e.g. oil + air filter). |

## Plans and due calculation

| ID | Rule |
|---|---|
| MNT-3 | A plan has a service type, `intervalKm` and/or `intervalMonths` (at least one, LIM-5), and a **baseline** (`baselineDate`, `baselineOdometer`). A vehicle has at most one plan per service type ("Other" excepted). |
| MNT-4 | **Baseline** = the date and odometer of the most recent maintenance record (latest date, then highest odometer) that includes the plan's service type. If there is none, the baseline is the value the user entered as "last done" when creating the plan. If the user does not know it, the baseline is the vehicle's initial reading and the plan is marked `baselineAssumed` (the UI asks the user to confirm it). |
| MNT-5 | `dueOdometer = baselineOdometer + intervalKm`; `dueDate = baselineDate + intervalMonths` (GEN-9). `remainingKm = dueOdometer − currentOdometer` (ODO-3); `remainingDays = days(today, dueDate)`. |
| MNT-6 | **Estimated date for the km interval** = `today + ceil(remainingKm / avgDailyKm)` days, when `remainingKm > 0` and `avgDailyKm` (ODO-10) is known; otherwise there is no estimate. |
| MNT-7 | **Effective days left** = the minimum of `remainingDays` and the estimated days from MNT-6, ignoring missing values. |

## Status

| ID | Rule |
|---|---|
| MNT-8 | **Overdue** if `remainingKm ≤ 0` or `remainingDays < 0`. |
| MNT-9 | **Due soon** if not overdue and (`remainingKm ≤ 1 000` or effective days left `≤ 30`). |
| MNT-10 | **OK** otherwise. |
| MNT-11 | A plan's status is recomputed whenever a reading, a maintenance record or the plan changes, and when the date changes (GEN-11). |

## Ordering (upcoming maintenance lists)

| ID | Rule |
|---|---|
| MNT-12 | Sort by status (overdue, then due soon, then OK); then by effective days left ascending (missing last); then by `remainingKm` ascending (missing last); then by service type name. |

## Example

Oil plan: 10 000 km / 12 months, last done 15.03.2026 at 45 000 km. Today 26.09.2026, current odometer 51 200 km, `avgDailyKm` = 20.

- dueOdometer = 55 000 → remainingKm = 3 800
- dueDate = 15.03.2027 → remainingDays = 170
- Estimate from km: ceil(3 800 / 20) = 190 days
- Effective days left = min(170, 190) = 170 → status **OK** (3 800 > 1 000 and 170 > 30)
- After an oil change is recorded on 26.09.2026 at 51 200 km, the baseline moves: dueOdometer 61 200, dueDate 26.09.2027.
