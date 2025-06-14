import { defineSchema } from "convex/server";
import { changelogTables } from "./changelogs/schema";
import { boardTables } from "./model/boards/schema";
import { userTables } from "./users/schema";

export default defineSchema({
	// Users
	...userTables,

	// Boards
	...boardTables,

	// Changelogs
	...changelogTables,
});
