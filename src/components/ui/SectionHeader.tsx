import { StyleSheet, View } from 'react-native';

import { useTheme } from '@/theme/ThemeProvider';

import { AppText } from './AppText';
import { Button } from './Button';

export interface SectionHeaderProps {
  title: string;
  /** e.g. "See all". */
  actionLabel?: string;
  onAction?: () => void;
}

export function SectionHeader({ title, actionLabel, onAction }: SectionHeaderProps) {
  const { spacing } = useTheme();
  return (
    <View style={[styles.row, { paddingVertical: spacing.sm, gap: spacing.sm }]}>
      <AppText variant="heading3" accessibilityRole="header" style={styles.title} numberOfLines={2}>
        {title}
      </AppText>
      {actionLabel && onAction ? <Button label={actionLabel} variant="tertiary" size="sm" onPress={onAction} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', minHeight: 44 },
  title: { flex: 1 },
});
