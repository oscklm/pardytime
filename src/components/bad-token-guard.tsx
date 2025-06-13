import { useAuth } from "@clerk/clerk-expo";
import { useConvex, useConvexAuth } from "convex/react";
import { useEffect } from "react";
import { Alert } from "react-native";

export default function BadTokenGuard() {
	const { isAuthenticated } = useConvexAuth();
	const { userId, sessionId, signOut } = useAuth();
	const convex = useConvex();

	useEffect(() => {
		const timer = setTimeout(async () => {
			if (!isAuthenticated && (userId || sessionId)) {
				// Sign out from Clerk
				try {
					await signOut();
					convex.clearAuth();
				} catch (e: unknown) {
					__DEV__ && console.error(e);
					Alert.alert(
						"Auth failed",
						"Please restart the app, if this issue persist. You need to reinstall.",
					);
				}
			}
		}, 5000);
		return () => clearTimeout(timer);
	}, [isAuthenticated, userId, sessionId, convex, signOut]);

	return null;
}
