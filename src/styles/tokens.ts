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
	xxl: BASE_UNIT * 4,
} as const;

const typography = {
	h1: {
		fontWeight: "800",
		fontSize: 32,
		lineHeight: 32 * 1.5,
	},
	h2: {
		fontWeight: "700",
		fontSize: 24,
		lineHeight: 24 * 1.5,
	},
	h3: {
		fontWeight: "700",
		fontSize: 20,
		lineHeight: 20 * 1.5,
	},
	h4: {
		fontWeight: "700",
		fontSize: 18,
		lineHeight: 18 * 1.5,
	},
	title: {
		fontWeight: "600",
		fontSize: 18,
		lineHeight: 18 * 1.4,
	},
	subtitle: {
		fontWeight: "500",
		fontSize: 16,
		lineHeight: 16 * 1.4,
	},
	label: {
		fontWeight: "600",
		fontSize: 15,
		lineHeight: 15 * 1.3,
	},
	description: {
		fontWeight: "400",
		fontSize: 15,
		lineHeight: 15 * 1.3,
	},
	body: {
		fontWeight: "400",
		fontSize: 14,
		lineHeight: 14 * 1.3,
	},
	caption: {
		fontWeight: "400",
		fontSize: 13,
		lineHeight: 13 * 1.3,
	},
} as const;

export { BASE_UNIT, radius, space, typography };
