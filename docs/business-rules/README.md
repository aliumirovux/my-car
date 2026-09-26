# Business rules

Deterministic rules the app must implement exactly. Two implementations that follow these
documents must produce the same numbers, statuses and reminder times from the same data.

| File | Covers |
|---|---|
| [odometer.md](odometer.md) | Odometer readings, current odometer, mileage validation, average daily distance |
| [fuel.md](fuel.md) | Fuel types and units, price per unit, fuel consumption |
| [costs.md](costs.md) | Monthly expense totals, category breakdown, cost per kilometre |
| [maintenance.md](maintenance.md) | Maintenance plans, due calculation, status, ordering |
| [documents.md](documents.md) | Document types, expiry status |
| [reminders.md](reminders.md) | When notifications fire and how they are rescheduled |
| [vehicles.md](vehicles.md) | Vehicle fields, archive, delete, multiple vehicles |

Every rule has an ID (e.g. `ODO-3`). Code and tests should reference these IDs.

## 1. Global conventions

| ID | Rule |
|---|---|
| GEN-1 | **Money** is an integer number of Uzbek soʻm (UZS). No fractional soʻm is stored. |
| GEN-2 | **Rounding** of any derived value is *round half away from zero* to the stated precision. Rounding happens only for display or when the rule says so; intermediate calculations use full precision. |
| GEN-3 | **Distance** is an integer number of kilometres. |
| GEN-4 | **Volume/energy** is a decimal with at most 2 fractional digits, in the unit of its fuel type (L, m³ or kWh — see FUEL-1). |
| GEN-5 | **"Today"** is the device's current local calendar date. Uzbekistan uses UTC+5 with no daylight saving time. |
| GEN-6 | **Record dates** are calendar dates (`YYYY-MM-DD`) without a time or time zone. They are never converted between zones. Each record also has a `createdAt` timestamp, used only as a tie-breaker when ordering. |
| GEN-7 | **Months** are calendar months of the record date. "Month M" contains records with `date` from the 1st to the last day of M, inclusive. |
| GEN-8 | **Day differences**: `days(a, b)` = the number of calendar days from date a to date b (`days(2026-09-26, 2026-09-27) = 1`). |
| GEN-9 | **Adding months** to a date keeps the day of month; if that day does not exist in the target month, use the last day of that month (`2026-01-31 + 1 month = 2026-02-28`). |
| GEN-10 | **No future-dated records.** Fuel, expense, maintenance and odometer records must have `date ≤ today`. Document dates (issue/expiry) may be in the future. |
| GEN-11 | **Derived values are never stored.** Consumption, totals, statuses, due dates and cost per km are always recomputed from the records, so edits and deletions take effect everywhere immediately. |
| GEN-12 | **Scope.** All records belong to exactly one vehicle. All calculations in this folder run per vehicle. |
| GEN-13 | **Text fields** (notes, names) are trimmed and limited to 500 characters; names/titles to 80. |

## 2. Domain entities (conceptual)

A conceptual model to guide the database schema; it is not the schema itself.

| Entity | Key fields |
|---|---|
| Vehicle | make, model, year?, plate?, VIN?, nickname?, fuelTypes[] (≥1), initialOdometer, initialOdometerDate, status (active/archived) |
| OdometerReading | vehicle, date, odometer — manual update, and also the implicit reading of every record that carries an odometer |
| FuelEntry | vehicle, date, fuelType, volume, totalCost, odometer, fullTank, missedPrevious, station?, note? |
| Expense | vehicle, date, category, amount, odometer?, note? |
| MaintenancePlan | vehicle, serviceType, intervalKm?, intervalMonths?, baselineDate, baselineOdometer, baselineAssumed |
| MaintenanceRecord | vehicle, date, odometer, serviceTypes[] (≥1), cost, provider?, note? |
| Document | vehicle, type, title?, number?, issueDate?, expiryDate?, leadDays, status (active/replaced), note? |

`?` = optional. All entities have `id` (UUID, generated on the device), `createdAt` and `updatedAt`.

## 3. Validation limits

| ID | Field | Rule |
|---|---|---|
| LIM-1 | Money amount (fuel total, expense, maintenance cost) | Integer. Fuel and expense: 1 … 1 000 000 000. Maintenance: 0 … 1 000 000 000 (0 allows free/warranty work). |
| LIM-2 | Odometer | Integer, 0 … 2 000 000 |
| LIM-3 | Fuel volume | 0.01 … 300 (unit per FUEL-1) |
| LIM-4 | Vehicle year | 1950 … (current year + 1) |
| LIM-5 | Maintenance interval | intervalKm 100 … 200 000; intervalMonths 1 … 120; at least one of the two is set |
| LIM-6 | Document lead days | one of 7, 14, 30, 60 |

Values outside these limits are rejected with an inline error that states the allowed range.
