import {
  customCtx,
  customMutation,
  NoOp,
} from "convex-helpers/server/customFunctions";
import { zCustomMutation, zCustomQuery } from "convex-helpers/server/zod";

import {
  query,
  internalMutation as rawInternalMutation,
  mutation as rawMutation,
} from "../_generated/server";

import { triggers } from "../triggers";

// Use `mutation` to define all mutations, and the triggers will get called.
export const mutation = customMutation(rawMutation, customCtx(triggers.wrapDB));

export const internalMutation = customMutation(
  rawInternalMutation,
  customCtx(triggers.wrapDB)
);

// Define this once - and customize like you would customQuery
export const zodQuery = zCustomQuery(query, NoOp);

export const zodMutation = zCustomMutation(mutation, NoOp);
