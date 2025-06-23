import { StyleSheet } from "react-native-unistyles";
import SignOutButton from "@/components/SignOutButton";
import Button from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Image } from "@/components/ui/Image";
import Text from "@/components/ui/Text";
import YStack from "@/components/ui/YStack";
import { formatUnixTimestamp } from "@/lib/utils/time";
import { useUser } from "@/providers/user-provider";

export function ProfileTab() {
	const user = useUser();

	const createdAt = formatUnixTimestamp(user._creationTime);
	return (
		<YStack flex={1} gap="lg" py="lg">
			<YStack flex={1} px="lg" gap="md">
				<YStack gap="md" ai="center">
					<Image source={{ uri: user.imageUrl }} style={styles.avatar} />
					<YStack>
						<Text variant="h1">@{user.username}</Text>
					</YStack>
				</YStack>
				<YStack gap="md">
					<Card>
						<YStack gap="md">
							<YStack>
								<Text variant="subtitle">Email</Text>
								<Text>{user.emailAddresses[0].emailAddress}</Text>
							</YStack>
							<YStack>
								<Text variant="subtitle">Joined at</Text>
								<Text>{createdAt}</Text>
							</YStack>
						</YStack>
					</Card>
				</YStack>
				<YStack gap="md">
					<Button variant="menu" screen="Settings">
						Settings
					</Button>
					<Button variant="menu" screen="Help">
						Help
					</Button>
					<SignOutButton />
				</YStack>
			</YStack>
		</YStack>
	);
}

const styles = StyleSheet.create((th) => ({
	avatar: {
		width: 100,
		height: 100,
		borderRadius: 9999,
	},
}));
