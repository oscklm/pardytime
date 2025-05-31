import * as Haptics from "expo-haptics";
import { type GestureResponderEvent, Pressable, Text } from "react-native";
import { StyleSheet } from "react-native-unistyles";

interface Props
	extends Omit<
		React.ComponentPropsWithRef<typeof Pressable>,
		"children" | "onPress"
	> {
	label: string | React.ReactNode;
	onPress: (event: GestureResponderEvent) => void;
}

const Button = ({ label, onPress, ...rest }: Props) => {
	const handlePress = (event: GestureResponderEvent) => {
		onPress(event);
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
	};

	return (
		<Pressable
			style={({ pressed, hovered }) => {
				styles.useVariants({ pressed, hovered });
				return styles.button;
			}}
			onPress={handlePress}
			{...rest}
		>
			{typeof label === "string" ? (
				<Text style={styles.buttonText}>{label}</Text>
			) : (
				label
			)}
		</Pressable>
	);
};

const styles = StyleSheet.create((th) => ({
	button: {
		backgroundColor: th.colors.primary,
		minWidth: 100,
		paddingHorizontal: th.gap(3),
		paddingVertical: th.gap(2),
		borderRadius: th.gap(1),
		alignItems: "center",
		variants: {
			pressed: {
				true: {
					opacity: 0.5,
					transform: [{ scale: 0.93 }],
				},
			},
			hovered: {
				true: {
					backgroundColor: "red",
				},
			},
		},
	},
	buttonText: {
		fontSize: 16,
		fontWeight: "600",
		lineHeight: 24,
		color: "white",
	},
}));

export default Button;
