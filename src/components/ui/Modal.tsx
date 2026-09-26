import type { ReactNode } from 'react';
import { Modal as RNModal, Pressable, StyleSheet, View } from 'react-native';

import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useTheme } from '@/theme/ThemeProvider';

import { AppText } from './AppText';
import { Button } from './Button';

export interface ModalAction {
  label: string;
  onPress: () => void;
  loading?: boolean;
}

export interface ModalProps {
  visible: boolean;
  title: string;
  message?: string;
  /** Called on backdrop tap and the Android back button (not while the primary action is loading). */
  onDismiss: () => void;
  primaryAction: ModalAction;
  secondaryAction?: ModalAction;
  /** Styles the primary action as destructive (delete, archive…). */
  destructive?: boolean;
  children?: ReactNode;
}

/** Centered dialog for decisions and confirmations. Keep it to one question. */
export function Modal({
  visible,
  title,
  message,
  onDismiss,
  primaryAction,
  secondaryAction,
  destructive = false,
  children,
}: ModalProps) {
  const { colors, radius, spacing } = useTheme();
  const reduced = useReducedMotion();
  const dismiss = () => {
    if (!primaryAction.loading) onDismiss();
  };

  return (
    <RNModal visible={visible} transparent animationType={reduced ? 'none' : 'fade'} onRequestClose={dismiss} statusBarTranslucent>
      <View style={[styles.root, { backgroundColor: colors.overlay, padding: spacing.xxl }]}>
        <Pressable style={StyleSheet.absoluteFill} onPress={dismiss} accessible={false} importantForAccessibility="no" />
        <View
          accessibilityViewIsModal
          style={[
            styles.dialog,
            { backgroundColor: colors.surface.primary, borderRadius: radius.xl, padding: spacing.xxl, gap: spacing.md },
          ]}
        >
          <AppText variant="heading3" accessibilityRole="header">
            {title}
          </AppText>
          {message ? (
            <AppText variant="body" tone="secondary">
              {message}
            </AppText>
          ) : null}
          {children}
          <View style={[styles.actions, { gap: spacing.sm, marginTop: spacing.sm }]}>
            {secondaryAction ? (
              <Button
                label={secondaryAction.label}
                variant="tertiary"
                onPress={secondaryAction.onPress}
                disabled={primaryAction.loading}
              />
            ) : null}
            <Button
              label={primaryAction.label}
              variant={destructive ? 'destructive' : 'primary'}
              onPress={primaryAction.onPress}
              loading={primaryAction.loading}
            />
          </View>
        </View>
      </View>
    </RNModal>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  dialog: { width: '100%', maxWidth: 420 },
  actions: { flexDirection: 'row', justifyContent: 'flex-end', flexWrap: 'wrap' },
});
