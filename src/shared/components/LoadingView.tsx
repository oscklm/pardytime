import { ActivityIndicator, Text, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

interface LoadingViewProps {
	message?: string;
}

const LoadingView = ({ message }: LoadingViewProps) => {
	return (
		<View style={styles.container}>
			<ActivityIndicator size="large" color={styles.indicator.color} />
			{message && <Text>{message}</Text>}
		</View>
	);
};

const styles = StyleSheet.create((th, rt) => ({
	container: {
		flex: 1,
		paddingTop: rt.insets.top,
		alignItems: "center",
		justifyContent: "center",
		gap: th.space.md,
	},
	indicator: {
		color: th.colors.accent,
	},
}));

export default LoadingView;
