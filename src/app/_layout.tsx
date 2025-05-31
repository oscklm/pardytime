import { ConvexProvider, ConvexReactClient } from "convex/react";
import { Stack } from "expo-router";

// biome-ignore lint/style/noNonNullAssertion: // TODO: Setup better env handling
const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, {
	unsavedChangesWarning: false,
});

export default function RootLayout() {
	return (
		<ConvexProvider client={convex}>
			<Stack />
		</ConvexProvider>
	);
}
