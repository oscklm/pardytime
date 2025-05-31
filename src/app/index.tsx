import { SafeAreaView } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { Card, CardContent, CardHeader } from "@/shared/ui/Card";
import Text from "@/shared/ui/Text";
import YStack from "@/shared/ui/YStack";

export default function Index() {
	return (
		<SafeAreaView style={styles.root}>
			<YStack pd="lg" gap="lg">
				{/* Section A */}
				<YStack flex={0}>
					<Card>
						<CardHeader>
							<Text variant="h2">Card Header</Text>
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
							<Text variant="h2">Card Header</Text>
						</CardHeader>
						<CardContent>
							<Text>
								This is a simple card component with a header and content.
							</Text>
						</CardContent>
					</Card>
					<Card flex={1} bg="accent">
						<CardHeader>
							<Text color="white" variant="h2">
								Card Header
							</Text>
						</CardHeader>
						<CardContent>
							<Text color="white">
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
							<Text variant="h2">Card Header</Text>
						</CardHeader>
						<CardContent>
							<Text>
								This is a simple card component with a header and content.
							</Text>
						</CardContent>
					</Card>
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
