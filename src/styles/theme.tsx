import {
  DefaultTheme,
  ThemeProvider as NavigationThemeProvider,
} from '@react-navigation/native';
import { withUnistyles } from 'react-native-unistyles';
import colors from './colors';

export interface UnistylesTheme {
  colors: {
    backgroundPrimary: string;
    backgroundSecondary: string;
    backgroundTertiary: string;
    buttonPrimary: string;
    labelPrimary: string;
    labelSecondary: string;
    labelTertiary: string;
    labelQuaternary: string;
    borderPrimary: string;
    borderSecondary: string;
    borderTertiary: string;
    red: string;
    orange: string;
    yellow: string;
    green: string;
    purple: string;
    pink: string;
    blue: string;
    black: string;
    white: string;
    gray: string;
    gray2: string;
    gray3: string;
    gray4: string;
    gray5: string;
  };
}

const lightTheme: UnistylesTheme = {
  colors: {
    buttonPrimary: colors.buttonPrimaryLight,
    backgroundPrimary: colors.backgroundPrimaryLight,
    backgroundSecondary: colors.backgroundSecondaryLight,
    backgroundTertiary: colors.backgroundTertiaryLight,
    labelPrimary: colors.labelPrimaryLight,
    labelSecondary: colors.labelSecondaryLight,
    labelTertiary: colors.labelTertiaryLight,
    labelQuaternary: colors.labelQuaternaryLight,
    borderPrimary: colors.borderPrimaryLight,
    borderSecondary: colors.borderSecondaryLight,
    borderTertiary: colors.borderTertiaryLight,
    red: colors.redLight,
    orange: colors.orangeLight,
    yellow: colors.yellowLight,
    green: colors.greenLight,
    pink: colors.pinkLight,
    blue: colors.blueLight,
    purple: colors.purpleLight,
    black: colors.black,
    white: colors.white,
    gray: colors.grayLight,
    gray2: colors.gray2Light,
    gray3: colors.gray3Light,
    gray4: colors.gray4Light,
    gray5: colors.gray5Light,
  },
};

const darkTheme: UnistylesTheme = {
  colors: {
    backgroundPrimary: colors.backgroundPrimaryDark,
    backgroundSecondary: colors.backgroundSecondaryDark,
    backgroundTertiary: colors.backgroundTertiaryDark,
    buttonPrimary: colors.buttonPrimaryDark,
    labelPrimary: colors.labelPrimaryDark,
    labelSecondary: colors.labelSecondaryDark,
    labelTertiary: colors.labelTertiaryDark,
    labelQuaternary: colors.labelQuaternaryDark,
    borderPrimary: colors.borderPrimaryDark,
    borderSecondary: colors.borderSecondaryDark,
    borderTertiary: colors.borderTertiaryDark,
    red: colors.redDark,
    orange: colors.orangeDark,
    yellow: colors.yellowDark,
    green: colors.greenDark,
    pink: colors.pinkDark,
    black: colors.black,
    purple: colors.purpleDark,
    blue: colors.blueDark,
    white: colors.white,
    gray: colors.grayDark,
    gray2: colors.gray2Dark,
    gray3: colors.gray3Dark,
    gray4: colors.gray4Dark,
    gray5: colors.gray5Dark,
  },
};

const UniThemeProvider = withUnistyles(NavigationThemeProvider, (_th, rt) => ({
  value:
    rt.colorScheme === 'dark'
      ? {
          dark: true,
          colors: {
            primary: colors.white,
            background: colors.backgroundPrimaryDark,
            card: colors.backgroundSecondaryDark,
            text: colors.labelPrimaryDark,
            border: 'transparent',
            notification: colors.yellowDark,
          },
          fonts: DefaultTheme.fonts,
        }
      : {
          dark: false,
          colors: {
            primary: colors.black,
            background: colors.backgroundPrimaryLight,
            card: colors.backgroundSecondaryLight,
            text: colors.labelPrimaryLight,
            border: 'transparent',
            notification: colors.yellowLight,
          },
          fonts: DefaultTheme.fonts,
        },
}));

export { UniThemeProvider, lightTheme, darkTheme };
