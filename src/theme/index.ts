import { darkColors, lightColors, type ColorTokens } from './colors';
import { motion, radius, sizes, spacing } from './layout';
import { typography } from './typography';

export type ColorScheme = 'light' | 'dark';

export interface Theme {
  scheme: ColorScheme;
  colors: ColorTokens;
  typography: typeof typography;
  spacing: typeof spacing;
  radius: typeof radius;
  sizes: typeof sizes;
  motion: typeof motion;
}

const shared = { typography, spacing, radius, sizes, motion };

export const themes: Record<ColorScheme, Theme> = {
  light: { scheme: 'light', colors: lightColors, ...shared },
  dark: { scheme: 'dark', colors: darkColors, ...shared },
};

export type { ColorTokens } from './colors';
export { icons, type IconName } from './icons';
export type { RadiusToken, SpacingToken } from './layout';
export type { TypographyVariant } from './typography';
