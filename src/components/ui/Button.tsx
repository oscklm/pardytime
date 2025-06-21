import { FontAwesome } from "@expo/vector-icons";
import { PlatformPressable as RNPlatformPressable } from "@react-navigation/elements";
import { type LinkProps, useLinkProps } from "@react-navigation/native";
import * as Haptics from "expo-haptics";
import type * as React from "react";
import { useCallback } from "react";
import { Platform, Text, View } from "react-native";
import {
	StyleSheet,
	type UnistylesVariants,
	withUnistyles,
} from "react-native-unistyles";
import { AnimatedSpinner } from "../AnimatedSpinner";
import YStack from "./YStack";

type Variants = UnistylesVariants<typeof styles>;

const PlatformPressable = withUnistyles(RNPlatformPressable);

const FontAwesomeIcon = withUnistyles(FontAwesome, (th) => ({
	color: th.colors.labelPrimary,
}));

type ButtonBaseProps = Omit<
	React.ComponentProps<typeof PlatformPressable>,
	"children"
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
		children: string | string[];
	};

type ButtonLinkProps<ParamList extends ReactNavigation.RootParamList> =
	LinkProps<ParamList> & Omit<ButtonBaseProps, "onPress">;

export function Button<ParamList extends ReactNavigation.RootParamList>(
	props: ButtonLinkProps<ParamList>,
): React.JSX.Element;

export function Button(props: ButtonBaseProps): React.JSX.Element;

export function Button<ParamList extends ReactNavigation.RootParamList>(
	props: ButtonBaseProps | ButtonLinkProps<ParamList>,
) {
	if ("screen" in props || "action" in props) {
		return <ButtonLink {...props} />;
	} else {
		return <ButtonBase {...props} />;
	}
}

function ButtonLink<ParamList extends ReactNavigation.RootParamList>({
	screen,
	params,
	action,
	href,
	...rest
}: ButtonLinkProps<ParamList>) {
	// @ts-expect-error: This is already type-checked by the prop types

	const props = useLinkProps({ screen, params, action, href });

	return <ButtonBase {...rest} {...props} />;
}

function ButtonBase({
	// Unistyles variants
	variant,
	isLoading,
	// Other props
	android_ripple,
	sensory,
	onPressIn,
	style,
	children,
	...rest
}: ButtonBaseProps) {
	const onSensory = useCallback(() => {
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

	styles.useVariants({ variant, isLoading });

	return (
		<PlatformPressable
			{...rest}
			android_ripple={{
				...android_ripple,
			}}
			onPressIn={(ev) => {
				onSensory();
				onPressIn?.(ev);
			}}
			pressOpacity={Platform.OS === "ios" ? 0.5 : 1}
			hoverEffect={{ ...styles.hoverEffect }}
			style={[styles.button, style]}
		>
			{variant === "link" ? (
				<YStack>
					<Text style={styles.label}>{children}</Text>
					<View style={styles.hairline} />
				</YStack>
			) : isLoading ? (
				<AnimatedSpinner
					variant="flat"
					tintColor={styles.label.color}
					style={{ marginLeft: 8, width: 16, height: 16 }}
				/>
			) : (
				<Text style={styles.label}>{children}</Text>
			)}

			{variant === "menu" && <FontAwesomeIcon name="chevron-right" size={16} />}
		</PlatformPressable>
	);
}

const styles = StyleSheet.create((th) => ({
	button: {
		flexDirection: "row",
		height: 48,
		justifyContent: "center",
		paddingHorizontal: th.space.lg,
		borderRadius: th.radius.md,
		alignItems: "center",
		borderWidth: 1,
		borderColor: th.colors.labelQuaternary,
		backgroundColor: th.colors.gray4,
		variants: {
			variant: {
				link: {
					backgroundColor: "transparent",
					alignSelf: "center",
					borderWidth: 0,
				},
				outline: {
					backgroundColor: "transparent",
				},
				menu: {
					flexDirection: "row",
					borderWidth: 0,
					paddingHorizontal: th.space.xs,
					justifyContent: "space-between",
					backgroundColor: "transparent",
					alignItems: "center",
					gap: th.space.sm,
				},
				white: {
					backgroundColor: th.colors.white,
					borderColor: th.colors.gray3,
				},
				purple: {
					backgroundColor: th.colors.purple,
				},
				error: {
					backgroundColor: th.colors.red,
				},
				success: {
					backgroundColor: th.colors.green,
				},
				warning: {
					backgroundColor: th.colors.yellow,
				},
			},
			isLoading: {
				true: {
					opacity: 0.5,
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
	hoverEffect: {
		color: th.colors.backgroundSecondary,
	},
	hairline: {
		marginTop: th.space.sm,
		borderWidth: 1,
		borderRadius: th.radius.sm,
		borderColor: th.colors.labelPrimary,
	},
	label: {
		fontSize: 16,
		fontWeight: "700",
		lineHeight: 24,
		color: th.colors.labelPrimary,
		variants: {
			variant: {
				link: {
					fontWeight: "500",
					color: th.colors.labelPrimary,
				},
				purple: {
					color: "white",
				},
				outline: {},
				error: {
					color: "white",
				},
				success: {
					color: "white",
				},
				warning: {
					color: "white",
				},
				menu: {
					color: th.colors.labelPrimary,
				},
			},
			isLoading: {
				true: {},
				false: {},
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
		backgroundColor: th.colors.backgroundPrimary,
	},
}));

export default Button;
