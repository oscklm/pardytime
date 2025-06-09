import { internalMutation } from "../_generated/server";
import { userSchema } from "./schema";

export const create = internalMutation({
	args: userSchema,
	handler: async (ctx, args) => {
		await ctx.db.insert("users", {
			...args,
		});
	},
});

export const update = internalMutation({
	args: userSchema,
	handler: async (ctx, args) => {
		const userDoc = await ctx.db
			.query("users")
			.withIndex("by_clerkId", (q) => q.eq("clerkId", args.clerkId))
			.unique();

		if (!userDoc) {
			throw new Error(`User with clerkId ${args.clerkId} not found`);
		}

		await ctx.db.patch(userDoc._id, {
			...args,
		});
	},
});

export const upsert = internalMutation({
	args: userSchema,
	handler: async (ctx, args) => {
		const userDoc = await ctx.db
			.query("users")
			.withIndex("by_clerkId", (q) => q.eq("clerkId", args.clerkId))
			.unique();
		if (userDoc) {
			await ctx.db.patch(userDoc._id, {
				...args,
			});
		} else {
			await ctx.db.insert("users", {
				...args,
			});
		}
	},
});

export const destroy = internalMutation({
	args: { clerkId: userSchema.fields.clerkId },
	handler: async (ctx, args) => {
		const userDoc = await ctx.db
			.query("users")
			.withIndex("by_clerkId", (q) => q.eq("clerkId", args.clerkId))
			.unique();

		if (!userDoc) {
			throw new Error(`User with clerkId ${args.clerkId} not found`);
		}

		await ctx.db.delete(userDoc._id);
	},
});
