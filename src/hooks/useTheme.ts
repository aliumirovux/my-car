import { useColorScheme } from 'react-native';

import { palettes, radius, spacing, typography } from '@/constants/theme';

export function useTheme() {
  const scheme = useColorScheme() === 'dark' ? 'dark' : 'light';
  return { scheme, colors: palettes[scheme], spacing, radius, typography } as const;
}
