import type { ReactNode } from 'react';
import { Pressable, StyleSheet, View, type AccessibilityRole } from 'react-native';

import type { IconName } from '@/theme';
import { useTheme } from '@/theme/ThemeProvider';

import { AppText } from './AppText';
import { Icon } from './Icon';
import { useToneColors, type Tone } from './tone';

export interface ListItemProps {
  title: string;
  subtitle?: string;
  leadingIcon?: IconName;
  leadingTone?: Tone;
  /** Short value on the right, e.g. an amount. Rendered with tabular digits. */
  trailingText?: string;
  trailingTone?: 'primary' | 'secondary' | 'error' | 'success';
  /** Custom trailing content (badge, switch…) — rendered after trailingText. */
  trailing?: ReactNode;
  showChevron?: boolean;
  selected?: boolean;
  disabled?: boolean;
  onPress?: () => void;
  accessibilityLabel?: string;
  accessibilityHint?: string;
  accessibilityRole?: AccessibilityRole;
  testID?: string;
}

export function ListItem({
  title,
  subtitle,
  leadingIcon,
  leadingTone = 'neutral',
  trailingText,
  trailingTone = 'primary',
  trailing,
  showChevron = false,
  selected = false,
  disabled = false,
  onPress,
  accessibilityLabel,
  accessibilityHint,
  accessibilityRole,
  testID,
}: ListItemProps) {
  const { colors, radius, sizes, spacing } = useTheme();
  const tone = useToneColors(leadingTone);

  const content = (
    <>
      {leadingIcon ? (
        <View style={[styles.leading, { borderRadius: radius.md, backgroundColor: tone.bg }]}>
          <Icon name={leadingIcon} size={sizes.iconMd} color={tone.fg} />
        </View>
      ) : null}
      <View style={styles.text}>
        <AppText variant="body" tone={disabled ? 'tertiary' : 'primary'} numberOfLines={2}>
          {title}
        </AppText>
        {subtitle ? (
          <AppText variant="bodySmall" tone={disabled ? 'tertiary' : 'secondary'} numberOfLines={2}>
            {subtitle}
          </AppText>
        ) : null}
      </View>
      {trailingText ? (
        <AppText variant="body" tone={disabled ? 'tertiary' : trailingTone} tabular numberOfLines={1}>
          {trailingText}
        </AppText>
      ) : null}
      {trailing}
      {selected ? <Icon name="check" size={sizes.iconMd} color={colors.brand.text} /> : null}
      {showChevron ? <Icon name="chevronRight" size={sizes.iconMd} color={colors.text.tertiary} /> : null}
    </>
  );

  const rowStyle = [styles.row, { minHeight: sizes.row, gap: spacing.md, paddingHorizontal: spacing.lg, paddingVertical: spacing.sm }];

  if (!onPress) {
    return (
      <View style={rowStyle} testID={testID} accessible accessibilityLabel={accessibilityLabel}>
        {content}
      </View>
    );
  }

  return (
    <Pressable
      accessibilityRole={accessibilityRole ?? 'button'}
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
      accessibilityState={{ disabled, selected }}
      disabled={disabled}
      onPress={onPress}
      testID={testID}
      style={({ pressed }) => [rowStyle, pressed && { backgroundColor: colors.background.tertiary }]}
    >
      {content}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center' },
  leading: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  text: { flex: 1, gap: 2 },
});
