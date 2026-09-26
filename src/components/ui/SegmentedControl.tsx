import { Pressable, StyleSheet, View } from 'react-native';

import { useTheme } from '@/theme/ThemeProvider';

import { AppText } from './AppText';

export interface SegmentedOption<T extends string> {
  value: T;
  label: string;
}

export interface SegmentedControlProps<T extends string> {
  options: readonly SegmentedOption<T>[];
  value: T;
  onChange: (value: T) => void;
  /** Describes the group for screen readers, e.g. "Period". */
  accessibilityLabel: string;
  disabled?: boolean;
}

/** 2–4 mutually exclusive options (periods, theme). Use Select for longer lists. */
export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  accessibilityLabel,
  disabled = false,
}: SegmentedControlProps<T>) {
  const { colors, radius, sizes, spacing } = useTheme();
  return (
    <View
      accessibilityRole="radiogroup"
      accessibilityLabel={accessibilityLabel}
      style={[
        styles.track,
        { minHeight: sizes.touchTarget, borderRadius: radius.md, backgroundColor: colors.surface.secondary, padding: spacing.xxs },
      ]}
    >
      {options.map((option) => {
        const selected = option.value === value;
        return (
          <Pressable
            key={option.value}
            accessibilityRole="radio"
            accessibilityLabel={option.label}
            accessibilityState={{ checked: selected, disabled }}
            disabled={disabled}
            onPress={() => onChange(option.value)}
            style={({ pressed }) => [
              styles.segment,
              {
                borderRadius: radius.sm,
                paddingHorizontal: spacing.sm,
                backgroundColor: selected ? colors.surface.primary : pressed ? colors.background.tertiary : 'transparent',
                borderWidth: selected ? sizes.hairline : 0,
                borderColor: colors.border.default,
              },
            ]}
          >
            <AppText
              variant="label"
              tone={disabled ? 'tertiary' : selected ? 'primary' : 'secondary'}
              numberOfLines={1}
              style={selected && styles.selectedText}
            >
              {option.label}
            </AppText>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  track: { flexDirection: 'row' },
  segment: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  selectedText: { fontWeight: '600' },
});
