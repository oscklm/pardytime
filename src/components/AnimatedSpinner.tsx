import bwLogo from '@/assets/images/logo-bw.png';
import logo from '@/assets/images/logo.png';
import type { ImageStyle } from 'expo-image';
import React from 'react';
import type { StyleProp } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

const duration = 1400;
const easing = Easing.linear;

type AnimatedSpinnerProps = {
  style?: StyleProp<ImageStyle>;
  size?: number;
  opacity?: number;
  colored?: boolean;
};

const AnimatedSpinner = ({
  style,
  size = 64,
  opacity = 1,
  colored = false,
}: AnimatedSpinnerProps) => {
  const progress = useSharedValue(0);

  React.useEffect(() => {
    progress.value = withRepeat(withTiming(1, { duration, easing }), -1);
  }, [progress]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${progress.value * 360}deg` }],
    opacity,
  }));

  return (
    <Animated.Image
      source={colored ? logo : bwLogo}
      style={[
        {
          width: size,
          height: size,
        },
        style,
        animatedStyle,
      ]}
    />
  );
};

export { AnimatedSpinner };
