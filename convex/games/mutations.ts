import { v } from "convex/values";
import invariant from "tiny-invariant";
import { internalMutation, mutation } from "../utils/functions";

function generateGameCode() {
	return Math.random().toString(36).substring(2, 8).toUpperCase();
}

export const create = mutation({
	args: {
		userId: v.id("users"),
		boardId: v.optional(v.id("boards")),
	},
	handler: async (ctx, args) => {
		const boardId = args.boardId ?? (await ctx.db.query("boards").first())?._id;

		invariant(boardId, "Could not compute boardId");

		let code: string | undefined;
		let isUnique = false;
		while (!isUnique) {
			const generatedCode = generateGameCode();
			const existingGame = await ctx.db
				.query("games")
				.withIndex("by_code", (q) => q.eq("code", generatedCode))
				.first();
			if (!existingGame) {
				code = generatedCode;
				isUnique = true;
			}
		}

		invariant(code, "Could not generate unique game code");

		const game = await ctx.db.insert("games", {
			boardId,
			ownerId: args.userId,
			status: "pending",
			code,
		});

		return game;
	},
});

export const createTeam = mutation({
	args: {
		gameId: v.id("games"),
		nickname: v.string(),
	},
	handler: async (ctx, args) => {
		return ctx.db.insert("teams", {
			gameId: args.gameId,
			nickname: args.nickname,
			score: 0,
		});
	},
});

export const deleteOldGames = internalMutation({
	handler: async (ctx) => {
		const twelveHoursAgo = Date.now() - 12 * 60 * 60 * 1000; // 12 hours ago

		const oldGames = await ctx.db
			.query("games")
			.withIndex("by_creation_time", (q) =>
				q.lt("_creationTime", twelveHoursAgo),
			)
			.collect();

		for (const game of oldGames) {
			const teams = await ctx.db
				.query("teams")
				.withIndex("by_gameId", (q) => q.eq("gameId", game._id))
				.collect();
			await Promise.all(teams.map((team) => ctx.db.delete(team._id)));

			const answeredQuestions = await ctx.db
				.query("answeredQuestions")
				.withIndex("by_gameId", (q) => q.eq("gameId", game._id))
				.collect();
			await Promise.all(
				answeredQuestions.map((question) => ctx.db.delete(question._id)),
			);

			await ctx.db.delete(game._id);
		}
	},
});
