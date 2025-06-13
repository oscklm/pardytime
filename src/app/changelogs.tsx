import { useQuery } from "convex/react";
import { View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import Text from "@/components/ui/Text";
import { api } from "@/convex/_generated/api";
import { formatUnixTimestamp } from "@/lib/utils/time";

const ChangelogScreen = () => {
	const changelogs = useQuery(api.changelogs.queries.getAll, {});

	if (!changelogs) {
		return (
			<View style={styles.container}>
				<Text>Loading...</Text>
			</View>
		);
	}

	return (
		<View style={styles.container}>
			{changelogs.map((log) => (
				<View style={styles.log} key={log._id}>
					<Text variant="h2">{log.version}</Text>
					<Text style={{ marginBottom: 8 }}>
						{formatUnixTimestamp(log._creationTime)}
					</Text>
					<View style={styles.entry}>
						{log.entries.map((entry) => (
							<View key={entry.title} style={styles.entryList}>
								<Text style={{ marginBottom: 4 }}> - {entry.title}</Text>
							</View>
						))}
					</View>
				</View>
			))}
		</View>
	);
};

const styles = StyleSheet.create((th) => ({
	container: {
		backgroundColor: th.colors.background,
		padding: th.space.lg,
	},
	log: {
		marginBottom: 16,
		borderBottomWidth: 1,
		borderBottomColor: th.colors.border,
	},
	entryList: {
		marginBottom: th.space.sm,
		paddingLeft: th.space.md,
	},
	entry: {
		marginBottom: th.space.lg,
	},
}));

export default ChangelogScreen;
