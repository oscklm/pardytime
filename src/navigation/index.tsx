import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HeaderButton, Text } from "@react-navigation/elements";
import {
	createStaticNavigation,
	type StaticParamList,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useConvexAuth } from "convex/react";
import { Image } from "react-native";
import { Easing } from "react-native-reanimated";
import { StyleSheet } from "react-native-unistyles";
import menu from "@/assets/icons/hamburger-menu.png";
import home from "@/assets/icons/house.png";
import { UniThemeProvider } from "@/styles/theme";
import { Board } from "./screens/Board";
import { Help } from "./screens/Help";
import { Home } from "./screens/Home";
import { Menu } from "./screens/Menu";
import { NotFound } from "./screens/NotFound";
import { Profile } from "./screens/Profile";
import { Settings } from "./screens/Settings";
import SignIn from "./screens/SignIn";
import SignUp from "./screens/SignUp";
import { Welcome } from "./screens/Welcome";

const styles = StyleSheet.create((th) => ({
	tabBarBadgeStyle: {
		color: th.colors.labelSecondary,
		backgroundColor: th.colors.yellow,
	},
}));

const HomeTabs = createBottomTabNavigator({
	screenOptions: {
		transitionSpec: {
			animation: "timing",
			config: {
				duration: 250,
				easing: Easing.inOut(Easing.ease),
			},
		},
		sceneStyleInterpolator: ({ current }) => ({
			sceneStyle: {
				opacity: current.progress.interpolate({
					inputRange: [-1, 0, 1],
					outputRange: [0, 1, 0],
				}),
			},
		}),
	},
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
				tabBarBadgeStyle: styles.tabBarBadgeStyle,
			},
		},
	},
});

const RootStack = createNativeStackNavigator({
	layout: ({ children }) => <UniThemeProvider>{children}</UniThemeProvider>,
	screens: {
		HomeTabs: {
			if: () => useConvexAuth().isAuthenticated,
			screen: HomeTabs,
			options: {
				title: "Home",
				headerShown: false,
			},
		},
		Welcome: {
			if: () => !useConvexAuth().isAuthenticated,
			screen: Welcome,
			options: {
				title: "Welcome",
				headerShown: false,
			},
		},
		SignIn: {
			if: () => !useConvexAuth().isAuthenticated,
			screen: SignIn,
			options: {
				title: "Sign in",
			},
		},
		SignUp: {
			if: () => !useConvexAuth().isAuthenticated,
			screen: SignUp,
			options: {
				title: "Sign up",
			},
		},
		Profile: {
			screen: Profile,
			options: {
				title: "Profile",
				presentation: "modal",
			},
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
		Help: {
			screen: Help,
			options: {
				title: "Help",
			},
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
