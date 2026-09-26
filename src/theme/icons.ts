import type { ComponentProps } from 'react';
import type MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

// One icon family for the whole app: Material Community Icons (outline style where available).
// Components and features use these semantic names; the glyph behind a name can change
// in one place. Emoji are never used as icons.

type Glyph = ComponentProps<typeof MaterialCommunityIcons>['name'];

export const icons = {
  // Navigation
  home: 'home-variant-outline',
  history: 'history',
  add: 'plus',
  analytics: 'chart-bar',
  more: 'dots-vertical',
  settings: 'cog-outline',
  back: 'arrow-left',
  close: 'close',
  chevronRight: 'chevron-right',
  chevronDown: 'chevron-down',
  search: 'magnify',
  filter: 'filter-outline',

  // Domain
  vehicle: 'car-outline',
  fuel: 'gas-station-outline',
  fuelElectric: 'ev-station',
  fuelGas: 'gas-cylinder',
  expense: 'receipt-text-outline',
  maintenance: 'wrench-outline',
  document: 'file-document-outline',
  reminder: 'bell-outline',
  odometer: 'speedometer',
  calendar: 'calendar-blank-outline',

  // Expense categories (COST-2)
  insurance: 'shield-check-outline',
  taxesFees: 'file-certificate-outline',
  fines: 'police-badge-outline',
  parking: 'parking',
  wash: 'car-wash',
  accessories: 'tag-outline',
  otherExpense: 'cash',

  // Actions
  edit: 'pencil-outline',
  delete: 'delete-outline',
  archive: 'archive-outline',
  retry: 'refresh',
  check: 'check',
  language: 'translate',
  theme: 'theme-light-dark',
  account: 'account-circle-outline',
  logout: 'logout',

  // Status & feedback
  success: 'check-circle',
  warning: 'alert',
  error: 'alert-circle',
  info: 'information-outline',
  empty: 'tray',
  offline: 'wifi-off',
} as const satisfies Record<string, Glyph>;

export type IconName = keyof typeof icons;
