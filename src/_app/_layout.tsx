import { ClerkLoaded, ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { ConvexReactClient, useConvexAuth } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { SplashScreen, Stack } from "expo-router";
import * as TaskManager from "expo-task-manager";
import { useEffect } from "react";
import { LogBox } from "react-native";
import BadTokenGuard from "@/components/bad-token-guard";
import SplashScreenController from "@/components/splash-screen-controller";
import {
	registerUpdateCheckTask,
	UPDATE_CHECK_TASK_IDENTIFIER,
} from "@/lib/tasks/updateChecker";
import { UniThemeProvider } from "@/styles/theme";
import "react-native-reanimated";

LogBox.ignoreLogs(["Clerk: Clerk has been loaded with development keys."]);

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

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
	// Register the update check task if it is not already registered
	useEffect(() => {
		async function initUpdateTask() {
			const isRegistered = await TaskManager.isTaskRegisteredAsync(
				UPDATE_CHECK_TASK_IDENTIFIER,
			);
			if (!isRegistered) {
				await registerUpdateCheckTask();
			}
		}
		initUpdateTask();
	}, []);

	return (
		<ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
			<ClerkLoaded>
				<ConvexProviderWithClerk client={convex} useAuth={useAuth}>
					<SplashScreenController>
						<BadTokenGuard />
						<UniThemeProvider>
							<RootNavigator />
						</UniThemeProvider>
					</SplashScreenController>
				</ConvexProviderWithClerk>
			</ClerkLoaded>
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
