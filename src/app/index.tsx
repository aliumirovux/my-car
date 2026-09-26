import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/AppText';
import { Screen } from '@/components/Screen';
import { useT } from '@/i18n';

// Temporary entry route for Phase 0. Replaced by the real navigation in Phase 2.
export default function Index() {
  const t = useT();
  return (
    <Screen style={styles.center}>
      <View style={styles.block}>
        <AppText variant="title">{t('app.name')}</AppText>
        <AppText color="textMuted">{t('app.tagline')}</AppText>
      </View>
      <View style={styles.block}>
        <AppText variant="heading">{t('placeholder.title')}</AppText>
        <AppText color="textMuted">{t('placeholder.body')}</AppText>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  center: { justifyContent: 'center', gap: 32 },
  block: { gap: 4 },
});
