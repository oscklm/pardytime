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
		flexDirection: "column",
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
				blue: {
					backgroundColor: th.colors.blue,
				},
				indigo: {
					backgroundColor: th.colors.indigo,
				},
				purple: {
					backgroundColor: th.colors.purple,
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
