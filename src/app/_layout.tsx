import { ConvexReactClient, useConvexAuth } from "convex/react";
import { Stack } from "expo-router";
import { useUnistyles } from "react-native-unistyles";
import "react-native-reanimated";
import { ConvexBetterAuthProvider } from "@erquhart/convex-better-auth/react";
import { authClient } from "@/lib/auth/auth-client";
import LoadingView from "@/shared/components/LoadingView";
import { UniThemeProvider } from "@/styles/theme";

// biome-ignore lint/style/noNonNullAssertion: // TODO: Setup better env handling
const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, {
	unsavedChangesWarning: false,
});

export default function RootLayout() {
	const { rt } = useUnistyles();
	return (
		<ConvexBetterAuthProvider client={convex} authClient={authClient}>
			<UniThemeProvider>
				<RootNavigator />
			</UniThemeProvider>
		</ConvexBetterAuthProvider>
	);
}

function RootNavigator() {
	const { isLoading, isAuthenticated } = useConvexAuth();

	if (isLoading) return <LoadingView />;

	return (
		<Stack>
			<Stack.Protected guard={!isAuthenticated}>
				<Stack.Screen
					name="sign-in"
					options={{
						title: "Sign In",
						headerShown: !isAuthenticated,
					}}
				/>
				<Stack.Screen
					name="sign-up"
					options={{
						title: "Sign Up",
						headerShown: !isAuthenticated,
					}}
				/>
			</Stack.Protected>
			<Stack.Protected guard={isAuthenticated}>
				<Stack.Screen
					name="index"
					options={{
						headerShown: false,
					}}
				/>
			</Stack.Protected>
		</Stack>
	);
}
