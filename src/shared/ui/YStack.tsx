import { View } from "react-native";
import { StyleSheet, type UnistylesVariants } from "react-native-unistyles";

type Variants = UnistylesVariants<typeof styles>;

interface Props extends React.ComponentPropsWithoutRef<typeof View>, Variants {
	flex?: number;
}

const YStack = ({
	// Normal props
	flex = 1,
	// Unistyles variants
	pd,
	gap,
	// Additional props
	style,
	...props
}: Props) => {
	styles.useVariants({ pd, gap });
	return <View style={[styles.stack, { flex }, style]} {...props} />;
};

const styles = StyleSheet.create((th) => ({
	stack: {
		variants: {
			pd: th.variants.padding,
			gap: th.variants.gap,
		},
	},
}));

export default YStack;
