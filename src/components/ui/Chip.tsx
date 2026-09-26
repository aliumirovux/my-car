import { Pressable, StyleSheet } from 'react-native';

import type { IconName } from '@/theme';
import { useTheme } from '@/theme/ThemeProvider';

import { AppText } from './AppText';
import { Icon } from './Icon';

export interface ChipProps {
  label: string;
  selected?: boolean;
  onPress?: () => void;
  icon?: IconName;
  disabled?: boolean;
  testID?: string;
}

const HEIGHT = 32;

/** Filter / choice chip. Selection is shown by color, border and a check mark. */
export function Chip({ label, selected = false, onPress, icon, disabled = false, testID }: ChipProps) {
  const { colors, radius, sizes, spacing } = useTheme();
  const fg = disabled ? colors.text.tertiary : selected ? colors.brand.text : colors.text.primary;
  return (
    <Pressable
      testID={testID}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ selected, disabled }}
      disabled={disabled || !onPress}
      onPress={onPress}
      hitSlop={(sizes.touchTarget - HEIGHT) / 2}
      style={({ pressed }) => [
        styles.chip,
        {
          height: HEIGHT,
          borderRadius: radius.sm,
          paddingHorizontal: spacing.md,
          gap: spacing.xs,
          borderWidth: sizes.hairline,
          borderColor: selected ? colors.brand.primary : colors.border.default,
          backgroundColor: selected
            ? colors.brand.secondary
            : pressed
              ? colors.background.tertiary
              : colors.surface.primary,
        },
      ]}
    >
      {selected ? (
        <Icon name="check" size={sizes.iconSm} color={fg} />
      ) : icon ? (
        <Icon name={icon} size={sizes.iconSm} color={fg} />
      ) : null}
      <AppText variant="label" style={{ color: fg }} numberOfLines={1}>
        {label}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: { flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start' },
});
