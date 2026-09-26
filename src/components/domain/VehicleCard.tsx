import { StyleSheet, View } from 'react-native';

import { useTheme } from '@/theme/ThemeProvider';

import { AppText } from '../ui/AppText';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';
import { Icon } from '../ui/Icon';
import type { Tone } from '../ui/tone';
import { toneIcon } from './status';

export interface VehicleCardProps {
  /** Display name (VEH-2). */
  name: string;
  /** e.g. "2021 · 01 A 123 BC". */
  details?: string;
  /** Formatted current odometer, e.g. "51 200 km". */
  odometer: string;
  status?: { tone: Tone; label: string };
  selected?: boolean;
  onPress?: () => void;
  accessibilityHint?: string;
}

export function VehicleCard({ name, details, odometer, status, selected = false, onPress, accessibilityHint }: VehicleCardProps) {
  const { colors, radius, sizes, spacing } = useTheme();
  const label = [name, details, odometer, status?.label].filter(Boolean).join(', ');
  return (
    <Card onPress={onPress} selected={selected} accessibilityLabel={label} accessibilityHint={accessibilityHint}>
      <View style={[styles.row, { gap: spacing.md }]} accessible={!onPress} accessibilityLabel={label}>
        <View
          style={[
            styles.icon,
            { borderRadius: radius.md, backgroundColor: selected ? colors.brand.secondary : colors.surface.secondary },
          ]}
        >
          <Icon name="vehicle" color={selected ? colors.brand.text : colors.text.secondary} />
        </View>
        <View style={[styles.flex, { gap: 2 }]}>
          <AppText variant="heading3" numberOfLines={1}>
            {name}
          </AppText>
          {details ? (
            <AppText variant="bodySmall" tone="secondary" numberOfLines={1}>
              {details}
            </AppText>
          ) : null}
          <View style={[styles.row, { gap: spacing.xs, marginTop: spacing.xs }]}>
            <Icon name="odometer" size={sizes.iconSm} color={colors.text.secondary} />
            <AppText variant="bodySmall" tone="secondary" tabular>
              {odometer}
            </AppText>
          </View>
        </View>
        {status ? <Badge label={status.label} tone={status.tone} icon={toneIcon[status.tone]} /> : null}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center' },
  flex: { flex: 1 },
  icon: { width: 48, height: 48, alignItems: 'center', justifyContent: 'center', alignSelf: 'flex-start' },
});
