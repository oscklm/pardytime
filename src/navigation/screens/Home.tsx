import { useNavigation } from "@react-navigation/native";
import { useQuery } from "convex/react";
import { ScrollView } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import Text from "@/components/ui/Text";
import TouchableBounce from "@/components/ui/TouchableBounce";
import YStack from "@/components/ui/YStack";
import { api } from "@/convex/_generated/api";

export function Home() {
	const boards = useQuery(api.boards.getAll);
	const navigation = useNavigation();

	return (
		<YStack flex={1} pd="lg" gap="md" insetTop>
			<Text variant="h1">Home</Text>
			<Card>
				<CardHeader>
					<Text variant="h2">Latest boards</Text>
				</CardHeader>
				<CardContent>
					<ScrollView
						horizontal
						contentContainerStyle={{ gap: 16 }}
						showsHorizontalScrollIndicator={false}
					>
						{boards?.map((board) => (
							<TouchableBounce
								key={board._id}
								sensory="light"
								onPress={() =>
									navigation.navigate("Board", { boardId: board._id })
								}
							>
								<Card key={board._id} style={styles.card}>
									<CardContent>
										<Text variant="h3">{board.title}</Text>
										<Text>{board.description}</Text>
									</CardContent>
								</Card>
							</TouchableBounce>
						))}
					</ScrollView>
				</CardContent>
			</Card>
		</YStack>
	);
}

const styles = StyleSheet.create((th) => ({
	card: {
		height: 100,
		backgroundColor: th.colors.cardMuted,
		borderRadius: th.radius.md,
		padding: th.space.lg,
	},
}));
