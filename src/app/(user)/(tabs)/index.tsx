import { router } from "expo-router";
import { StyleSheet } from "react-native-unistyles";
import Button from "@/components/ui/Button";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import Text from "@/components/ui/Text";
import YStack from "@/components/ui/YStack";
import { useUser } from "@/providers/user-provider";

export default function IndexScreen() {
	const { user } = useUser();

	return (
		<YStack flex={1} pd="lg" gap="lg" style={styles.container}>
			<YStack>
				<Text variant="h2">Hey, {user.username}!</Text>
			</YStack>
			<YStack flex={0} gap="lg">
				<Card>
					<CardHeader>
						<Text variant="h2">Boards</Text>
					</CardHeader>
					<CardContent>
						<Button
							label="Go to Dashboard"
							onPress={() => router.push("/dashboard")}
						/>
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
