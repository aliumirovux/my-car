# Fuel

## Fuel types and units

| ID | Rule |
|---|---|
| FUEL-1 | Fuel types, their **group** and **unit**: |

| Fuel type | Group | Unit |
|---|---|---|
| AI-80, AI-91, AI-92, AI-95, AI-98 | petrol | L |
| Diesel | diesel | L |
| Methane (CNG) | methane | m³ |
| Propane (LPG) | propane | L |
| Electricity | electric | kWh |

[to validate] The grade list and the m³ unit for methane reflect common practice in Uzbekistan and must be confirmed with users.

| ID | Rule |
|---|---|
| FUEL-2 | A vehicle has one or more allowed fuel types (e.g. AI-92 + Methane). A fuel entry must use one of the vehicle's fuel types. The fuel type defaults to the one used in the vehicle's most recent fuel entry, else to the vehicle's first fuel type. |
| FUEL-3 | A vehicle is **multi-group** if its fuel types span more than one group (e.g. petrol + methane). |

## Price per unit

| ID | Rule |
|---|---|
| FUEL-4 | A fuel entry **stores** `volume` and `totalCost`. The price per unit is always derived: `pricePerUnit = totalCost / volume`, shown rounded to whole soʻm. |
| FUEL-5 | The form accepts any two of {volume, total cost, price per unit}; the third is calculated live. If the user enters volume and price per unit, `totalCost = round(volume × pricePerUnit)` to whole soʻm (GEN-2). |
| FUEL-6 | **Price sanity (soft rule).** If the vehicle has a previous entry with the same fuel type and the new price per unit differs from that entry's price per unit by more than 50 %, the user must confirm before saving. |

## Consumption (full-tank method)

Consumption is computed per fuel **group**, from fill-ups where the tank was filled completely.

| ID | Rule |
|---|---|
| FUEL-7 | Each fuel entry has `fullTank` (default **true**) and `missedPrevious` (default **false**; the user sets it when a fill-up before this one was not recorded). |
| FUEL-8 | Take the vehicle's fuel entries of one group, sorted by odometer ascending, then date, then `createdAt`. A **segment** runs from a full-tank entry F_i to the next full-tank entry F_j of the same group. |
| FUEL-9 | `distance = F_j.odometer − F_i.odometer`; `fuelUsed` = the sum of `volume` of every entry of that group **after F_i up to and including F_j** (partial fills included, F_i excluded). |
| FUEL-10 | A segment is **invalid** (no consumption shown) if any entry after F_i up to and including F_j has `missedPrevious = true`, or if `distance < 50` km. |
| FUEL-11 | Segment consumption = `fuelUsed / distance × 100`, in unit/100 km, shown with 1 decimal. It is attributed to the date of F_j. |
| FUEL-12 | **Average consumption for a period** = Σ fuelUsed / Σ distance × 100 over the valid segments whose F_j date is in the period (a weighted average, not an average of per-segment values). |
| FUEL-13 | The first full-tank entry of a group has no consumption (no baseline). |
| FUEL-14 | For **multi-group** vehicles (FUEL-3), volume consumption is not shown, because both fuels cover the same kilometres. Instead the app shows **fuel cost per 100 km** for the period = (Σ fuel totalCost in the period) / (distance in the period, COST-6) × 100, in whole soʻm. Single-group vehicles show both. |

## Example (single-group petrol car)

| # | Date | Odometer | Volume | Total | Full tank |
|---|---|---|---|---|---|
| 1 | 10.09 | 50 000 | 40 L | 400 000 | yes |
| 2 | 15.09 | 50 250 | 20 L | 200 000 | no |
| 3 | 20.09 | 50 600 | 25 L | 262 500 | yes |

- Price per litre: #1 = 10 000, #2 = 10 000, #3 = 10 500 soʻm.
- Segment #1 → #3: distance 600 km, fuelUsed 20 + 25 = 45 L → **7.5 L/100 km**, dated 20.09.
- If #2 had `missedPrevious = true`, the segment would be invalid and no consumption would be shown.
