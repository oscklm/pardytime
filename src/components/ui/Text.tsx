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
		fontSize: th.space.lg,
		lineHeight: th.space.lg * 1.5,
		color: th.colors.text,
		variants: {
			color: {
				accent: {
					color: th.colors.accent,
				},
				primary: {
					color: th.colors.primary,
				},
				primaryMuted: {
					color: th.baseColors.primaryMuted,
				},
				secondary: {
					color: th.colors.secondary,
				},
				white: {
					color: th.baseColors.white,
				},
			},
			variant: {
				h1: {
					fontWeight: "700",
					fontSize: 32,
					lineHeight: 40,
				},
				h2: {
					fontWeight: "700",
					fontSize: 24,
					lineHeight: 32,
				},
				h3: {
					fontWeight: "700",
					fontSize: 20,
					lineHeight: 28,
				},
				subtitle: {
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
					color: th.colors.background,
				},
				false: {
					color: th.colors.text,
				},
			},
		},
	},
}));

export default Text;
