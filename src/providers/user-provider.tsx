import { useAuth } from "@clerk/clerk-expo";
import { useQuery } from "convex/react";
import { createContext, type PropsWithChildren, useContext } from "react";
import LoadingView from "@/components/loading-view";
import { api } from "@/convex/_generated/api";
import type { Doc } from "@/convex/_generated/dataModel";

type AuthData = {
	user: Doc<"users">;
};

const AuthContext = createContext<AuthData>({} as AuthData);

export default function AuthProvider({ children }: PropsWithChildren) {
	const { userId } = useAuth();

	const user = useQuery(
		api.users.queries.getByClerkId,
		userId ? { clerkId: userId } : "skip",
	);

	if (!user) {
		return <LoadingView />;
	}

	return (
		<AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
	);
}

export const useUser = () => {
	const context = useContext(AuthContext);
	if (!context.user) {
		throw new Error("useUser must be used within an AuthProvider");
	}
	return context;
};
