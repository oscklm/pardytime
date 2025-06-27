import * as Haptics from "expo-haptics";
import { View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
	runOnJS,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";
import { StyleSheet, useUnistyles } from "react-native-unistyles";
import type { Doc } from "@/convex/_generated/dataModel";
import Text from "../../../components/ui/Text";

interface QuestionCardProps {
	question: Doc<"questions">;
	isSelected: boolean;
	isAnswered: boolean;
	disabled?: boolean;
	onPress?: () => void;
}

const PRESS_DURATION = 500;

export const QuestionCard = ({
	question,
	isSelected,
	isAnswered,
	disabled,
	onPress,
}: QuestionCardProps) => {
	const { theme } = useUnistyles();
	const fillProgress = useSharedValue<number>(0);
	const isPressed = useSharedValue<boolean>(false);

	const handlePressComplete = () => {
		onPress?.();
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
	};

	const longPress = Gesture.LongPress()
		.minDuration(PRESS_DURATION) // 2 seconds
		.enabled(!disabled)
		.onBegin(() => {
			isPressed.value = true;
			fillProgress.value = withTiming(
				1,
				{ duration: PRESS_DURATION },
				(finished) => {
					// Fire callback immediately when animation completes
					if (finished) {
						runOnJS(handlePressComplete)();
					}
				},
			);
		})
		.onFinalize(() => {
			isPressed.value = false;
			// If we didn't complete, reverse the animation
			if (fillProgress.value < 0.8) {
				fillProgress.value = withTiming(0, { duration: 300 });
			} else {
				// If completed, quick reset
				fillProgress.value = withTiming(0, { duration: 200 });
			}
		});

	const animatedFillStyle = useAnimatedStyle(() => ({
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: theme.colors.gray4, // Green color
		opacity: fillProgress.value * 0.8,
		transform: [{ scaleX: fillProgress.value }],
	}));

	styles.useVariants({ isSelected, isAnswered });

	return (
		<GestureDetector gesture={longPress}>
			<View style={styles.container}>
				<Animated.View style={animatedFillStyle} />
				<Text style={styles.text}>{question.value}</Text>
				{isSelected && <View style={styles.innerBorder} />}
			</View>
		</GestureDetector>
	);
};

const styles = StyleSheet.create((th) => ({
	container: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		padding: th.space.lg,
		gap: th.space.md,
		backgroundColor: th.colors.backgroundSecondary,
		borderRadius: th.radius.md,
		overflow: "hidden",
		variants: {
			isSelected: {
				true: {},
				false: {},
			},
			isAnswered: {
				true: {
					opacity: 0.5,
				},
				false: {},
			},
		},
	},
	innerBorder: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		borderRadius: th.radius.md,
		borderWidth: 3,
		borderColor: th.colors.gray2,
		opacity: 0.5,
	},
	text: {
		flex: 1,
		fontWeight: "800",
		zIndex: 1,
		textAlign: "center",
		variants: {
			isSelected: {
				true: {},
			},
			isAnswered: {
				true: {
					textDecorationLine: "line-through",
				},
			},
		},
	},
}));
