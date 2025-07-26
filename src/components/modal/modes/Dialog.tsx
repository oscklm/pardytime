import { Icons } from '@/components/Icons';
import { ModalOptions, VariantComponentProps } from '@/components/modal/types';
import TouchableBounce from '@/components/ui/TouchableBounce';
import React, { useCallback } from 'react';
import { View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { StyleSheet } from 'react-native-unistyles';

export const dialogDefaultOptions: ModalOptions = {
  backdrop: {
    canDismiss: false,
    enabled: true,
  },
  showCancelBtn: true,
};

export const Dialog = ({
  options,
  visible,
  children,
  onDismiss,
  onMeasured,
}: VariantComponentProps) => {
  const scale = useSharedValue<number>(0);
  const opacity = useSharedValue<number>(0);

  const handleShow = useCallback(() => {
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

  const handleHide = useCallback(() => {
    opacity.value = withTiming(0, { duration: 100 }, (finished) => {
      if (finished) {
        scale.value = withTiming(0, { duration: 200 });
      }
    });
  }, [scale, opacity]);

  const containerAnimStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  React.useEffect(() => {
    if (visible) {
      handleShow();
    } else {
      handleHide();
    }
  }, [visible, handleShow, handleHide]);

  return (
    <Animated.View
      style={[styles.container, containerAnimStyle]}
      pointerEvents="box-none"
    >
      {options.showCancelBtn && (
        <View style={styles.closeBtn}>
          <TouchableBounce
            sensory={'medium'}
            onPress={onDismiss}
            hitSlop={{ top: 5, bottom: 5, right: 5, left: 5 }}
          >
            <View
              style={{
                height: 40,
                width: 40,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Icons name="close" size={24} color="#FE746A" />
            </View>
          </TouchableBounce>
        </View>
      )}

      <View
        style={styles.content}
        onLayout={(event) => {
          const { width, height } = event.nativeEvent.layout;
          onMeasured(width, height);
        }}
      >
        {children}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create((th, rt) => ({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: 600,
    padding: th.space.xl,
    margin: 'auto',
    zIndex: 1001,
  },
  closeBtn: {
    position: 'absolute',
    top: 40,
    right: 40,
    zIndex: 1002,
  },
  content: {
    backgroundColor: th.colors.backgroundSecondary,
    borderRadius: th.radius.md,
    padding: th.space.xl,
  },
}));
