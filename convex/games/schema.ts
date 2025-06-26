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
	code: v.string(),
	// Tracks the question currently being presented.
	activeQuestionId: v.optional(v.id("questions")),
	// Tracks which team has control to select the next question.
});

const teamSchema = v.object({
	gameId: v.id("games"),
	nickname: v.string(),
	score: v.number(),
	imageId: v.optional(v.id("_storage")),
});

const answeredQuestionSchema = v.object({
	gameId: v.id("games"),
	questionId: v.id("questions"),
	teamId: v.optional(v.id("teams")),
});

const gameTables = {
	games: defineTable(gameSchema)
		.index("by_ownerId", ["ownerId"])
		.index("by_boardId", ["boardId"])
		.index("by_code", ["code"]),
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
