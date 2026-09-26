# My Car — Roadmap

Phases are ordered by dependency. Scope inside later phases will change as earlier ones
land; only Phase 0 is complete.

## Phase 0 — Discovery & foundation ✅

- Repository assessed; My Car created as an isolated Expo app in `my-car/` (the repo root is
  the unrelated Rasta PWA and is left untouched).
- Stack installed: Expo SDK 57, Expo Router, TypeScript strict, Zustand, Supabase client,
  React Hook Form, Zod, expo-localization.
- Folder structure and feature-module contract (ARCHITECTURE.md §3).
- Design tokens (light/dark), `Screen` / `AppText`, i18n (uz, ru), UZS/km/date formatters.
- Env validation, `.env.example`, Supabase client that tolerates missing config.
- Tooling: typecheck, ESLint, Jest (8 tests), CI workflow for `my-car/`.

## Phase 1 — Data foundation & vehicles

Decisions required first (see Risks): offline strategy, auth method, application id.

- Supabase project; schema for `profiles`, `vehicles` with RLS; migrations committed as SQL.
- Auth flow (method per decision) and session handling.
- Navigation shell (tabs) replacing the placeholder route.
- Vehicles: list, add, edit (first React Hook Form + Zod form).
- Settings: language switch.

## Phase 2 — Recording

- Fuel log (multi-fuel incl. CNG/propane), consumption logic with unit tests.
- Expenses with categories.
- Maintenance records.
- History feed.

## Phase 3 — Staying ahead

- Documents with expiry dates.
- Reminders (date / mileage) and local notifications (`expo-notifications`).
- Dashboard summarising the selected vehicle.

## Phase 4 — Insight & release

- Analytics (spending by period/category, cost per km).
- Data export.
- EAS Build profiles, signing, Play Store internal testing track, crash reporting.

## Risks and decisions to address next

1. **Repository placement.** My Car lives in `my-car/` of the `rasta` repo only because this
   is the repo the work was requested in. It shares nothing with Rasta; moving it to a
   dedicated repository is recommended before Phase 1 (a `git subtree split` keeps history).
2. **Offline-first vs. online-only.** Determines whether a local database and sync queue are
   needed. Must be decided before the schema.
3. **Auth method.** Phone + SMS OTP needs an Uzbek SMS provider and Supabase custom SMS hook;
   email/Google is faster to ship.
4. **Android application id `uz.mycar.app`** is a placeholder. It is permanent once published
   on Google Play — confirm ownership of the domain/brand first.
5. **Session storage.** Supabase sessions are stored in AsyncStorage (unencrypted). Consider
   `expo-secure-store`-backed storage (with chunking for its size limit) before release.
6. **Brand & design direction.** The palette in `constants/theme.ts` is a neutral placeholder;
   icons/splash are Expo template images.
7. **Expo tooling behind the proxy.** In the build environment api.expo.dev and docs.expo.dev
   were unreachable: `expo install` needed `EXPO_OFFLINE=1`, and two `expo-doctor` checks
   (config schema, React Native Directory) could not run. Re-run `npm run doctor` on an
   unrestricted network.
8. **Not yet run on a device/emulator.** Validation so far is static (typecheck, lint, tests,
   Android bundle export, prebuild). First Phase 1 task: launch on a real Android device.
