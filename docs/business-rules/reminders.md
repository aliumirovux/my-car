# Reminders

Reminders are **derived**. The user doesn't create them; they come from documents
(DOC-5) and maintenance plans (MNT-8…10). User-defined custom reminders are not in the MVP.

## What is scheduled

| ID | Rule |
|---|---|
| REM-1 | **Push notifications** (local, scheduled on the device) are created only for **dates**: document expiry dates and maintenance `dueDate`s. |
| REM-2 | All notifications fire at **09:00** local time. |
| REM-3 | **Document** offsets, in days relative to `expiryDate`: `leadDays`, 7, 1, 0 before, and 7 **after** (one follow-up while still expired). Duplicate offsets are merged (e.g. leadDays = 7). |
| REM-4 | **Maintenance** offsets relative to `dueDate`: 14, 3, 0 before, and 7 after. |
| REM-5 | Only fire moments **in the future** are scheduled. Past offsets are skipped silently. |
| REM-6 | **Kilometre-based** due is not scheduled as a push notification, because it depends on driving. Instead, when a save increases the current odometer and moves any plan from OK to Due soon, or from any status to Overdue, the app shows an in-app notice right after the save ("Oil change is due in 800 km"). |
| REM-7 | Nothing is scheduled for archived vehicles, replaced documents, or plans without `intervalMonths`. Nothing is scheduled at all when notifications are off in Settings or the OS permission is denied; the in-app lists still work. |

## Rescheduling

| ID | Rule |
|---|---|
| REM-8 | For each affected vehicle, the app **cancels all its scheduled notifications and schedules the freshly computed set**. It does this after any change to that vehicle's records, plans or documents; on archive, unarchive or delete; on app start; and when the language or notification settings change. |
| REM-9 | Each notification has a deterministic id `"<kind>:<entityId>:<offset>"` (e.g. `doc:9f1c…:7`), so rescheduling is idempotent. |
| REM-10 | At most **60** pending notifications are kept in total (iOS allows 64). If there are more, keep the earliest-firing ones. |
| REM-11 | Notification text uses the current app language and includes the vehicle's display name (VEH-2), the item, and the days left or days overdue. Tapping it opens that document or plan. |

## Reminders screen

| ID | Rule |
|---|---|
| REM-12 | Lists every expired or expiring-soon document and every overdue or due-soon plan across **active** vehicles, grouped by vehicle. |
| REM-13 | Order: severity (expired/overdue first, then expiring/due soon); then days left ascending (documents: `daysLeft`; plans: effective days left, MNT-7); then name. |

## Example

OSAGO expiry 10.10.2026, `leadDays` 30, today 26.09.2026:

- Offset 30 → 10.09.2026: in the past, skipped.
- Offset 7 → **03.10.2026 09:00**
- Offset 1 → **09.10.2026 09:00**
- Offset 0 → **10.10.2026 09:00**
- Offset +7 → **17.10.2026 09:00**. Cancelled by REM-8 if the user renews the document (DOC-6) before then.
