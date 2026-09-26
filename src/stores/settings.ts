import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { detectDeviceLanguage, type Language } from '@/i18n/languages';

export type ThemePreference = 'system' | 'light' | 'dark';

interface SettingsState {
  language: Language;
  themePreference: ThemePreference;
  setLanguage: (language: Language) => void;
  setThemePreference: (preference: ThemePreference) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      language: detectDeviceLanguage(),
      themePreference: 'system',
      setLanguage: (language) => set({ language }),
      setThemePreference: (themePreference) => set({ themePreference }),
    }),
    {
      name: 'settings',
      version: 1,
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
