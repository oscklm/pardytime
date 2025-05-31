import { internalMutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getUserByClerkId = query({
	args: { clerkUserId: v.string() },
	handler: async (ctx, args) => {
		return await ctx.db
			.query("users")
			.withIndex("by_clerkUserId", (q) => q.eq("clerkUserId", args.clerkUserId))
			.unique();
	},
});

export const latestProfileImages = query({
	args: {},
	handler: async (ctx) => {
		const users = await ctx.db.query("users").order("desc").take(10);
		return users.map((u) => u.imageUrl).filter(Boolean);
	},
});

export const processClerkUserEvent = internalMutation({
	args: {
		eventType: v.string(),
		userDoc: v.object({
			clerkUserId: v.string(),
			email: v.string(),
			firstName: v.optional(v.string()),
			lastName: v.optional(v.string()),
			imageUrl: v.optional(v.string()),
			username: v.optional(v.string()),
			publicMetadata: v.optional(v.record(v.string(), v.any())),
			privateMetadata: v.optional(v.record(v.string(), v.any())),
			unsafeMetadata: v.optional(v.record(v.string(), v.any())),
		}),
	},
	handler: async (ctx, args) => {
		const { eventType, userDoc } = args;
		if (eventType === "user.created") {
			await ctx.db.insert("users", userDoc);
		} else if (eventType === "user.updated") {
			const existing = await ctx.db
				.query("users")
				.withIndex("by_clerkUserId", (q) =>
					q.eq("clerkUserId", userDoc.clerkUserId),
				)
				.unique();
			if (existing) {
				await ctx.db.patch(existing._id, userDoc);
			} else {
				await ctx.db.insert("users", userDoc);
			}
		} else if (eventType === "user.deleted") {
			const existing = await ctx.db
				.query("users")
				.withIndex("by_clerkUserId", (q) =>
					q.eq("clerkUserId", userDoc.clerkUserId),
				)
				.unique();
			if (existing) {
				await ctx.db.delete(existing._id);
			}
		}
		return null;
	},
});
