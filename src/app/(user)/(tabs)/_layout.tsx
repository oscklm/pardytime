import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import { withUnistyles } from "react-native-unistyles";
import { useUser } from "@/providers/user-provider";

const ThemedTabs = withUnistyles(Tabs, (th) => ({
	screenOptions: {
		tabBarActiveTintColor: th.colors.accent,
	},
}));

export default function TabLayout() {
	const { user } = useUser();

	const isAdmin = user.privateMetadata.isAdmin ?? null;

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
				name="my-profile"
				options={{
					headerShown: false,
					title: "My Profile",
					tabBarIcon: ({ color }) => (
						<FontAwesome size={28} name="user" color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="admin"
				options={{
					href: isAdmin ? "/admin" : null,
					headerShown: false,
					title: "Admin",
					tabBarIcon: ({ color }) => (
						<FontAwesome size={28} name="dashboard" color={color} />
					),
				}}
			/>
		</ThemedTabs>
	);
}
