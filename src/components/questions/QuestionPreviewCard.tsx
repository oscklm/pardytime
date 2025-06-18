import { TouchableWithoutFeedback } from "react-native";
import Animated, {
	Extrapolate,
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
	const fade = useSharedValue(0); // 0 = question, 1 = answer

	const frontStyle = useAnimatedStyle(() => ({
		opacity: interpolate(fade.value, [0, 1], [1, 0], Extrapolate.CLAMP),
	}));
	const backStyle = useAnimatedStyle(() => ({
		opacity: interpolate(fade.value, [0, 1], [0, 1], Extrapolate.CLAMP),
		position: "absolute" as const,
		top: 0,
		left: 0,
		width: "100%",
		height: "100%",
	}));

	const handleLongPress = () => {
		fade.value = withTiming(1, { duration: 300 });
	};
	const handlePressOut = () => {
		fade.value = withTiming(0, { duration: 300 });
	};

	return (
		<TouchableWithoutFeedback
			onLongPress={handleLongPress}
			delayLongPress={50}
			onPressOut={handlePressOut}
		>
			<Animated.View style={styles.container}>
				{/* Front: Question */}
				<Animated.View style={[frontStyle, styles.face]}>
					<Text>{text}</Text>
				</Animated.View>
				{/* Back: Answer */}
				<Animated.View
					style={[
						backStyle,
						styles.face,
						{ backgroundColor: "hsl(0, 0.00%, 68.20%)" },
					]}
				>
					<Text variant="subtitle" style={styles.answerTitle}>
						Answer
					</Text>
					<Text>{answer}</Text>
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
	answerTitle: {
		position: "absolute",
		top: 5,
		right: 10,
	},
	face: {
		backgroundColor: th.colors.cardMuted,
		borderRadius: th.radius.md,
		width: "100%",
		height: "100%",
		justifyContent: "center",
		alignItems: "center",
	},
}));
