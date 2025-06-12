import { router } from "expo-router";
import { StyleSheet } from "react-native-unistyles";
import SignOutButton from "@/components/sign-out-button";
import Button from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import Text from "@/components/ui/Text";
import YStack from "@/components/ui/YStack";

export default function SettingsScreen() {
	return (
		<YStack flex={1} pd="lg" gap="lg" style={styles.container}>
			<Text variant="h1">Settings</Text>
			<YStack flex={0} gap="lg">
				<Card>
					<CardContent>
						<Button
							label="See what's new"
							onPress={() => router.push("/changelogs")}
						/>
						<SignOutButton />
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
