import { Stack } from "expo-router";
import { UniThemeProvider } from "@/styles/theme";
import "react-native-reanimated";
import LoadingView from "@/components/LoadingView";
import AuthProvider, { useAuth } from "@/providers/auth-provider";

export default function RootLayout() {
	return (
		<UniThemeProvider>
			<AuthProvider>
				<RootNavigator />
			</AuthProvider>
		</UniThemeProvider>
	);
}

function RootNavigator() {
	const { loading, session } = useAuth();

	if (loading) {
		return <LoadingView />;
	}

	return (
		<Stack>
			<Stack.Protected guard={!!session}>
				<Stack.Screen
					name="index"
					options={{
						headerShown: false,
					}}
				/>
			</Stack.Protected>
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
		</Stack>
	);
}
