import { StyleSheet } from "react-native-unistyles";
import SignOutButton from "@/components/SignOutButton";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import Text from "@/components/ui/Text";
import YStack from "@/components/ui/YStack";
import { useUser } from "@/providers/user-provider";

export default function SettingsScreen() {
	const { user } = useUser();
	return (
		<YStack flex={1} pd="lg" gap="lg" style={styles.container}>
			<Card>
				<CardHeader>
					<Text variant="h2">Account</Text>
				</CardHeader>
				<CardContent>
					<YStack>
						<Text variant="subtitle">Email</Text>
						<Text>{user.emailAddresses[0].emailAddress}</Text>
					</YStack>
					<YStack>
						<Text variant="subtitle">Username</Text>
						<Text>{user.username}</Text>
					</YStack>
				</CardContent>
			</Card>
			<YStack flex={1} />
			<YStack>
				<SignOutButton />
			</YStack>
		</YStack>
	);
}

const styles = StyleSheet.create((_th, rt) => ({
	container: {
		paddingBottom: rt.insets.bottom,
	},
}));
