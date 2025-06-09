import { Stack } from "expo-router";
import UserProvider from "@/providers/user-provider";

export default function RootLayout() {
	return (
		<UserProvider>
			<Stack>
				<Stack.Screen
					name="(tabs)"
					options={{
						headerShown: false,
					}}
				/>
			</Stack>
		</UserProvider>
	);
}
