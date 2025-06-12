import { defineTable } from "convex/server";
import { v } from "convex/values";

const userSchema = v.object({
	clerkId: v.string(),
	username: v.union(v.string(), v.null()),
	firstName: v.union(v.string(), v.null()),
	lastName: v.union(v.string(), v.null()),
	imageUrl: v.string(),
	emailAddresses: v.array(
		v.object({
			emailAddress: v.string(), // Email address string
			verified: v.boolean(), // Verification status
		}),
	),
	publicMetadata: v.any(), // UserPublicMetadata
	privateMetadata: v.any(), // UserPrivateMetadata
	unsafeMetadata: v.any(), // UserUnsafeMetadata
	banned: v.boolean(),
	locked: v.boolean(),
});

const userTables = {
	users: defineTable(userSchema).index("by_clerkId", ["clerkId"]),
};

export { userSchema, userTables };
