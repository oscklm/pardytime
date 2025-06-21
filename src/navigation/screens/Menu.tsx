import { Authenticated } from "convex/react";
import SignOutButton from "@/components/SignOutButton";
import Button from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import Text from "@/components/ui/Text";
import YStack from "@/components/ui/YStack";
import { formatUnixTimestamp } from "@/lib/utils/time";
import { useUser } from "@/providers/user-provider";

export function Menu() {
	const user = useUser();

	const createdAt = formatUnixTimestamp(user._creationTime);
	return (
		<YStack flex={1} gap="lg">
			<YStack gap="md" pd="lg" bg="blue" insetTop style={{ height: 125 }}>
				<Text variant="h1">Menu</Text>
			</YStack>
			<YStack flex={1} px="lg" gap="md">
				<YStack>
					<Text variant="h2">Recent boards</Text>
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
					<Button variant="menu" screen="Settings">
						Help
					</Button>
					<Authenticated>
						<SignOutButton />
					</Authenticated>
				</YStack>
			</YStack>
		</YStack>
	);
}
