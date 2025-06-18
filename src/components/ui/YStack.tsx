import { View } from "react-native";
import { StyleSheet, type UnistylesVariants } from "react-native-unistyles";

type Variants = UnistylesVariants<typeof styles>;

interface Props extends React.ComponentPropsWithoutRef<typeof View>, Variants {
	flex?: number;
}

const YStack = ({
	// Normal props
	flex,
	// Unistyles variants
	bg,
	pd,
	ai,
	jc,
	gap,
	insetTop = false,
	insetBottom = false,
	// Additional props
	style,
	...props
}: Props) => {
	styles.useVariants({ pd, ai, jc, gap, insetTop, insetBottom, bg });
	return <View style={[styles.stack, { flex }, style]} {...props} />;
};

const styles = StyleSheet.create((th, rt) => ({
	stack: {
		flexDirection: "column",
		variants: {
			pd: th.variants.padding,
			ai: th.variants.alignItems,
			jc: th.variants.justifyContent,
			gap: th.variants.gap,
			bg: {
				primary: {
					backgroundColor: th.colors.primary,
				},
				secondary: {
					backgroundColor: th.colors.secondary,
				},
				accent: {
					backgroundColor: th.colors.accent,
				},
				card: {
					backgroundColor: th.colors.card,
				},
				cardMuted: {
					backgroundColor: th.colors.cardMuted,
				},
			},
			insetTop: {
				true: {
					paddingTop: rt.insets.top,
				},
				false: {},
			},
			insetBottom: {
				true: {
					paddingBottom: rt.insets.bottom,
				},
				false: {},
			},
		},
	},
}));

export default YStack;
