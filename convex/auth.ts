import { expo } from "@better-auth/expo";
import {
	type AuthFunctions,
	BetterAuth,
	convexAdapter,
} from "@erquhart/convex-better-auth";
import { convex } from "@erquhart/convex-better-auth/plugins";
import { betterAuth } from "better-auth";

import { components, internal } from "./_generated/api";
import type { DataModel, Id } from "./_generated/dataModel";
import type { GenericCtx } from "./_generated/server";

// Typesafe way to pass the functions below into the component
const authFunctions: AuthFunctions = internal.auth;

// Initialize the component
export const betterAuthComponent = new BetterAuth(
	components.betterAuth,
	authFunctions,
);

export const createAuth = (ctx: GenericCtx) =>
	// Configure your Better Auth instance here
	betterAuth({
		emailAndPassword: {
			enabled: true,
		},
		database: convexAdapter(ctx, betterAuthComponent),
		// Replace with your site url
		trustedOrigins: ["http://localhost:56139", "jeopardytime://"],
		plugins: [
			// Expo
			expo(),
			// The Convex plugin is required
			convex(),
		],
	});

// These are required named exports
export const { createUser, updateUser, deleteUser, createSession } =
	betterAuthComponent.createAuthFunctions<DataModel>({
		// Must create a user and return the user id
		onCreateUser: async (ctx, user) => {
			console.log("Creating user:", user);
			const id = await ctx.db.insert("users", {
				email: user.email,
				name: user.name,
				imageUrl: user.image,
				emailVerified: user.emailVerified,
			});
			return id;
		},

		// Delete the user when they are deleted from Better Auth
		// You can also omit this and use Better Auth's
		// auth.api.deleteUser() function to trigger user deletion
		// from within your own user deletion logic.
		onDeleteUser: async (ctx, userId) => {
			await ctx.db.delete(userId as Id<"users">);
		},
	});
