import type { Language } from '@/i18n/languages';

// Formatting is done by hand rather than with Intl: Hermes' locale data for `uz`
// is inconsistent across Android versions, and these formats must be stable.
// Conventions: 1 250 000 soʻm · 12 500 km · 26.09.2026 (non-breaking spaces as separators).

const NBSP = ' ';

const CURRENCY: Record<Language, string> = { uz: 'soʻm', ru: 'сум' };
const KM: Record<Language, string> = { uz: 'km', ru: 'км' };

/** 1250000 → "1 250 000"; rounds to an integer; uses a real minus sign for negatives. */
export function formatNumber(value: number): string {
  const rounded = Math.round(value);
  const sign = rounded < 0 ? '−' : '';
  const digits = Math.abs(rounded).toString().replace(/\B(?=(\d{3})+(?!\d))/g, NBSP);
  return `${sign}${digits}`;
}

/** Amount in UZS (whole soʻm). */
export function formatMoney(amount: number, language: Language): string {
  return `${formatNumber(amount)}${NBSP}${CURRENCY[language]}`;
}

export function formatDistance(km: number, language: Language): string {
  return `${formatNumber(km)}${NBSP}${KM[language]}`;
}

const pad = (n: number) => n.toString().padStart(2, '0');

/** dd.mm.yyyy in the device's local time zone. */
export function formatDate(input: Date | string | number): string {
  const d = new Date(input);
  return `${pad(d.getDate())}.${pad(d.getMonth() + 1)}.${d.getFullYear()}`;
}
