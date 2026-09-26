import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { useT } from '@/i18n';
import type { IconName } from '@/theme';
import { useTheme } from '@/theme/ThemeProvider';

import { AppText } from './AppText';
import { Button } from './Button';
import { Icon } from './Icon';
import { Skeleton } from './Skeleton';
import { useToneColors, type Tone } from './tone';

function StateIcon({ name, tone }: { name: IconName; tone: Tone }) {
  const { radius } = useTheme();
  const { bg, fg } = useToneColors(tone);
  return (
    <View style={[styles.iconWrap, { backgroundColor: bg, borderRadius: radius.full }]}>
      <Icon name={name} size={28} color={fg} />
    </View>
  );
}

// ---------- EmptyState ----------

export interface EmptyStateProps {
  title: string;
  message?: string;
  icon?: IconName;
  /** The next step. An empty state should almost always have one. */
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({ title, message, icon = 'empty', actionLabel, onAction }: EmptyStateProps) {
  const { spacing } = useTheme();
  return (
    <View style={[styles.center, { gap: spacing.md, padding: spacing.xxl }]}>
      <StateIcon name={icon} tone="neutral" />
      <AppText variant="heading3" align="center" accessibilityRole="header">
        {title}
      </AppText>
      {message ? (
        <AppText variant="body" tone="secondary" align="center">
          {message}
        </AppText>
      ) : null}
      {actionLabel && onAction ? (
        <View style={{ marginTop: spacing.sm }}>
          <Button label={actionLabel} onPress={onAction} />
        </View>
      ) : null}
    </View>
  );
}

// ---------- ErrorState ----------

export interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  retryLabel?: string;
  /** Show a spinner on Retry while reloading. */
  retrying?: boolean;
  icon?: IconName;
}

export function ErrorState({ title, message, onRetry, retryLabel, retrying = false, icon = 'error' }: ErrorStateProps) {
  const { spacing } = useTheme();
  const t = useT();
  return (
    <View style={[styles.center, { gap: spacing.md, padding: spacing.xxl }]} accessibilityLiveRegion="polite">
      <StateIcon name={icon} tone="error" />
      <AppText variant="heading3" align="center" accessibilityRole="header">
        {title ?? t('common.error.title')}
      </AppText>
      <AppText variant="body" tone="secondary" align="center">
        {message ?? t('common.error.message')}
      </AppText>
      {onRetry ? (
        <View style={{ marginTop: spacing.sm }}>
          <Button label={retryLabel ?? t('common.retry')} icon="retry" variant="secondary" onPress={onRetry} loading={retrying} />
        </View>
      ) : null}
    </View>
  );
}

// ---------- LoadingState ----------

export interface LoadingStateProps {
  /** spinner: indeterminate wait. list: skeleton rows where a list will appear. */
  variant?: 'spinner' | 'list';
  label?: string;
  rows?: number;
}

export function LoadingState({ variant = 'spinner', label, rows = 3 }: LoadingStateProps) {
  const { colors, spacing } = useTheme();
  const t = useT();
  const text = label ?? t('common.loading');

  if (variant === 'list') {
    return (
      <View accessible accessibilityRole="progressbar" accessibilityLabel={text} accessibilityState={{ busy: true }} style={{ gap: spacing.lg, padding: spacing.lg }}>
        {Array.from({ length: rows }, (_, i) => (
          <View key={i} style={[styles.row, { gap: spacing.md }]}>
            <Skeleton width={40} height={40} radius="md" />
            <View style={[styles.flex, { gap: spacing.sm }]}>
              <Skeleton width="70%" height={14} />
              <Skeleton width="40%" height={12} />
            </View>
          </View>
        ))}
      </View>
    );
  }

  return (
    <View
      accessible
      accessibilityRole="progressbar"
      accessibilityLabel={text}
      accessibilityState={{ busy: true }}
      style={[styles.center, { gap: spacing.md, padding: spacing.xxl }]}
    >
      <ActivityIndicator size="large" color={colors.brand.primary} />
      <AppText variant="bodySmall" tone="secondary">
        {text}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  center: { alignItems: 'center', justifyContent: 'center' },
  iconWrap: { width: 64, height: 64, alignItems: 'center', justifyContent: 'center' },
  row: { flexDirection: 'row', alignItems: 'center' },
  flex: { flex: 1 },
});
