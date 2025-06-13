import * as BackgroundTask from "expo-background-task";
import * as TaskManager from "expo-task-manager";
import * as Updates from "expo-updates";

export const UPDATE_CHECK_TASK_IDENTIFIER = "update-check-task";

// Define the background task at the top level
TaskManager.defineTask(UPDATE_CHECK_TASK_IDENTIFIER, async () => {
	__DEV__ && console.log("Triggering update check task");
	try {
		const update = await Updates.checkForUpdateAsync();
		if (update.isAvailable) {
			await Updates.fetchUpdateAsync();
			await Updates.reloadAsync();
		}
	} catch (e: unknown) {
		console.error(e);
		return BackgroundTask.BackgroundTaskResult.Failed;
	}
	return BackgroundTask.BackgroundTaskResult.Success;
});

// Register the task (call this in your app startup)
export const registerUpdateCheckTask = async () => {
	await BackgroundTask.registerTaskAsync(UPDATE_CHECK_TASK_IDENTIFIER, {
		minimumInterval: 3600, // 1 hour
	});
};

// 3. (Optional) Unregister tasks by specifying the task name
// This will cancel any future background task calls that match the given name
// Note: This does NOT need to be in the global scope and CAN be used in your React components!
export const unregisterUpdateCheckTask = async () => {
	return BackgroundTask.unregisterTaskAsync(UPDATE_CHECK_TASK_IDENTIFIER);
};
