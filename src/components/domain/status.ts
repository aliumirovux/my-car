import type { IconName } from '@/theme';

import type { Tone } from '../ui/tone';

// Visual mapping for statuses defined in docs/business-rules. Labels are passed in by callers
// (localized); these helpers only decide tone and icon so every screen shows a status the same way.

export type MaintenanceStatus = 'overdue' | 'due_soon' | 'ok'; // MNT-8…10
export type DocumentStatus = 'expired' | 'expires_soon' | 'valid' | 'no_expiry' | 'replaced'; // DOC-5, DOC-6
export type CarStatus = 'attention' | 'due_soon' | 'all_good'; // DASH-S1

export const maintenanceStatusTone: Record<MaintenanceStatus, Tone> = {
  overdue: 'error',
  due_soon: 'warning',
  ok: 'success',
};

export const documentStatusTone: Record<DocumentStatus, Tone> = {
  expired: 'error',
  expires_soon: 'warning',
  valid: 'success',
  no_expiry: 'neutral',
  replaced: 'neutral',
};

export const carStatusTone: Record<CarStatus, Tone> = {
  attention: 'error',
  due_soon: 'warning',
  all_good: 'success',
};

export const toneIcon: Partial<Record<Tone, IconName>> = {
  error: 'error',
  warning: 'warning',
  success: 'success',
  info: 'info',
};

/** Expense categories (COST-2) → icon. */
export const expenseCategoryIcon = {
  insurance: 'insurance',
  taxes_fees: 'taxesFees',
  fines: 'fines',
  parking: 'parking',
  wash: 'wash',
  accessories: 'accessories',
  other: 'otherExpense',
} as const satisfies Record<string, IconName>;

export type ExpenseCategory = keyof typeof expenseCategoryIcon;

/** Fuel groups (FUEL-1) → icon. */
export const fuelGroupIcon = {
  petrol: 'fuel',
  diesel: 'fuel',
  methane: 'fuelGas',
  propane: 'fuelGas',
  electric: 'fuelElectric',
} as const satisfies Record<string, IconName>;

export type FuelGroup = keyof typeof fuelGroupIcon;
