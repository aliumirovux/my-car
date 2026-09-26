import { render, type RenderOptions } from '@testing-library/react-native';
import type { ReactElement, ReactNode } from 'react';

import { SnackbarProvider } from '@/components/ui/Snackbar';
import { useSettingsStore } from '@/stores/settings';
import { ThemeProvider } from '@/theme/ThemeProvider';

/** Renders inside the app's providers. `scheme` forces light or dark. */
export function renderWithTheme(ui: ReactElement, { scheme = 'light', ...options }: RenderOptions & { scheme?: 'light' | 'dark' } = {}) {
  useSettingsStore.setState({ themePreference: scheme, language: 'uz' });
  const Wrapper = ({ children }: { children: ReactNode }) => (
    <ThemeProvider>
      <SnackbarProvider>{children}</SnackbarProvider>
    </ThemeProvider>
  );
  return render(ui, { wrapper: Wrapper, ...options });
}
