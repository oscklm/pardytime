import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { ConvexReactClient, useConvexAuth } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { Stack } from "expo-router";
import { UniThemeProvider } from "@/styles/theme";
import "react-native-reanimated";
import { AuthLoaded } from "@/components/AuthLoaded";

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

export default function RootLayout() {
  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        <AuthLoaded>
          <UniThemeProvider>
            <RootNavigator />
          </UniThemeProvider>
        </AuthLoaded>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}

function RootNavigator() {
  const { isAuthenticated } = useConvexAuth();
  return (
    <Stack>
      <Stack.Protected guard={isAuthenticated}>
        <Stack.Screen
          name="(user)"
          options={{
            headerShown: false,
          }}
        />
      </Stack.Protected>
      <Stack.Protected guard={!isAuthenticated}>
        <Stack.Screen
          name="sign-in"
          options={{
            title: "Sign In",
          }}
        />
        <Stack.Screen
          name="sign-up"
          options={{
            title: "Sign Up",
          }}
        />
      </Stack.Protected>
    </Stack>
  );
}
