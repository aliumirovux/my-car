import glyphs from '@expo/vector-icons/build/vendor/react-native-vector-icons/glyphmaps/MaterialCommunityIcons.json';

import { themes } from '..';
import { darkColors, lightColors } from '../colors';
import { icons } from '../icons';
import { radius, sizes, spacing } from '../layout';
import { resolveScheme } from '../ThemeProvider';

function keyPaths(obj: object, prefix = ''): string[] {
  return Object.entries(obj).flatMap(([key, value]) =>
    typeof value === 'object' && value !== null ? keyPaths(value, `${prefix}${key}.`) : [`${prefix}${key}`],
  );
}

describe('theme', () => {
  it('light and dark define exactly the same tokens', () => {
    expect(keyPaths(darkColors)).toEqual(keyPaths(lightColors));
  });

  it('dark mode is not a plain inversion of light mode', () => {
    expect(darkColors.brand.primary).toBe(lightColors.brand.primary);
    expect(darkColors.brand.text).not.toBe(lightColors.brand.text);
  });

  it('spacing sits on the 4 px grid (2 px only for hairline gaps)', () => {
    for (const [name, value] of Object.entries(spacing)) {
      if (name === 'xxs') expect(value).toBe(2);
      else expect(value % 4).toBe(0);
    }
  });

  it('radius tokens are ordered and bounded', () => {
    expect(radius.sm).toBeLessThan(radius.md);
    expect(radius.md).toBeLessThan(radius.lg);
    expect(radius.lg).toBeLessThan(radius.xl);
    expect(radius.xl).toBeLessThanOrEqual(16);
  });

  it('controls meet the 44 dp touch target', () => {
    expect(sizes.touchTarget).toBeGreaterThanOrEqual(44);
    expect(sizes.control).toBeGreaterThanOrEqual(sizes.touchTarget);
    expect(sizes.row).toBeGreaterThanOrEqual(sizes.touchTarget);
  });

  it('every semantic icon maps to an existing glyph', () => {
    for (const glyph of Object.values(icons)) {
      expect(glyphs).toHaveProperty(glyph);
    }
  });

  it('resolves the color scheme from the preference', () => {
    expect(resolveScheme('system', 'dark')).toBe('dark');
    expect(resolveScheme('system', 'light')).toBe('light');
    expect(resolveScheme('system', null)).toBe('light');
    expect(resolveScheme('dark', 'light')).toBe('dark');
    expect(resolveScheme('light', 'dark')).toBe('light');
    expect(themes.dark.colors).toBe(darkColors);
  });
});
