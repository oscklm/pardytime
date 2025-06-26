import { useMutation } from "convex/react";
import { useContext, useMemo } from "react";
import { ScrollView, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { QuestionCard } from "@/components/QuestionCard";
import Text from "@/components/ui/Text";
import YStack from "@/components/ui/YStack";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { SelectedQuestionDisplay } from "../components/SelectedQuestionDisplay";
import { GameContext } from "../GameView";

export const BoardView = () => {
	const { game, board, answeredQuestions } = useContext(GameContext);

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
			<View style={styles.selectedQuestionContainer}>
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
	},
	selectedQuestionContainer: {
		paddingHorizontal: th.space.md,
		paddingBottom: th.space.md,
	},
	contentContainer: {
		gap: th.space.lg,
	},
}));
