import { useState } from "react";
import { SafeAreaView } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import SignInScreen from "@/features/sign-in/sign-in-screen";
import { Modal } from "@/shared/components/Modal";
import Button from "@/shared/ui/Button";
import { Card, CardContent, CardHeader } from "@/shared/ui/Card";
import Text from "@/shared/ui/Text";
import YStack from "@/shared/ui/YStack";

export default function Index() {
	const [showSignIn, setShowSignIn] = useState(false);

	return (
		<>
			<SafeAreaView style={styles.root}>
				<YStack pd="lg" gap="lg">
					{/* Section A */}
					<Text variant="h1">Welcome to the App</Text>
					<YStack flex={0}>
						<Card>
							<CardHeader>
								<Text variant="h2">Section A</Text>
							</CardHeader>
							<CardContent>
								<Text>
									This is a simple card component with a header and content.
								</Text>
							</CardContent>
						</Card>
					</YStack>

					{/* Section B */}
					<YStack flex={4} gap="lg">
						<Card>
							<CardHeader>
								<Text variant="h2">Section B - Button</Text>
							</CardHeader>
							<CardContent>
								<Text>
									This is a simple card component with a header and content.
								</Text>
								<Button
									label="Press Me"
									onPress={() => {
										alert("Button Pressed!");
									}}
								/>
							</CardContent>
						</Card>
						<Card flex={1}>
							<CardHeader>
								<Text variant="h2">Section B - Dark Card</Text>
							</CardHeader>
							<CardContent>
								<Text>
									Lorem, ipsum dolor sit amet consectetur adipisicing elit.
									Dolores debitis ipsa impedit eum ex blanditiis laborum, quasi
									aliquid exercitationem maiores cumque quam, eligendi eaque
									temporibus, alias nobis voluptates deleniti harum.
								</Text>
							</CardContent>
						</Card>
					</YStack>

					{/* Section C */}
					<YStack flex={1}>
						<Card>
							<CardHeader>
								<Text variant="h2">Section C </Text>
							</CardHeader>
							<CardContent>
								<Text>
									This is a simple card component with a header and content.
								</Text>
							</CardContent>
							<Button
								label="Sign In"
								onPress={() => {
									setShowSignIn((prev) => !prev);
								}}
							/>
						</Card>
					</YStack>
				</YStack>
			</SafeAreaView>
			<Modal
				visible={showSignIn}
				onDismiss={() => setShowSignIn(false)}
				onRequestClose={() => setShowSignIn(false)}
			>
				<SignInScreen />
				<Button
					label="Close"
					onPress={() => {
						setShowSignIn(false);
					}}
				/>
			</Modal>
		</>
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
