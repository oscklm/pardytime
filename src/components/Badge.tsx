import { Text, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

const Badge = ({ label }: { label: string }) => {
	return (
		<View style={styles.badge}>
			<Text style={styles.label}>{label}</Text>
		</View>
	);
};

const styles = StyleSheet.create((th) => ({
	badge: {
		backgroundColor: th.colors.labelPrimary,
		borderRadius: th.radius.md,
		padding: th.space.md,
	},
	label: {
		fontWeight: "500",
		color: th.colors.backgroundPrimary,
		fontSize: 14,
		lineHeight: 20,
	},
}));

export default Badge;
