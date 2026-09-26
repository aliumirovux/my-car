import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { AccessibilityInfo, Animated, Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useTheme } from '@/theme/ThemeProvider';

import { AppText } from './AppText';
import { Icon } from './Icon';

export interface SnackbarOptions {
  message: string;
  /** e.g. "Undo" or "Retry". */
  actionLabel?: string;
  onAction?: () => void;
  tone?: 'neutral' | 'success' | 'error';
  /** ms; defaults to 4 s, or 6 s when there is an action. */
  duration?: number;
}

interface SnackbarContextValue {
  show: (options: SnackbarOptions) => void;
  hide: () => void;
}

const SnackbarContext = createContext<SnackbarContextValue | null>(null);

export function useSnackbar(): SnackbarContextValue {
  const value = useContext(SnackbarContext);
  if (!value) throw new Error('useSnackbar must be used inside <SnackbarProvider>');
  return value;
}

/** Brief, non-blocking feedback at the bottom of the screen. One at a time; a new one replaces the old. */
export function SnackbarProvider({ children }: { children: ReactNode }) {
  const [current, setCurrent] = useState<(SnackbarOptions & { key: number }) | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const hide = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    setCurrent(null);
  }, []);

  const show = useCallback(
    (options: SnackbarOptions) => {
      if (timer.current) clearTimeout(timer.current);
      setCurrent({ ...options, key: Date.now() });
      AccessibilityInfo.announceForAccessibility(options.message);
      timer.current = setTimeout(hide, options.duration ?? (options.actionLabel ? 6000 : 4000));
    },
    [hide],
  );

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const value = useMemo(() => ({ show, hide }), [show, hide]);

  return (
    <SnackbarContext.Provider value={value}>
      {children}
      {current ? <SnackbarView key={current.key} options={current} onDismiss={hide} /> : null}
    </SnackbarContext.Provider>
  );
}

function SnackbarView({ options, onDismiss }: { options: SnackbarOptions; onDismiss: () => void }) {
  const { colors, motion, radius, sizes, spacing } = useTheme();
  const insets = useSafeAreaInsets();
  const reduced = useReducedMotion();
  const [progress] = useState(() => new Animated.Value(0));

  useEffect(() => {
    Animated.timing(progress, { toValue: 1, duration: reduced ? 0 : motion.normal, useNativeDriver: true }).start();
  }, [progress, reduced, motion]);

  const icon = options.tone === 'success' ? 'success' : options.tone === 'error' ? 'error' : null;

  return (
    <Animated.View
      pointerEvents="box-none"
      style={[
        styles.container,
        {
          left: sizes.screenPadding,
          right: sizes.screenPadding,
          bottom: insets.bottom + spacing.lg,
          opacity: progress,
          transform: [{ translateY: progress.interpolate({ inputRange: [0, 1], outputRange: [16, 0] }) }],
        },
      ]}
    >
      <View
        accessibilityLiveRegion="polite"
        style={[
          styles.bar,
          {
            backgroundColor: colors.surface.inverse,
            borderRadius: radius.md,
            paddingLeft: spacing.lg,
            paddingRight: options.actionLabel ? spacing.xs : spacing.lg,
            gap: spacing.md,
            minHeight: sizes.control,
          },
        ]}
      >
        {icon ? <Icon name={icon} size={sizes.iconMd} color={colors.text.inverse} /> : null}
        <AppText variant="bodySmall" tone="inverse" style={styles.message}>
          {options.message}
        </AppText>
        {options.actionLabel ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={options.actionLabel}
            onPress={() => {
              options.onAction?.();
              onDismiss();
            }}
            style={({ pressed }) => [
              styles.action,
              { minHeight: sizes.touchTarget, paddingHorizontal: spacing.md, borderRadius: radius.sm, opacity: pressed ? 0.7 : 1 },
            ]}
          >
            <AppText variant="label" style={[styles.actionText, { color: colors.brand.textInverse }]}>
              {options.actionLabel}
            </AppText>
          </Pressable>
        ) : null}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: { position: 'absolute' },
  bar: { flexDirection: 'row', alignItems: 'center', paddingVertical: 4 },
  message: { flex: 1, paddingVertical: 8 },
  action: { justifyContent: 'center' },
  actionText: { fontWeight: '600' },
});
