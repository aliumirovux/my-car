import { Text, type TextProps } from 'react-native';

import { useTheme } from '@/theme/ThemeProvider';
import type { TypographyVariant } from '@/theme';

export type TextTone =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'inverse'
  | 'brand'
  | 'onBrand'
  | 'success'
  | 'warning'
  | 'error'
  | 'info';

export interface AppTextProps extends TextProps {
  variant?: TypographyVariant;
  tone?: TextTone;
  /** Tabular (fixed-width) digits — use for amounts, odometer, dates in columns. */
  tabular?: boolean;
  align?: 'left' | 'center' | 'right';
}

export function AppText({ variant = 'body', tone = 'primary', tabular, align, style, ...rest }: AppTextProps) {
  const { colors, typography } = useTheme();
  const token = typography[variant];
  const color = {
    primary: colors.text.primary,
    secondary: colors.text.secondary,
    tertiary: colors.text.tertiary,
    inverse: colors.text.inverse,
    brand: colors.brand.text,
    onBrand: colors.brand.onPrimary,
    success: colors.success,
    warning: colors.warning,
    error: colors.error,
    info: colors.info,
  }[tone];

  return (
    <Text
      maxFontSizeMultiplier={token.maxScale}
      style={[
        token.style,
        { color },
        tabular && { fontVariant: ['tabular-nums'] },
        align && { textAlign: align },
        style,
      ]}
      {...rest}
    />
  );
}
