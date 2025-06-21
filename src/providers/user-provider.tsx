import { useAuth } from "@clerk/clerk-expo";
import { useQuery } from "convex/react";
import { createContext, type PropsWithChildren, useContext } from "react";
import LoadingView from "@/components/LoadingView";
import { api } from "@/convex/_generated/api";
import type { Doc } from "@/convex/_generated/dataModel";

type AuthData = {
	user: Doc<"users"> | null;
};

const AuthContext = createContext<AuthData>({} as AuthData);

export default function AuthProvider({ children }: PropsWithChildren) {
	const { isSignedIn, userId } = useAuth();

	const user = useQuery(
		api.users.queries.getByClerkId,
		userId ? { clerkId: userId } : "skip",
	);

	if (isSignedIn && !user) {
		return <LoadingView />;
	}

	return (
		<AuthContext.Provider value={{ user: user ?? null }}>
			{children}
		</AuthContext.Provider>
	);
}

export const useUser = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useUser must be used within an AuthProvider");
	}
	if (!context.user) {
		throw new Error("User not found");
	}
	return context.user;
};
