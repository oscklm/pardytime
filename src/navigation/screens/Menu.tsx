import { useNavigation } from "@react-navigation/native";
import { Authenticated, Unauthenticated } from "convex/react";
import SignOutButton from "@/components/sign-out-button";
import Button from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import Text from "@/components/ui/Text";
import TouchableBounce from "@/components/ui/TouchableBounce";
import YStack from "@/components/ui/YStack";
import colors from "@/styles/colors";

export function Menu() {
	const navigation = useNavigation();

	return (
		<YStack flex={1} pd="lg" gap="md" insetTop>
			<Text variant="h1">Menu</Text>
			<Card>
				<CardContent>
					<Unauthenticated>
						<TouchableBounce
							sensory="light"
							onPress={() => navigation.navigate("SignIn")}
						>
							<Card style={{ backgroundColor: colors.accent }}>
								<YStack pd="md" gap="sm">
									<Text variant="h2" color="white">
										Sign in to JeopardyTime
									</Text>
									<Text color="white">
										Sign in to your account to get started.
									</Text>
								</YStack>
							</Card>
						</TouchableBounce>
					</Unauthenticated>
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
