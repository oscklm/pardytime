import { Authenticated } from "convex/react";
import SignOutButton from "@/components/sign-out-button";
import Button from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import Text from "@/components/ui/Text";
import YStack from "@/components/ui/YStack";

export function Menu() {
	return (
		<YStack flex={1} pd="lg" gap="md" insetTop>
			<Text variant="h1">Menu</Text>
			<Card>
				<CardContent>
					<Button variant="menu" screen="Settings">
						Settings
					</Button>
					<Authenticated>
						<SignOutButton />
					</Authenticated>
				</CardContent>
			</Card>
		</YStack>
	);
}
