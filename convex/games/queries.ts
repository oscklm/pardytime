import { v } from "convex/values";
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

		return games;
	},
});

export const getByGameCode = query({
	args: {
		code: v.string(),
	},
	handler: async (ctx, { code }) => {
		const game = await ctx.db
			.query("games")
			.withIndex("by_gameCode", (q) => q.eq("gameCode", code))
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
