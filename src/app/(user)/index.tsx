import { useAuth } from "@clerk/clerk-expo";
import { useConvexAuth, useQuery } from "convex/react";
import { router } from "expo-router";
import { SafeAreaView } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import Button from "@/components/ui/Button";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import Text from "@/components/ui/Text";
import YStack from "@/components/ui/YStack";
import { api } from "@/convex/_generated/api";

export default function Index() {
	const { isAuthenticated } = useConvexAuth();
	const { userId, signOut } = useAuth();

	const user = useQuery(
		api.users.queries.getByClerkId,
		userId ? { clerkId: userId } : "skip",
	);

	return (
		<SafeAreaView style={styles.root}>
			<YStack flex={1} pd="lg" gap="lg">
				<Text variant="h1">JeopardyTime</Text>
				<YStack flex={0} gap="lg">
					<Card>
						<CardHeader>
							<Text variant="h2">Section A</Text>
						</CardHeader>
						<CardContent>
							<Text>
								This is a simple card component with a header and content.
							</Text>
							<Button label="Sign In" onPress={() => router.push("/sign-in")} />
						</CardContent>
					</Card>
					{isAuthenticated ? (
						<Card>
							<CardHeader>
								<Text variant="h2">Welcome back, {user?.username}!</Text>
							</CardHeader>
							<CardContent>
								<Text> {userId}!</Text>
								<Button
									variant="error"
									label="Sign Out"
									onPress={() => signOut()}
								/>
							</CardContent>
						</Card>
					) : null}
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
