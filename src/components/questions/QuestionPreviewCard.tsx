import { TouchableWithoutFeedback } from "react-native";
import Animated, {
	Extrapolation,
	interpolate,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";
import { StyleSheet } from "react-native-unistyles";
import Text from "@/components/ui/Text";
import type { Doc } from "@/convex/_generated/dataModel";

export function QuestionPreviewCard({
	question,
}: {
	question: Doc<"questions">;
}) {
	const { text, answer } = question;
	const fade = useSharedValue(0);

	const frontStyleAnimated = useAnimatedStyle(() => ({
		opacity: interpolate(fade.value, [0, 1], [1, 0], Extrapolation.CLAMP),
	}));
	const backStyleAnimated = useAnimatedStyle(() => ({
		opacity: interpolate(fade.value, [0, 1], [0, 1], Extrapolation.CLAMP),
	}));

	const handleLongPress = () => {
		fade.value = withTiming(1, { duration: 250 });
	};
	const handlePressOut = () => {
		fade.value = withTiming(0, { duration: 350 });
	};

	return (
		<TouchableWithoutFeedback
			onLongPress={handleLongPress}
			delayLongPress={50}
			onPressOut={handlePressOut}
		>
			<Animated.View style={styles.container}>
				{/* Front: Question */}
				<Animated.View
					style={[frontStyleAnimated, styles.frontStyle, styles.face]}
				>
					<Text numberOfLines={3} style={styles.questionText}>
						{text}
					</Text>
				</Animated.View>
				{/* Back: Answer */}
				<Animated.View
					style={[backStyleAnimated, styles.backStyle, styles.face]}
				>
					<Text style={styles.answerText}>{answer}</Text>
				</Animated.View>
			</Animated.View>
		</TouchableWithoutFeedback>
	);
}

const styles = StyleSheet.create((th) => ({
	container: {
		flex: 1,
		height: 100,
		justifyContent: "center",
		alignItems: "center",
	},
	answerText: {
		fontSize: 18,
		lineHeight: 28,
		fontWeight: "600",
		textAlign: "center",
		color: th.colors.labelPrimary,
	},
	backStyle: {
		backgroundColor: th.colors.green,
	},
	frontStyle: {
		backgroundColor: th.colors.gray2,
	},
	questionText: {
		fontWeight: "600",
		textAlign: "center",
		color: th.colors.labelPrimary,
		fontSize: 18,
		lineHeight: 28,
	},
	face: {
		position: "absolute",
		top: 0,
		left: 0,
		width: "100%",
		height: "100%",
		borderRadius: th.radius.md,
		justifyContent: "center",
		alignItems: "center",
	},
}));
