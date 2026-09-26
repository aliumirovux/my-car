import { Redirect } from 'expo-router';
import { useState, type ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import { DocumentRow, ExpenseRow, MaintenanceRow, VehicleCard, expenseCategoryIcon } from '@/components/domain';
import {
  AppText,
  Badge,
  BottomSheet,
  Button,
  Card,
  Chip,
  EmptyState,
  ErrorState,
  Icon,
  IconButton,
  Input,
  ListItem,
  LoadingState,
  Modal,
  ProgressBar,
  Screen,
  SectionHeader,
  SegmentedControl,
  Select,
  StatCard,
  useSnackbar,
} from '@/components/ui';
import { useSettingsStore, type ThemePreference } from '@/stores/settings';
import { icons, type IconName, type TypographyVariant } from '@/theme';
import { useTheme } from '@/theme/ThemeProvider';

// Developer gallery of the design system (DESIGN_SYSTEM.md). Not a product screen: strings are
// intentionally not localized, and release builds redirect away from it.

function Section({ title, children }: { title: string; children: ReactNode }) {
  const { spacing } = useTheme();
  return (
    <View style={{ gap: spacing.md, marginBottom: spacing.xxxl }}>
      <SectionHeader title={title} />
      {children}
    </View>
  );
}

function Row({ children }: { children: ReactNode }) {
  const { spacing } = useTheme();
  return <View style={[styles.wrap, { gap: spacing.sm }]}>{children}</View>;
}

const TYPE: TypographyVariant[] = ['display', 'heading1', 'heading2', 'heading3', 'bodyLarge', 'body', 'bodySmall', 'caption', 'label', 'button'];

export default function DesignSystemGallery() {
  const theme = useTheme();
  const { colors, spacing, radius } = theme;
  const snackbar = useSnackbar();
  const themePreference = useSettingsStore((s) => s.themePreference);
  const setThemePreference = useSettingsStore((s) => s.setThemePreference);
  const [period, setPeriod] = useState<'month' | 'last' | 'year'>('month');
  const [fuel, setFuel] = useState<'ai92' | 'ai95' | 'methane' | null>(null);
  const [chips, setChips] = useState<string[]>(['fuel']);
  const [sheet, setSheet] = useState(false);
  const [dialog, setDialog] = useState(false);

  if (!__DEV__) return <Redirect href="/" />;

  const swatches: [string, string][] = [
    ['background.primary', colors.background.primary],
    ['background.secondary', colors.background.secondary],
    ['background.tertiary', colors.background.tertiary],
    ['surface.primary', colors.surface.primary],
    ['surface.secondary', colors.surface.secondary],
    ['surface.inverse', colors.surface.inverse],
    ['text.primary', colors.text.primary],
    ['text.secondary', colors.text.secondary],
    ['text.tertiary', colors.text.tertiary],
    ['border.default', colors.border.default],
    ['border.strong', colors.border.strong],
    ['brand.primary', colors.brand.primary],
    ['brand.primaryPressed', colors.brand.primaryPressed],
    ['brand.secondary', colors.brand.secondary],
    ['success', colors.success],
    ['warning', colors.warning],
    ['error', colors.error],
    ['info', colors.info],
  ];

  const toggleChip = (key: string) =>
    setChips((current) => (current.includes(key) ? current.filter((k) => k !== key) : [...current, key]));

  return (
    <Screen>
      <AppText variant="heading1" accessibilityRole="header" style={{ marginBottom: spacing.lg }}>
        Design system
      </AppText>

      <Section title="Theme">
        <SegmentedControl<ThemePreference>
          accessibilityLabel="Theme"
          value={themePreference}
          onChange={setThemePreference}
          options={[
            { value: 'system', label: 'System' },
            { value: 'light', label: 'Light' },
            { value: 'dark', label: 'Dark' },
          ]}
        />
      </Section>

      <Section title="Colors">
        <Row>
          {swatches.map(([name, value]) => (
            <View key={name} style={{ width: 104, gap: spacing.xs }}>
              <View style={{ height: 40, borderRadius: radius.sm, backgroundColor: value, borderWidth: 1, borderColor: colors.border.subtle }} />
              <AppText variant="caption" tone="secondary">
                {name}
              </AppText>
            </View>
          ))}
        </Row>
      </Section>

      <Section title="Typography">
        {TYPE.map((variant) => (
          <AppText key={variant} variant={variant}>
            {variant} · 1 362 500 soʻm
          </AppText>
        ))}
      </Section>

      <Section title="Buttons">
        <Row>
          <Button label="Primary" onPress={() => {}} />
          <Button label="Secondary" variant="secondary" onPress={() => {}} />
          <Button label="Tertiary" variant="tertiary" onPress={() => {}} />
          <Button label="Delete" variant="destructive" icon="delete" onPress={() => {}} />
        </Row>
        <Row>
          <Button label="Disabled" disabled />
          <Button label="Saving" loading />
          <Button label="Small" size="sm" icon="add" onPress={() => {}} />
        </Row>
        <Button label="Full width" fullWidth onPress={() => {}} />
      </Section>

      <Section title="Icon buttons">
        <Row>
          <IconButton icon="edit" accessibilityLabel="Edit" onPress={() => {}} />
          <IconButton icon="filter" variant="tonal" accessibilityLabel="Filter" onPress={() => {}} />
          <IconButton icon="add" variant="filled" accessibilityLabel="Add" onPress={() => {}} />
          <IconButton icon="filter" variant="tonal" selected accessibilityLabel="Filter (on)" onPress={() => {}} />
          <IconButton icon="delete" disabled accessibilityLabel="Delete" />
          <IconButton icon="retry" loading accessibilityLabel="Retry" />
        </Row>
      </Section>

      <Section title="Inputs">
        <Input label="Volume" placeholder="0" keyboardType="decimal-pad" suffix="L" leadingIcon="fuel" />
        <Input label="Odometer" defaultValue="50 550" suffix="km" error="Must be between 50 600 and 51 200 km for 21.09.2026" />
        <Input label="Amount" helperText="Whole soʻm" suffix="soʻm" keyboardType="number-pad" />
        <Input label="Plate number" defaultValue="01 A 123 BC" disabled />
        <Select
          label="Fuel type"
          value={fuel}
          onChange={setFuel}
          options={[
            { value: 'ai92', label: 'AI-92', icon: 'fuel' },
            { value: 'ai95', label: 'AI-95', icon: 'fuel' },
            { value: 'methane', label: 'Methane (CNG)', description: 'm³', icon: 'fuelGas' },
          ]}
        />
        <Select label="Category" value={null} onChange={() => {}} options={[]} error="Choose a category" />
      </Section>

      <Section title="Segmented control & chips">
        <SegmentedControl
          accessibilityLabel="Period"
          value={period}
          onChange={setPeriod}
          options={[
            { value: 'month', label: 'This month' },
            { value: 'last', label: 'Last month' },
            { value: 'year', label: '12 months' },
          ]}
        />
        <Row>
          {(['fuel', 'expense', 'maintenance', 'document'] as const).map((key) => (
            <Chip key={key} label={key} selected={chips.includes(key)} onPress={() => toggleChip(key)} />
          ))}
          <Chip label="Disabled" disabled onPress={() => {}} />
        </Row>
      </Section>

      <Section title="Badges">
        <Row>
          <Badge label="Neutral" />
          <Badge label="Brand" tone="brand" />
          <Badge label="All good" tone="success" icon="success" />
          <Badge label="Due soon" tone="warning" icon="warning" />
          <Badge label="Overdue" tone="error" icon="error" />
          <Badge label="Info" tone="info" icon="info" />
        </Row>
      </Section>

      <Section title="Cards & stats">
        <StatCard size="large" label="This month" value="1 362 500 soʻm" caption="Last month: 1 120 000 soʻm" icon="expense" />
        <Row>
          <View style={styles.half}>
            <StatCard label="Cost per km" value="1 514 soʻm" />
          </View>
          <View style={styles.half}>
            <StatCard label="Consumption" value="7.5 L" loading />
          </View>
        </Row>
        <Card>
          <AppText>Plain card: hairline border, no shadow.</AppText>
        </Card>
        <Card variant="filled" onPress={() => {}} accessibilityLabel="Pressable filled card">
          <AppText>Filled, pressable card</AppText>
        </Card>
      </Section>

      <Section title="Progress">
        <ProgressBar value={0.38} accessibilityLabel="Brand" />
        <ProgressBar value={0.85} tone="warning" accessibilityLabel="Warning" />
        <ProgressBar value={1.2} tone="error" accessibilityLabel="Error" />
      </Section>

      <Section title="List items">
        <Card padding="none">
          <ListItem title="Language" subtitle="Oʻzbekcha" leadingIcon="language" showChevron onPress={() => {}} />
          <ListItem title="AI-95" selected onPress={() => {}} />
          <ListItem title="Disabled" leadingIcon="account" disabled onPress={() => {}} />
        </Card>
      </Section>

      <Section title="Domain">
        <VehicleCard name="Chevrolet Cobalt" details="2021 · 01 A 123 BC" odometer="51 200 km" status={{ tone: 'success', label: 'All good' }} selected onPress={() => {}} />
        <VehicleCard name="Damas" details="2015" odometer="184 300 km" status={{ tone: 'error', label: 'Attention' }} onPress={() => {}} />
        <Card padding="none">
          <ExpenseRow icon="fuel" title="Fuel · AI-92" subtitle="20.09.2026 · 25 L" amount="262 500 soʻm" onPress={() => {}} />
          <ExpenseRow icon={expenseCategoryIcon.wash} title="Car wash" subtitle="18.09.2026" amount="50 000 soʻm" onPress={() => {}} />
          <MaintenanceRow title="Engine oil & oil filter" dueText="In 3 800 km or 170 days" status="ok" statusLabel="OK" progress={0.62} onPress={() => {}} />
          <MaintenanceRow title="Air filter" dueText="Overdue by 400 km" status="overdue" statusLabel="Overdue" progress={1} onPress={() => {}} />
          <DocumentRow title="OSAGO" subtitle="Expires 10.10.2026" status="expires_soon" statusLabel="Expires soon" onPress={() => {}} />
          <DocumentRow title="Technical inspection" subtitle="Expired 01.09.2026" status="expired" statusLabel="Expired" onPress={() => {}} />
        </Card>
      </Section>

      <Section title="States">
        <Card padding="none">
          <EmptyState icon="fuel" title="No spending recorded this month" message="Add your first fill-up to see costs." actionLabel="Add fuel" onAction={() => {}} />
        </Card>
        <Card padding="none">
          <ErrorState onRetry={() => {}} />
        </Card>
        <Card padding="none">
          <LoadingState />
          <LoadingState variant="list" rows={2} />
        </Card>
      </Section>

      <Section title="Overlays">
        <Row>
          <Button label="Snackbar" variant="secondary" onPress={() => snackbar.show({ message: 'Fuel entry saved', tone: 'success', actionLabel: 'Undo', onAction: () => {} })} />
          <Button label="Bottom sheet" variant="secondary" onPress={() => setSheet(true)} />
          <Button label="Dialog" variant="secondary" onPress={() => setDialog(true)} />
        </Row>
        <BottomSheet visible={sheet} onClose={() => setSheet(false)} title="Add">
          <ListItem title="Fuel" leadingIcon="fuel" onPress={() => setSheet(false)} />
          <ListItem title="Expense" leadingIcon="expense" onPress={() => setSheet(false)} />
          <ListItem title="Maintenance" leadingIcon="maintenance" onPress={() => setSheet(false)} />
          <ListItem title="Odometer" leadingIcon="odometer" onPress={() => setSheet(false)} />
          <ListItem title="Document" leadingIcon="document" onPress={() => setSheet(false)} />
        </BottomSheet>
        <Modal
          visible={dialog}
          destructive
          title="Delete this fuel entry?"
          message="Totals and consumption will be recalculated."
          onDismiss={() => setDialog(false)}
          secondaryAction={{ label: 'Cancel', onPress: () => setDialog(false) }}
          primaryAction={{ label: 'Delete', onPress: () => setDialog(false) }}
        />
      </Section>

      <Section title="Icons">
        <Row>
          {(Object.keys(icons) as IconName[]).map((name) => (
            <View key={name} style={[styles.iconCell, { gap: spacing.xs }]}>
              <Icon name={name} color={colors.text.secondary} />
              <AppText variant="caption" tone="tertiary" numberOfLines={1}>
                {name}
              </AppText>
            </View>
          ))}
        </Row>
      </Section>
    </Screen>
  );
}

const styles = StyleSheet.create({
  wrap: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center' },
  half: { flexGrow: 1, flexBasis: 140 },
  iconCell: { width: 76, alignItems: 'center' },
});
