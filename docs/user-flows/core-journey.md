# Core user journey

```
New user → onboarding → vehicle creation → dashboard → add fuel → add expense
→ maintenance → documents → reminders → history → analytics → settings
```

Rule IDs (e.g. `ODO-4`) refer to [../business-rules](../business-rules/README.md).
Story IDs (e.g. `FUEL-S1`) refer to [../user-stories.md](../user-stories.md).

## 1. Navigation model (proposal for the UI phase)

| Tab | Content |
|---|---|
| **Home** | Dashboard of the selected vehicle; vehicle switcher in the header |
| **History** | Unified timeline of the selected vehicle |
| **＋ (Add)** | Action sheet: Fuel · Expense · Maintenance · Odometer · Document |
| **Analytics** | Monthly costs, breakdown, cost per km, consumption |
| **More** | Vehicles · Maintenance plans · Documents · Reminders · Settings |

Fuel is the first action in the Add sheet because it is the most frequent entry.

## 2. Primary path: first session

| # | Step | What happens | Can skip? |
|---|---|---|---|
| 1 | **Language** | Choose Oʻzbekcha / Русский / English. Oʻzbekcha is preselected. | No (one tap) |
| 2 | **Welcome** | One screen with the promise "Know your car. Know what it costs. Never miss maintenance." and a Start button. | No |
| 3 | **Account** | Sign in or sign up. Its position depends on open decisions D1/D2 (PRODUCT_SPEC §8). If the MVP is local-first, this step moves to Settings. | Depends on D1 |
| 4 | **First vehicle** | Make, model, fuel type(s), current odometer. Optional fields are collapsed under "More details". Target: under 60 seconds. | No: the app has no value without a vehicle |
| 5 | **What to track** | Suggested maintenance plans (MNT-1) with defaults. For each one the user gives "last done" (km and/or date) or picks "I don't know" (MNT-4, baseline assumed). | Yes |
| 6 | **Documents** | Quick entry of expiry dates for OSAGO and technical inspection. | Yes |
| 7 | **Dashboard** | Shows the vehicle, status and empty cost cards, with a prominent "Add fuel" prompt. | — |
| 8 | **First fuel entry** | Add → Fuel. Saving returns to the Dashboard. Monthly cost updates and a "Saved" toast appears. | — |

**Notification permission** is not requested during onboarding. It is requested the first time
a date that can fire a reminder is saved (a document with an expiry date, or a plan with
`intervalMonths`). A short explanation screen comes before the OS prompt. If the user declines, the app keeps working
and uses in-app reminders only (REM-7).

## 3. Secondary paths

| Path | Entry point | Outcome |
|---|---|---|
| Add expense | Add → Expense | Category, amount, date (today by default), optional odometer and note |
| Record maintenance | Add → Maintenance, or a plan's "Mark as done" | Record saved. Plans of the included service types get a new baseline (MNT-4) |
| Update odometer | Add → Odometer; Dashboard odometer card | New reading (ODO-4). May trigger an in-app due notice (REM-6) |
| Add or renew a document | Add → Document; More → Documents | Document saved. The previous one of that type becomes Replaced (DOC-6). "Add cost as expense" is offered (DOC-8) |
| Manage plans | More → Maintenance plans | Add or edit intervals and baselines, delete a plan |
| See reminders | Dashboard "Upcoming" → See all; More → Reminders; notification tap | Reminders list (REM-12) or the specific item |
| Edit or delete a record | History → item → Edit / Delete | Totals, consumption and statuses recompute (GEN-11) |
| Switch vehicle | Home header | All tabs are rescoped (VEH-8) |
| Add another vehicle | Home header switcher → Add vehicle; More → Vehicles | New vehicle becomes selected (VEH-9) |
| Archive or delete a vehicle | More → Vehicles → vehicle | VEH-10…12 |
| Change language or theme | More → Settings | Applied immediately; notifications rescheduled with new text (REM-8) |
| Notifications on/off | More → Settings | Schedules all or cancels all (REM-7/8) |
| Sign out / delete account | More → Settings → Account | Sign out keeps the server data. Delete account removes all data after confirmation (required by Google Play when accounts exist) |

## 4. Returning user

- The app opens on the **Dashboard of the last selected vehicle**.
- The top card is **Car status** (see user stories DASH-S1). If anything is overdue or expired, it
  is red, says what needs attention and links to it.
- A notification tap deep-links to the document or plan. Back returns to the Dashboard.
- **Stale odometer.** If the newest reading is more than 30 days old, the Dashboard shows
  "Update your odometer to keep maintenance estimates accurate", with a one-tap entry.
- The Add sheet remembers nothing between uses, except the fuel type default (FUEL-2).

## 5. Journey diagram

```
Language → Welcome → [Account] → First vehicle → [What to track] → [Documents] → Dashboard
                                                                                 │
          ┌───────────────┬───────────────┬──────────────────┬────────────────┬──┴────────────┐
          ▼               ▼               ▼                  ▼                ▼               ▼
      Add fuel      Add expense     Maintenance         Documents        Reminders        History
          │               │          (records/plans)         │                │               │
          └───────────────┴───────────────┴──────────────────┴────────────────┘               │
                                          ▼                                                   ▼
                                  Dashboard updates                              Analytics · Settings
```

`[ ]` = optional or decision-dependent step.
