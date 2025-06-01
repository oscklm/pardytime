import { Authenticated, Unauthenticated } from "convex/react";
import { router } from "expo-router";
import { SafeAreaView } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { authClient } from "@/lib/auth/auth-client";
import Button from "@/shared/ui/Button";
import { Card, CardContent, CardHeader } from "@/shared/ui/Card";
import Text from "@/shared/ui/Text";
import YStack from "@/shared/ui/YStack";

export default function Index() {
	return (
		<SafeAreaView style={styles.root}>
			<YStack flex={1} pd="lg" gap="lg">
				{/* Section A */}
				<Text variant="h1">JeopardyTime</Text>
				<YStack flex={0}>
					<Unauthenticated>
						<Card>
							<CardHeader>
								<Text variant="h2">Section A</Text>
							</CardHeader>
							<CardContent>
								<Text>
									This is a simple card component with a header and content.
								</Text>
								<Button
									label="Sign In"
									onPress={() => router.push("/sign-in")}
								/>
								<Button
									label="Sign Up"
									onPress={() => router.push("/sign-up")}
								/>
							</CardContent>
						</Card>
					</Unauthenticated>
					<Authenticated>
						<Card>
							<CardHeader>
								<Text variant="h2">Section A</Text>
							</CardHeader>
							<CardContent>
								<Text>Welcome back! You are authenticated.</Text>
								<Button
									label="Sign Out"
									onPress={() => {
										authClient.signOut();
									}}
								/>
							</CardContent>
						</Card>
					</Authenticated>
				</YStack>
			</YStack>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create((_) => ({
	root: {
		flex: 1,
	},
	container: {
		flex: 1,
		padding: 20,
		gap: 20,
	},
	colorsContainer: {
		width: "100%",
		flexDirection: "row",
	},
}));
