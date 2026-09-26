# My Car — Architecture

Describes what is in the repository **now** (Phase 0) and the rules new code must follow.
Sections marked *Planned* are decisions for upcoming phases, not implemented code.

## 1. Repository

A single Expo app at the repository root. Native `android/` and `ios/` folders are not
committed — they are generated from `app.json` (Continuous Native Generation).

## 2. Stack

| Concern | Choice | Notes |
|---|---|---|
| Runtime | Expo SDK 57, React Native 0.86, React 19.2, Hermes | Managed workflow, Continuous Native Generation — `android/` / `ios/` are generated, never committed |
| Language | TypeScript 6, `strict` + `noUncheckedIndexedAccess` | |
| Navigation | Expo Router (file-based, typed routes) | Routes in `src/app/` |
| State | Zustand 5 (+ `persist` → AsyncStorage) | Client/UI state only |
| Backend | Supabase (`@supabase/supabase-js`) | anon key + RLS only |
| Forms | React Hook Form + Zod (`@hookform/resolvers`) | Installed; first used in Phase 1 |
| Validation | Zod 4 | Env, forms, API payloads |
| i18n | In-house typed dictionaries + `expo-localization` | See §5 |
| Tests | Jest 29 + `jest-expo` | |
| Lint | ESLint 9 flat config + `eslint-config-expo` | |

## 3. Source layout

```
./
  app.json            Expo config (name, android.package, scheme, plugins)
  assets/             icons, splash
  src/
    app/              ROUTES ONLY. Each file is a screen; _layout.tsx defines navigators.
    features/<name>/  Feature modules (vehicles, dashboard, fuel, expenses, maintenance,
                      documents, reminders, analytics, history, settings)
    components/       Shared, feature-agnostic UI (Screen, AppText, …)
    hooks/            Shared React hooks (useTheme, …)
    stores/           Global Zustand stores (settings)
    services/         Cross-feature data access (Supabase queries, sync) — empty for now
    lib/              Configured third-party clients (env, supabase)
    types/            Shared domain types — empty for now
    utils/            Pure functions, no React/RN imports (format)
    constants/        Design tokens and app constants (theme)
    i18n/             Dictionaries + translation hook
```

The import alias `@/…` maps to `src/…`.

### Feature module contract

Each `src/features/<name>/` will contain, as needed:

```
features/fuel/
  components/   UI used only by this feature
  hooks/        useFuelEntries, useAddFuelEntry …  (UI ↔ data glue)
  api.ts        Supabase / local data access for this feature
  schema.ts     Zod schemas (form + persistence), types inferred from them
  logic.ts      Pure business rules (e.g. consumption calculation) — unit tested
  index.ts      Public surface; other code imports only from here
```

Rules:

1. **Routes are thin.** A file in `src/app/` composes feature components and hooks; it holds
   no business logic or data access.
2. **Business logic lives in pure functions** (`logic.ts`, `utils/`) with no React or
   React Native imports, so it is unit-testable in Node.
3. **Features don't reach into each other's internals** — only via `index.ts`.
4. **No raw colors or font sizes in components** — use `useTheme()` tokens from
   `constants/theme.ts`.
5. **No user-visible string literals in components** — use `useT()`.

## 4. What exists today

| File | Role |
|---|---|
| `src/app/_layout.tsx` | Root `Stack`, `SafeAreaProvider`, status bar following the color scheme |
| `src/app/index.tsx` | Temporary placeholder route (app name + "coming soon"). Replaced in Phase 1 |
| `src/components/Screen.tsx`, `AppText.tsx` | Safe-area screen container; themed text |
| `src/constants/theme.ts` | Light/dark palettes, spacing, radius, typography, 48dp touch target |
| `src/hooks/useTheme.ts` | Picks the palette from the system color scheme |
| `src/lib/env.ts` | Zod-validated `EXPO_PUBLIC_*` config; `null` when not configured |
| `src/lib/supabase.ts` | Supabase client (AsyncStorage session, foreground-only token refresh); `null` without env |
| `src/i18n/*` | `uz` (reference) and `ru` dictionaries, `useT()`, device-language detection |
| `src/stores/settings.ts` | Persisted language preference |
| `src/utils/format.ts` | UZS money, km, number grouping, `dd.mm.yyyy` |

## 5. i18n

- `uz.ts` is the reference dictionary; `ru.ts` is typed as `Record<TranslationKey, string>`,
  so a missing Russian key is a compile error.
- Keys are flat, dot-namespaced by feature (`fuel.addEntry.title`).
- Uzbek Latin uses **ʻ (U+02BB)** in oʻ/gʻ and **ʼ (U+02BC)** for the tutuq belgisi — never
  ASCII `'`. Search/normalisation code must treat all apostrophe variants as equal.
- Number/date formatting is hand-written in `utils/format.ts` rather than `Intl`, because
  Hermes locale data for `uz` is not reliable across Android versions.
- No i18n library for now: a flat dictionary covers the need. Revisit if pluralisation
  rules (Russian has three plural forms) become common — that is the trigger to adopt one.

## 6. Data & backend (*Planned* — Phase 1 decision)

Supabase is the backend. Constraints already fixed:

- The app ships only the **anon/publishable key**. All tables must have **RLS enabled**
  with policies scoped to `auth.uid()`. The service-role key never enters this repo.
- Records get client-generated UUIDs, so creates are idempotent if an offline sync layer
  is added.
- Money is stored as integer soʻm; odometer as integer km; timestamps as `timestamptz`.

Open decision (blocks Phase 1 schema work): **online-only vs. offline-first.**
Offline-first needs a local store (e.g. `expo-sqlite`) and a sync queue; online-only is
far simpler but fails on poor connectivity. See PRODUCT_SPEC.md §6 Q1.

## 7. Configuration & secrets

- `.env` (git-ignored) holds `EXPO_PUBLIC_SUPABASE_URL` and `EXPO_PUBLIC_SUPABASE_ANON_KEY`;
  template in `.env.example`. `EXPO_PUBLIC_*` values are embedded in the APK and must be
  treated as public.
- `lib/env.ts` must read each variable as a literal `process.env.EXPO_PUBLIC_X` — Expo only
  inlines literal member expressions.
- When env is missing the app still starts; `supabase` is `null` and callers must handle it.
- Android application id: `uz.mycar.app` (placeholder — see ROADMAP.md, Risks).
- Deep-link scheme: `mycar://` (needed for auth redirects).

## 8. Development

```bash
npm install
cp .env.example .env         # optional until Supabase is used
npm run android              # expo start --android (Expo Go or dev build)
npm run validate             # typecheck + lint + tests
npm run doctor               # expo-doctor
```

Add native packages with `npx expo install <pkg>` (SDK-matched versions). Behind a proxy
that blocks api.expo.dev, prefix with `EXPO_OFFLINE=1`.

CI: `.github/workflows/ci.yml` runs `npm run validate` on pushes to `main` and on pull requests.
