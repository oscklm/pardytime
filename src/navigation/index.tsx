import { ClerkLoaded, ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HeaderButton, Text } from "@react-navigation/elements";
import {
	createStaticNavigation,
	type StaticParamList,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { Image, LogBox } from "react-native";
import menu from "@/assets/icons/hamburger-menu.png";
import home from "@/assets/icons/house.png";
import SplashScreenController from "@/components/splash-screen-controller";
import AuthProvider from "@/providers/user-provider";
import { UniThemeProvider } from "@/styles/theme";
import { Board } from "./screens/Board";
import { Home } from "./screens/Home";
import { Menu } from "./screens/Menu";
import { NotFound } from "./screens/NotFound";
import { Profile } from "./screens/Profile";
import { Settings } from "./screens/Settings";
import SignIn from "./screens/SignIn";
import SignUp from "./screens/SignUp";

LogBox.ignoreLogs(["Clerk: Clerk has been loaded with development keys."]);

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

const HomeTabs = createBottomTabNavigator({
	screens: {
		Home: {
			screen: Home,
			options: {
				title: "Home",
				headerShown: false,
				tabBarIcon: ({ color, size }) => (
					<Image
						source={home}
						tintColor={color}
						style={{
							width: size,
							height: size,
						}}
					/>
				),
			},
		},
		Menu: {
			screen: Menu,
			options: {
				headerShown: false,
				tabBarIcon: ({ color, size }) => (
					<Image
						source={menu}
						tintColor={color}
						style={{
							width: size,
							height: size,
						}}
					/>
				),
			},
		},
	},
});

const RootStack = createNativeStackNavigator({
	layout: ({ children }) => (
		<ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
			<ClerkLoaded>
				<ConvexProviderWithClerk client={convex} useAuth={useAuth}>
					<SplashScreenController>
						<AuthProvider>
							<UniThemeProvider>{children}</UniThemeProvider>
						</AuthProvider>
					</SplashScreenController>
				</ConvexProviderWithClerk>
			</ClerkLoaded>
		</ClerkProvider>
	),
	screens: {
		HomeTabs: {
			screen: HomeTabs,
			options: {
				title: "Home",
				headerShown: false,
			},
		},
		SignIn: {
			screen: SignIn,
			options: {
				title: "Sign in",
				headerShown: false,
				presentation: "formSheet",
				sheetGrabberVisible: true,
				sheetAllowedDetents: "fitToContents",
			},
		},
		SignUp: {
			screen: SignUp,
			options: {
				title: "Sign up",
				headerShown: false,
				presentation: "formSheet",
				sheetGrabberVisible: true,
				sheetAllowedDetents: "fitToContents",
			},
		},
		Profile: {
			screen: Profile,
			linking: {
				path: ":user(@[a-zA-Z0-9-_]+)",
				parse: {
					user: (value) => value.replace(/^@/, ""),
				},
				stringify: {
					user: (value) => `@${value}`,
				},
			},
		},
		Board: {
			screen: Board,
			linking: {
				path: ":boardId(^[a-z0-9]{32}$)",
			},
		},
		Settings: {
			screen: Settings,
			options: ({ navigation }) => ({
				presentation: "modal",
				headerRight: () => (
					<HeaderButton onPress={navigation.goBack}>
						<Text>Close</Text>
					</HeaderButton>
				),
			}),
		},
		NotFound: {
			screen: NotFound,
			options: {
				title: "404",
			},
			linking: {
				path: "*",
			},
		},
	},
});

export const Navigation = createStaticNavigation(RootStack);

type RootStackParamList = StaticParamList<typeof RootStack>;

declare global {
	namespace ReactNavigation {
		interface RootParamList extends RootStackParamList {}
	}
}
