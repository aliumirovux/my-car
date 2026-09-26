import { useSettingsStore } from '@/stores/settings';

import type { Language } from './languages';
import { ru } from './ru';
import { uz, type TranslationKey } from './uz';

export { LANGUAGES, detectDeviceLanguage, isLanguage, type Language } from './languages';
export type { TranslationKey };

const dictionaries: Record<Language, Record<TranslationKey, string>> = { uz, ru };

export function translate(language: Language, key: TranslationKey): string {
  return dictionaries[language][key] ?? uz[key];
}

export function useT() {
  const language = useSettingsStore((s) => s.language);
  return (key: TranslationKey) => translate(language, key);
}
