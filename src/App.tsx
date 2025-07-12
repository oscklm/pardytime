import { ClerkLoaded, ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { Assets as NavigationAssets } from "@react-navigation/elements";
import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { Asset } from "expo-asset";
import * as SplashScreen from "expo-splash-screen";
import * as TaskManager from "expo-task-manager";
import { useEffect } from "react";
import { LogBox, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  registerUpdateCheckTask,
  UPDATE_CHECK_TASK_IDENTIFIER,
} from "@/lib/tasks/updateChecker";
import SplashScreenController from "./components/splash-screen-controller";
import { linkingOptions, RootStack } from "./navigation";
import AuthProvider from "./providers/user-provider";
import { StyleSheet } from "react-native-unistyles";
import { NavigationContainer } from "@react-navigation/native";

LogBox.ignoreLogs(["Clerk: Clerk has been loaded with development keys."]);

Asset.loadAsync([
  ...NavigationAssets,
  require("@/assets/icons/hamburger-menu.png"),
  require("@/assets/icons/house.png"),
  require("@/assets/icons/colored-spinner.png"),
  require("@/assets/icons/dotted-spinner.png"),
]);

SplashScreen.preventAutoHideAsync();

const convex = new ConvexReactClient(
  process.env.EXPO_PUBLIC_CONVEX_URL as string,
  {
    unsavedChangesWarning: false,
  }
);

if (!process.env.EXPO_PUBLIC_CONVEX_URL) {
  throw new Error(
    "Missing Convex URL. Please set EXPO_PUBLIC_CONVEX_URL in your .env"
  );
}

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY as string;

if (!publishableKey) {
  throw new Error(
    "Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env"
  );
}

export function App() {
  useEffect(() => {
    async function initUpdateTask() {
      const isRegistered = await TaskManager.isTaskRegisteredAsync(
        UPDATE_CHECK_TASK_IDENTIFIER
      );
      if (!isRegistered) {
        await registerUpdateCheckTask();
      }
    }
    initUpdateTask();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
        <ClerkLoaded>
          <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
            <SplashScreenController>
              <AuthProvider>
                <NavigationContainer linking={linkingOptions}>
                  <RootStack />
                </NavigationContainer>
              </AuthProvider>
            </SplashScreenController>
          </ConvexProviderWithClerk>
        </ClerkLoaded>
      </ClerkProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create((th) => ({
  root: {
    flex: 1,
    backgroundColor: th.colors.backgroundPrimary,
    padding: {
      xs: 0,
      xl: th.space.lg,
    },
  },
  rootStackLayoutWrapper: {
    flex: 1,
    margin: "auto",
    width: "100%",
    maxWidth: {
      xs: "100%",
      xl: 900,
    },
    overflow: "hidden",
    borderRadius: {
      md: 0,
      xl: th.radius.lg,
    },
  },
}));
