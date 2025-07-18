/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as boards_controllers from "../boards/controllers.js";
import type * as boards_mutations from "../boards/mutations.js";
import type * as boards_queries from "../boards/queries.js";
import type * as boards_utils from "../boards/utils.js";
import type * as changelogs_queries from "../changelogs/queries.js";
import type * as controllers from "../controllers.js";
import type * as crons from "../crons.js";
import type * as games_mutations from "../games/mutations.js";
import type * as games_queries from "../games/queries.js";
import type * as http from "../http.js";
import type * as storage_mutations from "../storage/mutations.js";
import type * as teams_mutations from "../teams/mutations.js";
import type * as triggers from "../triggers.js";
import type * as types from "../types.js";
import type * as users_actions from "../users/actions.js";
import type * as users_mutations from "../users/mutations.js";
import type * as users_queries from "../users/queries.js";
import type * as utils_clerk from "../utils/clerk.js";
import type * as utils_functions from "../utils/functions.js";
import type * as validators from "../validators.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  "boards/controllers": typeof boards_controllers;
  "boards/mutations": typeof boards_mutations;
  "boards/queries": typeof boards_queries;
  "boards/utils": typeof boards_utils;
  "changelogs/queries": typeof changelogs_queries;
  controllers: typeof controllers;
  crons: typeof crons;
  "games/mutations": typeof games_mutations;
  "games/queries": typeof games_queries;
  http: typeof http;
  "storage/mutations": typeof storage_mutations;
  "teams/mutations": typeof teams_mutations;
  triggers: typeof triggers;
  types: typeof types;
  "users/actions": typeof users_actions;
  "users/mutations": typeof users_mutations;
  "users/queries": typeof users_queries;
  "utils/clerk": typeof utils_clerk;
  "utils/functions": typeof utils_functions;
  validators: typeof validators;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
