import { useConvexAuth } from "convex/react";
import { Stack } from "expo-router";
import { UniThemeProvider } from "@/styles/theme";
import "react-native-reanimated";
import * as SplashScreen from "expo-splash-screen";
import { LogBox } from "react-native";
import { AuthLoaded } from "@/components/AuthLoaded";
import ConvexClerkProvider from "@/providers/convex-clerk-provider";

LogBox.ignoreLogs(["Clerk: Clerk has been loaded with development keys."]);

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	return (
		<ConvexClerkProvider>
			<AuthLoaded>
				<UniThemeProvider>
					<RootNavigator />
				</UniThemeProvider>
			</AuthLoaded>
		</ConvexClerkProvider>
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
						title: "Back",
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
			<Stack.Screen
				name="changelogs"
				options={{
					title: "See what's new",
					presentation: "modal",
				}}
			/>
		</Stack>
	);
}
