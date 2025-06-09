import { defineTable } from "convex/server";
import { v } from "convex/values";

const userSchema = v.object({
	clerkId: v.string(),
	username: v.union(v.string(), v.null()),
	first_name: v.union(v.string(), v.null()),
	last_name: v.union(v.string(), v.null()),
	image_url: v.string(),
	email_addresses: v.array(
		v.object({
			email_address: v.string(), // Email address string
			verified: v.boolean(), // Verification status
		}),
	),
	public_metadata: v.any(), // UserPublicMetadata
	private_metadata: v.any(), // UserPrivateMetadata
	unsafe_metadata: v.any(), // UserUnsafeMetadata
	banned: v.boolean(),
	locked: v.boolean(),
});

const userTables = {
	users: defineTable(userSchema).index("by_clerkId", ["clerkId"]),
};

export { userSchema, userTables };
