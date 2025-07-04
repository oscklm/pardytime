import { FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HeaderButton, Text } from "@react-navigation/elements";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useConvexAuth } from "convex/react";
import Button from "@/components/ui/Button";
import type { Id } from "@/convex/_generated/dataModel";
import { GameScreen } from "@/features/game/screens/GameScreen";
import { HelpStack } from "@/features/help/navigator";
import { UniThemeProvider } from "@/styles/theme";
import { Board } from "./screens/Board";
import { CreateBoard } from "./screens/CreateBoard";
import { CreateGame } from "./screens/CreateGame";
import { CreateTeam } from "./screens/CreateTeam";
import { HomeTab } from "./screens/HomeTab";
import { NotFound } from "./screens/NotFound";
import { ProfileTab } from "./screens/ProfileTab";
import { PublicProfile } from "./screens/PublicProfile";
import { Scanner } from "./screens/Scanner";
import { Settings } from "./screens/Settings";
import SignIn from "./screens/SignIn";
import SignUp from "./screens/SignUp";
import { Welcome } from "./screens/Welcome";
import { CustomBottomTabHeader } from "./ui/CustomBottomTabHeader";

const Tab = createBottomTabNavigator<BottomTabsParamList>();
const RootStack = createNativeStackNavigator<RootStackParamList>();

export type BottomTabsParamList = {
	Home: undefined;
	Profile: undefined;
};

// Add this type for navigation typing
export type RootStackParamList = {
	BottomTabs: BottomTabsParamList;
	Welcome: undefined;
	SignIn: undefined;
	SignUp: undefined;
	Game: { code: string };
	HelpStack: undefined;
	Profile: { username: string };
	Board: { boardId: Id<"boards"> };
	CreateBoard: undefined;
	CreateGame: undefined;
	CreateTeam: { gameId: Id<"games"> };
	Settings: undefined;
	Scanner: undefined;
	NotFound: undefined;
};

function BottomTabs() {
	return (
		<Tab.Navigator
			screenOptions={{
				header: (props) => <CustomBottomTabHeader {...props} />,
			}}
		>
			<Tab.Screen
				name="Home"
				component={HomeTab}
				options={{
					title: "Home",
					tabBarIcon: ({ color, size }) => (
						<FontAwesome name="home" size={size} color={color} />
					),
					headerRight: () => (
						<Button
							icon="qrcode"
							sensory="light"
							variant="icon"
							screen="Scanner"
							params={{}}
						/>
					),
				}}
			/>
			<Tab.Screen
				name="Profile"
				component={ProfileTab}
				options={{
					title: "Profile",
					tabBarLabel: "Profile",
					tabBarIcon: ({ color, size }) => (
						<FontAwesome name="user" size={size} color={color} />
					),
				}}
			/>
		</Tab.Navigator>
	);
}

const linking = {
	enabled: true,
	prefixes: ["jeopardytime://"],
	config: {
		screens: {
			Profile: {
				path: ":user(@[a-zA-Z0-9-_]+)",
				parse: {
					user: (value: string) => value.replace(/^@/, ""),
				},
				stringify: {
					user: (value: string) => `@${value}`,
				},
			},
			Board: {
				path: ":boardId(^[a-z0-9]{32}$)",
			},
			NotFound: "*",
		},
	},
};

export default function Navigation() {
	const { isAuthenticated } = useConvexAuth();

	return (
		<UniThemeProvider>
			<NavigationContainer linking={linking}>
				<RootStack.Navigator
					screenOptions={{
						headerBackButtonDisplayMode: "minimal",
					}}
				>
					{isAuthenticated ? (
						<RootStack.Screen
							name="BottomTabs"
							component={BottomTabs}
							options={{ headerShown: false }}
						/>
					) : (
						<>
							<RootStack.Screen
								name="Welcome"
								component={Welcome}
								options={{ title: "Welcome", headerShown: false }}
							/>
							<RootStack.Screen
								name="SignIn"
								component={SignIn}
								options={{ title: "Sign in" }}
							/>
							<RootStack.Screen
								name="SignUp"
								component={SignUp}
								options={{ title: "Sign up" }}
							/>
						</>
					)}
					<RootStack.Screen
						name="Game"
						component={GameScreen}
						options={{ title: "Game" }}
					/>
					<RootStack.Screen
						name="HelpStack"
						component={HelpStack}
						options={{ headerShown: false }}
					/>
					<RootStack.Screen
						name="Profile"
						component={PublicProfile}
						options={{
							title: "Profile",
							presentation: "modal",
						}}
					/>
					<RootStack.Screen name="Board" component={Board} />
					<RootStack.Screen
						name="CreateBoard"
						component={CreateBoard}
						options={{
							title: "Create Board",
							presentation: "modal",
						}}
					/>
					<RootStack.Screen
						name="CreateGame"
						component={CreateGame}
						options={{
							title: "Start game",
							presentation: "modal",
						}}
					/>
					<RootStack.Screen
						name="CreateTeam"
						component={CreateTeam}
						options={{
							title: "Create Team",
							presentation: "modal",
						}}
					/>
					<RootStack.Screen
						name="Settings"
						component={Settings}
						options={({ navigation }) => ({
							presentation: "modal",
							headerRight: () => (
								<HeaderButton onPress={navigation.goBack}>
									<Text>Close</Text>
								</HeaderButton>
							),
						})}
					/>
					<RootStack.Screen
						name="Scanner"
						component={Scanner}
						options={{
							title: "Scanner",
							presentation: "modal",
							headerShown: false,
						}}
					/>
					<RootStack.Screen
						name="NotFound"
						component={NotFound}
						options={{ title: "404" }}
					/>
				</RootStack.Navigator>
			</NavigationContainer>
		</UniThemeProvider>
	);
}
