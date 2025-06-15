import * as BackgroundTask from "expo-background-task";
import * as TaskManager from "expo-task-manager";
import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import {
	registerUpdateCheckTask,
	UPDATE_CHECK_TASK_IDENTIFIER,
	unregisterUpdateCheckTask,
} from "@/lib/tasks/updateChecker";

export default function BackgroundTaskScreen() {
	const [isRegistered, setIsRegistered] = useState<boolean>(false);
	const [status, setStatus] =
		useState<BackgroundTask.BackgroundTaskStatus | null>(null);

	useEffect(() => {
		updateAsync();
	}, []);

	const updateAsync = async () => {
		const status = await BackgroundTask.getStatusAsync();
		setStatus(status);
		const isRegistered = await TaskManager.isTaskRegisteredAsync(
			UPDATE_CHECK_TASK_IDENTIFIER,
		);
		setIsRegistered(isRegistered);
	};

	const toggle = async () => {
		if (!isRegistered) {
			await registerUpdateCheckTask();
		} else {
			await unregisterUpdateCheckTask();
		}
		await updateAsync();
	};

	const triggerTask = async () => {
		await BackgroundTask.triggerTaskWorkerForTestingAsync();
	};

	return (
		<View style={styles.screen}>
			<View style={styles.textContainer}>
				<Text>
					Background Task Service Availability:{" "}
					<Text style={styles.boldText}>
						{status ? BackgroundTask.BackgroundTaskStatus[status] : null}
					</Text>
				</Text>
			</View>
			<Button
				disabled={status === BackgroundTask.BackgroundTaskStatus.Restricted}
				title={
					isRegistered ? "Cancel Background Task" : "Schedule Background Task"
				}
				onPress={toggle}
			/>
			<Button title="Check Background Task Status" onPress={updateAsync} />
			{__DEV__ && <Button title="Trigger Task" onPress={triggerTask} />}
		</View>
	);
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	textContainer: {
		margin: 10,
	},
	boldText: {
		fontWeight: "bold",
	},
});
