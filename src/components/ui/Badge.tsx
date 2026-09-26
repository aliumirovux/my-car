import { StyleSheet, View } from 'react-native';

import type { IconName } from '@/theme';
import { useTheme } from '@/theme/ThemeProvider';

import { AppText } from './AppText';
import { Icon } from './Icon';
import { useToneColors, type Tone } from './tone';

export interface BadgeProps {
  label: string;
  tone?: Tone;
  icon?: IconName;
}

/** Non-interactive status label. Always text + color, never color alone. */
export function Badge({ label, tone = 'neutral', icon }: BadgeProps) {
  const { radius, sizes, spacing } = useTheme();
  const { bg, fg } = useToneColors(tone);
  return (
    <View
      accessible
      accessibilityLabel={label}
      style={[styles.badge, { backgroundColor: bg, borderRadius: radius.sm, paddingHorizontal: spacing.sm, gap: spacing.xs }]}
    >
      {icon ? <Icon name={icon} size={sizes.iconSm - 2} color={fg} /> : null}
      <AppText variant="caption" style={[styles.text, { color: fg }]} numberOfLines={1}>
        {label}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: { flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', minHeight: 24, paddingVertical: 2 },
  text: { fontWeight: '600' },
});
