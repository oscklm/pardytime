import { TextInput as RNTextInput } from "react-native";
import { StyleSheet, type UnistylesVariants } from "react-native-unistyles";

type Variants = UnistylesVariants<typeof styles>;

interface Props
	extends React.ComponentPropsWithoutRef<typeof RNTextInput>,
		Variants {}

const TextInput = ({
	// Unistyles variants
	variant,
	color,
	invert,
	// Additional props
	style,
	...props
}: Props) => {
	styles.useVariants({ variant, color, invert });
	return <RNTextInput style={[styles.text, style]} {...props} />;
};

const styles = StyleSheet.create((th) => ({
	text: {
		fontWeight: "400",
		fontSize: 16,
		backgroundColor: th.colors.card,
		padding: th.space.lg,
		borderRadius: th.radius.md,
		color: th.colors.text,
		variants: {
			color: {
				accent: {
					color: th.colors.accent,
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

export default TextInput;
