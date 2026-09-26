# Costs: monthly totals, categories, cost per kilometre

## Cost sources and categories

| ID | Rule |
|---|---|
| COST-1 | A vehicle's costs come from exactly three sources: **fuel entries** (`totalCost`), **maintenance records** (`cost`) and **expenses** (`amount`). Documents carry no money; the cost of a document (e.g. an insurance premium) is recorded as an expense (DOC-8). |
| COST-2 | Expense categories are a fixed list in the MVP: `insurance`, `taxes_fees` (technical inspection fee, registration and other state fees), `fines`, `parking`, `wash`, `accessories`, `other`. |
| COST-3 | Every cost belongs to one **breakdown category**: `fuel` for fuel entries, `maintenance` for maintenance records, and the expense's own category for expenses. |

Repairs are maintenance records, not expenses: any work done on the car goes into maintenance, so that history and reminders stay complete.

## Monthly totals

| ID | Rule |
|---|---|
| COST-4 | `monthTotal(M)` = the sum of costs of all three sources whose `date` is in calendar month M (GEN-7). A month with no records totals 0. |
| COST-5 | The Expenses list shows `expenseTotal(M)` = the sum of **expenses only** for month M. The Dashboard and Analytics use `monthTotal(M)` (all sources). The label must say which one is shown. |

## Distance in a period

| ID | Rule |
|---|---|
| COST-6 | For a period P = [start, end]: if no odometer reading (ODO-1) is dated inside P, `distance(P)` is **unknown**. Otherwise `endOdo` = the maximum odometer among readings dated ≤ end; `startOdo` = the maximum odometer among readings dated **< start**, or, if there are none, the minimum odometer among readings in P. `distance(P) = endOdo − startOdo`. |

## Cost per kilometre

| ID | Rule |
|---|---|
| COST-7 | `costPerKm(P) = totalCost(P) / distance(P)`, shown in whole soʻm per km. It is shown only if `distance(P) ≥ 100` km; otherwise the app shows "Not enough mileage data". |
| COST-8 | **Lifetime** cost per km = (sum of all costs) / (current odometer − `initialOdometer`), with the same 100 km minimum. |
| COST-9 | Fuel-only cost per 100 km follows FUEL-14. |

## Category breakdown

| ID | Rule |
|---|---|
| COST-10 | For a period, each breakdown category's share = category sum / period total. Categories with a 0 sum are not shown. Categories are ordered by sum descending, then alphabetically by key. |
| COST-11 | Percentages are whole numbers that add up to exactly 100, using the **largest remainder method**: floor every exact percentage, then add 1 to the categories with the largest fractional parts until the sum is 100 (ties: the category with the larger sum first). |

## Example — September 2026

Costs: fuel 400 000 + 200 000 + 262 500 = 862 500; maintenance (oil change) 450 000; wash 50 000.
Readings: last reading before September = 28.08 → 49 700; maximum in September = 50 600.

- `monthTotal(Sep)` = 1 362 500 soʻm; `expenseTotal(Sep)` = 50 000 soʻm.
- `distance(Sep)` = 50 600 − 49 700 = 900 km.
- Cost per km = 1 362 500 / 900 = 1 513.9 → **1 514 soʻm/km**.
- Fuel cost per 100 km = 862 500 / 900 × 100 → **95 833 soʻm**.
- Breakdown: fuel 63.30 %, maintenance 33.03 %, wash 3.67 % → floors 63 + 33 + 3 = 99 → the largest remainder (wash, .67) gets +1 → **63 %, 33 %, 4 %**.
