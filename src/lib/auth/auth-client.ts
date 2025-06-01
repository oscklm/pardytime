import { expoClient } from "@better-auth/expo/client";
import { convexClient } from "@erquhart/convex-better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import * as SecureStore from "expo-secure-store";

export const authClient = createAuthClient({
	baseURL: process.env.EXPO_PUBLIC_CONVEX_SITE_URL,
	plugins: [
		convexClient(),
		expoClient({
			scheme: "jeopardytime",
			storagePrefix: "jeopardytime",
			storage: SecureStore,
		}),
	],
});
