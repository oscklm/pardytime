import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import React from 'react';
import { OpaqueColorValue } from 'react-native';
import { Line, Path, Rect, Svg } from 'react-native-svg';

// Base icon props that all icons will accept
type IconProps = {
  /**
   * Size of the icon, can also be passed as fontSize in the style object.
   *
   * @default 12
   */
  size?: number;
  /**
   * Color of the icon. Can be a string or OpaqueColorValue (returned from
   * PlatformColor(..))
   *
   */
  color?: string | OpaqueColorValue;
};

// Map of FontAwesome6 icons you want to use
const FontAwesome6Icons = {
  // Navigation & UI
  home: 'house',
  search: 'magnifying-glass',
  menu: 'bars',
  close: 'xmark',
  back: 'arrow-left',
  forward: 'arrow-right',
  up: 'arrow-up',
  down: 'arrow-down',

  // Actions
  plus: 'plus',
  minus: 'minus',
  edit: 'pen-to-square',
  delete: 'trash',
  save: 'floppy-disk',
  share: 'share',
  copy: 'copy',
  download: 'download',
  upload: 'upload',

  // Communication
  mail: 'envelope',
  phone: 'phone',
  message: 'message',
  notification: 'bell',

  // Media
  camera: 'camera',
  image: 'image',
  video: 'video',
  music: 'music',
  play: 'play',
  pause: 'pause',
  stop: 'stop',

  // User & Social
  user: 'user',
  users: 'users',
  heart: 'heart',
  star: 'star',
  bookmark: 'bookmark',
  like: 'thumbs-up',
  dislike: 'thumbs-down',

  // System
  settings: 'gear',
  info: 'circle-info',
  warning: 'triangle-exclamation',
  error: 'circle-exclamation',
  success: 'circle-check',
  loading: 'spinner',
  refresh: 'arrows-rotate',

  // Files & Documents
  file: 'file',
  folder: 'folder',
  document: 'file-text',
  pdf: 'file-pdf',

  // Shopping & Commerce
  cart: 'cart-shopping',
  payment: 'credit-card',
  wallet: 'wallet',

  // Location & Travel
  location: 'location-dot',
  map: 'map',
  compass: 'compass',
} as const;

const CustomIcons = {
  logo: (props: IconProps) => (
    <Svg
      width={props.size || 12}
      height={props.size || 12}
      viewBox="0 0 256 256"
      {...props}
    >
      <Rect width="256" height="256" fill="none" />
      <Line
        x1="208"
        y1="128"
        x2="128"
        y2="208"
        fill="none"
        stroke={props.color || 'currentColor'}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="32"
      />
      <Line
        x1="192"
        y1="40"
        x2="40"
        y2="192"
        fill="none"
        stroke={props.color || 'currentColor'}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="32"
      />
    </Svg>
  ),

  // Add more custom icons here
  customHeart: (props: IconProps) => (
    <Svg
      width={props.size || 24}
      height={props.size || 24}
      viewBox="0 0 24 24"
      {...props}
    >
      <Path
        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
        fill={props.color || 'currentColor'}
      />
    </Svg>
  ),
};

// Combined icon names type
type FontAwesome6IconName = keyof typeof FontAwesome6Icons;
type CustomIconName = keyof typeof CustomIcons;
export type IconName = FontAwesome6IconName | CustomIconName;

// Props for the main Icons component
interface IconComponentProps extends IconProps {
  name: IconName;
}

// Main Icons component
export const Icons = ({
  name,
  size = 12,
  color,
  ...rest
}: IconComponentProps) => {
  // Check if it's a custom icon first
  if (name in CustomIcons) {
    const CustomIcon = CustomIcons[name as CustomIconName];
    return <CustomIcon size={size} color={color} {...rest} />;
  }

  // Otherwise, use FontAwesome6
  if (name in FontAwesome6Icons) {
    const iconName = FontAwesome6Icons[name as FontAwesome6IconName];
    return <FontAwesome6 name={iconName} size={size} color={color} {...rest} />;
  }

  // Fallback - this shouldn't happen with TypeScript
  console.warn(`Icon "${name}" not found`);
  return <FontAwesome6 name="question" size={size} color={color} {...rest} />;
};

// Individual icon components (optional - for when you need specific icons)
export const IconComponents = {
  // FontAwesome6 icons
  Home: (props: IconProps) => <Icons name="home" {...props} />,
  Search: (props: IconProps) => <Icons name="search" {...props} />,
  Menu: (props: IconProps) => <Icons name="menu" {...props} />,
  Settings: (props: IconProps) => <Icons name="settings" {...props} />,
  User: (props: IconProps) => <Icons name="user" {...props} />,
  Heart: (props: IconProps) => <Icons name="heart" {...props} />,

  // Custom icons
  Logo: (props: IconProps) => <Icons name="logo" {...props} />,
  CustomHeart: (props: IconProps) => <Icons name="customHeart" {...props} />,
};

// Utility function to get available icon names (useful for development)
export const getAvailableIcons = () => {
  return {
    fontAwesome6: Object.keys(FontAwesome6Icons) as FontAwesome6IconName[],
    custom: Object.keys(CustomIcons) as CustomIconName[],
    all: [
      ...Object.keys(FontAwesome6Icons),
      ...Object.keys(CustomIcons),
    ] as IconName[],
  };
};
