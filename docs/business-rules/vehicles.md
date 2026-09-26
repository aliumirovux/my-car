# Vehicles

## Fields and validation

| ID | Rule |
|---|---|
| VEH-1 | **Required:** make, model, at least one fuel type (FUEL-1), initial odometer (LIM-2). **Optional:** year (LIM-4), plate number, VIN, nickname. `initialOdometerDate` defaults to today; the user may set an earlier date. |
| VEH-2 | **Display name** = nickname if set, else "make model". If two active vehicles would have the same display name, the plate (or year if there is no plate) is appended. |
| VEH-3 | **Plate number** is stored normalised: uppercase, spaces and hyphens removed. Accepted formats: private `^\d{2}[A-Z]\d{3}[A-Z]{2}$` (e.g. `01A123BC`) and legal entity `^\d{2}\d{3}[A-Z]{3}$` (e.g. `01123ABC`). Any other format is a **soft warning** (it still saves, e.g. foreign plates). It is displayed with spaces: `01 A 123 BC`, `01 123 ABC`. [to validate] |
| VEH-4 | A duplicate plate among the user's vehicles is a soft warning. |
| VEH-5 | **VIN**, if given: exactly 17 characters from A–Z and 0–9, excluding I, O and Q (hard rule). Stored uppercase. |
| VEH-6 | The initial reading is an odometer reading (ODO-1). Editing it is validated by ODO-4. |
| VEH-7 | A fuel type cannot be removed from a vehicle while any of its fuel entries use it. The error names how many entries use it. |

## Multiple vehicles

| ID | Rule |
|---|---|
| VEH-8 | A user may have any number of vehicles. Exactly one **active** vehicle is **selected** at a time. The Dashboard, Add actions, History and Analytics are scoped to it. The selection is persisted. |
| VEH-9 | A newly created vehicle becomes the selected one. |

## Archive and delete

| ID | Rule |
|---|---|
| VEH-10 | **Archive**: the vehicle is hidden from the switcher and listed under "Archived". Its data is kept and visible, but read-only. It gets no reminders (REM-7). It can be unarchived. |
| VEH-11 | If the selected vehicle is archived or deleted, the selection moves to the most recently created remaining active vehicle. If there is none, the app shows the no-vehicle empty state. |
| VEH-12 | **Delete** is permanent. It removes the vehicle and all its readings, fuel entries, expenses, maintenance records, plans and documents. The confirmation dialog shows those counts, offers **Archive** as the safer alternative, and requires tapping a destructive "Delete permanently" button. |
