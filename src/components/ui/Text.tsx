import { Text as RNText } from "react-native";
import { StyleSheet, type UnistylesVariants } from "react-native-unistyles";

type Variants = UnistylesVariants<typeof styles>;

interface Props
	extends React.ComponentPropsWithoutRef<typeof RNText>,
		Variants {}

const Text = ({
	// Unistyles variants
	variant,
	color,
	invert,
	// Additional props
	style,
	...props
}: Props) => {
	styles.useVariants({ variant, color, invert });
	return <RNText style={[styles.text, style]} {...props} />;
};

const styles = StyleSheet.create((th) => ({
	text: {
		fontWeight: "400",
		fontSize: 16,
		color: th.colors.labelPrimary,
		lineHeight: 24,
		variants: {
			color: {
				primary: {
					color: th.colors.labelPrimary,
				},
				secondary: {
					color: th.colors.labelSecondary,
				},
				tertiary: {
					color: th.colors.labelTertiary,
				},
				quaternary: {
					color: th.colors.labelQuaternary,
				},
				white: {
					color: th.colors.white,
				},
			},
			variant: {
				h1: {
					fontWeight: "800",
					fontSize: 32,
					lineHeight: 42,
				},
				h2: {
					fontWeight: "700",
					fontSize: 24,
					lineHeight: 34,
				},
				h3: {
					fontWeight: "700",
					fontSize: 20,
					lineHeight: 28,
				},
				subtitle: {
					color: th.colors.labelSecondary,
					fontWeight: "500",
					fontSize: 16,
					lineHeight: 24,
				},
				primary: {
					color: th.colors.labelPrimary,
					fontWeight: "500",
					fontSize: 16,
					lineHeight: 24,
				},
				secondary: {
					color: th.colors.labelSecondary,
					fontWeight: "500",
					fontSize: 16,
					lineHeight: 24,
				},
				tertiary: {
					color: th.colors.labelTertiary,
					fontWeight: "500",
					fontSize: 16,
					lineHeight: 24,
				},
				quarternary: {
					color: th.colors.labelQuaternary,
					fontWeight: "500",
					fontSize: 16,
					lineHeight: 24,
				},
			},
			size: {
				sm: {
					fontSize: th.space.sm,
					lineHeight: th.space.sm * 1.5,
				},
				md: {
					fontSize: th.space.md,
					lineHeight: th.space.md * 1.5,
				},
				lg: {
					fontSize: th.space.lg,
					lineHeight: th.space.lg * 1.5,
				},
				xl: {
					fontSize: th.space.xl,
					lineHeight: th.space.xl * 1.5,
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
