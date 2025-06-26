import { useContext, useMemo, useState } from "react";
import { ScrollView, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { QuestionCard } from "@/components/QuestionCard";
import Text from "@/components/ui/Text";
import YStack from "@/components/ui/YStack";
import type { Id } from "@/convex/_generated/dataModel";
import { ActiveQuestionDisplay } from "../components/ActiveQuestionDisplay";
import { TeamControlModal } from "../components/TeamControlModal";
import { TeamScoreTile } from "../components/TeamScoreTile";
import { GameContext } from "../GameProvider";
import { useGameController } from "../hooks/useGameController";

export const BoardView = () => {
	const [pointAmount, setPointAmount] = useState(0);
	const [focusedTeamId, setFocusedTeamId] = useState<Id<"teams"> | undefined>(
		undefined,
	);

	const { game, board, teams, answeredQuestions } = useContext(GameContext);

	const { setActiveQuestion, markQuestionAnswered } = useGameController();

	const focusedTeam = useMemo(() => {
		return teams.find((team) => team._id === focusedTeamId) ?? null;
	}, [focusedTeamId, teams]);

	const activeQuestion = useMemo(() => {
		if (!game.activeQuestionId) return null;

		// Find the actual question, not just the category
		for (const category of board.enriched.categories) {
			const question = category.questions.find(
				(q) => q._id === game.activeQuestionId,
			);
			if (question) {
				// Update point amount
				setPointAmount(question.value);
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
		<>
			<View style={styles.container}>
				<TeamScoreTile teams={teams} onTeamSelect={setFocusedTeamId} />
				<ActiveQuestionDisplay
					question={activeQuestion}
					isAnswered={isCurrentQuestionAnswered}
					onPressQuestion={markQuestionAnswered}
				/>
				<ScrollView
					showsVerticalScrollIndicator={false}
					contentContainerStyle={styles.contentContainer}
				>
					{board.enriched.categories.map((category) => (
						<YStack key={category._id} gap="md">
							<Text variant="h3">{category.title}</Text>
							{category.questions.map((question) => {
								const isSelected = game.activeQuestionId === question._id;
								const isAnswered = answeredQuestions.some(
									(aq) => aq.questionId === question._id,
								);
								return (
									<QuestionCard
										key={question._id}
										question={question}
										isAnswered={isAnswered}
										isSelected={isSelected}
										onPress={() => setActiveQuestion(question._id)}
									/>
								);
							})}
						</YStack>
					))}
				</ScrollView>
			</View>

			<TeamControlModal
				visible={!!focusedTeam}
				onRequestClose={() => setFocusedTeamId(undefined)}
				team={focusedTeam}
				pointAmount={pointAmount}
				onPointAmountChange={setPointAmount}
			/>
		</>
	);
};

const styles = StyleSheet.create((th) => ({
	container: {
		flex: 1,
		gap: th.space.md,
	},

	teamModalDivider: {
		width: "100%",
		height: 2,
		backgroundColor: th.colors.borderTertiary,
	},
	teamModalContainer: {
		flex: 1,
		gap: th.space.md,
		padding: th.space.lg,
	},
	teamModalScoreText: {
		fontSize: 32,
		lineHeight: 32 * 1.3,
		textAlign: "center",
		fontWeight: "700",
		color: th.colors.white,
	},
	teamModalImage: {
		width: 200,
		height: 200,
		borderRadius: th.radius.md,
	},
	contentContainer: {
		gap: th.space.lg,
	},
}));
