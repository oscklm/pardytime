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
	name: v.optional(v.string()),
	status: gameStatus,
	code: v.string(),
	// Tracks the question currently being presented.
	activeQuestionId: v.union(v.id("questions"), v.null()),
	// Tracks which team has control to select the next question.
	answeredQuestions: v.array(v.id("questions")),
});

const teamSchema = v.object({
	gameId: v.id("games"),
	nickname: v.string(),
	score: v.number(),
	imageId: v.optional(v.id("_storage")),
});

const gameTables = {
	games: defineTable(gameSchema)
		.index("by_ownerId", ["ownerId"])
		.index("by_boardId", ["boardId"])
		.index("by_code", ["code"]),
	teams: defineTable(teamSchema).index("by_gameId", ["gameId"]),
};

export { gameSchema, teamSchema, gameTables, gameStatus };
