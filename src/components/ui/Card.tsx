import type { ReactNode } from 'react';
import { Pressable, View, type StyleProp, type ViewStyle } from 'react-native';

import type { SpacingToken } from '@/theme';
import { useTheme } from '@/theme/ThemeProvider';

export interface CardProps {
  children: ReactNode;
  /** outlined (default): surface with a hairline border. filled: nested/secondary surface. */
  variant?: 'outlined' | 'filled';
  padding?: SpacingToken;
  /** Makes the whole card a button. Provide accessibilityLabel for it. */
  onPress?: () => void;
  accessibilityLabel?: string;
  accessibilityHint?: string;
  selected?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

/** Flat container: separation comes from a hairline border, not shadows. */
export function Card({
  children,
  variant = 'outlined',
  padding = 'lg',
  onPress,
  accessibilityLabel,
  accessibilityHint,
  selected = false,
  disabled = false,
  style,
  testID,
}: CardProps) {
  const { colors, radius, sizes, spacing } = useTheme();
  const base: ViewStyle = {
    borderRadius: radius.lg,
    padding: spacing[padding],
    backgroundColor: variant === 'filled' ? colors.surface.secondary : colors.surface.primary,
    borderWidth: selected ? 2 : variant === 'outlined' ? sizes.hairline : 0,
    borderColor: selected ? colors.brand.primary : colors.border.subtle,
  };

  if (!onPress) {
    return (
      <View style={[base, style]} testID={testID}>
        {children}
      </View>
    );
  }

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
      accessibilityState={{ disabled, selected }}
      disabled={disabled}
      onPress={onPress}
      testID={testID}
      style={({ pressed }) => [base, pressed && { backgroundColor: colors.background.tertiary }, style]}
    >
      {children}
    </Pressable>
  );
}
