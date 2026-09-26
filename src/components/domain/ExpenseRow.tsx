import type { IconName } from '@/theme';

import { ListItem } from '../ui/ListItem';

export interface ExpenseRowProps {
  /** Category or fuel-type icon (see expenseCategoryIcon / fuelGroupIcon). */
  icon: IconName;
  /** e.g. "Fuel · AI-92" or "Car wash". */
  title: string;
  /** e.g. "20.09.2026 · 25 L". */
  subtitle?: string;
  /** Formatted amount, e.g. "262 500 soʻm". */
  amount: string;
  onPress?: () => void;
  disabled?: boolean;
}

/** One cost record (fuel entry, expense or maintenance cost) in a list or timeline. */
export function ExpenseRow({ icon, title, subtitle, amount, onPress, disabled }: ExpenseRowProps) {
  return (
    <ListItem
      leadingIcon={icon}
      title={title}
      subtitle={subtitle}
      trailingText={amount}
      onPress={onPress}
      disabled={disabled}
      accessibilityLabel={[title, subtitle, amount].filter(Boolean).join(', ')}
    />
  );
}
