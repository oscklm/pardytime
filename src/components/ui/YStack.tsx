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
	pd,
	ai,
	jc,
	gap,
	// Additional props
	style,
	...props
}: Props) => {
	styles.useVariants({ pd, ai, jc, gap });
	return <View style={[styles.stack, { flex }, style]} {...props} />;
};

const styles = StyleSheet.create((th) => ({
	stack: {
		variants: {
			pd: th.variants.padding,
			ai: th.variants.alignItems,
			jc: th.variants.justifyContent,
			gap: th.variants.gap,
		},
	},
}));

export default YStack;
