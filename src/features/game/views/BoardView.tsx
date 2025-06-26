import { useMutation } from "convex/react";
import { useContext, useMemo } from "react";
import { ScrollView, View } from "react-native";
import { StyleSheet, useUnistyles } from "react-native-unistyles";
import { QuestionCard } from "@/components/QuestionCard";
import { Image } from "@/components/ui/Image";
import Text from "@/components/ui/Text";
import XStack from "@/components/ui/XStack";
import YStack from "@/components/ui/YStack";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { SelectedQuestionDisplay } from "../components/SelectedQuestionDisplay";
import { GameContext } from "../GameProvider";

const teamIndexToColor = ["blue", "pink", "orange", "purple"] as const;

export const BoardView = () => {
	const { theme } = useUnistyles();
	const { game, board, teams, answeredQuestions } = useContext(GameContext);

	const updateGame = useMutation(api.games.mutations.updateGame);
	const addAnsweredQuestion = useMutation(
		api.games.mutations.addAnsweredQuestion,
	);

	const handleSelectQuestion = (id: Id<"questions">) => {
		updateGame({
			gameId: game._id,
			values: {
				activeQuestionId: id,
			},
		});
	};

	const handleAnswerQuestion = (id: Id<"questions">) => {
		addAnsweredQuestion({
			gameId: game._id,
			questionId: id,
		});
	};

	const activeQuestion = useMemo(() => {
		if (!game.activeQuestionId) return null;

		// Find the actual question, not just the category
		for (const category of board.enriched.categories) {
			const question = category.questions.find(
				(q) => q._id === game.activeQuestionId,
			);
			if (question) {
				return question;
			}
		}
		return null;
	}, [game.activeQuestionId]);

	const isCurrentQuestionAnswered = useMemo(() => {
		return answeredQuestions.some(
			(aq) => aq.questionId === activeQuestion?._id,
		);
	}, [activeQuestion?._id, answeredQuestions]);

	return (
		<View style={styles.container}>
			<YStack py="md">
				<XStack gap="md">
					{teams.map((team, index) => (
						<YStack
							key={team._id}
							style={[
								styles.teamCard,
								{ backgroundColor: theme.colors[teamIndexToColor[index]] },
							]}
						>
							<Image
								storageId={team.imageId}
								style={styles.teamImage}
								width={300}
							/>
							<Text key={team._id} style={styles.teamScoreText}>
								{team.score}
							</Text>
						</YStack>
					))}
				</XStack>
			</YStack>
			<View>
				{activeQuestion && (
					<SelectedQuestionDisplay
						question={activeQuestion}
						isAnswered={isCurrentQuestionAnswered}
						onPress={() => handleAnswerQuestion(activeQuestion._id)}
					/>
				)}
			</View>
			<ScrollView
				showsVerticalScrollIndicator={false}
				contentContainerStyle={styles.contentContainer}
			>
				{board.enriched.categories.map((category) => (
					<YStack key={category._id} gap="md">
						<Text variant="h3">{category.title}</Text>
						{category.questions.map((question) => {
							const isSelected = game.activeQuestionId === question._id;
							return (
								<QuestionCard
									key={question._id}
									question={question}
									isAnswered={false}
									isSelected={isSelected}
									onPress={() => handleSelectQuestion(question._id)}
								/>
							);
						})}
					</YStack>
				))}
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create((th) => ({
	container: {
		flex: 1,
		gap: th.space.md,
	},
	teamCard: {
		flex: 1,
		padding: th.space.sm,
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: th.colors.backgroundSecondary,
		borderRadius: th.radius.md,
	},
	teamScoreText: {
		flex: 1,
		fontSize: 24,
		lineHeight: 28,
		textAlign: "center",
		fontWeight: "700",
		color: th.colors.white,
	},
	teamImage: {
		width: 45,
		height: 45,
		borderRadius: th.radius.md,
	},
	contentContainer: {
		gap: th.space.lg,
	},
}));
