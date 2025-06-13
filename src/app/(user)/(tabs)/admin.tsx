import { StyleSheet } from "react-native-unistyles";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import Text from "@/components/ui/Text";
import YStack from "@/components/ui/YStack";

export default function AdminScreen() {
	return (
		<YStack flex={1} pd="lg" gap="lg" style={styles.container}>
			<YStack>
				<Text variant="h1">Admin</Text>
			</YStack>
			<YStack flex={0} gap="lg">
				<Card>
					<CardHeader>
						<Text variant="h2">Users</Text>
					</CardHeader>
					<CardContent>
						<Text>Something...</Text>
					</CardContent>
				</Card>
				<Card>
					<CardHeader>
						<Text variant="h2">Boards</Text>
					</CardHeader>
					<CardContent>
						<Text>Something...</Text>
					</CardContent>
				</Card>
			</YStack>
		</YStack>
	);
}

const styles = StyleSheet.create((_th, rt) => ({
	container: {
		paddingTop: rt.insets.top,
	},
	colorsContainer: {
		width: "100%",
		flexDirection: "row",
	},
}));
