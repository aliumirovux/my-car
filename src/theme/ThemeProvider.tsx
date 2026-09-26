import * as SystemUI from 'expo-system-ui';
import { createContext, useContext, useEffect, useMemo, type ReactNode } from 'react';
import { useColorScheme } from 'react-native';

import { useSettingsStore } from '@/stores/settings';

import { themes, type ColorScheme, type Theme } from './index';

const ThemeContext = createContext<Theme>(themes.light);

/** Resolves the user's preference (System / Light / Dark) against the OS scheme. */
export function resolveScheme(preference: 'system' | ColorScheme, system: string | null | undefined): ColorScheme {
  if (preference !== 'system') return preference;
  return system === 'dark' ? 'dark' : 'light';
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const system = useColorScheme();
  const preference = useSettingsStore((s) => s.themePreference);
  const theme = useMemo(() => themes[resolveScheme(preference, system)], [preference, system]);

  // Root view background (visible behind transitions and the Android navigation bar).
  useEffect(() => {
    SystemUI.setBackgroundColorAsync(theme.colors.background.primary).catch(() => {});
  }, [theme]);

  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
}

export function useTheme(): Theme {
  return useContext(ThemeContext);
}
