import { useTheme } from '@/theme/ThemeProvider';

/** Emphasis used by badges, list-item icons, progress bars and state views. */
export type Tone = 'neutral' | 'brand' | 'success' | 'warning' | 'error' | 'info';

/** Background + foreground pair for a tone. All pairs are contrast-checked. */
export function useToneColors(tone: Tone): { bg: string; fg: string } {
  const { colors } = useTheme();
  switch (tone) {
    case 'brand':
      return { bg: colors.brand.secondary, fg: colors.brand.text };
    case 'success':
      return { bg: colors.successSubtle, fg: colors.success };
    case 'warning':
      return { bg: colors.warningSubtle, fg: colors.warning };
    case 'error':
      return { bg: colors.errorSubtle, fg: colors.error };
    case 'info':
      return { bg: colors.infoSubtle, fg: colors.info };
    case 'neutral':
      return { bg: colors.surface.secondary, fg: colors.text.secondary };
  }
}
