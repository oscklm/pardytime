import { Assets as NavigationAssets } from "@react-navigation/elements";
import { Asset } from "expo-asset";
import * as SplashScreen from "expo-splash-screen";
import { Navigation } from "./navigation";

Asset.loadAsync([
	...NavigationAssets,
	require("@/assets/icons/hamburger-menu.png"),
	require("@/assets/icons/house.png"),
	require("@/assets/icons/colored-spinner.png"),
	require("@/assets/icons/dotted-spinner.png"),
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
		/>
	);
}
