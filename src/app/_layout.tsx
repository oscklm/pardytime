import { Stack } from "expo-router";
import { UniThemeProvider } from "@/styles/theme";
import "react-native-reanimated";

export default function RootLayout() {
	return (
		<UniThemeProvider>
			<RootNavigator />
		</UniThemeProvider>
	);
}

function RootNavigator() {
	return (
		<Stack>
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

			<Stack.Screen
				name="index"
				options={{
					headerShown: false,
				}}
			/>
		</Stack>
	);
}
