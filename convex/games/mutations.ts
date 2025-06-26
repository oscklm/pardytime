import { v } from "convex/values";
import { partial } from "convex-helpers/validators";
import invariant from "tiny-invariant";
import { internalMutation, mutation } from "../utils/functions";
import { gameSchema, teamSchema } from "./schema";

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

		await ctx.db.insert("games", {
			boardId,
			ownerId: args.userId,
			status: "pending",
			code,
		});

		return code;
	},
});

export const deleteGame = mutation({
	args: {
		gameId: v.id("games"),
	},
	handler: async (ctx, args) => {
		return ctx.db.delete(args.gameId);
	},
});

export const updateGame = mutation({
	args: {
		gameId: v.id("games"),
		values: v.object(partial(gameSchema.fields)),
	},
	handler: async (ctx, args) => {
		return ctx.db.patch(args.gameId, args.values);
	},
});

export const addAnsweredQuestion = mutation({
	args: {
		gameId: v.id("games"),
		questionId: v.id("questions"),
	},
	handler: async (ctx, args) => {
		return ctx.db.insert("answeredQuestions", {
			gameId: args.gameId,
			questionId: args.questionId,
		});
	},
});

export const createTeam = mutation({
	args: {
		values: teamSchema,
	},
	handler: async (ctx, args) => {
		return ctx.db.insert("teams", args.values);
	},
});

export const updateTeam = mutation({
	args: {
		teamId: v.id("teams"),
		values: v.object(partial(teamSchema.fields)),
	},
	handler: async (ctx, args) => {
		return ctx.db.patch(args.teamId, args.values);
	},
});

export const deleteTeam = mutation({
	args: {
		teamId: v.id("teams"),
	},
	handler: async (ctx, args) => {
		return ctx.db.delete(args.teamId);
	},
});

export const updateTeamScore = mutation({
	args: {
		teamId: v.id("teams"),
		score: v.number(),
	},
	handler: async (ctx, args) => {
		return ctx.db.patch(args.teamId, { score: args.score });
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
