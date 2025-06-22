import { asyncMap } from "convex-helpers";
import { getManyFrom } from "convex-helpers/server/relationships";
import { Triggers } from "convex-helpers/server/triggers";
import type { DataModel } from "./_generated/dataModel";

export const triggers = new Triggers<DataModel>();

// 4. When a user is deleted, delete their messages (cascading deletes).
triggers.register("games", async (ctx, change) => {
	if (change.operation === "delete") {
		// Delete all teams for this game.
		await asyncMap(
			await getManyFrom(ctx.db, "teams", "by_gameId", change.id),
			(team) => ctx.db.delete(team._id),
		);

		// Delete all answered questions for this game.
		await asyncMap(
			await getManyFrom(ctx.db, "answeredQuestions", "by_gameId", change.id),
			(answeredQuestion) => ctx.db.delete(answeredQuestion._id),
		);
	}
});
