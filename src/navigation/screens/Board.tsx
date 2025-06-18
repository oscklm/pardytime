import {
	type StaticScreenProps,
	useNavigation,
} from "@react-navigation/native";
import { useQuery } from "convex/react";
import { useEffect, useMemo } from "react";
import { FlatList } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { AnimatedSpinner } from "@/components/AnimatedSpinner";
import { QuestionPreviewCard } from "@/components/questions/QuestionPreviewCard";
import { Card, CardContent } from "@/components/ui/Card";
import Text from "@/components/ui/Text";
import YStack from "@/components/ui/YStack";
import { api } from "@/convex/_generated/api";

type Props = StaticScreenProps<{
	boardId: string;
}>;

export function Board({ route }: Props) {
	const board = useQuery(api.boards.getEnrichedById, {
		id: route.params.boardId,
	});

	const navigation = useNavigation();

	const totalQuestions = useMemo(() => {
		if (!board || !board.enriched) return 0;
		return board.enriched.categories.reduce(
			(acc, category) => acc + category.questions.length,
			0,
		);
	}, [board]);

	useEffect(() => {
		navigation.setOptions({
			title: board?.title,
		});
	}, [board]);

	if (!board) {
		return (
			<YStack flex={1} jc="center" ai="center">
				<AnimatedSpinner style={{ width: 64, height: 64 }} />
			</YStack>
		);
	}

	const { enriched } = board;

	return (
		<FlatList
			data={enriched.categories}
			contentContainerStyle={styles.contentContainer}
			showsVerticalScrollIndicator={false}
			ListHeaderComponent={
				<>
					<Text variant="h1">{board?.title}</Text>
					<Text>{board?.description}</Text>
					<YStack gap="md">
						<Text variant="h3">Categories</Text>
						<Text>Hold down on a card to reveal the answer.</Text>
					</YStack>
				</>
			}
			renderItem={({ item }) => (
				<Card key={item._id}>
					<CardContent>
						<Text>{item.title}</Text>
						{item.questions.map((question) => (
							<QuestionPreviewCard key={question._id} question={question} />
						))}
					</CardContent>
				</Card>
			)}
			style={styles.container}
		/>
	);
}

const styles = StyleSheet.create((th) => ({
	container: {
		flex: 1,
		gap: th.space.md,
		padding: th.space.lg,
	},
	contentContainer: {
		gap: th.space.lg,
	},
}));
