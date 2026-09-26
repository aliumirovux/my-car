# Odometer & mileage

## Readings

| ID | Rule |
|---|---|
| ODO-1 | An **odometer reading** is a pair `(date, odometer)` for a vehicle. Readings come from: the vehicle's initial odometer (`initialOdometerDate`, `initialOdometer`), every fuel entry, every maintenance record, every expense that has an odometer, and manual odometer updates. |
| ODO-2 | Odometer is **required** on fuel entries, maintenance records and manual updates; **optional** on expenses. |
| ODO-3 | **Current odometer** = the maximum odometer over all readings of the vehicle. (Because of ODO-4 this is also the reading with the latest date.) |

## Validation

| ID | Rule |
|---|---|
| ODO-4 | **Monotonic by date (hard rule).** For a reading R with date D, let `low` = the maximum odometer among the vehicle's other readings dated **before** D (0 if none), and `high` = the minimum odometer among other readings dated **after** D (no upper bound if none). R is valid only if `low ≤ R ≤ high`. Readings on the same date as D do not constrain R. |
| ODO-5 | When a record is **edited**, ODO-4 is evaluated excluding that record's own current value. |
| ODO-6 | **Deleting** a record never fails validation (it only removes a constraint). |
| ODO-7 | A violation of ODO-4 **blocks saving**. The error message states the allowed range, e.g. "Odometer must be between 50 600 and 51 200 km for 20.09.2026". |
| ODO-8 | **Implausible jump (soft rule).** If `low` exists, let `d` = max(1, days(date of the reading that set `low`, D)). If `(R − low) / d > 1 500` km/day, the user must confirm ("Are you sure? That is N km in M days"). Confirming saves the record. |

## Average daily distance

Used for mileage-based estimates (MNT-6).

| ID | Rule |
|---|---|
| ODO-9 | Let B = the reading with the maximum odometer. Let A = the earliest reading dated on or after `today − 90 days`. If A is the same reading as B, or `days(A.date, B.date) < 14`, the average is **unknown**. |
| ODO-10 | Otherwise `avgDailyKm = (B.odometer − A.odometer) / days(A.date, B.date)`. If `avgDailyKm ≤ 0`, the average is **unknown**. |

## Example

Readings: 01.09 → 50 000, 10.09 → 50 250, 20.09 → 50 600.

- New reading on 15.09: allowed range is 50 250 … 50 600.
- New reading on 21.09 of 50 550 → rejected (below 50 600).
- New reading on 21.09 of 53 000 → (53 000 − 50 600) / 1 = 2 400 km/day > 1 500 → confirmation required.
- Current odometer = 50 600.
- On 26.09 with the readings above: A = 01.09 (50 000), B = 20.09 (50 600), 19 days → avgDailyKm = 31.58.
