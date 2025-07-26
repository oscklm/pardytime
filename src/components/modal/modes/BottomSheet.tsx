import { ModalOptions, VariantComponentProps } from '@/components/modal/types';
import React, { useCallback } from 'react';
import { View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { StyleSheet } from 'react-native-unistyles';
import { runOnJS } from 'react-native-worklets';

export const bottomSheetDefaultOptions: ModalOptions = {
  backdrop: {
    canDismiss: false,
    enabled: false,
  },
  showCancelBtn: false,
};

const HIDDEN_TRANSLATE_Y = 400;

export const BottomSheet = ({
  visible,
  onDismiss,
  children,
  onMeasured,
}: VariantComponentProps) => {
  const translateY = useSharedValue<number>(400);
  const gestureTranslateY = useSharedValue<number>(0);
  const gestureVelocityY = useSharedValue<number>(0);

  const threshold = 120;
  const velocityThreshold = 1200; // Velocity threshold for quick swipes

  const handleShow = useCallback(() => {
    translateY.value = withSpring(0, {
      damping: 20,
      stiffness: 300,
      mass: 0.8,
    });
    gestureTranslateY.value = 0;
  }, [translateY, gestureTranslateY]);

  const handleHide = useCallback(() => {
    translateY.value = withTiming(HIDDEN_TRANSLATE_Y, { duration: 200 });
    gestureTranslateY.value = 0;
  }, [translateY, gestureTranslateY]);

  const containerAnimStyle = useAnimatedStyle(() => {
    // Combine base position with gesture offset
    const totalTranslateY = translateY.value + gestureTranslateY.value;

    // Add resistance when dragging upward
    const resistedTranslateY = interpolate(
      totalTranslateY,
      [-50, 0, HIDDEN_TRANSLATE_Y],
      [-50, 0, HIDDEN_TRANSLATE_Y], // Reduced upward movement with resistance
      Extrapolation.CLAMP
    );

    return {
      transform: [{ translateY: resistedTranslateY }],
    };
  }, []);

  // Improved pan gesture with better physics
  const panGesture = Gesture.Pan()
    .onStart(() => {
      // Reset gesture values at start
      gestureTranslateY.value = 0;
      gestureVelocityY.value = 0;
    })
    .onUpdate((event) => {
      // Only allow downward dragging and minimal upward with resistance
      gestureTranslateY.value = Math.max(event.translationY * 0.8, -20);
      gestureVelocityY.value = event.velocityY;
    })
    .onEnd(() => {
      const shouldDismiss =
        gestureTranslateY.value > threshold ||
        gestureVelocityY.value > velocityThreshold;

      if (shouldDismiss) {
        // Calculate current visual position
        const currentPosition = translateY.value + gestureTranslateY.value;

        // Start animation from current visual position to avoid jump
        translateY.value = currentPosition;
        gestureTranslateY.value = 0;

        // Animate to dismiss position
        const duration = Math.max(
          150,
          Math.min(300, HIDDEN_TRANSLATE_Y - currentPosition)
        );
        translateY.value = withTiming(HIDDEN_TRANSLATE_Y, { duration });

        if (onDismiss) {
          runOnJS(onDismiss)();
        }
      } else {
        // Spring back to original position
        gestureTranslateY.value = withSpring(0, {
          damping: 20,
          stiffness: 400,
          mass: 0.5,
        });
      }
    })
    .minDistance(5) // Minimum distance before gesture activates
    .failOffsetX([-10, 10]) // Fail if horizontal movement is too much
    .activeOffsetY(10); // Only activate after 10px vertical movement

  React.useEffect(() => {
    if (visible) {
      handleShow();
    } else {
      handleHide();
    }
  }, [visible, handleShow, handleHide]);

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View
        style={[styles.container, containerAnimStyle]}
        pointerEvents="box-none"
      >
        <View
          style={styles.content}
          onLayout={(event) => {
            const { width, height } = event.nativeEvent.layout;
            onMeasured(width, height);
          }}
        >
          <View style={styles.backgroundExtension} />

          <View style={styles.dragHandle} />

          {children}
        </View>
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create((th, rt) => ({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: th.space.md,
    zIndex: 1001,
    _web: {
      maxWidth: {
        sm: '100%',
        md: 500,
      },
      marginInline: 'auto',
    },
  },
  content: {
    backgroundColor: th.colors.backgroundTertiary,
    borderTopLeftRadius: th.radius.md,
    borderTopRightRadius: th.radius.md,
    padding: th.space.xxl,
    paddingBottom: th.space.xl + 25,
  },
  // This is used to offset and extend the background content a bit beneath the layout
  backgroundExtension: {
    position: 'absolute',
    bottom: -100,
    left: 0,
    right: 0,
    height: 100,
    backgroundColor: th.colors.backgroundTertiary,
  },
  dragHandle: {
    width: 40,
    height: 4,
    backgroundColor: th.colors.borderSecondary,
    borderRadius: th.radius.sm,
    alignSelf: 'center',
    marginBottom: th.space.lg,
    marginTop: -th.space.lg,
  },
}));
