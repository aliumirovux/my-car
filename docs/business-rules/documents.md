# Documents

## Types

| ID | Rule |
|---|---|
| DOC-1 | Document types in the MVP. Types marked "expiry required" cannot be saved without an expiry date. |

| Type | Expiry | Default lead days |
|---|---|---|
| Vehicle registration certificate (texpasport) | none | — |
| Compulsory motor insurance (OSAGO) | required | 30 |
| Voluntary insurance (KASKO) | required | 30 |
| Technical inspection | required | 30 |
| Tinting permit | required | 30 |
| Power of attorney (ishonchnoma) | optional | 30 |
| Gas cylinder certification | required | 30 |
| Driver's licence | required | 60 |
| Other (free-text title) | optional | 30 |

[to validate] The list, and which documents actually expire, must be confirmed for Uzbekistan. The driver's licence belongs to a person, not a car; in the MVP it is stored under a vehicle for simplicity.

| ID | Rule |
|---|---|
| DOC-2 | A document has a type, an optional number, an optional issue date, an expiry date (per DOC-1), `leadDays` (LIM-6, default per type), and an optional note. If both dates are set, `expiryDate ≥ issueDate`. |
| DOC-3 | The **expiry date is the last valid day** (inclusive). |

## Status

| ID | Rule |
|---|---|
| DOC-4 | `daysLeft = days(today, expiryDate)`. |
| DOC-5 | Status: **No expiry** if there is no expiry date; **Expired** if `daysLeft < 0`; **Expires soon** if `0 ≤ daysLeft ≤ leadDays`; **Valid** otherwise. |
| DOC-6 | **Renewal.** Adding a document of the same type (except "Other") to the same vehicle marks the previous one as **Replaced**. Replaced documents stay in history, get no status badge and no reminders. |
| DOC-7 | Ordering in lists: Expired, then Expires soon, then Valid, then No expiry; within a group by `daysLeft` ascending, then type name. |
| DOC-8 | After a document is saved, the app offers "Add the cost as an expense", which opens the expense form with category `insurance` (insurance types) or `taxes_fees` (all other types) and today's date. |

## Example

OSAGO, expiry 10.10.2026, lead 30 days, today 26.09.2026 → `daysLeft` = 14 → **Expires soon**.
On 11.10.2026 → `daysLeft` = −1 → **Expired**.
