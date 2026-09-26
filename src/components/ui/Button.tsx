import { ActivityIndicator, Pressable, StyleSheet, View, type PressableProps } from 'react-native';

import type { IconName } from '@/theme';
import { useTheme } from '@/theme/ThemeProvider';

import { AppText } from './AppText';
import { Icon } from './Icon';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'destructive';

export interface ButtonProps extends Omit<PressableProps, 'children' | 'style'> {
  label: string;
  variant?: ButtonVariant;
  size?: 'md' | 'sm';
  icon?: IconName;
  loading?: boolean;
  fullWidth?: boolean;
}

/**
 * Use one primary button per screen area. Secondary for alternatives, tertiary for low-emphasis
 * actions (links, "See all"), destructive for delete/remove.
 */
export function Button({
  label,
  variant = 'primary',
  size = 'md',
  icon,
  loading = false,
  fullWidth = false,
  disabled,
  accessibilityLabel,
  accessibilityHint,
  ...rest
}: ButtonProps) {
  const { colors, radius, sizes, spacing } = useTheme();
  const inactive = Boolean(disabled) || loading;

  const palette = {
    primary: { bg: colors.brand.primary, pressed: colors.brand.primaryPressed, fg: colors.brand.onPrimary, border: undefined },
    secondary: { bg: colors.surface.primary, pressed: colors.background.tertiary, fg: colors.text.primary, border: colors.border.strong },
    tertiary: { bg: 'transparent', pressed: colors.brand.secondary, fg: colors.brand.text, border: undefined },
    destructive: { bg: colors.errorSubtle, pressed: colors.errorSubtle, fg: colors.error, border: undefined },
  }[variant];

  const fg = disabled ? colors.text.tertiary : palette.fg;
  const height = size === 'md' ? sizes.control : sizes.controlSmall;
  const hitSlop = Math.max(0, (sizes.touchTarget - height) / 2);

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityHint={accessibilityHint}
      accessibilityState={{ disabled: inactive, busy: loading }}
      disabled={inactive}
      hitSlop={hitSlop}
      style={({ pressed }) => [
        styles.base,
        {
          minHeight: height,
          borderRadius: radius.md,
          paddingHorizontal: size === 'md' ? spacing.xl : spacing.lg,
          backgroundColor: disabled && variant !== 'tertiary' ? colors.background.tertiary : pressed ? palette.pressed : palette.bg,
          borderColor: disabled ? colors.border.default : palette.border,
          borderWidth: palette.border ? sizes.hairline : 0,
          opacity: pressed && variant === 'destructive' ? 0.75 : 1,
        },
        fullWidth && styles.fullWidth,
      ]}
      {...rest}
    >
      <View style={[styles.content, { gap: spacing.sm }]}>
        {loading ? (
          <ActivityIndicator size="small" color={fg} testID="button-spinner" />
        ) : icon ? (
          <Icon name={icon} size={sizes.iconMd} color={fg} />
        ) : null}
        <AppText variant={size === 'md' ? 'button' : 'label'} style={{ color: fg }} numberOfLines={1}>
          {label}
        </AppText>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: { alignItems: 'center', justifyContent: 'center', alignSelf: 'flex-start' },
  fullWidth: { alignSelf: 'stretch' },
  content: { flexDirection: 'row', alignItems: 'center' },
});
