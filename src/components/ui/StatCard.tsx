import { StyleSheet, View } from 'react-native';

import type { IconName } from '@/theme';
import { useTheme } from '@/theme/ThemeProvider';

import { AppText } from './AppText';
import { Card } from './Card';
import { Icon } from './Icon';
import { Skeleton } from './Skeleton';

export interface StatCardProps {
  label: string;
  /** Pre-formatted value, e.g. "1 362 500 soʻm". */
  value: string;
  /** Secondary line, e.g. "Last month: 1 120 000 soʻm". */
  caption?: string;
  captionTone?: 'secondary' | 'success' | 'warning' | 'error';
  icon?: IconName;
  /** display (hero number) or heading2 (compact grid). */
  size?: 'large' | 'compact';
  loading?: boolean;
  onPress?: () => void;
  accessibilityHint?: string;
}

export function StatCard({
  label,
  value,
  caption,
  captionTone = 'secondary',
  icon,
  size = 'compact',
  loading = false,
  onPress,
  accessibilityHint,
}: StatCardProps) {
  const { colors, sizes, spacing } = useTheme();
  // Read as one phrase ("This month, 1 362 500 soʻm, Last month: …") instead of three stops.
  const a11yLabel = loading ? label : [label, value, caption].filter(Boolean).join(', ');
  return (
    <Card onPress={onPress} accessibilityLabel={a11yLabel} accessibilityHint={accessibilityHint}>
      <View style={{ gap: spacing.xs }} accessible={!onPress} accessibilityLabel={a11yLabel}>
        <View style={[styles.labelRow, { gap: spacing.xs }]}>
          {icon ? <Icon name={icon} size={sizes.iconSm} color={colors.text.secondary} /> : null}
          <AppText variant="label" tone="secondary" numberOfLines={1}>
            {label}
          </AppText>
        </View>
        {loading ? (
          <Skeleton width="60%" height={size === 'large' ? 40 : 28} />
        ) : (
          <AppText variant={size === 'large' ? 'display' : 'heading2'} tabular numberOfLines={1} adjustsFontSizeToFit>
            {value}
          </AppText>
        )}
        {caption && !loading ? (
          <AppText variant="bodySmall" tone={captionTone} tabular>
            {caption}
          </AppText>
        ) : null}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  labelRow: { flexDirection: 'row', alignItems: 'center' },
});
