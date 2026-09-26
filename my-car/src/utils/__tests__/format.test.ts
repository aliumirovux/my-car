import { formatDate, formatDistance, formatMoney, formatNumber } from '../format';

const NBSP = ' ';

describe('formatNumber', () => {
  it('groups thousands with non-breaking spaces', () => {
    expect(formatNumber(1250000)).toBe(`1${NBSP}250${NBSP}000`);
    expect(formatNumber(999)).toBe('999');
    expect(formatNumber(0)).toBe('0');
  });

  it('rounds and keeps the sign', () => {
    expect(formatNumber(1234.6)).toBe(`1${NBSP}235`);
    expect(formatNumber(-5000)).toBe(`−5${NBSP}000`);
  });
});

describe('formatMoney', () => {
  it('uses the language-specific currency label', () => {
    expect(formatMoney(85000, 'uz')).toBe(`85${NBSP}000${NBSP}soʻm`);
    expect(formatMoney(85000, 'ru')).toBe(`85${NBSP}000${NBSP}сум`);
  });
});

describe('formatDistance', () => {
  it('formats kilometres', () => {
    expect(formatDistance(12500, 'uz')).toBe(`12${NBSP}500${NBSP}km`);
    expect(formatDistance(12500, 'ru')).toBe(`12${NBSP}500${NBSP}км`);
  });
});

describe('formatDate', () => {
  it('formats as dd.mm.yyyy', () => {
    expect(formatDate(new Date(2026, 8, 5))).toBe('05.09.2026');
  });
});
