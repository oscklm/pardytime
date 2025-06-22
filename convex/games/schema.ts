import { defineTable } from "convex/server";
import { v } from "convex/values";

const gameStatus = v.union(
	v.literal("pending"),
	v.literal("active"),
	v.literal("completed"),
);

const gameSchema = v.object({
	ownerId: v.id("users"),
	boardId: v.id("boards"),
	status: gameStatus,
	gameCode: v.string(),
	// Tracks the question currently being presented.
	activeQuestionId: v.optional(v.id("questions")),
	// Tracks which team has control to select the next question.
});

const teamSchema = v.object({
	gameId: v.id("games"),
	nickname: v.string(),
	score: v.number(),
});

const answeredQuestionSchema = v.object({
	gameId: v.id("games"),
	questionId: v.id("questions"),
	// Store which team answered correctly.
	teamId: v.id("teams"),
});

const gameTables = {
	games: defineTable(gameSchema)
		.index("by_ownerId", ["ownerId"])
		.index("by_boardId", ["boardId"])
		.index("by_gameCode", ["gameCode"]),
	teams: defineTable(teamSchema).index("by_gameId", ["gameId"]),
	answeredQuestions: defineTable(answeredQuestionSchema).index("by_gameId", [
		"gameId",
	]),
};

export {
	gameSchema,
	teamSchema,
	answeredQuestionSchema,
	gameTables,
	gameStatus,
};
