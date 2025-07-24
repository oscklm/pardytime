/* eslint-disable @typescript-eslint/no-empty-object-type */
import { StyleSheet } from 'react-native-unistyles';
import { darkTheme, lightTheme } from './theme';
import { BASE_UNIT, radius, space, typography } from './tokens';
import variants from './variants';

const shared = {
  gap: (v: number) => v * BASE_UNIT,
  radius,
  typography,
  space,
  variants,
};

const appThemes = {
  light: {
    ...lightTheme,
    ...shared,
  },
  dark: {
    ...darkTheme,
    ...shared,
  },
};

const breakpoints = {
  xs: 0,
  sm: 300,
  md: 500,
  lg: 700,
  xl: 900,
};

type AppBreakpoints = typeof breakpoints;
type AppThemes = typeof appThemes;

declare module 'react-native-unistyles' {
  export interface UnistylesThemes extends AppThemes {}
  export interface UnistylesBreakpoints extends AppBreakpoints {}
}

StyleSheet.configure({
  settings: {
    adaptiveThemes: true,
  },
  breakpoints,
  themes: appThemes,
});
