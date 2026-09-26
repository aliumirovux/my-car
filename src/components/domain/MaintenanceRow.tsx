import { Pressable, StyleSheet, View } from 'react-native';

import { useTheme } from '@/theme/ThemeProvider';

import { AppText } from '../ui/AppText';
import { Badge } from '../ui/Badge';
import { Icon } from '../ui/Icon';
import { ProgressBar } from '../ui/ProgressBar';
import { maintenanceStatusTone, toneIcon, type MaintenanceStatus } from './status';

export interface MaintenanceRowProps {
  /** Service type, e.g. "Engine oil & oil filter". */
  title: string;
  /** e.g. "In 3 800 km or 170 days". */
  dueText: string;
  status: MaintenanceStatus;
  statusLabel: string;
  /** Share of the interval already used (0…1). Omit to hide the bar. */
  progress?: number;
  onPress?: () => void;
}

export function MaintenanceRow({ title, dueText, status, statusLabel, progress, onPress }: MaintenanceRowProps) {
  const { colors, radius, sizes, spacing } = useTheme();
  const tone = maintenanceStatusTone[status];
  const barTone = tone === 'error' ? 'error' : tone === 'warning' ? 'warning' : 'brand';

  return (
    <Pressable
      accessibilityRole={onPress ? 'button' : undefined}
      accessibilityLabel={`${title}, ${statusLabel}, ${dueText}`}
      disabled={!onPress}
      onPress={onPress}
      style={({ pressed }) => [
        styles.row,
        {
          minHeight: sizes.row,
          gap: spacing.md,
          paddingHorizontal: spacing.lg,
          paddingVertical: spacing.md,
          backgroundColor: pressed ? colors.background.tertiary : 'transparent',
        },
      ]}
    >
      <View style={[styles.icon, { borderRadius: radius.md, backgroundColor: colors.surface.secondary }]}>
        <Icon name="maintenance" size={sizes.iconMd} color={colors.text.secondary} />
      </View>
      <View style={[styles.flex, { gap: spacing.xs }]}>
        <View style={[styles.titleRow, { gap: spacing.sm }]}>
          <AppText variant="body" style={styles.flex} numberOfLines={2}>
            {title}
          </AppText>
          <Badge label={statusLabel} tone={tone} icon={toneIcon[tone]} />
        </View>
        <AppText variant="bodySmall" tone="secondary" tabular>
          {dueText}
        </AppText>
        {progress !== undefined ? <ProgressBar value={progress} tone={barTone} accessibilityLabel={title} /> : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'flex-start' },
  titleRow: { flexDirection: 'row', alignItems: 'center' },
  flex: { flex: 1 },
  icon: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
});
