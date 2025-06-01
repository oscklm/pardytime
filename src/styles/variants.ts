import { space } from "./tokens";

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
	alignItems: {
		start: {
			alignItems: "flex-start",
		},
		center: {
			alignItems: "center",
		},
		end: {
			alignItems: "flex-end",
		},
		stretch: {
			alignItems: "stretch",
		},
		baseline: {
			alignItems: "baseline",
		},
	},
	justifyContent: {
		start: {
			justifyContent: "flex-start",
		},
		center: {
			justifyContent: "center",
		},
		end: {
			justifyContent: "flex-end",
		},
		between: {
			justifyContent: "space-between",
		},
		around: {
			justifyContent: "space-around",
		},
		evenly: {
			justifyContent: "space-evenly",
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

export default variants;
