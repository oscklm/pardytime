import {
  BottomSheet,
  bottomSheetDefaultOptions,
} from '@/components/modal/modes/BottomSheet';
import { Dialog, dialogDefaultOptions } from '@/components/modal/modes/Dialog';
import { ModalOptions, VariantComponentProps } from '@/components/modal/types';
import React, { ComponentType, PropsWithChildren, useCallback } from 'react';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import {
  KeyboardController,
  useReanimatedKeyboardAnimation,
} from 'react-native-keyboard-controller';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import { StyleSheet } from 'react-native-unistyles';
import { runOnJS } from 'react-native-worklets';

type Variant = 'bottomsheet' | 'dialog';

interface ModalProps {
  variant: 'bottomsheet' | 'dialog';
  visible: boolean;
  onDismiss?: () => void;
  opts?: ModalOptions;
}

const variantConfigMap: Record<
  Variant,
  {
    component: ComponentType<VariantComponentProps>;
    defaultOptions: ModalOptions;
  }
> = {
  bottomsheet: {
    component: BottomSheet,
    defaultOptions: bottomSheetDefaultOptions,
  },
  dialog: {
    component: Dialog,
    defaultOptions: dialogDefaultOptions,
  },
};

export const Modal = ({
  variant,
  visible,
  onDismiss,
  opts,
  children,
}: PropsWithChildren<ModalProps>) => {
  const variantConfig = variantConfigMap[variant];
  const { height: keyboardHeight, progress } = useReanimatedKeyboardAnimation();

  const contentHeight = useSharedValue<{ height: number; width: number }>({
    height: 0,
    width: 0,
  });

  const options = opts || variantConfig.defaultOptions;

  const { backdrop } = options;

  const backdropOpacity = useSharedValue<number>(0);
  const isVisible = useSharedValue<number>(0);

  const handleShow = useCallback(() => {
    isVisible.value = 1;
    backdropOpacity.value = withTiming(1, {
      duration: 250,
      easing: Easing.in(Easing.ease),
    });
  }, [backdropOpacity, isVisible]);

  const handleHide = useCallback(() => {
    backdropOpacity.value = withTiming(
      0,
      {
        duration: 200,
        easing: Easing.out(Easing.ease),
      },
      (finished) => {
        if (finished) {
          isVisible.value = withDelay(100, withTiming(0, { duration: 0 }));
          // Extra safety to ensure keyboard is not visible
          if (runOnJS(KeyboardController.isVisible)) {
            runOnJS(KeyboardController.dismiss)();
          }
        }
      }
    );
  }, [backdropOpacity, isVisible]);

  const backdropTap = Gesture.Tap()
    .onStart(() => {
      if (onDismiss) {
        runOnJS(onDismiss)();
      }
    })
    .enabled(backdrop.canDismiss);

  const containerAnimStyle = useAnimatedStyle(
    () => ({
      transform: [
        {
          translateY:
            variant === 'bottomsheet'
              ? keyboardHeight.value
              : keyboardHeight.value +
                (progress.value === 1 ? contentHeight.value.height : 0),
        },
        { translateX: isVisible.value === 0 ? 2500 : 0 },
      ],
    }),
    [variant, progress]
  );

  const backdropAnimStyle = useAnimatedStyle(
    () => ({
      opacity: backdropOpacity.value,
    }),
    []
  );

  // React to visible prop
  React.useEffect(() => {
    if (visible) {
      handleShow();
    } else {
      handleHide();
    }
  }, [handleShow, handleHide, visible]);

  const VariantComponent = variantConfig.component;

  return (
    <Animated.View
      style={[styles.container, containerAnimStyle]}
      pointerEvents={'box-none'}
    >
      {backdrop.enabled && (
        <GestureDetector gesture={backdropTap}>
          <Animated.View style={[styles.backdrop, backdropAnimStyle]} />
        </GestureDetector>
      )}
      <VariantComponent
        onMeasured={(width, height) => {
          contentHeight.value = { width, height };
        }}
        options={options}
        visible={visible}
        onDismiss={onDismiss}
      >
        {children}
      </VariantComponent>
    </Animated.View>
  );
};

const styles = StyleSheet.create((th, rt) => ({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
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
