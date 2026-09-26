import { getLocales } from 'expo-localization';

export const LANGUAGES = ['uz', 'ru'] as const;
export type Language = (typeof LANGUAGES)[number];

export function isLanguage(value: unknown): value is Language {
  return typeof value === 'string' && (LANGUAGES as readonly string[]).includes(value);
}

/** Device language if supported, otherwise Uzbek. */
export function detectDeviceLanguage(): Language {
  const code = getLocales()[0]?.languageCode;
  return isLanguage(code) ? code : 'uz';
}
