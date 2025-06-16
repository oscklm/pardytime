import type { ImageStyle } from "expo-image";
import React from "react";
import type { StyleProp } from "react-native";
import Animated, {
	Easing,
	useAnimatedStyle,
	useSharedValue,
	withRepeat,
	withTiming,
} from "react-native-reanimated";
import coloredSpinner from "@/assets/icons/colored-spinner.png";
import flatSpinner from "@/assets/icons/dotted-spinner.png";

const duration = 1400;
const easing = Easing.linear;

type AnimatedSpinnerProps = {
	style?: StyleProp<ImageStyle>;
	tintColor?: string;
	variant?: "colored" | "flat";
};

const AnimatedSpinner = ({
	style,
	tintColor,
	variant = "colored",
}: AnimatedSpinnerProps) => {
	const progress = useSharedValue(0);

	React.useEffect(() => {
		progress.value = withRepeat(withTiming(1, { duration, easing }), -1);
	}, []);

	const animatedStyle = useAnimatedStyle(() => ({
		transform: [{ rotate: `${progress.value * 360}deg` }],
	}));

	return (
		<Animated.Image
			tintColor={tintColor}
			source={variant === "colored" ? coloredSpinner : flatSpinner}
			style={[
				{
					width: 64,
					height: 64,
				},
				style,
				animatedStyle,
			]}
		/>
	);
};

export { AnimatedSpinner };
