import { useMutation } from "convex/react";
import { useContext } from "react";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { GameContext } from "../context/GameProvider";

export const useGameController = () => {
  const { game, activeQuestion, teams } = useContext(GameContext);

  const updateGameMutation = useMutation(api.games.mutations.updateGame);
  const deleteGameMutation = useMutation(api.games.mutations.deleteGame);
  const resetGameMutation = useMutation(api.games.mutations.resetGame);

  const updateTeamScoreMutation = useMutation(
    api.teams.mutations.updateTeamScore
  );

  const addAnsweredQuestionMutation = useMutation(
    api.games.mutations.addAnsweredQuestion
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
   * Delete the game
   * @description Deletes the game
   */
  const deleteGame = () => {
    deleteGameMutation({ gameId: game._id });
  };

  /**
   * Reset the game
   * @description Resets the game to its initial state, deleting all answered questions and resetting all team scores to 0
   */
  const resetGame = () => {
    resetGameMutation({ gameId: game._id });
  };

  /**
   * Reset the game to lobby
   * @description Resets the game to lobby, which will show the lobby view
   */
  const resetToLobby = () => {
    updateGameMutation({
      gameId: game._id,
      values: {
        status: "pending",
      },
    });
  };

  /**
   * End the game
   * @description Updates the game status to completed, which will show the completed view
   */
  const endGame = () => {
    updateGameMutation({
      gameId: game._id,
      values: {
        status: "completed",
      },
    });
  };

  /**
   * Set the active question
   * @description Updates the game active question id, which will be displayed on top of the board view
   * @param questionId - The id of the question to set as active
   */
  const setActiveQuestion = (questionId: Id<"questions"> | null) => {
    updateGameMutation({
      gameId: game._id,
      values: {
        activeQuestionId: questionId,
      },
    });
  };

  /**
   * Handle team answered
   * @description Handles when a team answers a question, which happens in the TeamControlModal
   * @param teamId - The id of the team that answered
   * @param pointAmount - The amount of points awarded to the team
   */
  const handleTeamAnswered = (
    answer: boolean,
    teamId: Id<"teams">,
    pointAmount: number
  ) => {
    const team = teams.find((t) => t._id === teamId);
    if (!team) return;

    updateTeamScore(teamId, team.score + pointAmount);

    if (activeQuestion && answer) {
      // Is question answered?
      if (game.answeredQuestions.includes(activeQuestion._id)) return;
      markQuestionAnswered(activeQuestion._id);
    }
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
    if (game.answeredQuestions.includes(questionId)) {
      setActiveQuestion(null);
    }
    return addAnsweredQuestionMutation({ gameId: game._id, questionId });
  };

  return {
    startGame,
    endGame,
    resetGame,
    resetToLobby,
    setActiveQuestion,
    handleTeamAnswered,
    updateTeamScore,
    markQuestionAnswered,
    deleteGame,
  };
};
