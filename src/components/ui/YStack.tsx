import { View } from 'react-native';
import { StyleSheet, type UnistylesVariants } from 'react-native-unistyles';

interface Props
  extends React.ComponentPropsWithoutRef<typeof View>,
    UnistylesVariants<typeof styles> {
  flex?: number;
}

const YStack = ({
  // Normal props
  flex,
  // Unistyles variants
  bg,
  pd,
  py,
  px,
  ai,
  jc,
  gap,
  insetTop = false,
  insetBottom = false,
  // Additional props
  style,
  ...props
}: Props) => {
  styles.useVariants({ pd, py, px, ai, jc, gap, insetTop, insetBottom, bg });
  return <View style={[styles.stack, { flex }, style]} {...props} />;
};

const styles = StyleSheet.create((th, rt) => ({
  stack: {
    variants: {
      pd: th.variants.padding,
      py: th.variants.paddingVertical,
      px: th.variants.paddingHorizontal,
      ai: th.variants.alignItems,
      jc: th.variants.justifyContent,
      gap: th.variants.gap,
      bg: {
        primary: {
          backgroundColor: th.colors.backgroundPrimary,
        },
        secondary: {
          backgroundColor: th.colors.backgroundSecondary,
        },
        tertiary: {
          backgroundColor: th.colors.backgroundTertiary,
        },
        red: {
          backgroundColor: th.colors.red,
        },
        orange: {
          backgroundColor: th.colors.orange,
        },
        yellow: {
          backgroundColor: th.colors.yellow,
        },
        green: {
          backgroundColor: th.colors.green,
        },
        purple: {
          backgroundColor: th.colors.purple,
        },
        pink: {
          backgroundColor: th.colors.pink,
        },
      } as const,
      insetTop: {
        true: {
          paddingTop: rt.insets.top,
        },
        false: {},
      } as const,
      insetBottom: {
        true: {
          paddingBottom: rt.insets.bottom,
        },
        false: {},
      } as const,
    },
  },
}));

export default YStack;
