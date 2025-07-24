import Text from '@/components/ui/Text';
import { api } from '@/convex/_generated/api';
import type { Doc } from '@/convex/_generated/dataModel';
import { useAuth } from '@clerk/clerk-expo';
import { useQuery } from 'convex/react';
import {
  createContext,
  type PropsWithChildren,
  useContext,
  useEffect,
} from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

type AuthData = {
  user: Doc<'users'> | null;
};

const AuthContext = createContext<AuthData>({} as AuthData);

export default function AuthProvider({ children }: PropsWithChildren) {
  const { isSignedIn, userId, signOut } = useAuth();

  const fetchedUser = useQuery(
    api.users.queries.getByClerkId,
    userId ? { clerkId: userId } : 'skip'
  );

  // Safe guard to ensure fetchedUser could be fetched
  useEffect(() => {
    // Allow a grace period of 5 seconds for fetchedUser to appear
    const timer = setTimeout(() => {
      // Something must be wrong with auth at this point
      if (!fetchedUser && isSignedIn) {
        signOut();
        alert('Authentication failure. Please try again in a few minutes.');
      }
    }, 3500);

    return () => {
      clearTimeout(timer);
    };
  }, [userId, fetchedUser, isSignedIn, signOut]);

  if (isSignedIn && !fetchedUser) {
    return (
      <View style={styles.loadingView}>
        <Text variant="h4">Signing in...</Text>
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
    throw new Error('useUser must be used within an AuthProvider');
  }
  if (!context.user) {
    throw new Error('User not found');
  }
  return context.user;
};

const styles = StyleSheet.create((th) => ({
  loadingView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: th.colors.backgroundPrimary,
  },
}));
