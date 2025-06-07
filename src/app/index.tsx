import { router } from "expo-router";
import { SafeAreaView } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import Button from "@/components/ui/Button";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import Text from "@/components/ui/Text";
import YStack from "@/components/ui/YStack";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/providers/auth-provider";

export default function Index() {
	const { session } = useAuth();
	return (
		<SafeAreaView style={styles.root}>
			<YStack flex={1} pd="lg" gap="lg">
				<Text variant="h1">JeopardyTime</Text>
				<YStack flex={0}>
					<Card>
						<CardHeader>
							<Text variant="h2">Section A</Text>
						</CardHeader>
						<CardContent>
							<Text>
								This is a simple card component with a header and content.
							</Text>
							<Button label="Sign In" onPress={() => router.push("/sign-in")} />
							<Button label="Sign Up" onPress={() => router.push("/sign-up")} />
						</CardContent>
					</Card>
				</YStack>
				{session && (
					<Card>
						<CardHeader>
							<Text variant="h2">Welcome Back!</Text>
						</CardHeader>
						<CardContent>
							<Text>You're logged in as {session.user.email}</Text>
							<Button
								label="Sign Out"
								onPress={() => {
									supabase.auth.signOut();
								}}
							/>
						</CardContent>
					</Card>
				)}
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
