import { useAuth } from "@clerk/clerk-expo";
import { useQuery } from "convex/react";
import {
  createContext,
  type PropsWithChildren,
  useContext,
  useEffect,
} from "react";
import { api } from "@/convex/_generated/api";
import type { Doc } from "@/convex/_generated/dataModel";
import { View } from "react-native";
import Text from "@/components/ui/Text";

type AuthData = {
  user: Doc<"users"> | null;
};

const AuthContext = createContext<AuthData>({} as AuthData);

export default function AuthProvider({ children }: PropsWithChildren) {
  const { isSignedIn, userId, signOut } = useAuth();

  const fetchedUser = useQuery(
    api.users.queries.getByClerkId,
    userId ? { clerkId: userId } : "skip"
  );

  // Safe guard to ensure fetchedUser could be fetched
  useEffect(() => {
    console.log(fetchedUser);
    // Allow a grace period of 5 seconds for fetchedUser to appear
    const timer = setTimeout(() => {
      // Something must be wrong with auth at this point
      if (!fetchedUser && isSignedIn) {
        signOut();
        alert("Authentication failure. Please try again in a few minutes.");
      }
    }, 3500);

    return () => {
      clearTimeout(timer);
    };
  }, [userId, fetchedUser]);

  if (isSignedIn && !fetchedUser) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Signing in...</Text>
      </View>
    );
  }

  return (
    <AuthContext.Provider value={{ user: fetchedUser ?? null }}>
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
