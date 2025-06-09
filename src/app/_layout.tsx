import { Stack } from "expo-router";
import { UniThemeProvider } from "@/styles/theme";
import "react-native-reanimated";

export default function RootLayout() {
  return (
    <UniThemeProvider>
      <RootNavigator />
    </UniThemeProvider>
  );
}

function RootNavigator() {
  return (
    <Stack>
      <Stack.Screen
        name="(user)"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
