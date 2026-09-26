import { Text, type TextProps } from 'react-native';

import type { ColorToken, TypographyVariant } from '@/constants/theme';
import { useTheme } from '@/hooks/useTheme';

interface AppTextProps extends TextProps {
  variant?: TypographyVariant;
  color?: ColorToken;
}

export function AppText({ variant = 'body', color = 'text', style, ...rest }: AppTextProps) {
  const { colors, typography } = useTheme();
  return <Text style={[typography[variant], { color: colors[color] }, style]} {...rest} />;
}
