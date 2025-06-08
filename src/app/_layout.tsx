import { ClerkLoaded, ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { Stack } from "expo-router";
import LoadingView from "@/components/LoadingView";
import { UniThemeProvider } from "@/styles/theme";
import "react-native-reanimated";

const convex = new ConvexReactClient(
  process.env.EXPO_PUBLIC_CONVEX_URL as string,
);

export default function RootLayout() {
  return (
    <UniThemeProvider>
      <ClerkProvider tokenCache={tokenCache}>
        <ClerkLoaded>
          <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
            <RootNavigator />
          </ConvexProviderWithClerk>
        </ClerkLoaded>
      </ClerkProvider>
    </UniThemeProvider>
  );
}

function RootNavigator() {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return <LoadingView />;
  }

  return (
    <Stack>
      <Stack.Protected guard={isSignedIn}>
        <Stack.Screen
          name="(user)"
          options={{
            headerShown: false,
          }}
        />
      </Stack.Protected>
      <Stack.Protected guard={!isSignedIn}>
        <Stack.Screen
          name="sign-in"
          options={{
            title: "Sign In",
          }}
        />
        <Stack.Screen
          name="sign-up"
          options={{
            title: "Create account",
          }}
        />
      </Stack.Protected>
    </Stack>
  );
}
