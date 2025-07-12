import { Text as RNText } from "react-native";
import {
  StyleSheet,
  type UnistylesVariants,
  withUnistyles,
} from "react-native-unistyles";

type Variants = UnistylesVariants<typeof styles>;

const TextUnistyles = withUnistyles(RNText);

interface Props
  extends React.ComponentPropsWithoutRef<typeof RNText>,
    Variants {}

const Text = ({
  // Unistyles variants
  variant,
  invert,
  // Additional props
  style,
  ...props
}: Props) => {
  styles.useVariants({ variant, invert });
  return <TextUnistyles style={[styles.text, style]} {...props} />;
};

const styles = StyleSheet.create((th) => ({
  text: {
    fontWeight: "400",
    color: th.colors.labelPrimary,
    variants: {
      variant: {
        h1: {
          ...th.typography.h1,
        },
        h2: {
          ...th.typography.h2,
        },
        h3: {
          ...th.typography.h3,
        },
        h4: {
          ...th.typography.h4,
        },
        title: {
          ...th.typography.title,
        },
        caption: {
          ...th.typography.caption,
        },
        subtitle: {
          ...th.typography.subtitle,
          color: th.colors.labelSecondary,
        },
        label: {
          ...th.typography.label,
          color: th.colors.labelPrimary,
        },
        description: {
          ...th.typography.description,
          color: th.colors.labelSecondary,
        },
        default: {
          ...th.typography.body,
          color: th.colors.labelPrimary,
        },
      },
      invert: {
        true: {
          color: th.colors.backgroundPrimary,
        },
        false: {
          color: th.colors.labelPrimary,
        },
      },
    },
  },
}));

export default Text;
