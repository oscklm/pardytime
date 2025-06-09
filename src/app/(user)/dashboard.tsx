import { Text, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

const DashboardScreen = () => {
	return (
		<View style={styles.container}>
			<Text>Welcome to Dashboard</Text>
		</View>
	);
};

const styles = StyleSheet.create((th) => ({
	container: {
		backgroundColor: th.colors.background,
	},
}));

export default DashboardScreen;
