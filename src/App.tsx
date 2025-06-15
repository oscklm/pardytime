import { Assets as NavigationAssets } from "@react-navigation/elements";
import { Asset } from "expo-asset";
import * as SplashScreen from "expo-splash-screen";
import { Navigation } from "./navigation";

Asset.loadAsync([
	...NavigationAssets,
	require("@/assets/images/newspaper.png"),
	require("@/assets/images/bell.png"),
]);

SplashScreen.preventAutoHideAsync();

export function App() {
	return (
		<Navigation
			linking={{
				enabled: "auto",
				prefixes: [
					// Change the scheme to match your app's scheme defined in app.json
					"jeopardytime://",
				],
			}}
			onReady={() => {
				SplashScreen.hideAsync();
			}}
		/>
	);
}
