import { v } from "convex/values";
import { query } from "../_generated/server";

export const getByClerkId = query({
	args: { clerkId: v.string() },
	handler: async (ctx, { clerkId }) => {
		const userDoc = await ctx.db
			.query("users")
			.withIndex("by_clerkId", (q) => q.eq("clerkId", clerkId))
			.unique();

		if (!userDoc) {
			throw new Error(`User with clerkId ${clerkId} not found`);
		}

		return userDoc;
	},
});
