import { ConvexProvider, ConvexReactClient } from "convex/react";
import { Stack } from "expo-router";
import { useUnistyles } from "react-native-unistyles";
import "react-native-reanimated";
import { UniThemeProvider } from "@/styles/theme";

// biome-ignore lint/style/noNonNullAssertion: // TODO: Setup better env handling
const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, {
	unsavedChangesWarning: false,
});

export default function RootLayout() {
	const { rt } = useUnistyles();
	return (
		<ConvexProvider client={convex}>
			<UniThemeProvider>
				<Stack screenOptions={{ headerShown: false }} />
			</UniThemeProvider>
		</ConvexProvider>
	);
}
