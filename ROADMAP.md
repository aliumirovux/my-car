# My Car — Roadmap

Phases are ordered by dependency. Scope inside later phases will change as earlier ones
land. Phases 0 and 1 are complete. The MVP scope is defined in PRODUCT_SPEC.md §4.

## Phase 0 — Discovery & foundation ✅

- Repository assessed and set up as a single Expo app at the root.
- Stack installed: Expo SDK 57, Expo Router, TypeScript strict, Zustand, Supabase client,
  React Hook Form, Zod, expo-localization.
- Folder structure and feature-module contract (ARCHITECTURE.md §3).
- Design tokens (light/dark), `Screen` / `AppText`, i18n (uz, ru), UZS/km/date formatters.
- Env validation, `.env.example`, Supabase client that tolerates missing config.
- Tooling: typecheck, ESLint, Jest (8 tests), CI workflow.

## Phase 1 — Product specification ✅

- PRODUCT_SPEC.md: principle, market, MVP scope, exclusions, open decisions.
- User journey, empty and error states (`docs/user-flows/`).
- User stories with acceptance criteria for every MVP feature (`docs/user-stories.md`).
- Deterministic business rules with worked examples (`docs/business-rules/`).

## Phase 2 — Data foundation & vehicles

Decisions required first: PRODUCT_SPEC.md §8 D1–D4, D7.

- Business-rule engine as pure, unit-tested functions (`logic.ts` per feature), using the
  worked examples in `docs/business-rules/` as test cases.
- Supabase project; schema for profiles, vehicles, odometer readings with RLS; migrations
  committed as SQL.
- Auth flow and session handling; account deletion.
- Navigation shell (tabs) replacing the placeholder route; onboarding.
- Vehicles: create, edit, archive, delete, switcher.
- i18n: add English (`en`); preselect Uzbek at first launch instead of the device language.
- Settings: language, theme.

## Phase 3 — Recording

- Fuel (incl. methane/propane/electric units), consumption.
- Expenses with categories and monthly totals.
- Maintenance records and plans; manual odometer updates.
- History timeline.

## Phase 4 — Staying ahead

- Documents with expiry status and renewal.
- Reminders list; local notifications (`expo-notifications`, D6).
- Dashboard.

## Phase 5 — Insight & release

- Analytics (monthly, categories, cost per km, consumption trend).
- EAS Build profiles, signing, Play Store internal testing track, crash reporting.
- Market validation of the [to validate] lists (D8).

## After the MVP

Excluded from the MVP by decision (PRODUCT_SPEC.md §5): marketplace, social features, mechanic
marketplace, GPS tracking, OBD, insurance purchase, financing, payments, AI assistant.
Smaller deferred items: custom reminders, document photos, receipt scanning, CSV export,
multi-currency, cross-vehicle analytics, shared vehicles, widgets.

## Risks and decisions to address next

1. **Offline-first vs. online-only.** Determines whether a local database and sync queue are
   needed. Must be decided before the schema.
2. **Auth method.** Phone + SMS OTP needs an Uzbek SMS provider and Supabase custom SMS hook;
   email/Google is faster to ship.
3. **Android application id `uz.mycar.app`** is a placeholder. It is permanent once published
   on Google Play — confirm ownership of the domain/brand first.
4. **Session storage.** Supabase sessions are stored in AsyncStorage (unencrypted). Consider
   `expo-secure-store`-backed storage (with chunking for its size limit) before release.
5. **Brand & design direction.** The palette in `constants/theme.ts` is a neutral placeholder;
   icons/splash are Expo template images.
6. **Expo tooling behind the proxy.** In the build environment api.expo.dev and docs.expo.dev
   were unreachable: `expo install` needed `EXPO_OFFLINE=1`, and two `expo-doctor` checks
   (config schema, React Native Directory) could not run. Re-run `npm run doctor` on an
   unrestricted network.
7. **Not yet run on a device/emulator.** Validation so far is static (typecheck, lint, tests,
   Android bundle export, prebuild). First Phase 2 task: launch on a real Android device.
