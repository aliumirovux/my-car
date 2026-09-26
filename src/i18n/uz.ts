// Uzbek (Latin) — the reference dictionary. Every other language must have the same keys.
// Apostrophes: use ʻ (U+02BB) in oʻ / gʻ and ʼ (U+02BC) for tutuq belgisi, never ' or `.
export const uz = {
  'app.name': 'My Car',
  'app.tagline': 'Avtomobilingiz hisobi bir joyda',
  'placeholder.title': 'Tez orada',
  'placeholder.body': 'Ilova ishlab chiqilmoqda.',
  'common.close': 'Yopish',
  'common.retry': 'Qayta urinish',
  'common.loading': 'Yuklanmoqda…',
  'common.select': 'Tanlang',
  'common.error.title': 'Nimadir notoʻgʻri ketdi',
  'common.error.message': 'Maʼlumotni yuklab boʻlmadi. Qayta urinib koʻring.',
} as const;

export type TranslationKey = keyof typeof uz;
