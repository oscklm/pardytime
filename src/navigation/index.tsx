import { FontAwesome } from "@expo/vector-icons";
import {
  BottomTabOptionsArgs,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { HeaderButton, Text } from "@react-navigation/elements";
import {
  createStaticNavigation,
  LinkingOptions,
  type StaticParamList,
} from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { useConvexAuth } from "convex/react";
import { StyleSheet, useUnistyles } from "react-native-unistyles";
import { GameScreen } from "@/features/game/screens/GameScreen";
import { UniThemeProvider } from "@/styles/theme";
import { Board } from "./screens/Board";
import { CreateBoard } from "./screens/CreateBoard";
import { CreateGame } from "./screens/CreateGame";
import { CreateTeam } from "./screens/CreateTeam";
import { Help } from "./screens/Help";
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
import { UnistylesRuntime } from "react-native-unistyles";
import { useMemo } from "react";
import { Id } from "@/convex/_generated/dataModel";
import WheelTab from "./WheelTab";
import { EditTeamScreen } from "./screens/EditTeam";

const styles = StyleSheet.create((th) => ({
  tabBarBadgeStyle: {
    color: th.colors.labelSecondary,
    backgroundColor: th.colors.yellow,
  },
}));

type BottomTabsParamList = {
  Home: undefined;
  Wheel: undefined;
  Profile: undefined;
};

const BottomTab = createBottomTabNavigator<BottomTabsParamList>();

function BottomTabStack() {
  const { rt } = useUnistyles();

  const isLargeScreen = useMemo(
    () => /^(xs|sm|md|lg)$/.test(rt.breakpoint ?? "sm"),
    [rt.breakpoint]
  );

  const tabBarPosition = useMemo(
    () => (isLargeScreen ? "bottom" : "left"),
    [isLargeScreen]
  );
  const tabBarLabelPosition = useMemo(
    () => (isLargeScreen ? "below-icon" : "beside-icon"),
    [isLargeScreen]
  );

  return (
    <BottomTab.Navigator
      screenOptions={{
        tabBarPosition,
        tabBarLabelPosition,
        header: (props) => <CustomBottomTabHeader {...props} />,
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeTab}
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" size={size} color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileTab}
        options={{
          title: "Profile",
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user" size={size} color={color} />
          ),
          tabBarBadgeStyle: styles.tabBarBadgeStyle,
        }}
      />
      <BottomTab.Screen
        name="Wheel"
        component={WheelTab}
        options={{
          title: "Wheel",
          tabBarLabel: "Wheel",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="gamepad" size={size} color={color} />
          ),
          tabBarBadgeStyle: styles.tabBarBadgeStyle,
        }}
      />
    </BottomTab.Navigator>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

export type RootStackParamList = {
  BottomTabs: undefined;
  Home: undefined;
  Game: {
    code: string;
  };
  Board: {
    boardId: Id<"boards">;
  };
  CreateBoard: undefined;
  CreateGame: undefined;
  CreateTeam: {
    gameId: Id<"games">;
  };
  EditTeam: {
    teamId: Id<"teams">;
  };
  Settings: undefined;
  Scanner: undefined;
  Profile: {
    username: string;
  };
  SignIn: undefined;
  SignUp: undefined;
  Welcome: undefined;
  Help: undefined;
  NotFound: undefined;
};

export type BottomScreenProps<T extends keyof BottomTabsParamList> =
  NativeStackScreenProps<BottomTabsParamList, T>;

export type ScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

export function RootStack() {
  const { isAuthenticated } = useConvexAuth();

  return (
    <UniThemeProvider>
      <Stack.Navigator
        screenOptions={{
          headerBackButtonMenuEnabled: false,
          headerBackButtonDisplayMode: "minimal",
        }}
      >
        {isAuthenticated ? (
          <>
            <Stack.Screen
              name="BottomTabs"
              component={BottomTabStack}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Game"
              component={GameScreen}
              options={{ title: "Game" }}
            />
            <Stack.Screen
              name="Profile"
              component={PublicProfile}
              options={{
                title: "Profile",
                presentation: "modal",
              }}
              initialParams={{}}
            />
            <Stack.Screen name="Board" component={Board} />
            <Stack.Screen
              name="CreateBoard"
              component={CreateBoard}
              options={{
                title: "Create Board",
                presentation: "modal",
              }}
            />
            <Stack.Screen
              name="CreateGame"
              component={CreateGame}
              options={{
                title: "Start game",
                presentation: "modal",
              }}
            />
            <Stack.Screen
              name="CreateTeam"
              component={CreateTeam}
              options={{
                title: "Create Team",
                presentation: "modal",
              }}
            />
            <Stack.Screen
              name="EditTeam"
              component={EditTeamScreen}
              options={{
                title: "Edit Team",
                presentation: "modal",
              }}
            />
            <Stack.Screen
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
            <Stack.Screen
              name="Scanner"
              component={Scanner}
              options={{
                title: "Scanner",
                presentation: "modal",
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Help"
              component={Help}
              options={{ title: "Help" }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Welcome"
              component={Welcome}
              options={{
                title: "Welcome",
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="SignIn"
              component={SignIn}
              options={{ title: "Sign in" }}
            />
            <Stack.Screen
              name="SignUp"
              component={SignUp}
              options={{ title: "Sign up" }}
            />
          </>
        )}
        <Stack.Screen
          name="NotFound"
          component={NotFound}
          options={{ title: "404" }}
        />
      </Stack.Navigator>
    </UniThemeProvider>
  );
}
export const linkingOptions: LinkingOptions<RootStackParamList> = {
  prefixes: ["pardytime://"],
  config: {
    screens: {
      BottomTabs: {
        screens: {
          Home: "home",
          Profile: "profile",
        },
      },
      Board: "board/:boardId",
      CreateBoard: "create-board",
      CreateGame: "create-game",
      CreateTeam: "create-team",
      Game: "game/:code",
      Profile: "profile/:username",
      SignIn: "sign-in",
      SignUp: "sign-up",
      Welcome: "welcome",
      Help: "help",
      Settings: "settings",
      Scanner: "scanner",
      NotFound: "*",
    },
  },
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
