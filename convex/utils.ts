import type { EmailAddressJSON } from "@clerk/backend";
import type { Infer } from "convex/values";
import type { userSchema } from "./users/schema";

// Utility function to process email addresses from Clerk webhook
export function processEmailAddresses(
	emailAddresses: EmailAddressJSON[],
): Infer<typeof userSchema.fields.emailAddresses> {
	return emailAddresses.map((email) => ({
		emailAddress: email.email_address,
		verified: email.verification?.status === "verified" || false,
	}));
}
