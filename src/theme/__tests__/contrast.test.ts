import { contrastRatio } from '@/utils/color';

import { darkColors, lightColors, type ColorTokens } from '../colors';

// WCAG 2.1: 4.5:1 for text (1.4.3), 3:1 for UI component boundaries and graphics (1.4.11).
const TEXT = 4.5;
const UI = 3;

type Pair = [label: string, fg: (c: ColorTokens) => string, bg: (c: ColorTokens) => string, min: number];

const backgrounds: [string, (c: ColorTokens) => string][] = [
  ['background.primary', (c) => c.background.primary],
  ['background.secondary', (c) => c.background.secondary],
  ['background.tertiary', (c) => c.background.tertiary],
  ['surface.primary', (c) => c.surface.primary],
  ['surface.secondary', (c) => c.surface.secondary],
];

const pairs: Pair[] = [
  // Body text on every background, including pressed rows (background.tertiary).
  ...(['primary', 'secondary', 'tertiary'] as const).flatMap((t) =>
    backgrounds.map(([name, bg]): Pair => [`text.${t} on ${name}`, (c) => c.text[t], bg, TEXT]),
  ),
  // Brand text (links, tertiary buttons) on content backgrounds and on its tint.
  ...backgrounds
    .filter(([name]) => name !== 'background.tertiary')
    .map(([name, bg]): Pair => [`brand.text on ${name}`, (c) => c.brand.text, bg, TEXT]),
  ['brand.text on brand.secondary', (c) => c.brand.text, (c) => c.brand.secondary, TEXT],
  ['text.primary on brand.secondary', (c) => c.text.primary, (c) => c.brand.secondary, TEXT],
  // Primary button.
  ['brand.onPrimary on brand.primary', (c) => c.brand.onPrimary, (c) => c.brand.primary, TEXT],
  ['brand.onPrimary on brand.primaryPressed', (c) => c.brand.onPrimary, (c) => c.brand.primaryPressed, TEXT],
  // Snackbar.
  ['text.inverse on surface.inverse', (c) => c.text.inverse, (c) => c.surface.inverse, TEXT],
  ['brand.textInverse on surface.inverse', (c) => c.brand.textInverse, (c) => c.surface.inverse, TEXT],
  // Status text on surfaces and on their own subtle backgrounds (badges, destructive button).
  ...(['success', 'warning', 'error', 'info'] as const).flatMap((s): Pair[] => [
    [`${s} on surface.primary`, (c) => c[s], (c) => c.surface.primary, TEXT],
    [`${s} on background.primary`, (c) => c[s], (c) => c.background.primary, TEXT],
    [`${s} on ${s}Subtle`, (c) => c[s], (c) => c[`${s}Subtle`], TEXT],
  ]),
  // Control boundaries and graphics.
  ['border.strong on surface.primary', (c) => c.border.strong, (c) => c.surface.primary, UI],
  ['border.strong on background.primary', (c) => c.border.strong, (c) => c.background.primary, UI],
  ['brand.primary on surface.primary (selection, focus)', (c) => c.brand.primary, (c) => c.surface.primary, UI],
  ['brand.primary on background.primary', (c) => c.brand.primary, (c) => c.background.primary, UI],
  // Progress fills on their track.
  ...(['success', 'warning', 'error'] as const).map((s): Pair => [`${s} on background.tertiary`, (c) => c[s], (c) => c.background.tertiary, UI]),
  ['brand.primary on background.tertiary', (c) => c.brand.primary, (c) => c.background.tertiary, UI],
];

describe.each([
  ['light', lightColors],
  ['dark', darkColors],
] as const)('%s theme contrast', (_, colors) => {
  it.each(pairs.map(([label, fg, bg, min]) => [label, fg(colors), bg(colors), min] as const))(
    '%s (%s on %s) ≥ %s:1',
    (_label, fg, bg, min) => {
      expect(contrastRatio(fg, bg)).toBeGreaterThanOrEqual(min);
    },
  );
});

describe('contrastRatio', () => {
  it('matches known values', () => {
    expect(contrastRatio('#000000', '#FFFFFF')).toBeCloseTo(21, 5);
    expect(contrastRatio('#FFFFFF', '#FFFFFF')).toBeCloseTo(1, 5);
    // The brand color with white text.
    expect(contrastRatio('#595FEB', '#FFFFFF')).toBeCloseTo(4.93, 2);
  });
});
