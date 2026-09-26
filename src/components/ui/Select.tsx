import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { useT } from '@/i18n';
import type { IconName } from '@/theme';
import { useTheme } from '@/theme/ThemeProvider';

import { AppText } from './AppText';
import { BottomSheet } from './BottomSheet';
import { Icon } from './Icon';
import { ListItem } from './ListItem';

export interface SelectOption<T extends string> {
  value: T;
  label: string;
  description?: string;
  icon?: IconName;
}

export interface SelectProps<T extends string> {
  label: string;
  value: T | null;
  options: readonly SelectOption<T>[];
  onChange: (value: T) => void;
  placeholder?: string;
  helperText?: string;
  error?: string;
  disabled?: boolean;
  testID?: string;
}

/** A field that opens a bottom sheet with the options. Same anatomy as Input. */
export function Select<T extends string>({
  label,
  value,
  options,
  onChange,
  placeholder,
  helperText,
  error,
  disabled = false,
  testID,
}: SelectProps<T>) {
  const { colors, radius, sizes, spacing } = useTheme();
  const t = useT();
  const [open, setOpen] = useState(false);
  const selected = options.find((o) => o.value === value);
  const shown = selected?.label ?? placeholder ?? t('common.select');
  const message = error ?? helperText;

  return (
    <View style={{ gap: spacing.xs }}>
      <AppText variant="label" tone={disabled ? 'tertiary' : 'secondary'}>
        {label}
      </AppText>
      <Pressable
        testID={testID}
        accessibilityRole="button"
        accessibilityLabel={`${label}, ${shown}`}
        accessibilityHint={error}
        accessibilityState={{ disabled, expanded: open }}
        disabled={disabled}
        onPress={() => setOpen(true)}
        style={({ pressed }) => [
          styles.field,
          {
            minHeight: sizes.control,
            borderRadius: radius.md,
            borderWidth: error ? 2 : sizes.hairline,
            paddingHorizontal: error ? spacing.md - 1 : spacing.md,
            borderColor: error ? colors.error : disabled ? colors.border.default : colors.border.strong,
            backgroundColor: disabled
              ? colors.background.tertiary
              : pressed
                ? colors.surface.secondary
                : colors.surface.primary,
            gap: spacing.sm,
          },
        ]}
      >
        {selected?.icon ? <Icon name={selected.icon} size={sizes.iconMd} color={colors.text.secondary} /> : null}
        <AppText
          variant="body"
          tone={disabled || !selected ? 'tertiary' : 'primary'}
          numberOfLines={1}
          style={styles.value}
        >
          {shown}
        </AppText>
        <Icon name="chevronDown" size={sizes.iconMd} color={colors.text.secondary} />
      </Pressable>
      {message ? (
        <AppText variant="bodySmall" tone={error ? 'error' : 'secondary'} accessibilityLiveRegion={error ? 'polite' : 'none'}>
          {message}
        </AppText>
      ) : null}

      <BottomSheet visible={open} onClose={() => setOpen(false)} title={label}>
        {options.map((option) => (
          <ListItem
            key={option.value}
            title={option.label}
            subtitle={option.description}
            leadingIcon={option.icon}
            selected={option.value === value}
            accessibilityRole="radio"
            onPress={() => {
              onChange(option.value);
              setOpen(false);
            }}
          />
        ))}
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  field: { flexDirection: 'row', alignItems: 'center' },
  value: { flex: 1 },
});
