import { v } from "convex/values";
import type { Doc } from "../_generated/dataModel";
import { query } from "../_generated/server";
import { BoardReaderController } from "./controllers";

export const getAll = query({
	args: {
		filters: v.optional(
			v.object({
				ownerId: v.optional(v.id("users")),
			}),
		),
	},
	handler: async (ctx, { filters }) => {
		let boards: Doc<"boards">[] = [];
		const boardController = new BoardReaderController(ctx.db);
		if (filters) {
			if (filters.ownerId) {
				const ownerId = filters.ownerId;
				boards = await boardController
					.query()
					.withIndex("by_ownerId", (q) => q.eq("ownerId", ownerId))
					.collect();
			}
		} else {
			boards = await boardController.query().collect();
		}
		return boards;
	},
});

export const getAllEnriched = query({
	args: {},
	handler: async (ctx) => {
		const boardController = new BoardReaderController(ctx.db);
		const boards = await boardController.query().collect();
		return (
			await Promise.all(
				boards.map((board) => boardController.getEnriched(board._id)),
			)
		).filter((board): board is NonNullable<typeof board> => board !== null);
	},
});

export const getById = query({
	args: { boardId: v.id("boards") },
	handler: async (ctx, { boardId }) => {
		const boardController = new BoardReaderController(ctx.db);

		return boardController.get(boardId);
	},
});

export const getByIdEnriched = query({
	args: { boardId: v.id("boards") },
	handler: async (ctx, { boardId }) => {
		const boardController = new BoardReaderController(ctx.db);
		return await boardController.getEnriched(boardId);
	},
});
