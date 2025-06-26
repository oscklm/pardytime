import { useMutation } from "convex/react";
import { useContext } from "react";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { GameContext } from "../GameProvider";

export const useGameController = () => {
	const { game } = useContext(GameContext);
	const updateGameMutation = useMutation(api.games.mutations.updateGame);
	const updateTeamScoreMutation = useMutation(
		api.games.mutations.updateTeamScore,
	);
	const addAnsweredQuestionMutation = useMutation(
		api.games.mutations.addAnsweredQuestion,
	);

	/**
	 * Start the game
	 * @description Updates the game status to active
	 */
	const startGame = () => {
		updateGameMutation({
			gameId: game._id,
			values: {
				status: "active",
			},
		});
	};

	/**
	 * Set the active question
	 * @description Updates the game active question id, which will be displayed on top of the board view
	 * @param questionId - The id of the question to set as active
	 */
	const setActiveQuestion = (questionId: Id<"questions">) => {
		updateGameMutation({
			gameId: game._id,
			values: {
				activeQuestionId: questionId,
			},
		});
	};

	/**
	 * Update the score of a team
	 * @description Updates the score of a team
	 * @param teamId - The id of the team to update
	 * @param score - The new score for the team
	 */
	const updateTeamScore = (teamId: Id<"teams">, score: number) => {
		return updateTeamScoreMutation({ teamId, score });
	};

	/**
	 * Add an answered question
	 * @description Adds an answered question to the game
	 * @param gameId - The id of the game to add the answered question to
	 * @param questionId - The id of the question to add as answered
	 */
	const markQuestionAnswered = (questionId: Id<"questions">) => {
		return addAnsweredQuestionMutation({ gameId: game._id, questionId });
	};

	return {
		startGame,
		setActiveQuestion,
		updateTeamScore,
		markQuestionAnswered,
	};
};
