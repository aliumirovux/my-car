// 4 px base grid. Use the named steps; avoid ad-hoc numbers in components.
export const spacing = {
  none: 0,
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  huge: 40,
  giant: 48,
} as const;

export type SpacingToken = keyof typeof spacing;

// Modest radii: rounded enough to feel modern, not bubbly.
export const radius = {
  sm: 6,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
} as const;

export type RadiusToken = keyof typeof radius;

export const sizes = {
  /** Minimum touch target for anything interactive (dp). */
  touchTarget: 44,
  /** Height of buttons, inputs and selects. */
  control: 48,
  controlSmall: 36,
  /** Minimum height of a list row. */
  row: 56,
  iconSm: 16,
  iconMd: 20,
  iconLg: 24,
  /** Horizontal screen padding. */
  screenPadding: 16,
  hairline: 1,
} as const;

export const motion = {
  fast: 150,
  normal: 220,
  slow: 300,
} as const;
