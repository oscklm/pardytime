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
		xxl: {
			padding: space.xxl,
		},
	},
	paddingHorizontal: {
		none: {
			paddingHorizontal: 0,
		},
		xs: {
			paddingHorizontal: space.xs,
		},
		sm: {
			paddingHorizontal: space.sm,
		},
		md: {
			paddingHorizontal: space.md,
		},
		lg: {
			paddingHorizontal: space.lg,
		},
		xl: {
			paddingHorizontal: space.xl,
		},
	},
	paddingVertical: {
		none: {
			paddingVertical: 0,
		},
		xs: {
			paddingVertical: space.xs,
		},
		sm: {
			paddingVertical: space.sm,
		},
		md: {
			paddingVertical: space.md,
		},
		lg: {
			paddingVertical: space.lg,
		},
		xl: {
			paddingVertical: space.xl,
		},
		xxl: {
			paddingVertical: space.xxl,
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
		xxl: {
			gap: space.xxl,
		},
	},
} as const;

export default variants;
