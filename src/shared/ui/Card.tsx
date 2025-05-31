import { View } from "react-native";
import { StyleSheet, type UnistylesVariants } from "react-native-unistyles";

type Variants = UnistylesVariants<typeof styles>;

interface Props extends React.ComponentPropsWithoutRef<typeof View>, Variants {
	flex?: number;
}

const Card = ({
	// Normal props
	flex,
	// Unistyles variants
	bg = "card",
	gap = "md",
	// Additional props
	style,
	...props
}: Props) => {
	styles.useVariants({ bg, gap });
	return <View style={[styles.card, { flex }, style]} {...props} />;
};

const CardHeader = ({
	style,
	...props
}: React.ComponentPropsWithoutRef<typeof View>) => {
	return <View style={[styles.cardHeader, style]} {...props} />;
};

const CardContent = ({
	style,
	...props
}: React.ComponentPropsWithoutRef<typeof View>) => {
	return <View style={[styles.cardContent, style]} {...props} />;
};

const styles = StyleSheet.create((th) => ({
	card: {
		flexDirection: "column",
		borderRadius: th.radius.md,
		padding: th.space.lg,
		variants: {
			bg: th.variants.bg,
			gap: th.variants.gap,
		},
	},
	cardHeader: {},
	cardContent: {
		gap: th.space.md,
	},
}));

export { Card, CardContent, CardHeader };
