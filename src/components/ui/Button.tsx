import {
	type LinkProps,
	useLinkProps,
  } from '@react-navigation/native';
  import Color from 'color';
  import * as React from 'react';
  import { Platform } from 'react-native';
  
  import {
	PlatformPressable,
  } from '@react-navigation/elements';
  import { Text } from '@react-navigation/elements';
import { StyleSheet, UnistylesVariants } from 'react-native-unistyles';

  type Variants = UnistylesVariants<typeof styles>;
  
  type ButtonBaseProps = Omit<React.ComponentProps<typeof PlatformPressable>, 'children'> &Variants &{
	children: string | string[];
  };
  
  type ButtonLinkProps<ParamList extends ReactNavigation.RootParamList> =
	LinkProps<ParamList> & Omit<ButtonBaseProps, 'onPress'>;
  
  
  export function Button<ParamList extends ReactNavigation.RootParamList>(
	props: ButtonLinkProps<ParamList>
  ): React.JSX.Element;
  
  export function Button(props: ButtonBaseProps): React.JSX.Element;
  
  export function Button<ParamList extends ReactNavigation.RootParamList>(
	props: ButtonBaseProps | ButtonLinkProps<ParamList>
  ) {
	if ('screen' in props || 'action' in props) {
	  return <ButtonLink {...props} />;
	} else {
	  return <ButtonBase {...props} />;
	}
  }
  
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
	android_ripple,
	style,
	children,
	...rest
  }: ButtonBaseProps) {
  
	return (
	  <PlatformPressable
		{...rest}
		android_ripple={{
		  ...android_ripple,
		}}
		pressOpacity={Platform.OS === 'ios' ? undefined : 1}
		hoverEffect={{ ...styles.hoverEffect }}
		style={[styles.button, style]}
	  >
		<Text style={styles.buttonText}>
		  {children}
		</Text>
	  </PlatformPressable>
	);
  }
  

const styles = StyleSheet.create((th) => ({
	button: {
		backgroundColor: th.colors.accent,
		flexDirection: "row",
		justifyContent: "center",
		paddingHorizontal: th.space.lg,
		paddingVertical: th.space.md,
		borderRadius: th.radius.md,
		alignItems: "center",
		variants: {
			variant: {
				link: {
					backgroundColor: undefined,
					alignSelf: "center",
				},
				outline: {
					backgroundColor: "transparent",
					borderWidth: 2,
					borderColor: th.baseColors.primaryMuted,
				},
				error: {
					backgroundColor: th.colors.error,
				},
			},
			isLoading: {
				true: {
					opacity: 0.5,
				},
				false: {},
			},
		},
		compoundVariants: [
			{
				variant: "link",
				hovered: true, // and color is link
				// apply following styles
				styles: {
					backgroundColor: undefined,
					// and more styles
				},
			},
		],
	},
	hoverEffect: {
		color: th.colors.accent,
	},
	buttonText: {
		fontSize: 16,
		fontWeight: "700",
		lineHeight: 24,
		color: "white",
		variants: {
			variant: {
				link: {
					fontWeight: "500",
				},
				outline: {
				},
				error: {
				},
			},
			isLoading: {
				true: {},
				false: {},
			},
		},
	},
	underline: {
		position: "absolute",
		bottom: 0,
		left: 0,
		right: 0,
		height: 2,
		borderRadius: th.radius.sm,
		backgroundColor: th.colors.accent,
	},
}));

export default Button;
