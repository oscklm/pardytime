import LoadingView from "@/components/LoadingView";
import { UniThemeProvider } from "@/styles/theme";
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { Stack } from "expo-router";
import "react-native-reanimated";

export default function RootLayout() {
  return (
    <UniThemeProvider>
      <ClerkProvider tokenCache={tokenCache}>
        <RootNavigator />
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
