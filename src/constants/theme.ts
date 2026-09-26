// Design tokens — the single source of truth for colors, spacing and type.
// Components read tokens through `useTheme()`; raw hex values live only in this file.
// Palette is a neutral placeholder until brand direction is decided (see ROADMAP.md).

const light = {
  background: '#F5F6F8',
  surface: '#FFFFFF',
  surfaceMuted: '#EDEFF3',
  text: '#15181D',
  textMuted: '#5B6470',
  border: '#D9DDE3',
  primary: '#1F5FD1',
  onPrimary: '#FFFFFF',
  success: '#1E7F4A',
  warning: '#A86200',
  danger: '#C0392B',
} as const;

const dark: Record<keyof typeof light, string> = {
  background: '#0F1114',
  surface: '#171A1F',
  surfaceMuted: '#1F232A',
  text: '#E9ECF0',
  textMuted: '#9AA3AE',
  border: '#2A3038',
  primary: '#7FA6F5',
  onPrimary: '#0B1426',
  success: '#5BC98A',
  warning: '#E5A94A',
  danger: '#EE7A6E',
};

export type ColorToken = keyof typeof light;
export type Palette = Record<ColorToken, string>;

export const palettes: Record<'light' | 'dark', Palette> = { light, dark };

export const spacing = { xs: 4, sm: 8, md: 12, lg: 16, xl: 24, xxl: 32 } as const;

export const radius = { sm: 6, md: 10, lg: 16, full: 9999 } as const;

export const typography = {
  title: { fontSize: 24, lineHeight: 30, fontWeight: '600' },
  heading: { fontSize: 18, lineHeight: 24, fontWeight: '600' },
  body: { fontSize: 16, lineHeight: 22, fontWeight: '400' },
  caption: { fontSize: 13, lineHeight: 18, fontWeight: '400' },
} as const;

export type TypographyVariant = keyof typeof typography;

/** Minimum touch target (Android Material guidance: 48dp). */
export const MIN_TOUCH_TARGET = 48;
