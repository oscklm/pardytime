import { v } from "convex/values";
import { asyncMap } from "convex-helpers";
import invariant from "tiny-invariant";
import { query } from "@/convex/_generated/server";

export const getAllByOwnerId = query({
	args: {
		ownerId: v.id("users"),
	},
	handler: async (ctx, { ownerId }) => {
		const games = await ctx.db
			.query("games")
			.withIndex("by_ownerId", (q) => q.eq("ownerId", ownerId))
			.collect();

		const gamesWithBoards = await asyncMap(games, async (game) => {
			const board = await ctx.db.get(game.boardId);
			return {
				...game,
				board,
			};
		});

		return gamesWithBoards;
	},
});

export const getTeamsByGameId = query({
	args: {
		gameId: v.id("games"),
	},
	handler: async (ctx, { gameId }) => {
		const teams = await ctx.db
			.query("teams")
			.withIndex("by_gameId", (q) => q.eq("gameId", gameId))
			.collect();

		return teams;
	},
});

export const getByGameCode = query({
	args: {
		code: v.string(),
	},
	handler: async (ctx, { code }) => {
		const game = await ctx.db
			.query("games")
			.withIndex("by_code", (q) => q.eq("code", code))
			.first();

		invariant(game, "Game not found");

		return game;
	},
});

export const getById = query({
	args: {
		id: v.id("games"),
	},
	handler: async (ctx, { id }) => {
		const game = await ctx.db.get(id);

		invariant(game, "Game not found");

		return game;
	},
});
