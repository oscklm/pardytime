import { View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import Text from "@/components/ui/Text";
import type { Doc } from "@/convex/_generated/dataModel";

const statusToColor = {
	pending: "orange",
	active: "green",
	completed: "red",
};

export function GameStatusBadge({
	status,
}: {
	status: Doc<"games">["status"];
}) {
	return (
		<View>
			<Text style={styles.statusLabel(status)}>{status}</Text>
		</View>
	);
}

const styles = StyleSheet.create((th) => ({
	statusLabel: (status: keyof typeof statusToColor) => ({
		fontSize: 16,
		lineHeight: 20,
		fontWeight: "800",
		backgroundColor: th.colors.backgroundSecondary,
		borderWidth: 1,
		borderColor: th.colors.labelQuaternary,
		borderRadius: th.radius.md,
		padding: th.space.sm,
		paddingHorizontal: th.space.md,
		textTransform: "uppercase",
		color: th.colors[statusToColor[status] as keyof typeof th.colors],
	}),
}));
