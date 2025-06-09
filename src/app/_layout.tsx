import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { ConvexReactClient, useConvexAuth } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { Stack } from "expo-router";
import { UniThemeProvider } from "@/styles/theme";
import "react-native-reanimated";
import * as SplashScreen from "expo-splash-screen";
import { LogBox } from "react-native";
import { AuthLoaded } from "@/components/auth-loaded";

LogBox.ignoreLogs(["Clerk: Clerk has been loaded with development keys."]);

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

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

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
	const { isLoading, isAuthenticated } = useConvexAuth();

	if (!isLoading) {
		// Hide the splash screen if the user is not authenticated
		SplashScreen.hideAsync();
	}

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
						title: "Welcome back",
					}}
				/>
				<Stack.Screen
					name="sign-up"
					options={{
						title: "Account creation",
					}}
				/>
			</Stack.Protected>
		</Stack>
	);
}
