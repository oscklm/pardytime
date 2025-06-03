import * as Haptics from "expo-haptics";
import React from "react";
import {
	ActivityIndicator,
	Pressable,
	type StyleProp,
	Text,
	View,
	type ViewStyle,
} from "react-native";
import { StyleSheet, type UnistylesVariants } from "react-native-unistyles";

type Variants = UnistylesVariants<typeof styles>;

// NOTE: Using type instead of interface to avoid issues with intersecting types from UnistylesVariants
type Props = Omit<
	React.ComponentPropsWithRef<typeof Pressable>,
	"children" | "style"
> &
	Variants & {
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
		isLoading?: boolean;
		label: string | React.ReactNode;
	};

const Button = ({
	// Unistyles Props
	variant,
	// Normal props
	style,
	sensory = "light",
	isLoading,
	label,
	onPressIn,
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
	styles.useVariants({ variant });

	return (
		<Pressable
			style={({ pressed, hovered }) => {
				styles.useVariants({ pressed, hovered, variant });
				return [styles.button, style];
			}}
			onPressIn={(ev) => {
				onSensory();
				onPressIn?.(ev);
			}}
			{...rest}
		>
			{typeof label === "string" ? (
				<>
					<Text style={styles.buttonText}>{label}</Text>
					{variant === "link" && <View style={styles.underline} />}
					{isLoading && (
						<ActivityIndicator
							size="small"
							color="white"
							style={{ marginLeft: 8 }}
						/>
					)}
				</>
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
		flexDirection: "row",
		justifyContent: "center",
		paddingHorizontal: th.space.md,
		paddingVertical: th.space.md,
		borderRadius: th.radius.md,
		alignItems: "center",
		variants: {
			variant: {
				link: {
					backgroundColor: undefined,
					alignSelf: "center",
				},
			},
			pressed: {
				true: {
					opacity: 0.8,
					transform: [{ scale: 0.98 }],
				},
				false: {},
			},
			hovered: {
				true: {
					backgroundColor: th.baseColors.accentMuted,
				},
				false: {},
			},
		},
		compoundVariants: [
			{
				variant: "link",
				hovered: true, // and color is link
				// apply following styles
				styles: {
					backgroundColor: undefined,
					// and more styles
				},
			},
		],
	},
	buttonText: {
		fontSize: 16,
		fontWeight: "700",
		lineHeight: 24,
		color: "white",
		variants: {
			variant: {
				link: {
					color: th.colors.accent,
					fontWeight: "500",
				},
			},
			pressed: {},
			hovered: {
				true: {
					color: th.baseColors.accentMuted,
				},
			},
		},
	},
	underline: {
		position: "absolute",
		bottom: 0,
		left: 0,
		right: 0,
		height: 2,
		borderRadius: th.radius.sm,
		backgroundColor: th.colors.accent,
	},
}));

export default Button;
