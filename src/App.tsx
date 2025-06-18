import { Assets as NavigationAssets } from "@react-navigation/elements";
import { Asset } from "expo-asset";
import * as SplashScreen from "expo-splash-screen";
import * as TaskManager from "expo-task-manager";
import { useEffect } from "react";
import {
	registerUpdateCheckTask,
	UPDATE_CHECK_TASK_IDENTIFIER,
} from "@/lib/tasks/updateChecker";
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
	useEffect(() => {
		async function initUpdateTask() {
			const isRegistered = await TaskManager.isTaskRegisteredAsync(
				UPDATE_CHECK_TASK_IDENTIFIER,
			);
			if (!isRegistered) {
				await registerUpdateCheckTask();
			}
		}
		initUpdateTask();
	}, []);

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
