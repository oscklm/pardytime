import {
	type StaticScreenProps,
	useNavigation,
} from "@react-navigation/native";
import { useQuery } from "convex/react";
import { useEffect, useMemo } from "react";
import { FlatList } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { AnimatedSpinner } from "@/components/AnimatedSpinner";
import Badge from "@/components/Badge";
import { QuestionPreviewCard } from "@/components/questions/QuestionPreviewCard";
import UserBadge from "@/components/UserBadge";
import Text from "@/components/ui/Text";
import XStack from "@/components/ui/XStack";
import YStack from "@/components/ui/YStack";
import { api } from "@/convex/_generated/api";

type Props = StaticScreenProps<{
	boardId: string;
}>;

export function Board({ route }: Props) {
	const board = useQuery(api.boards.queries.getByIdEnriched, {
		id: route.params.boardId,
	});

	const user = useQuery(
		api.users.queries.getById,
		board
			? {
					id: board.ownerId,
				}
			: "skip",
	);

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
		<YStack flex={1}>
			<YStack gap="md" bg="purple" pd="lg">
				<YStack gap="md">
					<YStack>
						<Text variant="h1">{board?.title}</Text>
						<UserBadge user={user} />
					</YStack>
					<Text>{board?.description}</Text>
				</YStack>
				<XStack gap="sm">
					<Badge label={`${enriched.categories.length} categories`} />
					<Badge label={`${totalQuestions} questions`} />
				</XStack>
			</YStack>
			<YStack gap="lg" pd="lg">
				<FlatList
					data={enriched.categories}
					contentContainerStyle={styles.contentContainer}
					showsVerticalScrollIndicator={false}
					ListHeaderComponent={() => (
						<YStack gap="xs">
							<Text variant="h2">Categories</Text>
							<Text variant="subtitle">
								Hold down on a card to reveal the answer.
							</Text>
						</YStack>
					)}
					renderItem={({ item }) => (
						<YStack gap="md">
							<Text variant="h3">{item.title}</Text>
							{item.questions.map((question) => (
								<QuestionPreviewCard key={question._id} question={question} />
							))}
						</YStack>
					)}
				/>
			</YStack>
		</YStack>
	);
}

const styles = StyleSheet.create((th) => ({
	contentContainer: {
		gap: th.space.lg,
		paddingBottom: 225,
	},
}));
