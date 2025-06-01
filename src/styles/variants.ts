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
