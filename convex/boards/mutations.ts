import { v } from "convex/values";
import { mutation } from "../_generated/server";
import { boardSchema } from "./schema";

export const createBoard = mutation({
	args: {
		board: boardSchema,
	},
	returns: v.id("boards"),
	handler: async (ctx, { board }) => {
		const newBoardId = await ctx.db.insert("boards", board);
		return newBoardId;
	},
});

export const updateBoard = mutation({
	args: {
		id: v.id("boards"),
		board: boardSchema,
	},
	handler: async (ctx, { id, board }) => {
		const updatedBoard = await ctx.db.patch(id, board);
		return updatedBoard;
	},
});
