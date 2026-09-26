import type { TextStyle } from 'react-native';

// System font (Roboto on Android, SF on iOS): best hinting at small sizes, no font download,
// full coverage of Uzbek Latin (oʻ, gʻ) and Cyrillic. Sizes are in dp and scale with the
// user's font-size setting up to `maxScale` (see AppText).

export type TypographyVariant =
  | 'display'
  | 'heading1'
  | 'heading2'
  | 'heading3'
  | 'bodyLarge'
  | 'body'
  | 'bodySmall'
  | 'caption'
  | 'label'
  | 'button';

export interface TypographyToken {
  style: Pick<TextStyle, 'fontSize' | 'lineHeight' | 'fontWeight' | 'letterSpacing'>;
  /** Upper bound for dynamic type; larger sizes need less headroom. */
  maxScale: number;
}

export const typography: Record<TypographyVariant, TypographyToken> = {
  display: { style: { fontSize: 34, lineHeight: 40, fontWeight: '700', letterSpacing: -0.4 }, maxScale: 1.3 },
  heading1: { style: { fontSize: 28, lineHeight: 34, fontWeight: '700', letterSpacing: -0.2 }, maxScale: 1.4 },
  heading2: { style: { fontSize: 22, lineHeight: 28, fontWeight: '600' }, maxScale: 1.5 },
  heading3: { style: { fontSize: 18, lineHeight: 24, fontWeight: '600' }, maxScale: 1.6 },
  bodyLarge: { style: { fontSize: 18, lineHeight: 26, fontWeight: '400' }, maxScale: 1.8 },
  body: { style: { fontSize: 16, lineHeight: 24, fontWeight: '400' }, maxScale: 2 },
  bodySmall: { style: { fontSize: 14, lineHeight: 20, fontWeight: '400' }, maxScale: 2 },
  caption: { style: { fontSize: 12, lineHeight: 16, fontWeight: '400', letterSpacing: 0.2 }, maxScale: 2 },
  label: { style: { fontSize: 14, lineHeight: 20, fontWeight: '500', letterSpacing: 0.1 }, maxScale: 1.8 },
  button: { style: { fontSize: 16, lineHeight: 20, fontWeight: '600', letterSpacing: 0.1 }, maxScale: 1.6 },
};
