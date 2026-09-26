import { useEffect, useState, type ReactNode } from 'react';
import { Animated, Modal, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useT } from '@/i18n';
import { useTheme } from '@/theme/ThemeProvider';

import { AppText } from './AppText';
import { IconButton } from './IconButton';

export interface BottomSheetProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  testID?: string;
}

const OFFSCREEN = 600;

/**
 * Modal sheet from the bottom edge. Closes on backdrop tap, the close button and the Android
 * back button. Content scrolls when taller than ~85 % of the screen.
 */
export function BottomSheet({ visible, onClose, title, children, testID }: BottomSheetProps) {
  const { colors, motion, radius, sizes, spacing } = useTheme();
  const insets = useSafeAreaInsets();
  const t = useT();
  const reduced = useReducedMotion();
  const [progress] = useState(() => new Animated.Value(0));
  const [mounted, setMounted] = useState(visible);

  if (visible && !mounted) setMounted(true);

  useEffect(() => {
    const animation = Animated.timing(progress, {
      toValue: visible ? 1 : 0,
      duration: reduced ? 0 : visible ? motion.normal : motion.fast,
      useNativeDriver: true,
    });
    animation.start(({ finished }) => {
      if (finished && !visible) setMounted(false);
    });
    return () => animation.stop();
  }, [visible, reduced, progress, motion]);

  const translateY = progress.interpolate({ inputRange: [0, 1], outputRange: [OFFSCREEN, 0] });

  return (
    <Modal visible={mounted} transparent animationType="none" onRequestClose={onClose} statusBarTranslucent>
      <View style={styles.root} testID={testID}>
        <Animated.View style={[StyleSheet.absoluteFill, { backgroundColor: colors.overlay, opacity: progress }]}>
          <Pressable
            style={styles.fill}
            onPress={onClose}
            accessibilityRole="button"
            accessibilityLabel={t('common.close')}
          />
        </Animated.View>
        <Animated.View
          accessibilityViewIsModal
          style={[
            styles.sheet,
            {
              backgroundColor: colors.surface.primary,
              borderTopLeftRadius: radius.xl,
              borderTopRightRadius: radius.xl,
              paddingBottom: Math.max(insets.bottom, spacing.lg),
              transform: [{ translateY }],
            },
          ]}
        >
          <View style={[styles.handle, { backgroundColor: colors.border.default, marginTop: spacing.sm }]} />
          <View style={[styles.header, { paddingLeft: sizes.screenPadding, paddingRight: spacing.xs }]}>
            <AppText variant="heading3" accessibilityRole="header" style={styles.title} numberOfLines={2}>
              {title ?? ''}
            </AppText>
            <IconButton icon="close" accessibilityLabel={t('common.close')} onPress={onClose} />
          </View>
          <ScrollView bounces={false} keyboardShouldPersistTaps="handled">
            {children}
          </ScrollView>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, justifyContent: 'flex-end' },
  fill: { flex: 1 },
  sheet: { maxHeight: '85%' },
  handle: { alignSelf: 'center', width: 36, height: 4, borderRadius: 2 },
  header: { flexDirection: 'row', alignItems: 'center', minHeight: 52 },
  title: { flex: 1 },
});
