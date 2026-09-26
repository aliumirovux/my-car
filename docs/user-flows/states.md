# Empty states and error states

## Principles

1. **An empty state tells the user the next action**, and has a button for it. Never just "No data".
2. **Never lose user input.** When saving fails, the form stays filled and offers Retry.
3. **Errors say what to do**, in the current language, without technical codes.
4. **Validation is inline**, next to the field, and shows as soon as the field loses focus. The Save button stays enabled and pressing it scrolls to the first error.

## Empty states

| Screen | Condition | Message (intent) | Action |
|---|---|---|---|
| Whole app | No active vehicle (all deleted or archived) | "Add your car to start" | Add vehicle; "Show archived" if any exist |
| Dashboard: monthly cost | No costs this month | "No spending recorded this month" | Add fuel |
| Dashboard: upcoming maintenance | No plans | "Tell us what to track and we'll remind you" | Set up maintenance (suggested plans) |
| Dashboard: upcoming maintenance | Plans exist, all OK | "Nothing due soon. Next: <item> in N km / N days" | — |
| Dashboard: recent activity | No records | "Your records will appear here" | Add fuel |
| History | No records | "Every fuel, expense and service will appear here" | Add |
| History (filtered) | Filter has no matches | "No <type> records yet" | Clear filter |
| Fuel consumption | Fewer than one valid segment (FUEL-10/13) | "Fill the tank fully twice to see consumption" | — |
| Cost per km | `distance < 100` km or unknown (COST-7) | "Not enough mileage data yet" | Update odometer |
| Analytics | No costs at all | "Add a few records to see where your money goes" | Add fuel |
| Documents | None | "Add OSAGO and technical inspection to get expiry reminders" | Add document |
| Reminders | Nothing overdue or soon | "All good. Nothing needs attention" | — |
| Vehicles: archived | None archived | Section hidden | — |

## Error states

| Situation | Behaviour |
|---|---|
| Field validation (LIM-*, VEH-5, DOC-2…) | Inline error stating the allowed range or format; save blocked |
| Odometer out of order (ODO-4) | Inline error with the allowed range and the date that constrains it; save blocked |
| Implausible jump (ODO-8), unusual fuel price (FUEL-6), plate format (VEH-3/4) | Confirmation dialog: "Save anyway" / "Edit". Not an error |
| Future date (GEN-10) | Date picker does not allow it |
| Removing a used fuel type (VEH-7) | Inline error with the number of entries using it |
| No connection | Depends on decision D1. Offline-tolerant: saved locally, with a "Waiting to sync" indicator on the item. Online-only: "No internet. Your entry is kept. Retry", with the form kept |
| Sync conflict or server rejection | Item marked "Not synced", with a Retry action. Data is never silently dropped |
| Session expired | Re-authenticate without leaving the current screen; unsent input is kept |
| Loading failed | Inline "Couldn't load. Retry" in place of the content, not a blank screen |
| Notification permission denied | Settings shows "Notifications are off in system settings" with an "Open settings" button; in-app reminders keep working |
| Delete record | Confirmation: "Delete this fuel entry? Totals will be recalculated." |
| Delete vehicle | VEH-12 dialog with counts and an Archive alternative |
| Unexpected crash | Restart on the Dashboard. Crash reported (crash reporting is planned in the roadmap) |
