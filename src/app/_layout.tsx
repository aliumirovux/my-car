import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { SnackbarProvider } from '@/components/ui';
import { ThemeProvider, useTheme } from '@/theme/ThemeProvider';

function ThemedStack() {
  const { colors, scheme } = useTheme();
  return (
    <SnackbarProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.background.primary },
        }}
      />
      <StatusBar style={scheme === 'dark' ? 'light' : 'dark'} />
    </SnackbarProvider>
  );
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <ThemedStack />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
