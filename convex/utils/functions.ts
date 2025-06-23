import {
	customCtx,
	customMutation,
} from "convex-helpers/server/customFunctions";
import {
	internalMutation as rawInternalMutation,
	mutation as rawMutation,
} from "../_generated/server";

import { triggers } from "../triggers";

// Use `mutation` to define all mutations, and the triggers will get called.
export const mutation = customMutation(rawMutation, customCtx(triggers.wrapDB));

export const internalMutation = customMutation(
	rawInternalMutation,
	customCtx(triggers.wrapDB),
);
