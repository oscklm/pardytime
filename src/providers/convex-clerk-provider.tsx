import { ClerkLoaded, ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import type { PropsWithChildren } from "react";
import React from "react";
import BadTokenGuard from "@/components/bad-token-guard";

const convex = new ConvexReactClient(
	process.env.EXPO_PUBLIC_CONVEX_URL as string,
	{
		unsavedChangesWarning: false,
	},
);

if (!process.env.EXPO_PUBLIC_CONVEX_URL) {
	throw new Error(
		"Missing Convex URL. Please set EXPO_PUBLIC_CONVEX_URL in your .env",
	);
}

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY as string;

if (!publishableKey) {
	throw new Error(
		"Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env",
	);
}
export default function ConvexClerkProvider({ children }: PropsWithChildren) {
	return (
		<React.Fragment>
			<ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
				<ClerkLoaded>
					<ConvexProviderWithClerk client={convex} useAuth={useAuth}>
						<BadTokenGuard />
						{children}
					</ConvexProviderWithClerk>
				</ClerkLoaded>
			</ClerkProvider>
		</React.Fragment>
	);
}
