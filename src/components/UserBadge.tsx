import { useNavigation } from "@react-navigation/native";
import { Text, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import type { Doc } from "@/convex/_generated/dataModel";
import Skeleton from "./Skeleton";
import { Image } from "./ui/Image";
import TouchableBounce from "./ui/TouchableBounce";

const UserBadge = ({ user }: { user: Doc<"users"> | undefined }) => {
	const navigation = useNavigation();
	if (user === undefined) {
		return (
			<View style={styles.badge}>
				<Skeleton style={{ width: 32, height: 32, borderRadius: 9999 }} />
				<Skeleton style={{ width: 80, height: 20 }} />
			</View>
		);
	}

	const { username, imageUrl } = user;

	return (
		<TouchableBounce
			sensory="light"
			onPress={() =>
				user.username &&
				navigation.navigate("Profile", { username: user.username })
			}
		>
			<View style={styles.badge}>
				<Image source={{ uri: imageUrl }} style={styles.avatar} />
				<Text style={styles.label}>@{username}</Text>
			</View>
		</TouchableBounce>
	);
};

const styles = StyleSheet.create((th) => ({
	badge: {
		width: 150,
		height: 40,
		flexDirection: "row",
		alignItems: "center",
		gap: th.space.md,
	},
	avatar: {
		width: 32,
		height: 32,
		borderRadius: 9999,
	},
	label: {
		fontWeight: "500",
		color: th.colors.backgroundPrimary,
		fontSize: 14,
		lineHeight: 20,
	},
}));

export default UserBadge;
