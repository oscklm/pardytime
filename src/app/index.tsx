import { SafeAreaView, Text, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import ColorPreview from "@/shared/components/ColorPreview";
import Button from "@/shared/ui/Button";

export default function Index() {
	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "hsl(44, 9%, 69%)" }}>
			<View style={styles.container}>
				<View>
					<Text style={{ fontWeight: "600", marginBottom: 6 }}>
						Theme colors
					</Text>
					<View style={styles.colorsContainer}>
						<ColorPreview percent={60} color="hsl(252, 87.90%, 42.00%)" />
						<ColorPreview percent={30} color="hsl(158, 74.00%, 60.80%)" />
						<ColorPreview percent={10} color="hsl(252, 36.50%, 50.60%)" />
					</View>
				</View>
				<View style={{ width: "100%" }}>
					<Button
						label="Click on me"
						onPress={() => alert("Button Pressed!")}
					/>
				</View>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create(() => ({
	container: {
		flex: 1,
		justifyContent: "space-between",
		alignItems: "center",
		padding: 20,
		gap: 20,
	},
	colorsContainer: {
		width: "100%",
		flexDirection: "row",
	},
}));
