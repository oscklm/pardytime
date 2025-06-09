import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import { withUnistyles } from "react-native-unistyles";

const ThemedTabs = withUnistyles(Tabs, (th) => ({
	screenOptions: {
		tabBarActiveTintColor: th.colors.accent,
	},
}));

export default function TabLayout() {
	return (
		<ThemedTabs>
			<Tabs.Screen
				name="index"
				options={{
					title: "Home",
					headerShown: false,
					tabBarIcon: ({ color }) => (
						<FontAwesome size={28} name="home" color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="settings"
				options={{
					headerShown: false,
					title: "Settings",
					tabBarIcon: ({ color }) => (
						<FontAwesome size={28} name="cog" color={color} />
					),
				}}
			/>
		</ThemedTabs>
	);
}
