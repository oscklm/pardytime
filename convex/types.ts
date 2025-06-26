import type { FunctionReturnType } from "convex/server";
import type { api } from "./_generated/api";

export type BoardEnrichedResult = NonNullable<
	FunctionReturnType<typeof api.boards.queries.getByIdEnriched>
>;
