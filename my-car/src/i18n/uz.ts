// Uzbek (Latin) — the reference dictionary. Every other language must have the same keys.
// Apostrophes: use ʻ (U+02BB) in oʻ / gʻ and ʼ (U+02BC) for tutuq belgisi, never ' or `.
export const uz = {
  'app.name': 'My Car',
  'app.tagline': 'Avtomobilingiz hisobi bir joyda',
  'placeholder.title': 'Tez orada',
  'placeholder.body': 'Ilova ishlab chiqilmoqda.',
} as const;

export type TranslationKey = keyof typeof uz;
