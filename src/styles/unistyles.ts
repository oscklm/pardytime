/* eslint-disable @typescript-eslint/no-empty-object-type */
import { StyleSheet } from "react-native-unistyles";

const BASE_UNIT = 8;

const radius = {
	none: 0,
	xs: BASE_UNIT * 0.25,
	sm: BASE_UNIT * 0.5,
	md: BASE_UNIT,
	lg: BASE_UNIT * 2,
} as const;

const space = {
	none: 0,
	xs: BASE_UNIT * 0.25,
	sm: BASE_UNIT * 0.5,
	md: BASE_UNIT,
	lg: BASE_UNIT * 2,
	xl: BASE_UNIT * 3,
};

const colors = {
	primary: "#EEEEFC",
	secondary: "#FFF",
	accent: "#6A5BE2",
	darkGrey: "#1F1F2E",
	black: "#07070D",
	white: "#FFFFFF",
} as const;

const variants = {
	padding: {
		none: {
			padding: 0,
		},
		xs: {
			padding: space.xs,
		},
		sm: {
			padding: space.sm,
		},
		md: {
			padding: space.md,
		},
		lg: {
			padding: space.lg,
		},
		xl: {
			padding: space.xl,
		},
	},
	gap: {
		none: {
			gap: 0,
		},
		xs: {
			gap: space.xs,
		},
		sm: {
			gap: space.sm,
		},
		md: {
			gap: space.md,
		},
		lg: {
			gap: space.lg,
		},
		xl: {
			gap: space.xl,
		},
	},
} as const;

const shared = {
	gap: (v: number) => v * BASE_UNIT,
	radius,
	space,
};

const lightColors = {
	background: colors.primary,
	foreground: colors.black,
	card: colors.secondary,
	accent: colors.accent,
	white: colors.white,
};

const darkColors = {
	background: colors.black,
	foreground: colors.white,
	card: colors.darkGrey,
	accent: colors.accent,
	white: colors.white,
};

const lightTheme = {
	colors: lightColors,
	...shared,
	variants: {
		...variants,
		bg: {
			background: {
				backgroundColor: lightColors.background,
			},
			card: {
				backgroundColor: lightColors.card,
			},
			foreground: {
				backgroundColor: lightColors.foreground,
			},
			accent: {
				backgroundColor: lightColors.accent,
			},
			dark: {
				backgroundColor: colors.darkGrey,
			},
			blue: {
				backgroundColor: "blue",
			},
			red: {
				backgroundColor: "red",
			},
			green: {
				backgroundColor: "green",
			},
			pink: {
				backgroundColor: "pink",
			},
			default: {
				backgroundColor: "#FFF",
			},
		},
	},
};

const darkTheme = {
	colors: darkColors,
	...shared,
	variants: {
		...variants,
		bg: {
			background: {
				backgroundColor: darkColors.background,
			},
			card: {
				backgroundColor: darkColors.card,
			},
			foreground: {
				backgroundColor: darkColors.foreground,
			},
			accent: {
				backgroundColor: darkColors.accent,
			},
			dark: {
				backgroundColor: colors.darkGrey,
			},
			blue: {
				backgroundColor: "blue",
			},
			red: {
				backgroundColor: "red",
			},
			green: {
				backgroundColor: "green",
			},
			pink: {
				backgroundColor: "pink",
			},
			default: {
				backgroundColor: "#FFF",
			},
		},
	},
};

const appThemes = {
	light: lightTheme,
	dark: darkTheme,
};

const breakpoints = {
	xs: 0,
	sm: 300,
	md: 500,
	lg: 800,
	xl: 1200,
};

type AppBreakpoints = typeof breakpoints;
type AppThemes = typeof appThemes;

declare module "react-native-unistyles" {
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
