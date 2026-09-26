# My Car — Design System

The design system is the single source of visual and interaction decisions for My Car. It is
implemented in code: tokens in `src/theme/`, components in `src/components/ui/` and
`src/components/domain/`. This document explains the decisions; the code is authoritative.

**See it running:** in a development build, the placeholder home screen has a
"Design system" button that opens `/design-system`. That gallery shows every component in
every state, with a Light/Dark/System switch. Release builds redirect it away.

## 1. Direction

Modern, minimal, premium, trustworthy. Closer to a banking app than a car forum.

| Do | Don't |
|---|---|
| Flat surfaces separated by hairline borders and tone | Shadows for hierarchy (only overlays use a scrim) |
| Solid colors | Gradients |
| Modest radii (6–16) | Pill-shaped cards, bubbly UI |
| One primary action per area | Several purple buttons competing |
| Numbers first, in tabular digits | Decorative illustrations, emoji |
| Status as text + color + icon | Status as color only |

### Using the brand color (#595FEB)

The brand color marks **where to act and what is selected**. It is not decoration.

- **Use it for:** the primary button, selected states (chip, card and segment borders, list
  checkmarks), focus rings, progress fills, links and tertiary buttons (as `brand.text`), and
  the selected tab (later).
- **Don't use it for:** headers, backgrounds, card fills, list icons, body text or charts by default.

## 2. Theme structure

```
src/theme/
  colors.ts         ColorTokens interface + lightColors / darkColors
  typography.ts     10 text styles + dynamic-type caps
  layout.ts         spacing, radius, sizes (touch target, control heights), motion
  icons.ts          semantic icon name → Material Community Icons glyph
  index.ts          Theme type, themes.light / themes.dark
  ThemeProvider.tsx ThemeProvider, useTheme(), resolveScheme()
```

```ts
const { colors, typography, spacing, radius, sizes, motion, scheme } = useTheme();
```

- `ThemeProvider` resolves the user's preference (`System` / `Light` / `Dark`, stored in
  `stores/settings.ts` as `themePreference`) against the OS scheme. It also sets the native
  root background through `expo-system-ui`, so there is no white flash in dark mode.
- Components never import raw hex values. Every color comes from `useTheme().colors`.

## 3. Color tokens

| Token | Light | Dark | Use |
|---|---|---|---|
| background.primary | `#F6F7F9` | `#0D0E11` | Screen canvas |
| background.secondary | `#EEF0F3` | `#141619` | Grouped / banded areas |
| background.tertiary | `#E3E6EA` | `#1C1F24` | Pressed rows, wells, skeletons, disabled fills |
| surface.primary | `#FFFFFF` | `#16181C` | Cards, sheets, dialogs, inputs |
| surface.secondary | `#F2F3F6` | `#1F2227` | Nested areas: segmented track, icon wells |
| surface.inverse | `#1D2026` | `#E8EAED` | Snackbar |
| text.primary | `#111318` | `#F1F2F4` | Main text |
| text.secondary | `#454C57` | `#B3B9C2` | Supporting text, labels |
| text.tertiary | `#5B636F` | `#8E95A1` | Placeholders, meta, disabled text |
| text.inverse | `#FFFFFF` | `#111318` | Text on surface.inverse |
| border.default | `#D9DDE3` | `#30343C` | Dividers, disabled outlines |
| border.subtle | `#E8EAEE` | `#23262C` | Card hairlines |
| brand.primary | `#595FEB` | `#595FEB` | Primary action fill, selection, focus |
| brand.primaryPressed | `#474CD1` | `#4A50DC` | Pressed primary |
| brand.secondary | `#ECEDFD` | `#23254B` | Selected / brand-tinted background |
| success | `#157347` | `#4CC38A` | Status text/icon |
| warning | `#9A5700` | `#EFA846` | Status text/icon |
| error | `#C2302B` | `#F2736B` | Status text/icon, input error |
| info | `#1F63C4` | `#6FA8F5` | Status text/icon |

**Added beyond the requested set, each for a specific accessibility or usage reason:**

| Token | Why |
|---|---|
| `border.strong` (`#858D99` / `#6E7582`) | Input and control outlines must reach 3:1 against the surface (WCAG 1.4.11). `border.default` is for dividers only |
| `brand.onPrimary` | Text on the brand fill |
| `brand.text` (`#4A50DC` / `#A3A7F7`) | #595FEB as text is only 3.9:1 on the dark canvas. Brand-colored text uses this token instead |
| `brand.textInverse` | Snackbar action on the inverse surface |
| `successSubtle`, `warningSubtle`, `errorSubtle`, `infoSubtle` | Badge and state backgrounds. Each status color reaches ≥ 4.5:1 on its own subtle background |
| `overlay` | Scrim behind sheets and dialogs |

### Dark mode is designed, not inverted

- The canvas is near-black (`#0D0E11`), not pure black. Surfaces get **lighter** as they rise
  (canvas < card < nested), which replaces shadows as the depth cue.
- The brand fill stays `#595FEB`, so white text keeps its 4.93:1 contrast. Brand **text**
  switches to a lighter tint.
- Status colors are re-tuned lighter and less saturated. Their subtle backgrounds are dark tints, not light pastels.
- The inverse surface flips: the snackbar is dark in light mode and light in dark mode.

## 4. Typography

The app uses the system font: Roboto on Android, SF Pro on iOS. It has the best small-size
rendering, needs no download, and covers Uzbek Latin (oʻ, gʻ, ʼ) and Cyrillic. Amounts, odometer
values and dates use **tabular digits** (`<AppText tabular>`), so columns line up.

| Style | Size / line height | Weight | Max scale | Use |
|---|---|---|---|---|
| display | 34 / 40 | 700 | 1.3× | Hero numbers (monthly cost) |
| heading1 | 28 / 34 | 700 | 1.4× | Screen titles |
| heading2 | 22 / 28 | 600 | 1.5× | Stat values, section titles on large screens |
| heading3 | 18 / 24 | 600 | 1.6× | Section headers, card titles, dialog titles |
| bodyLarge | 18 / 26 | 400 | 1.8× | Emphasized reading text |
| body | 16 / 24 | 400 | 2.0× | Default text, inputs, list titles |
| bodySmall | 14 / 20 | 400 | 2.0× | Subtitles, helper and error text |
| caption | 12 / 16 | 400 | 2.0× | Badges, meta |
| label | 14 / 20 | 500 | 1.8× | Field labels, chips, segments |
| button | 16 / 20 | 600 | 1.6× | Button labels |

The body text is 16, not 14: many users read at arm's length, often at a fuel station.

## 5. Spacing, radius, sizes, motion

**Spacing:** a 4 px grid (`xxs` = 2 exists for hairline gaps only).

| xxs | xs | sm | md | lg | xl | xxl | xxxl | huge | giant |
|---|---|---|---|---|---|---|---|---|---|
| 2 | 4 | 8 | 12 | 16 | 20 | 24 | 32 | 40 | 48 |

**Radius:** `sm` 6 (badges, chips, segments) · `md` 8 (buttons, inputs, icon wells) · `lg` 12
(cards) · `xl` 16 (sheets, dialogs) · `full` (icon buttons, progress bars).

**Sizes:**

| Size | Value |
|---|---|
| Touch target | 44 |
| Control height (buttons, inputs, selects) | 48 |
| Small control | 36 + hitSlop |
| List row minimum | 56 |
| Icons | 16 / 20 / 24 |
| Screen padding | 16 |

**Motion:** 150 ms (dismiss), 220 ms (enter), 300 ms. Only sheets, snackbars and dialogs animate.
Every animation drops to 0 ms when the OS "reduce motion" setting is on (`useReducedMotion`).

**Elevation:** none. Depth comes from surface tone and hairline borders. Overlays use the `overlay` scrim.

## 6. Iconography

- **One family:** Material Community Icons (via `@expo/vector-icons`), outline style where it
  exists. It was chosen for its automotive coverage: fuel pump, EV station, gas cylinder, car
  wash, car wrench, speedometer.
- **Semantic names only.** Code uses `<Icon name="fuel" />`, never a glyph name. The map lives in
  `src/theme/icons.ts`, and a test checks that every glyph exists.
- Sizes are 16 (inline), 20 (rows and buttons) and 24 (default). Icon color follows the text
  color it sits beside.
- Icons are decorative for screen readers. The control around the icon carries the label.
  `IconButton` makes `accessibilityLabel` a **required** prop.
- No emoji anywhere in the UI.

## 7. Components

`@/components/ui`: primitives.

| Component | Purpose | Notes |
|---|---|---|
| AppText | All text | `variant`, `tone`, `tabular`, `align`; applies dynamic-type caps |
| Icon | Semantic icon | Hidden from screen readers |
| Button | Actions | `primary` / `secondary` / `tertiary` / `destructive`; `md` 48 / `sm` 36 + hitSlop; `icon`, `loading`, `fullWidth` |
| IconButton | Icon-only action | 44×44; `plain` / `tonal` / `filled`; `selected`, `loading`; label required |
| Card | Container | `outlined` / `filled`; optional `onPress`, `selected` |
| Input | Text entry | Visible label, `suffix` (L, km, soʻm), `leadingIcon`, `helperText`, `error`, focus ring |
| Select | Pick one of many | Same anatomy as Input; opens a BottomSheet of radio options |
| SegmentedControl | 2–4 exclusive options | Radio group semantics |
| Chip | Filters / choices | Selected shows fill, border and a checkmark |
| Badge | Status label | Tones: neutral, brand, success, warning, error, info; optional icon |
| Snackbar | Transient feedback | `useSnackbar().show({ message, actionLabel, onAction, tone })`; announced to screen readers; one at a time |
| BottomSheet | Contextual choices, Add menu | Backdrop, close button and Android back all close it; handles safe area |
| Modal | Decisions / confirmations | Title, message, primary and secondary actions; `destructive`; locked while loading |
| ListItem | Rows in lists | Leading icon well, subtitle, trailing value (tabular), chevron, selected |
| SectionHeader | Section title + action | Title is an accessibility header |
| StatCard | KPI tile | `large` (display) / `compact`; skeleton while loading; read as one phrase |
| ProgressBar | Interval used | Clamped 0–1, exposes a percentage value |
| Skeleton | Placeholder | Static block, no shimmer |
| EmptyState | No data yet | Icon, title, message, next action |
| ErrorState | Load failed | Localized defaults, Retry with a loading state |
| LoadingState | Waiting | `spinner` or `list` skeleton; busy for screen readers |
| Screen | Screen root | Safe area, canvas color, padding, optional scroll |

`@/components/domain`: presentational building blocks for My Car. They take **formatted
strings and statuses**; the business rules that compute them stay in `src/features/*`.

| Component | Shows |
|---|---|
| VehicleCard | Display name, details (year · plate), odometer, car status badge, selected state |
| ExpenseRow | Category or fuel icon, title, date/details, amount |
| MaintenanceRow | Service type, due text, status badge, interval progress |
| DocumentRow | Document, expiry text, status badge (hidden for Replaced, DOC-6) |

`status.ts` maps business-rule statuses to tones in one place: maintenance MNT-8…10, documents
DOC-5/6, car status DASH-S1. It also maps expense categories (COST-2) and fuel groups (FUEL-1) to icons.

## 8. Interaction states

| Component | Default | Pressed | Disabled | Loading | Error | Selected |
|---|---|---|---|---|---|---|
| Button | ✓ | ✓ | ✓ | ✓ | — | — |
| IconButton | ✓ | ✓ | ✓ | ✓ | — | ✓ |
| Card (pressable) | ✓ | ✓ | ✓ | — | — | ✓ |
| Input | ✓ (+ focus) | — | ✓ | — | ✓ | — |
| Select | ✓ | ✓ | ✓ | — | ✓ | ✓ (options) |
| SegmentedControl | ✓ | ✓ | ✓ | — | — | ✓ |
| Chip | ✓ | ✓ | ✓ | — | — | ✓ |
| ListItem | ✓ | ✓ | ✓ | — | — | ✓ |
| StatCard | ✓ | ✓ (if pressable) | — | ✓ (skeleton) | — | — |
| Modal | ✓ | — | ✓ (cancel while busy) | ✓ | — | — |
| ErrorState | ✓ | — | — | ✓ (retrying) | ✓ | — |
| Domain rows | ✓ | ✓ | ✓ | — | — | ✓ (VehicleCard) |

- **Pressed** uses a color change (`brand.primaryPressed` for primary, `background.tertiary`
  for others), not ripples or scale. It is consistent across platforms.
- **Disabled** uses `background.tertiary` + `text.tertiary` (still 4.85:1 readable), not a
  translucent opacity.
- **Loading** keeps the label and width, adds a spinner, sets `busy` and blocks presses.
- **Error** thickens the border to 2 px in `error` and adds an icon + message. The message is
  announced (live region) and exposed as the field's accessibility hint.

## 9. Accessibility

| Decision | Implementation |
|---|---|
| Contrast | WCAG 2.1 AA. Text ≥ 4.5:1 and control boundaries / graphics ≥ 3:1, in **both** themes. Enforced by `src/theme/__tests__/contrast.test.ts` (45 pairs × 2 themes); a token change that breaks contrast fails CI |
| Touch targets | ≥ 44×44. Controls are 48 high; smaller visuals (chips 32, small buttons 36) get `hitSlop` up to 44. Tested |
| Screen readers | Every interactive component has a role (button, radio, radiogroup, progressbar, header) and state (disabled, busy, selected, checked, expanded). Composite rows read as one phrase ("Oil, Due soon, In 3 800 km") |
| Labels | Inputs always show a visible label, which is also the accessible name. Placeholders are never labels. Icon-only buttons require a label (type-enforced) |
| Status | Never color-only: badges carry text and an icon |
| Dynamic text | System font scaling is on, capped per style (1.3× display … 2.0× body) so layouts hold. Components use min-heights, not fixed heights, so they grow |
| Motion | Respects "reduce motion" (animations become instant) |
| Announcements | Snackbar messages and field errors are announced |
| Modality | Sheets and dialogs set `accessibilityViewIsModal`; Android back closes them |

Tested contrast (selection):

| Pair | Light | Dark |
|---|---|---|
| text.primary / background.primary | 17.33 | 17.23 |
| text.secondary / surface.primary | 8.66 | 9.00 |
| text.tertiary / background.tertiary (worst case) | 4.85 | 5.48 |
| brand.onPrimary / brand.primary | 4.93 | 4.93 |
| brand.text / surface.primary | 6.05 | 7.98 |
| error / errorSubtle | 4.75 | 5.64 |
| warning / surface.primary | 5.62 | 8.77 |
| text.inverse / surface.inverse | 16.32 | 15.42 |
| border.strong / surface.primary | 3.35 | 3.83 |

## 10. Rules for contributors

1. Build screens from these components. If something is missing, add it here with its states,
   a test and a gallery entry. Don't write a one-off in a feature.
2. No hex values, font sizes or magic spacing numbers outside `src/theme/`.
3. No user-visible strings inside `ui/` components beyond the shared `common.*` keys. Callers
   pass localized text.
4. A new color pairing requires a line in the contrast test.
5. A new icon means a semantic name in `icons.ts`, not a raw glyph in a component.
