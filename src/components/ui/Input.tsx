import { forwardRef, useState } from 'react';
import { StyleSheet, TextInput, View, type TextInputProps } from 'react-native';

import type { IconName } from '@/theme';
import { useTheme } from '@/theme/ThemeProvider';

import { AppText } from './AppText';
import { Icon } from './Icon';

export interface InputProps extends Omit<TextInputProps, 'style' | 'editable' | 'placeholderTextColor'> {
  /** Always visible above the field (placeholders are not labels). */
  label: string;
  helperText?: string;
  /** Error message; puts the field in the error state. */
  error?: string;
  disabled?: boolean;
  leadingIcon?: IconName;
  /** Unit or suffix shown inside the field, e.g. "L", "km", "soʻm". */
  suffix?: string;
}

export const Input = forwardRef<TextInput, InputProps>(function Input(
  { label, helperText, error, disabled = false, leadingIcon, suffix, onFocus, onBlur, multiline, ...rest },
  ref,
) {
  const { colors, radius, sizes, spacing, typography } = useTheme();
  const [focused, setFocused] = useState(false);

  const borderColor = error ? colors.error : focused ? colors.brand.primary : colors.border.strong;
  const message = error ?? helperText;

  return (
    <View style={{ gap: spacing.xs }}>
      <AppText variant="label" tone={disabled ? 'tertiary' : 'secondary'}>
        {label}
      </AppText>
      <View
        style={[
          styles.field,
          {
            minHeight: multiline ? sizes.control * 2 : sizes.control,
            borderRadius: radius.md,
            borderWidth: focused || error ? 2 : sizes.hairline,
            // Keep content from shifting when the border thickens.
            paddingHorizontal: (focused || error ? spacing.md - 1 : spacing.md),
            borderColor: disabled ? colors.border.default : borderColor,
            backgroundColor: disabled ? colors.background.tertiary : colors.surface.primary,
            gap: spacing.sm,
          },
        ]}
      >
        {leadingIcon ? <Icon name={leadingIcon} size={sizes.iconMd} color={colors.text.secondary} /> : null}
        <TextInput
          ref={ref}
          accessibilityLabel={label}
          accessibilityHint={error}
          accessibilityState={{ disabled }}
          editable={!disabled}
          multiline={multiline}
          placeholderTextColor={colors.text.tertiary}
          selectionColor={colors.brand.primary}
          maxFontSizeMultiplier={typography.body.maxScale}
          onFocus={(e) => {
            setFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            onBlur?.(e);
          }}
          style={[
            typography.body.style,
            styles.input,
            { color: disabled ? colors.text.tertiary : colors.text.primary, paddingVertical: spacing.md },
            multiline && styles.multiline,
          ]}
          {...rest}
        />
        {suffix ? (
          <AppText variant="body" tone="secondary">
            {suffix}
          </AppText>
        ) : null}
      </View>
      {message ? (
        <View style={[styles.message, { gap: spacing.xs }]}>
          {error ? <Icon name="error" size={sizes.iconSm} color={colors.error} /> : null}
          <AppText
            variant="bodySmall"
            tone={error ? 'error' : 'secondary'}
            accessibilityLiveRegion={error ? 'polite' : 'none'}
            style={styles.messageText}
          >
            {message}
          </AppText>
        </View>
      ) : null}
    </View>
  );
});

const styles = StyleSheet.create({
  field: { flexDirection: 'row', alignItems: 'center' },
  input: { flex: 1 },
  multiline: { textAlignVertical: 'top' },
  message: { flexDirection: 'row', alignItems: 'flex-start' },
  messageText: { flex: 1 },
});
