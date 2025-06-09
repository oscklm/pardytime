import { View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

interface Props extends React.ComponentPropsWithoutRef<typeof View> {
	flex?: number;
}

const Card = ({
	// Normal props
	flex,
	// Additional props
	style,
	...props
}: Props) => {
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
		backgroundColor: th.colors.card,
		borderRadius: th.radius.md,
		padding: th.space.lg,
	},
	cardHeader: {
		marginBottom: th.space.md,
	},
	cardContent: {
		gap: th.space.md,
	},
}));

export { Card, CardContent, CardHeader };
