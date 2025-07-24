import { type LinkProps, useLinkProps } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';
import type * as React from 'react';
import { useCallback } from 'react';
import {
  Pressable,
  type StyleProp,
  Text,
  View,
  type ViewStyle,
} from 'react-native';
import {
  StyleSheet,
  type UnistylesVariants,
  withUnistyles,
} from 'react-native-unistyles';
import { AnimatedSpinner } from '../AnimatedSpinner';
import { Icons, type IconName } from '../Icons'; // Import your new Icons component and IconName type

// Create a styled wrapper for the Icons component
const StyledIcon = withUnistyles(Icons, (th) => ({
  color: th.colors.labelPrimary,
}));

// Use the IconName type directly from your Icons component
type IconGlyphs = IconName;

interface ButtonBaseProps
  extends Omit<React.ComponentProps<typeof Pressable>, 'children' | 'style'> {
  /** Enables haptic feedback on press down. */
  variant?: UnistylesVariants<typeof styles>['variant'];
  size?: UnistylesVariants<typeof styles>['size'];
  inverted?: UnistylesVariants<typeof styles>['inverted'];
  icon?: IconGlyphs;
  iconSize?: number;
  isLoading?: UnistylesVariants<typeof styles>['isLoading'];
  style?: StyleProp<ViewStyle>;
  sensory?:
    | boolean
    | 'success'
    | 'error'
    | 'warning'
    | 'light'
    | 'medium'
    | 'heavy';
  children?: React.ReactNode;
}

type ButtonLinkProps<ParamList extends ReactNavigation.RootParamList> =
  LinkProps<ParamList> & Omit<ButtonBaseProps, 'onPress'>;

function Button<ParamList extends ReactNavigation.RootParamList>(
  props: ButtonLinkProps<ParamList>
): React.JSX.Element;

function Button(props: ButtonBaseProps): React.JSX.Element;

function Button<ParamList extends ReactNavigation.RootParamList>(
  props: ButtonBaseProps | ButtonLinkProps<ParamList>
) {
  if ('screen' in props || 'action' in props) {
    return <ButtonLink {...props} />;
  } else {
    return <ButtonBase {...props} />;
  }
}

const iconSizeMap = {
  sm: 14,
  md: 16,
  lg: 18,
} as const;

function ButtonLink<ParamList extends ReactNavigation.RootParamList>({
  screen,
  params,
  action,
  href,
  ...rest
}: ButtonLinkProps<ParamList>) {
  // @ts-expect-error: This is already type-checked by the prop types
  const props = useLinkProps({ screen, params, action, href });

  return <ButtonBase {...rest} {...props} />;
}

function ButtonBase({
  // Unistyles variants
  icon,
  variant,
  size = 'md',
  isLoading,
  inverted,
  iconSize = 24,
  // Other props
  disabled,
  android_ripple,
  sensory,
  onPressIn,
  style,
  children,
  ...rest
}: ButtonBaseProps) {
  const onSensory = useCallback(() => {
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

  // Resolve whether the button displays an icon only
  const resolvedVariant = children ? variant : 'icon';

  styles.useVariants({
    variant: resolvedVariant,
    isLoading,
    inverted,
    size,
    disabled: disabled ?? false,
  });

  return (
    <Pressable
      style={[styles.button, style]}
      disabled={disabled}
      onPressIn={(ev) => {
        onSensory();
        onPressIn?.(ev);
      }}
      {...rest}
    >
      {variant === 'link' ? (
        <>
          <View>
            <Text style={styles.label}>{children}</Text>
            <View style={styles.hairline} />
          </View>
        </>
      ) : isLoading ? (
        <AnimatedSpinner
          colored
          opacity={0.35}
          style={{ marginLeft: 8, width: 16, height: 16 }}
        />
      ) : (
        <>
          {icon && (
            <StyledIcon
              name={icon}
              size={children ? iconSizeMap[size] : iconSize}
            />
          )}
          {children && <Text style={styles.label}>{children}</Text>}
          {variant === 'menu' && <StyledIcon name="forward" size={16} />}
        </>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create((th) => ({
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: th.radius.md,
    gap: th.space.md,
    backgroundColor: th.colors.buttonPrimary,
    variants: {
      size: {
        sm: {
          height: 36,
          paddingVertical: 8,
          paddingHorizontal: 12,
        },
        md: {
          height: 44,
          paddingVertical: 10,
          paddingHorizontal: 16,
        },
        lg: {
          height: 56,
          paddingVertical: 14,
          paddingHorizontal: 20,
        },
      },
      variant: {
        icon: {
          borderWidth: 0,
          backgroundColor: 'transparent',
        },
        link: {
          backgroundColor: 'transparent',
          alignSelf: 'center',
          borderWidth: 0,
        },
        outline: {
          borderWidth: 2,
          borderColor: th.colors.backgroundSecondary,
          backgroundColor: 'transparent',
        },
        menu: {
          flexDirection: 'row',
          borderWidth: 0,
          paddingHorizontal: th.space.xs,
          justifyContent: 'space-between',
          backgroundColor: 'transparent',
          alignItems: 'center',
          gap: th.space.sm,
        },
        blue: {
          backgroundColor: th.colors.blue,
        },
        white: {
          backgroundColor: th.colors.white,
          borderColor: undefined,
          borderWidth: 0,
        },
        danger: {
          backgroundColor: th.colors.red,
        },
        success: {
          backgroundColor: th.colors.green,
        },
        warning: {
          backgroundColor: th.colors.yellow,
        },
      },
      isLoading: {
        true: {
          opacity: 0.5,
        },
        false: {},
      },
      disabled: {
        true: {
          opacity: 0.5,
        },
        false: {},
      },
      inverted: {
        true: {
          backgroundColor: th.colors.white,
        },
        false: {},
      },
    },
    compoundVariants: [
      {
        variant: 'link',
        hovered: true,
        styles: {
          backgroundColor: undefined,
        },
      },
    ],
  },

  hoverEffect: {
    color: th.colors.backgroundSecondary,
  },
  hairline: {
    marginTop: th.space.sm,
    width: '100%',
    borderWidth: 1,
    borderRadius: th.radius.sm,
    borderColor: th.colors.labelPrimary,
  },
  label: {
    color: th.colors.labelPrimary,
    fontWeight: '600',
    variants: {
      size: {
        sm: {
          fontSize: 14,
          lineHeight: 14 * 1.4,
        },
        md: {
          fontSize: 16,
          lineHeight: 16 * 1.4,
        },
        lg: {
          fontSize: 18,
          lineHeight: 18 * 1.4,
        },
      },
      variant: {
        link: {
          fontWeight: '500',
          color: th.colors.labelPrimary,
        },
        blue: {
          color: 'white',
        },
        purple: {
          color: 'white',
        },
        outline: {
          color: th.colors.labelPrimary,
        },
        danger: {
          color: 'white',
        },
        success: {
          color: 'white',
        },
        warning: {
          color: 'white',
        },
        white: {
          color: th.colors.black,
        },
        menu: {
          color: th.colors.labelPrimary,
        },
      },
      isLoading: {
        true: {},
        false: {},
      },
      inverted: {
        true: {
          color: th.colors.white,
        },
        false: {},
      },
    },
  },
  underline: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 2,
    borderRadius: th.radius.sm,
    backgroundColor: th.colors.backgroundPrimary,
  },
}));

export { Button };
