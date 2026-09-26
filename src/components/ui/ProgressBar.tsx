import { View } from 'react-native';

import { useTheme } from '@/theme/ThemeProvider';

export interface ProgressBarProps {
  /** 0…1; values outside are clamped. */
  value: number;
  tone?: 'brand' | 'success' | 'warning' | 'error';
  /** What is measured, e.g. "Oil change interval used". */
  accessibilityLabel: string;
}

export function clampProgress(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.min(1, Math.max(0, value));
}

export function ProgressBar({ value, tone = 'brand', accessibilityLabel }: ProgressBarProps) {
  const { colors, radius } = useTheme();
  const fraction = clampProgress(value);
  const fill = { brand: colors.brand.primary, success: colors.success, warning: colors.warning, error: colors.error }[tone];
  return (
    <View
      accessible
      accessibilityRole="progressbar"
      accessibilityLabel={accessibilityLabel}
      accessibilityValue={{ min: 0, max: 100, now: Math.round(fraction * 100) }}
      style={{ height: 6, borderRadius: radius.full, backgroundColor: colors.background.tertiary, overflow: 'hidden' }}
    >
      <View style={{ width: `${fraction * 100}%`, height: '100%', borderRadius: radius.full, backgroundColor: fill }} />
    </View>
  );
}
