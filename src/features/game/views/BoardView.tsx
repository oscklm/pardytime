import { useMutation } from "convex/react";
import { useContext, useMemo, useState } from "react";
import { Pressable, ScrollView, View } from "react-native";
import { StyleSheet, useUnistyles } from "react-native-unistyles";
import { Modal } from "@/components/Modal";
import { QuestionCard } from "@/components/QuestionCard";
import Button from "@/components/ui/Button";
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

	const [focusedTeamId, setFocusedTeamId] = useState<Id<"teams"> | undefined>(
		undefined,
	);

	const [pointAmount, setPointAmount] = useState(0);

	const updateGame = useMutation(api.games.mutations.updateGame);
	const updateTeamScore = useMutation(api.games.mutations.updateTeamScore);
	const addAnsweredQuestion = useMutation(
		api.games.mutations.addAnsweredQuestion,
	);

	const handleGiveTeamPoint = (deduct: boolean = false) => {
		if (!focusedTeam || !focusedTeamId) return;

		if (pointAmount === 0) {
			alert("Please enter a point amount");
			return;
		}

		const adjustedPointAmount =
			focusedTeam.score + (deduct ? -pointAmount : pointAmount);

		updateTeamScore({
			teamId: focusedTeamId,
			score: adjustedPointAmount,
		});
	};

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

	const focusedTeam = useMemo(() => {
		if (!focusedTeamId) return null;
		return teams.find((team) => team._id === focusedTeamId);
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
				<YStack py="md">
					<XStack gap="md">
						{teams.map((team, index) => (
							<Pressable
								key={team._id}
								style={[
									styles.teamCard,
									{ backgroundColor: theme.colors[teamIndexToColor[index]] },
								]}
								onPress={() => setFocusedTeamId(team._id)}
							>
								<Image
									storageId={team.imageId}
									style={styles.teamImage}
									width={100}
								/>
								<Text key={team._id} style={styles.teamScoreText}>
									{team.score}
								</Text>
							</Pressable>
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
								const isAnswered = answeredQuestions.some(
									(aq) => aq.questionId === question._id,
								);
								return (
									<QuestionCard
										key={question._id}
										question={question}
										isAnswered={isAnswered}
										isSelected={isSelected}
										onPress={() => handleSelectQuestion(question._id)}
									/>
								);
							})}
						</YStack>
					))}
				</ScrollView>
			</View>

			<Modal
				visible={!!focusedTeam}
				onRequestClose={() => setFocusedTeamId(undefined)}
			>
				<YStack flex={1} pd="lg" gap="xl">
					<YStack gap="lg" ai="center">
						<Image
							storageId={focusedTeam?.imageId}
							style={styles.teamModalImage}
							width={300}
						/>
						<YStack ai="center">
							<Text variant="h3">{focusedTeam?.nickname}</Text>
							<Text variant="subtitle">Current score</Text>
							<Text style={styles.teamModalScoreText}>
								{focusedTeam?.score}
							</Text>
						</YStack>
					</YStack>
					<View style={styles.teamModalDivider} />
					<YStack ai="center" gap="md" py="md">
						<YStack ai="center">
							<Text variant="h3">Amount</Text>
							<Text variant="subtitle">Adjust amount to give</Text>
							<Text style={styles.teamModalScoreText}>{pointAmount}</Text>
						</YStack>
						<XStack gap="md">
							<Button
								size="sm"
								onPress={() => setPointAmount((prev) => prev + 50)}
							>
								+ 50
							</Button>
							<Button
								size="sm"
								onPress={() => setPointAmount((prev) => prev - 50)}
							>
								- 50
							</Button>
						</XStack>
					</YStack>
					<YStack gap="lg">
						<Button
							variant="success"
							size="md"
							onPress={() => handleGiveTeamPoint()}
						>
							Give
						</Button>
						<Button
							variant="error"
							size="md"
							onPress={() => handleGiveTeamPoint(true)}
						>
							Take
						</Button>
					</YStack>
				</YStack>
			</Modal>
		</>
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
		lineHeight: 24 * 1.3,
		textAlign: "center",
		fontWeight: "700",
		color: th.colors.white,
	},
	teamImage: {
		width: 45,
		height: 45,
		borderRadius: th.radius.md,
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
