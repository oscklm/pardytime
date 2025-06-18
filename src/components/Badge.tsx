import type { PropsWithChildren } from "react";
import { View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

const Badge = ({ children }: PropsWithChildren) => {
	return <View style={styles.badge}>{children}</View>;
};

const styles = StyleSheet.create((th, rt) => ({
	badge: {
		backgroundColor:
			rt.colorScheme === "light" ? th.baseColors.black : th.baseColors.white,
		borderRadius: th.radius.md,
		padding: th.space.md,
	},
}));

export default Badge;
