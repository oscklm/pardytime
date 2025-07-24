import * as Haptics from 'expo-haptics';
import * as React from 'react';
import {
  type TouchableOpacityProps as RNTouchableOpacityProps,
  View,
} from 'react-native';
// @ts-expect-error: untyped helper
import RNTouchableBounce from 'react-native/Libraries/Components/Touchable/TouchableBounce';

export type TouchableScaleProps = Omit<
  RNTouchableOpacityProps,
  'activeOpacity'
> & {
  /** Enables haptic feedback on press down. */
  sensory?:
    | boolean
    | 'success'
    | 'error'
    | 'warning'
    | 'light'
    | 'medium'
    | 'heavy';
};

/**
 * Touchable which scales the children down when pressed.
 */
export default function TouchableBounce({
  style,
  children,
  onPressIn,
  sensory,
  ...props
}: TouchableScaleProps) {
  const onSensory = React.useCallback(() => {
    if (!sensory) return;
    if (sensory === true) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } else if (sensory === 'success') {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } else if (sensory === 'error') {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    } else if (sensory === 'warning') {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    } else if (sensory === 'light') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } else if (sensory === 'medium') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    } else if (sensory === 'heavy') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    }
  }, [sensory]);

  return (
    <RNTouchableBounce
      {...props}
      // biome-ignore lint/suspicious/noExplicitAny: <its ok>
      onPressIn={(ev: any) => {
        onSensory();
        onPressIn?.(ev);
      }}
    >
      {children ? children : <View />}
    </RNTouchableBounce>
  );
}
