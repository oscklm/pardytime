import {
	convexClient,
	crossDomainClient,
} from "@erquhart/convex-better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
	baseURL: process.env.EXPO_PUBLIC_CONVEX_SITE_URL,
	plugins: [convexClient(), crossDomainClient()],
});
//
