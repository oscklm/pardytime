import React, { PropsWithChildren, useCallback } from 'react';
import { View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { StyleSheet } from 'react-native-unistyles';

interface ModalProps {
  position: 'bottom' | 'center';
  visible: boolean;
  onDismiss?: () => void;
  disableBackdrop?: boolean;
}

interface ModalContentProps extends PropsWithChildren {
  visible: boolean;
}

export const Modal = ({
  position,
  visible,
  onDismiss,
  disableBackdrop,
  children,
}: PropsWithChildren<ModalProps>) => {
  const backdropOpacity = useSharedValue<number>(0);
  const isVisible = useSharedValue<number>(0);

  // Open modal animation
  const onVisible = useCallback(() => {
    isVisible.value = 1;
    backdropOpacity.value = withTiming(1, {
      duration: 250,
      easing: Easing.in(Easing.ease),
    });
  }, [backdropOpacity, isVisible]);

  // Close modal animation
  const onHidden = useCallback(() => {
    backdropOpacity.value = withTiming(
      0,
      {
        duration: 200,
        easing: Easing.out(Easing.ease),
      },
      (finished) => {
        if (finished) {
          isVisible.value = withDelay(100, withTiming(0, { duration: 0 }));
        }
      }
    );
  }, [backdropOpacity, isVisible]);

  const containerAnimStyle = useAnimatedStyle(
    () => ({
      transform: [{ translateX: isVisible.value === 0 ? 2500 : 0 }],
      opacity: backdropOpacity.value,
    }),
    []
  );

  // React to visible prop
  React.useEffect(() => {
    if (visible) {
      onVisible();
    } else {
      onHidden();
    }
  }, [onVisible, onHidden, visible]);

  const ContentView = position === 'bottom' ? ContentBottom : ContentCentered;

  return (
    <>
      {/* Modal Content */}
      <Animated.View style={[styles.container, containerAnimStyle]}>
        <ContentView visible={visible}>{children}</ContentView>
      </Animated.View>
    </>
  );
};

const ContentCentered = ({ visible, children }: ModalContentProps) => {
  const scale = useSharedValue<number>(0);
  const opacity = useSharedValue<number>(0);

  const onVisible = useCallback(() => {
    opacity.value = withTiming(1, { duration: 0 }, (finished) => {
      if (finished) {
        scale.value = withSpring(1, {
          damping: 35,
          mass: 0.5,
          stiffness: 300,
        });
      }
    });
  }, [scale, opacity]);

  const onHidden = useCallback(() => {
    opacity.value = withTiming(0, { duration: 100 }, (finished) => {
      if (finished) {
        scale.value = withTiming(0, { duration: 200 });
      }
    });
  }, [scale, opacity]);

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  React.useEffect(() => {
    if (visible) {
      onVisible();
    } else {
      onHidden();
    }
  }, [visible, onVisible, onHidden]);
  return (
    <Animated.View style={[styles.contentCenter, animStyle]}>
      <View style={styles.contentBoxCenter}>{children}</View>
    </Animated.View>
  );
};

const ContentBottom = ({ visible, children }: ModalContentProps) => {
  const translateY = useSharedValue<number>(0);
  const opacity = useSharedValue<number>(0);

  const onVisible = useCallback(() => {
    opacity.value = withTiming(1, { duration: 100 });
    translateY.value = withTiming(0, { duration: 300 });
  }, [translateY, opacity]);

  const onHidden = useCallback(() => {
    translateY.value = withTiming(1500, { duration: 150 });
    opacity.value = withTiming(0, { duration: 200 });
  }, [translateY, opacity]);

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));

  React.useEffect(() => {
    if (visible) {
      onVisible();
    } else {
      onHidden();
    }
  }, [visible, onVisible, onHidden]);
  return (
    <View style={[styles.contentBottom, animStyle]}>
      <View style={styles.contentBoxBottom}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create((th, rt) => ({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  contentBottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: th.space.md,
    zIndex: 1001,
  },
  contentCenter: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: 600,
    padding: th.space.xl,
    margin: 'auto',
    zIndex: 1001,
  },
  contentBoxBottom: {
    backgroundColor: th.colors.backgroundSecondary,
    borderTopLeftRadius: th.radius.md,
    borderTopRightRadius: th.radius.md,
    padding: th.space.xl,
  },
  contentBoxCenter: {
    backgroundColor: th.colors.backgroundSecondary,
    borderRadius: th.radius.md,
    padding: th.space.xl,
  },
}));
