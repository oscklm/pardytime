import { defineSchema } from "convex/server";
import { boardTables } from "./boards/schema";
import { changelogTables } from "./changelogs/schema";
import { userTables } from "./users/schema";

export default defineSchema({
	// Users
	...userTables,

	// Boards
	...boardTables,

	// Changelogs
	...changelogTables,
});
