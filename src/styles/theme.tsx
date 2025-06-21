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
		black: colors.black,
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
		rt.colorScheme === "dark"
			? {
					dark: true,
					colors: {
						primary: colors.purpleDark,
						background: colors.backgroundPrimaryDark,
						card: colors.backgroundPrimaryDark,
						text: colors.labelPrimaryDark,
						border: colors.labelQuaternaryDark,
						notification: colors.yellowDark,
					},
					fonts: DefaultTheme.fonts,
				}
			: {
					dark: false,
					colors: {
						primary: colors.purpleLight,
						background: colors.backgroundPrimaryLight,
						card: colors.backgroundPrimaryLight,
						text: colors.labelPrimaryLight,
						border: colors.labelQuaternaryLight,
						notification: colors.yellowLight,
					},
					fonts: DefaultTheme.fonts,
				},
}));

export { UniThemeProvider, lightTheme, darkTheme };
