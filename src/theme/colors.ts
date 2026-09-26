// Semantic color tokens. Components use these names only — never raw hex values.
// Every text/background pairing below is verified for WCAG contrast in
// src/theme/__tests__/contrast.test.ts; update that test when adding a pairing.
//
// Dark mode is designed, not inverted: surfaces get lighter as they rise, brand and
// status colors are re-tuned for dark backgrounds, and inverse surfaces flip.

export interface ColorTokens {
  background: {
    /** Screen canvas. */
    primary: string;
    /** Grouped / banded areas on the canvas. */
    secondary: string;
    /** Wells, skeletons, pressed rows. */
    tertiary: string;
  };
  surface: {
    /** Cards, sheets, dialogs, inputs. */
    primary: string;
    /** Nested areas inside a surface: segmented track, tonal icon wells. */
    secondary: string;
    /** Snackbar and other inverse surfaces. */
    inverse: string;
  };
  text: {
    primary: string;
    secondary: string;
    /** Placeholders, meta text. Still ≥ 4.5:1 on every background. */
    tertiary: string;
    /** Text on surface.inverse. */
    inverse: string;
  };
  border: {
    default: string;
    subtle: string;
    /** Input outlines and other controls: ≥ 3:1 against surfaces (WCAG 1.4.11). */
    strong: string;
  };
  brand: {
    /** #595FEB — primary actions, selection, focus. Use sparingly. */
    primary: string;
    primaryPressed: string;
    /** Tinted background for selected / brand-accented areas. */
    secondary: string;
    /** Text and icons on brand.primary. */
    onPrimary: string;
    /** Brand-colored text or icon on normal surfaces (links, text buttons). */
    text: string;
    /** Brand-colored text on surface.inverse (snackbar action). */
    textInverse: string;
  };
  /** Status foregrounds: text- and icon-safe on surfaces and on their subtle backgrounds. */
  success: string;
  warning: string;
  error: string;
  info: string;
  successSubtle: string;
  warningSubtle: string;
  errorSubtle: string;
  infoSubtle: string;
  /** Scrim behind sheets and dialogs. */
  overlay: string;
}

export const lightColors: ColorTokens = {
  background: { primary: '#F6F7F9', secondary: '#EEF0F3', tertiary: '#E3E6EA' },
  surface: { primary: '#FFFFFF', secondary: '#F2F3F6', inverse: '#1D2026' },
  text: { primary: '#111318', secondary: '#454C57', tertiary: '#5B636F', inverse: '#FFFFFF' },
  border: { default: '#D9DDE3', subtle: '#E8EAEE', strong: '#858D99' },
  brand: {
    primary: '#595FEB',
    primaryPressed: '#474CD1',
    secondary: '#ECEDFD',
    onPrimary: '#FFFFFF',
    text: '#4A50DC',
    textInverse: '#A3A7F7',
  },
  success: '#157347',
  warning: '#9A5700',
  error: '#C2302B',
  info: '#1F63C4',
  successSubtle: '#E3F3EA',
  warningSubtle: '#FBEFDC',
  errorSubtle: '#FCE8E7',
  infoSubtle: '#E5EEFA',
  overlay: 'rgba(10, 12, 16, 0.45)',
};

export const darkColors: ColorTokens = {
  background: { primary: '#0D0E11', secondary: '#141619', tertiary: '#1C1F24' },
  surface: { primary: '#16181C', secondary: '#1F2227', inverse: '#E8EAED' },
  text: { primary: '#F1F2F4', secondary: '#B3B9C2', tertiary: '#8E95A1', inverse: '#111318' },
  border: { default: '#30343C', subtle: '#23262C', strong: '#6E7582' },
  brand: {
    primary: '#595FEB',
    primaryPressed: '#4A50DC',
    secondary: '#23254B',
    onPrimary: '#FFFFFF',
    text: '#A3A7F7',
    textInverse: '#474CD1',
  },
  success: '#4CC38A',
  warning: '#EFA846',
  error: '#F2736B',
  info: '#6FA8F5',
  successSubtle: '#12301F',
  warningSubtle: '#35270F',
  errorSubtle: '#3B1715',
  infoSubtle: '#13284A',
  overlay: 'rgba(0, 0, 0, 0.6)',
};
