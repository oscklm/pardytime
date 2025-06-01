import * as Haptics from "expo-haptics";
import React from "react";
import { Pressable, type StyleProp, Text, type ViewStyle } from "react-native";
import { StyleSheet } from "react-native-unistyles";

interface Props
	extends Omit<
		React.ComponentPropsWithRef<typeof Pressable>,
		"children" | "style"
	> {
	/** Enables haptic feedback on press down. */
	sensory?:
		| boolean
		| "success"
		| "error"
		| "warning"
		| "light"
		| "medium"
		| "heavy";
	style?: StyleProp<ViewStyle> | undefined;
	label: string | React.ReactNode;
}

const Button = ({
	label,
	sensory = "light",
	onPressIn,
	style,
	...rest
}: Props) => {
	const onSensory = React.useCallback(() => {
		if (!sensory) return;
		if (sensory === true) {
			Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
		} else if (sensory === "success") {
			Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
		} else if (sensory === "error") {
			Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
		} else if (sensory === "warning") {
			Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
		} else if (sensory === "light") {
			Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
		} else if (sensory === "medium") {
			Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
		} else if (sensory === "heavy") {
			Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
		}
	}, [sensory]);
	return (
		<Pressable
			style={({ pressed, hovered }) => {
				styles.useVariants({ pressed, hovered });
				return [styles.button, style];
			}}
			onPressIn={(ev) => {
				onSensory();
				onPressIn?.(ev);
			}}
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
		paddingHorizontal: th.space.md,
		paddingVertical: th.space.md,
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
					backgroundColor: th.baseColors.accentMuted,
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
