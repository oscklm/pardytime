import { v } from "convex/values";
import { query } from "../_generated/server";

export const getAll = query({
  args: {},
  handler: async (ctx) => {
    const boards = await ctx.db.query("boards").collect();
    return boards;
  },
});

export const getById = query({
  args: { id: v.string() },
  handler: async (ctx, { id }) => {
    const normalizedId = ctx.db.normalizeId('boards',id);
    if (!normalizedId) {
      throw new Error(`Invalid board ID: ${id}`);
    }

    const board = await ctx.db.get(normalizedId);
    if (!board) {
      throw new Error(`Board with id ${id} not found`);
    }

    return board;
  }
});