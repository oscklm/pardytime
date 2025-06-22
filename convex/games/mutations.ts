import { v } from "convex/values";
import invariant from "tiny-invariant";
import { mutation } from "../utils/functions";

function generateGameCode() {
	return Math.random().toString(36).substring(2, 10);
}

export const create = mutation({
	args: {
		userId: v.id("users"),
		boardId: v.optional(v.id("boards")),
	},
	handler: async (ctx, args) => {
		const boardId = args.boardId ?? (await ctx.db.query("boards").first())?._id;

		invariant(boardId, "Could not compute boardId");

		let gameCode: string | undefined;
		let isUnique = false;
		while (!isUnique) {
			const code = generateGameCode();
			const existingGame = await ctx.db
				.query("games")
				.withIndex("by_gameCode", (q) => q.eq("gameCode", code))
				.first();
			if (!existingGame) {
				gameCode = code;
				isUnique = true;
			}
		}

		invariant(gameCode, "Could not generate unique game code");

		const game = await ctx.db.insert("games", {
			boardId,
			ownerId: args.userId,
			status: "pending",
			gameCode,
		});

		return game;
	},
});
