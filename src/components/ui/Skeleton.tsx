import type { DimensionValue } from 'react-native';
import { View } from 'react-native';

import type { RadiusToken } from '@/theme';
import { useTheme } from '@/theme/ThemeProvider';

export interface SkeletonProps {
  width?: DimensionValue;
  height?: number;
  radius?: RadiusToken;
}

/** Static placeholder block (no shimmer: calmer, and friendly to reduced motion). */
export function Skeleton({ width = '100%', height = 16, radius = 'sm' }: SkeletonProps) {
  const theme = useTheme();
  return (
    <View
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      style={{ width, height, borderRadius: theme.radius[radius], backgroundColor: theme.colors.background.tertiary }}
    />
  );
}
