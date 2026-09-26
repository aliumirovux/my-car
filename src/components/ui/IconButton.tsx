import { ActivityIndicator, Pressable, type PressableProps } from 'react-native';

import type { IconName } from '@/theme';
import { useTheme } from '@/theme/ThemeProvider';

import { Icon } from './Icon';

export interface IconButtonProps extends Omit<PressableProps, 'children' | 'style'> {
  icon: IconName;
  /** Required: an icon alone has no accessible name. */
  accessibilityLabel: string;
  variant?: 'plain' | 'tonal' | 'filled';
  selected?: boolean;
  loading?: boolean;
}

/** Always a 44×44 touch target. */
export function IconButton({
  icon,
  accessibilityLabel,
  variant = 'plain',
  selected = false,
  loading = false,
  disabled,
  ...rest
}: IconButtonProps) {
  const { colors, radius, sizes } = useTheme();
  const inactive = Boolean(disabled) || loading;

  const restBg = {
    plain: 'transparent',
    tonal: colors.surface.secondary,
    filled: colors.brand.primary,
  }[variant];
  const pressedBg = variant === 'filled' ? colors.brand.primaryPressed : colors.background.tertiary;
  const fg = disabled
    ? colors.text.tertiary
    : variant === 'filled'
      ? colors.brand.onPrimary
      : selected
        ? colors.brand.text
        : colors.text.primary;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ disabled: inactive, busy: loading, selected }}
      disabled={inactive}
      style={({ pressed }) => ({
        width: sizes.touchTarget,
        height: sizes.touchTarget,
        borderRadius: radius.full,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: pressed
          ? pressedBg
          : selected && variant !== 'filled'
            ? colors.brand.secondary
            : disabled && variant === 'filled'
              ? colors.background.tertiary
              : restBg,
      })}
      {...rest}
    >
      {loading ? <ActivityIndicator size="small" color={fg} /> : <Icon name={icon} color={fg} />}
    </Pressable>
  );
}
