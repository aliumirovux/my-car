# User stories & acceptance criteria

Persona: **a car owner in Uzbekistan** who drives their own car (or a few) and wants to know
what it costs and never miss maintenance or a document expiry.

Rule IDs (`ODO-4`, `FUEL-9`, …) refer to [business-rules](business-rules/README.md). Every
acceptance criterion must be covered by an automated test (unit tests for rules, component or
end-to-end tests for flows) before the feature is considered done.

---

## Onboarding

**ONB-S1.** As a new user, I want to choose my language first, so that everything after it is understandable.
- Oʻzbekcha, Русский and English are offered; Oʻzbekcha is preselected.
- The choice applies immediately and is saved; it can be changed later in Settings.

**ONB-S2.** As a new user, I want to add my car in under a minute, so that I get to value quickly.
- Only make, model, fuel type(s) and current odometer are required (VEH-1).
- On save the user lands on the Dashboard of that vehicle.

**ONB-S3.** As a new user, I want suggested maintenance items, so that I don't have to know intervals myself.
- The suggested list and intervals match MNT-1 and can be edited before saving.
- "I don't know" for last done creates a plan with `baselineAssumed` (MNT-4).
- The step can be skipped; the Dashboard then shows the "set up maintenance" empty state.

**ONB-S4.** As a new user, I want to enter my insurance and inspection expiry dates, so that I get reminded before they expire.
- Saving creates documents per DOC-2; the step can be skipped.
- The notification permission is requested here only if a date was entered (see core journey).

---

## Vehicles

**VEH-S1 Create.** As a car owner, I want to add a vehicle with its key details, so that all records are attached to the right car.
- Required and optional fields and their validation follow VEH-1, VEH-3…5 and LIM-2/LIM-4.
- The initial odometer becomes the first odometer reading (VEH-6).
- The new vehicle becomes selected (VEH-9).

**VEH-S2 Edit.** As a car owner, I want to correct my vehicle's details, so that the data is accurate.
- All fields are editable; the initial odometer is validated by ODO-4.
- Removing a fuel type that is in use is blocked (VEH-7).

**VEH-S3 Multiple vehicles.** As an owner of more than one car, I want to switch between them, so that each car's costs stay separate.
- The Home header shows the selected vehicle and opens a switcher listing active vehicles.
- Switching rescopes Dashboard, History, Analytics and Add (VEH-8); the selection survives app restarts.

**VEH-S4 Archive.** As a user who sold a car, I want to archive it, so that it stops cluttering the app without losing its history.
- Behaviour follows VEH-10 and VEH-11; unarchive restores it fully.

**VEH-S5 Delete.** As a user, I want to delete a vehicle I added by mistake, so that it's gone completely.
- The confirmation dialog follows VEH-12. After deletion, no data of that vehicle remains and its notifications are cancelled (REM-8).

---

## Fuel

**FUEL-S1 Add.** As a car owner, I want to quickly record a fuel purchase, so that I can understand my monthly fuel spending.
- The user can enter volume and total amount; the price per unit is calculated and shown live (FUEL-4/5).
- Alternatively, volume and price per unit can be entered; the total is calculated.
- Fuel type defaults per FUEL-2, and the unit label follows the fuel type (FUEL-1).
- Date defaults to today and cannot be in the future (GEN-10).
- Odometer is required and validated (ODO-4, ODO-8); the field shows the last known reading as a hint.
- "Full tank" is on by default; "I missed recording a previous fill-up" is available (FUEL-7).
- An unusual price asks for confirmation (FUEL-6).
- After saving, the entry appears in History, and the Dashboard monthly cost and Analytics include it immediately.

**FUEL-S2 Edit / delete.** As a user, I want to fix or remove a wrong fuel entry, so that my numbers are right.
- Edit re-validates per ODO-5; delete asks for confirmation.
- Consumption, totals and cost per km recompute (GEN-11).

**FUEL-S3 History.** As a user, I want to see my past fill-ups, so that I can review prices and volumes.
- The Fuel filter in History lists entries with date, fuel type, volume + unit, total, price per unit, odometer, and consumption when available.

**FUEL-S4 Consumption.** As a user, I want to see how much fuel my car uses, so that I notice changes early.
- Per-segment and period consumption are computed exactly per FUEL-8…13.
- Multi-group vehicles show fuel cost per 100 km instead of volume consumption (FUEL-14).
- With no valid segment, the empty state from states.md is shown.

---

## Expenses

**EXP-S1 Add.** As a car owner, I want to record other car costs, so that I see the real cost of owning the car.
- Category from COST-2 (required), amount (LIM-1), date (≤ today), optional odometer (validated if given) and note.
- After saving it appears in History, and monthly totals update.

**EXP-S2 Edit / delete.** Same behaviour as FUEL-S2.

**EXP-S3 Categories.** As a user, I want expenses grouped by category, so that I see where money goes.
- Only the COST-2 categories exist in the MVP; each has a localized name and an icon.

**EXP-S4 Monthly totals.** As a user, I want to see how much I spent this month, so that I can control spending.
- The expense list header shows `expenseTotal` for the displayed month (COST-5), and the month can be changed.
- Figures are formatted as whole soʻm (e.g. `1 250 000 soʻm`).

---

## Maintenance

**MNT-S1 Add record.** As a car owner, I want to record a service visit, so that I have a complete service history.
- Fields and validation per MNT-2; several service types per record are allowed.
- Saving updates the baseline of the matching plans (MNT-4).

**MNT-S2 History.** As a user, I want to see what was done and when, so that I can show it to a mechanic or buyer.
- The Maintenance filter in History lists records with date, odometer, service types, cost and provider.

**MNT-S3 Mileage-based reminder.** As a user, I want to be told when a service is due by kilometres, so that I don't overrun intervals.
- Due odometer, remaining km and status follow MNT-5, MNT-8…10.
- Crossing a threshold on save shows the in-app notice (REM-6).
- When `avgDailyKm` is known, the estimated date is shown (MNT-6).

**MNT-S4 Date-based reminder.** As a user, I want to be reminded when a service is due by time, so that I service the car even if I drive little.
- Due date follows MNT-5 (GEN-9 month arithmetic); notifications follow REM-4.

**MNT-S5 Manage plans.** As a user, I want to set my own intervals, so that reminders match my car.
- Create, edit and delete plans (LIM-5, MNT-3). "Mark as done" opens a prefilled maintenance record.

---

## Documents

**DOC-S1 Add.** As a car owner, I want to store my car documents with expiry dates, so that I never drive with an expired one.
- Types, required expiry and lead days follow DOC-1/DOC-2.
- After saving, "Add the cost as an expense" is offered (DOC-8).

**DOC-S2 Status.** As a user, I want to see at a glance which documents are fine, so that I know what to renew.
- Status is computed per DOC-4/5 and shown with colour **plus** text (not colour alone).
- The list is ordered per DOC-7.

**DOC-S3 Renew.** As a user, I want to add the new policy when I renew, so that reminders stop for the old one.
- Renewal marks the previous document as Replaced (DOC-6) and cancels its notifications.

**DOC-S4 Reminder.** As a user, I want notifications before expiry, so that I have time to renew.
- Notifications are scheduled per REM-2/3/5 and rescheduled per REM-8.

---

## Reminders

**REM-S1.** As a user, I want one place listing everything that needs attention, so that nothing slips.
- Contents and order follow REM-12/13; each item opens its document or plan.

**REM-S2.** As a user, I want notifications at a sensible time, so that they are useful and not annoying.
- All notifications fire at 09:00 local time (REM-2), at most once per offset.
- The text is in the app language and names the vehicle (REM-11).

---

## History

**HIST-S1.** As a user, I want one timeline of everything that happened to my car, so that I can see its full story.
- The timeline includes fuel entries, expenses, maintenance records, manual odometer updates, and documents (on the date they were added).
- Order: `date` descending, then `createdAt` descending.
- Grouped by month; each month header shows `monthTotal` (COST-4).
- Filter by type (All, Fuel, Expenses, Maintenance, Odometer, Documents).
- Tapping an item opens its detail with Edit and Delete (not for archived vehicles, VEH-10).

---

## Dashboard

**DASH-S1 Car status.** As a user, I want to know immediately if my car needs attention, so that I can act.
- **Attention** (red) if any plan is overdue or any active document is expired; **Due soon** (amber) if any plan is due soon or any document expires soon; otherwise **All good** (green). Status is shown as text plus colour.
- The card also shows the current odometer (ODO-3) and the date of the latest reading.

**DASH-S2 Monthly cost.** As a user, I want to see what the car cost this month, so that I stay aware.
- Shows `monthTotal` for the current month and, for reference, the previous month's total (COST-4).

**DASH-S3 Upcoming maintenance.** As a user, I want to see the next services due, so that I can plan.
- Top 3 plans ordered per MNT-12, each with remaining km and/or days; "See all" opens Reminders.

**DASH-S4 Recent activity.** As a user, I want my latest records at hand, so that I can check or fix them.
- The 5 most recent History items (HIST-S1 order).

**DASH-S5 Stale odometer.** When the newest reading is more than 30 days old, show the update prompt (core journey §4).

---

## Analytics

**ANL-S1 Monthly expenses.** As a user, I want to see spending per month, so that I notice trends.
- A bar per month for the last 12 calendar months including the current one, values per COST-4; months with 0 are shown as 0.

**ANL-S2 Category breakdown.** As a user, I want to see where my money goes, so that I can cut costs.
- Period: this month / last month / last 12 months. Shares and ordering per COST-10/11.

**ANL-S3 Cost per km.** As a user, I want to know what each kilometre costs me, so that I understand the true cost of driving.
- For the selected period (COST-7) and lifetime (COST-8), with the "not enough data" state below 100 km.

**ANL-S4 Consumption trend.** Average consumption per month for the last 12 months (FUEL-12), or fuel cost per 100 km for multi-group vehicles (FUEL-14).

---

## Settings

**SET-S1.** As a user, I want to change language and theme, so that the app suits me.
- Language: uz / ru / en. Theme: System / Light / Dark. Both apply immediately and persist.

**SET-S2.** As a user, I want to turn reminders off or on, so that I control notifications.
- The toggle follows REM-7/8; the OS-denied state is shown per states.md.

**SET-S3.** As a user with an account, I want to sign out or delete my account, so that I control my data.
- Deleting the account removes all server-side data after explicit confirmation (Google Play requirement).

**SET-S4.** Shows the app version.
