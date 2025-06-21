import { useNavigation } from "@react-navigation/native";
import { Text, TouchableWithoutFeedback, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import type { Doc } from "@/convex/_generated/dataModel";
import Skeleton from "./Skeleton";
import { Image } from "./ui/Image";

const UserBadge = ({ user }: { user: Doc<"users"> | undefined }) => {
	const navigation = useNavigation();
	if (user === undefined) {
		return (
			<View style={styles.badge}>
				<Skeleton style={{ width: 24, height: 24, borderRadius: 9999 }} />
				<Skeleton style={{ width: 80, height: 20 }} />
			</View>
		);
	}

	const { username, imageUrl } = user;

	return (
		<TouchableWithoutFeedback
			onPress={() =>
				user.username &&
				navigation.navigate("Profile", { username: user.username })
			}
		>
			<View style={styles.badge}>
				<Image source={{ uri: imageUrl }} style={styles.avatar} />
				<Text style={styles.label}>@{username}</Text>
			</View>
		</TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create((th) => ({
	badge: {
		width: 150,
		height: 32,
		flexDirection: "row",
		alignItems: "center",
		gap: th.space.md,
	},
	avatar: {
		width: 24,
		height: 24,
		borderRadius: 9999,
	},
	label: {
		fontWeight: "500",
		color: th.colors.labelPrimary,
		fontSize: 16,
		lineHeight: 24,
	},
}));

export default UserBadge;
