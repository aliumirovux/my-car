import type { ReactNode } from 'react';
import { ScrollView, StyleSheet, View, type ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useTheme } from '@/theme/ThemeProvider';

interface ScreenProps {
  children: ReactNode;
  /** Wrap content in a ScrollView (default true). */
  scroll?: boolean;
  /** Canvas color: primary (default) or secondary for grouped screens. */
  background?: 'primary' | 'secondary';
  contentStyle?: ViewStyle;
}

/** Root container for every screen: safe-area insets, canvas color and horizontal padding. */
export function Screen({ children, scroll = true, background = 'primary', contentStyle }: ScreenProps) {
  const { colors, sizes, spacing } = useTheme();
  const padding = { paddingHorizontal: sizes.screenPadding, paddingVertical: spacing.lg };
  return (
    <SafeAreaView style={[styles.fill, { backgroundColor: colors.background[background] }]}>
      {scroll ? (
        <ScrollView contentContainerStyle={[padding, contentStyle]} keyboardShouldPersistTaps="handled">
          {children}
        </ScrollView>
      ) : (
        <View style={[styles.fill, padding, contentStyle]}>{children}</View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1 },
});
