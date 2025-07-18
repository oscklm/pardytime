import { defineSchema } from "convex/server";
import { boardTables } from "./boards/schema";
import { changelogTables } from "./changelogs/schema";
import { gameTables } from "./games/schema";
import { userTables } from "./users/schema";
import { teamTables } from "./teams/schema";

export default defineSchema(
  {
    // Users
    ...userTables,

    // Boards
    ...boardTables,

    // Games
    ...gameTables,

    // Teams
    ...teamTables,

    // Changelogs
    ...changelogTables,
  },
  {
    schemaValidation: true,
  }
);
