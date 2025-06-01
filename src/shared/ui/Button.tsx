import * as Haptics from "expo-haptics";
import { Pressable, type StyleProp, Text, type ViewStyle } from "react-native";
import { StyleSheet } from "react-native-unistyles";

interface Props
	extends Omit<
		React.ComponentPropsWithRef<typeof Pressable>,
		"children" | "style"
	> {
	style?: StyleProp<ViewStyle> | undefined;
	label: string | React.ReactNode;
}

const Button = ({ label, style, ...rest }: Props) => {
	const handlePressIn = () => {
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
	};

	return (
		<Pressable
			style={({ pressed, hovered }) => {
				styles.useVariants({ pressed, hovered });
				return [styles.button, style];
			}}
			onPressIn={handlePressIn}
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
		backgroundColor: th.colors.accent,
		minWidth: 100,
		paddingHorizontal: th.gap(3),
		paddingVertical: th.gap(2),
		borderRadius: th.radius.md,
		alignItems: "center",
		variants: {
			pressed: {
				true: {
					opacity: 0.8,
					transform: [{ scale: 0.98 }],
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
		fontWeight: "700",
		lineHeight: 24,
		color: "white",
	},
}));

export default Button;
