import {
	DefaultTheme,
	ThemeProvider as NavigationThemeProvider,
} from "@react-navigation/native";
import { withUnistyles } from "react-native-unistyles";
import colors from "./colors";

export interface UnistylesTheme {
	colors: {
		backgroundPrimary: string;
		backgroundSecondary: string;
		backgroundTertiary: string;
		labelPrimary: string;
		labelSecondary: string;
		labelTertiary: string;
		labelQuaternary: string;
		red: string;
		orange: string;
		yellow: string;
		green: string;
		blue: string;
		indigo: string;
		purple: string;
		pink: string;
		brown: string;
	};
}

const lightTheme: UnistylesTheme = {
	colors: {
		backgroundPrimary: colors.backgroundPrimaryLight,
		backgroundSecondary: colors.backgroundSecondaryLight,
		backgroundTertiary: colors.backgroundTertiaryLight,
		labelPrimary: colors.labelPrimaryLight,
		labelSecondary: colors.labelSecondaryLight,
		labelTertiary: colors.labelTertiaryLight,
		labelQuaternary: colors.labelQuaternaryLight,
		red: colors.redLight,
		orange: colors.orangeLight,
		yellow: colors.yellowLight,
		green: colors.greenLight,
		blue: colors.blueLight,
		indigo: colors.indigoLight,
		purple: colors.purpleLight,
		pink: colors.pinkLight,
		brown: colors.brownLight,
	},
};

const darkTheme: UnistylesTheme = {
	colors: {
		backgroundPrimary: colors.backgroundPrimaryDark,
		backgroundSecondary: colors.backgroundSecondaryDark,
		backgroundTertiary: colors.backgroundTertiaryDark,
		labelPrimary: colors.labelPrimaryDark,
		labelSecondary: colors.labelSecondaryDark,
		labelTertiary: colors.labelTertiaryDark,
		labelQuaternary: colors.labelQuaternaryDark,
		red: colors.redDark,
		orange: colors.orangeDark,
		yellow: colors.yellowDark,
		green: colors.greenDark,
		blue: colors.blueDark,
		indigo: colors.indigoDark,
		purple: colors.purpleDark,
		pink: colors.pinkDark,
		brown: colors.brownDark,
	},
};

const UniThemeProvider = withUnistyles(NavigationThemeProvider, (_th, rt) => ({
	value:
		rt.colorScheme === "dark"
			? {
					dark: true,
					colors: {
						primary: colors.purpleDark,
						background: colors.backgroundPrimaryDark,
						card: colors.backgroundSecondaryDark,
						text: colors.labelPrimaryDark,
						border: colors.labelSecondaryDark,
						notification: colors.yellowDark,
					},
					fonts: DefaultTheme.fonts,
				}
			: {
					dark: false,
					colors: {
						primary: colors.purpleLight,
						background: colors.backgroundPrimaryLight,
						card: colors.backgroundSecondaryLight,
						text: colors.labelPrimaryLight,
						border: colors.labelSecondaryLight,
						notification: colors.yellowLight,
					},
					fonts: DefaultTheme.fonts,
				},
}));

export { UniThemeProvider, lightTheme, darkTheme };
