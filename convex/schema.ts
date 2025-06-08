import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { boardTables } from "./boards/schema";

export default defineSchema({
	// Users
	users: defineTable({
		email: v.string(),
		emailVerified: v.boolean(),
		name: v.string(),
		imageUrl: v.optional(v.string()),
		username: v.optional(v.string()),
	}),

	// Boards
	...boardTables,
});
