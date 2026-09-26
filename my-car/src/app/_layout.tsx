import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { useTheme } from '@/hooks/useTheme';

export default function RootLayout() {
  const { colors, scheme } = useTheme();
  return (
    <SafeAreaProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.background },
        }}
      />
      <StatusBar style={scheme === 'dark' ? 'light' : 'dark'} />
    </SafeAreaProvider>
  );
}
