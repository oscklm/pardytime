import { useQuery } from "convex/react";
import { Stack, useLocalSearchParams } from "expo-router";
import React from "react";
import { ScrollView, View } from "react-native";
import Text from "@/components/ui/Text";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";

export default function BoardScreen() {
	const { id } = useLocalSearchParams<{ id: Id<"boards"> }>();
	const board = useQuery(api.boards.getEnrichedById, id ? { id } : "skip");

	if (!id) return <Text>No board id provided.</Text>;
	if (board === undefined) return <Text>Loading...</Text>;
	if (board === null) return <Text>Board not found.</Text>;

	const { categories } = board.enriched;

	return (
		<React.Fragment>
			<Stack.Screen options={{ title: board.title }} />
			<ScrollView>
				<Text variant="h1">{board.title}</Text>
				<Text>{board.description}</Text>
				{categories.map((cat) => (
					<View key={cat._id}>
						<Text variant="h2">{cat.title}</Text>
						{cat.questions.map((q) => (
							<View key={q._id}>
								<Text>{q.text}</Text>
								<Text>Answer: {q.answer}</Text>
							</View>
						))}
					</View>
				))}
			</ScrollView>
		</React.Fragment>
	);
}
