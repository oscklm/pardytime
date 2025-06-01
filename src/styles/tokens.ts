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
} as const;

export { BASE_UNIT, radius, space };
