"use node";

import { verifyWebhook } from "@clerk/backend/webhooks";
import { v } from "convex/values";
import { internalAction } from "@/convex/_generated/server";
import { internal } from "../_generated/api";
import { processEmailAddresses } from "../utils";

// Convex action that verifies and handles Clerk webhook
export const handleClerkWebhook = internalAction({
	args: {
		body: v.string(),
		headers: v.record(v.string(), v.string()),
	},
	handler: async (
		ctx,
		args,
	): Promise<{ success: boolean; message: string }> => {
		try {
			// Create a Request object from the serialized data
			const request = new Request("https://dummy.url", {
				method: "POST",
				headers: args.headers,
				body: args.body,
			});

			const evt = await verifyWebhook(request, {
				signingSecret: process.env.CLERK_WEBHOOK_SECRET,
			});

			// Handle different event types
			switch (evt.type) {
				case "user.created": {
					// Process email addresses from the event data
					const email_addresses = processEmailAddresses(
						evt.data.email_addresses,
					);

					// Create a new user in Convex
					await ctx.runMutation(internal.users.mutations.upsert, {
						clerkId: evt.data.id,
						username: evt.data.username,
						first_name: evt.data.first_name,
						last_name: evt.data.last_name,
						image_url: evt.data.image_url,
						email_addresses: email_addresses,
						public_metadata: evt.data.public_metadata,
						private_metadata: evt.data.private_metadata,
						unsafe_metadata: evt.data.unsafe_metadata,
						locked: evt.data.locked ?? false,
						banned: evt.data.banned ?? false,
					});
					break;
				}
				case "user.updated": {
					// Process email addresses from the event data
					const email_addresses = processEmailAddresses(
						evt.data.email_addresses,
					);

					await ctx.runMutation(internal.users.mutations.upsert, {
						clerkId: evt.data.id,
						username: evt.data.username,
						first_name: evt.data.first_name,
						last_name: evt.data.last_name,
						image_url: evt.data.image_url,
						email_addresses: email_addresses,
						public_metadata: evt.data.public_metadata,
						private_metadata: evt.data.private_metadata,
						unsafe_metadata: evt.data.unsafe_metadata,
						locked: evt.data.locked ?? false,
						banned: evt.data.banned ?? false,
					});
					break;
				}
				case "user.deleted":
					if (!evt.data.id) {
						throw new Error("User deletion event missing ID");
					}
					ctx.runMutation(internal.users.mutations.destroy, {
						clerkId: evt.data.id,
					});
					break;

				default:
					console.log(`Unhandled event type: ${evt.type}`);
			}

			return {
				success: true,
				message: `Successfully processed ${evt.type} event`,
			};
		} catch (error) {
			console.error("Error processing webhook event:", error);
			return {
				success: false,
				message: `Failed to process webhook event: ${error}`,
			};
		}
	},
});
