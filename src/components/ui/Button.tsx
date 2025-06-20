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
	color: th.colors.text,
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
					<Text style={styles.buttonText}>{children}</Text>
					<View style={{ height: 1, backgroundColor: "black" }} />
				</YStack>
			) : (
				<Text style={styles.buttonText}>{children}</Text>
			)}
			{isLoading && (
				<AnimatedSpinner
					variant="flat"
					tintColor={styles.buttonText.color}
					style={{ marginLeft: 8, width: 16, height: 16 }}
				/>
			)}
			{variant === "menu" && <FontAwesomeIcon name="chevron-right" size={16} />}
		</PlatformPressable>
	);
}

const styles = StyleSheet.create((th) => ({
	button: {
		backgroundColor: th.colors.accent,
		flexDirection: "row",
		justifyContent: "center",
		paddingHorizontal: th.space.lg,
		paddingVertical: th.space.md,
		borderRadius: th.radius.md,
		alignItems: "center",
		variants: {
			variant: {
				link: {
					backgroundColor: undefined,
					alignSelf: "center",
				},
				outline: {
					backgroundColor: "transparent",
					borderWidth: 2,
					borderColor: th.baseColors.primaryMuted,
				},
				menu: {
					paddingHorizontal: th.space.xl,
					paddingVertical: th.space.lg,
					flexDirection: "row",
					justifyContent: "space-between",
					backgroundColor: th.colors.cardMuted,
					alignItems: "center",
					gap: th.space.sm,
				},
				error: {
					backgroundColor: th.colors.error,
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
		color: th.colors.accent,
	},
	buttonText: {
		fontSize: 16,
		fontWeight: "700",
		lineHeight: 24,
		color: th.colors.text,
		variants: {
			variant: {
				link: {
					fontWeight: "500",
					color: th.colors.text,
				},
				outline: {},
				error: {},
				menu: {
					color: th.colors.text,
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
		backgroundColor: th.colors.accent,
	},
}));

export default Button;
