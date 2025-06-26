import { FontAwesome } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import type React from "react";
import { useCallback } from "react";
import { Pressable, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
	runOnJS,
	useAnimatedStyle,
	useDerivedValue,
	useSharedValue,
	withSpring,
	withTiming,
} from "react-native-reanimated";
import { StyleSheet, useUnistyles } from "react-native-unistyles";
import type { lightTheme } from "@/styles/theme";
import Text from "./ui/Text";

interface ActionButton {
	id: string;
	label: string;
	description?: string;
	icon: string;
	color: keyof typeof lightTheme.colors;
	onPress: () => void;
}

interface ActionModalProps {
	onCreatePress?: (actionType: string) => void;
	actions?: Array<ActionButton>;
}

export const ActionModal: React.FC<ActionModalProps> = ({
	onCreatePress,
	actions = [],
}) => {
	const { theme } = useUnistyles();
	const isOpen = useSharedValue<boolean>(false);
	const translateY = useSharedValue<number>(400);
	const backgroundOpacity = useSharedValue<number>(0);

	// Use derived value for computed values based on shared values
	const pointerEvents = useDerivedValue(() => {
		return isOpen.value ? "auto" : "none";
	});

	const openModal = useCallback(() => {
		isOpen.value = true;
		translateY.value = withSpring(0, {
			damping: 20,
			stiffness: 300,
		});
		backgroundOpacity.value = withTiming(0.4, { duration: 200 });
	}, []);

	const closeModal = useCallback(() => {
		translateY.value = withSpring(400, {
			damping: 20,
			stiffness: 300,
		});
		backgroundOpacity.value = withTiming(0, { duration: 200 });
		isOpen.value = false;
	}, []);

	const toggleModal = useCallback(() => {
		if (isOpen.value) {
			closeModal();
		} else {
			openModal();
		}
	}, [openModal, closeModal]);

	// Handle tap on background to close modal
	const backgroundTap = Gesture.Tap().onEnd(() => {
		if (isOpen.value) {
			runOnJS(closeModal)();
		}
	});

	// Handle button press with haptic feedback
	const triggerHaptic = useCallback(() => {
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
	}, []);

	const buttonPress = Gesture.Tap()
		.onStart(() => {
			runOnJS(triggerHaptic)();
		})
		.onEnd(() => {
			runOnJS(toggleModal)();
		});

	// Animated styles
	const buttonStyle = useAnimatedStyle(() => ({
		transform: [
			{
				scale: withSpring(isOpen.value ? 0.9 : 1, {
					damping: 15,
					stiffness: 200,
				}),
			},
			{
				rotate: withTiming(isOpen.value ? "45deg" : "0deg", {
					duration: 200,
				}),
			},
		],
	}));

	const backgroundStyle = useAnimatedStyle(() => ({
		opacity: backgroundOpacity.value,
		pointerEvents: pointerEvents.value,
	}));

	const modalStyle = useAnimatedStyle(() => ({
		transform: [{ translateY: translateY.value }],
		pointerEvents: pointerEvents.value,
	}));

	const renderActionButton = useCallback(
		(action: ActionButton) => (
			<Pressable
				key={action.id}
				style={[
					styles.actionButton,
					{ backgroundColor: `${theme.colors[action.color]}20` },
				]}
				onPress={() => {
					Haptics.selectionAsync();
					action.onPress();
					closeModal();
				}}
			>
				<View style={styles.actionIconContainer}>
					<FontAwesome
						name={action.icon as any}
						size={24}
						color={theme.colors[action.color]}
					/>
				</View>
				<View style={styles.actionTextContainer}>
					<Text style={styles.actionLabel}>{action.label}</Text>
					{action.description && (
						<Text style={styles.actionDescription}>{action.description}</Text>
					)}
				</View>
			</Pressable>
		),
		[closeModal],
	);

	return (
		<>
			{/* Floating Action Button */}
			<GestureDetector gesture={buttonPress}>
				<Animated.View style={[styles.fab, buttonStyle]}>
					<FontAwesome name="plus" size={26} color="white" />
				</Animated.View>
			</GestureDetector>

			{/* Modal Background Overlay - Always rendered */}
			<GestureDetector gesture={backgroundTap}>
				<Animated.View style={[styles.overlay, backgroundStyle]} />
			</GestureDetector>

			{/* Bottom Sheet Modal - Always rendered */}
			<Animated.View style={[styles.bottomSheet, modalStyle]}>
				{/* Actions List */}
				<View style={styles.actionButtonContainer}>
					{actions.length > 0 && actions.map(renderActionButton)}
				</View>

				{/* Cancel Button */}
				<Pressable style={styles.cancelButton} onPress={closeModal}>
					<Text style={styles.cancelText}>Cancel</Text>
				</Pressable>
			</Animated.View>
		</>
	);
};

const styles = StyleSheet.create((th, rt) => ({
	fab: {
		position: "absolute",
		right: rt.insets.right + 20,
		bottom: rt.insets.bottom,
		width: 60,
		height: 60,
		borderRadius: 30,
		backgroundColor: th.colors.blue,
		justifyContent: "center",
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.3,
		shadowRadius: 5,
	},
	overlay: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: "rgba(0, 0, 0, 1)",
		zIndex: 1000,
	},
	bottomSheet: {
		position: "absolute",
		bottom: -100, // To compensate for overshoot of the bounce animation
		left: 0,
		right: 0,
		paddingBottom: rt.insets.bottom + 80, // This added padding here compensates for the subtracted -100 above, for the bounce overshoot
		backgroundColor: th.colors.backgroundPrimary,
		borderTopLeftRadius: th.radius.lg,
		borderTopRightRadius: th.radius.lg,
		zIndex: 1001,
		padding: th.space.lg,
		paddingVertical: th.space.lg,
		gap: th.space.lg,
	},
	header: {
		padding: th.space.sm,
	},
	title: {
		fontSize: 22,
		lineHeight: 22 * 1.5,
		fontWeight: "700",
		color: th.colors.labelPrimary,
		textAlign: "center",
	},
	actionButtonContainer: {
		flexDirection: "column",
		gap: th.space.md,
	},
	actionButton: {
		flexDirection: "row",
		backgroundColor: th.colors.backgroundSecondary,
		borderRadius: th.radius.lg,
		alignItems: "center",
		padding: th.space.md,
		gap: th.space.lg,
	},
	actionIconContainer: {
		width: 45,
		height: 45,
		borderRadius: 22,
		justifyContent: "center",
		alignItems: "center",
	},
	actionTextContainer: {
		flex: 1,
		justifyContent: "center",
	},
	actionLabel: {
		fontSize: 16,
		fontWeight: "500",
		color: th.colors.labelPrimary,
		marginBottom: 2,
	},
	actionDescription: {
		fontSize: 14,
		color: th.colors.labelSecondary,
		lineHeight: 18,
	},
	cancelButton: {
		borderColor: th.colors.borderTertiary,
		backgroundColor: th.colors.backgroundSecondary,
		borderRadius: th.radius.lg,
		justifyContent: "center",
		alignItems: "center",
		padding: th.space.md,
		gap: th.space.lg,
	},
	cancelText: {
		fontSize: 18,
		fontWeight: "600",
		color: th.colors.labelSecondary,
	},
}));
