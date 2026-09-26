import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { icons, type IconName } from '@/theme';
import { useTheme } from '@/theme/ThemeProvider';

export interface IconProps {
  name: IconName;
  size?: number;
  /** Defaults to text.primary. */
  color?: string;
}

/** Decorative by default: the surrounding control carries the accessible label. */
export function Icon({ name, size, color }: IconProps) {
  const { colors, sizes } = useTheme();
  return (
    <MaterialCommunityIcons
      name={icons[name]}
      size={size ?? sizes.iconLg}
      color={color ?? colors.text.primary}
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
    />
  );
}
