import { StyleSheet, View } from 'react-native';
import { router } from 'expo-router';

import { AppText, Button, Screen } from '@/components/ui';
import { useT } from '@/i18n';

// Temporary entry route. Replaced by the real navigation when product screens are built.
export default function Index() {
  const t = useT();
  return (
    <Screen scroll={false} contentStyle={styles.center}>
      <View style={styles.block}>
        <AppText variant="heading1">{t('app.name')}</AppText>
        <AppText tone="secondary">{t('app.tagline')}</AppText>
      </View>
      <View style={styles.block}>
        <AppText variant="heading3">{t('placeholder.title')}</AppText>
        <AppText tone="secondary">{t('placeholder.body')}</AppText>
      </View>
      {__DEV__ ? <Button label="Design system" variant="secondary" onPress={() => router.push('/design-system')} /> : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  center: { justifyContent: 'center', gap: 32 },
  block: { gap: 4 },
});
