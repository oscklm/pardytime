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
