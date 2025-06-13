import { useAuth } from "@clerk/clerk-expo";
import { useConvex, useConvexAuth } from "convex/react";
import { useEffect } from "react";

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
					alert("Bad token...");
				} catch (e) {
					alert("Something went wrong");
				}
			}
		}, 5000);
		return () => clearTimeout(timer);
	}, [isAuthenticated, userId, sessionId, convex, signOut]);

	return null;
}
