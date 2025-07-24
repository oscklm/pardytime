import React, { useEffect } from 'react';

import type { StyleProp, ViewStyle } from 'react-native';

import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { StyleSheet } from 'react-native-unistyles';

const duration = 1000;

type SkeletonProps = {
  style?: StyleProp<ViewStyle>;
};

const Skeleton = ({ style }: SkeletonProps) => {
  const opacity = useSharedValue(1);

  useEffect(() => {
    opacity.value = withRepeat(
      withTiming(0.4, { duration, easing: Easing.linear }),
      -1,
      true
    );
  }, [opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return <Animated.View style={[animatedStyle, styles.container, style]} />;
};

const styles = StyleSheet.create((th) => ({
  container: {
    backgroundColor: th.colors.labelTertiary,
    borderWidth: 1,
    borderColor: th.colors.labelTertiary,
    borderRadius: th.radius.md,
  },
}));

export default Skeleton;
