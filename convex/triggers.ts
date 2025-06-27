import { asyncMap } from "convex-helpers";
import { getManyFrom } from "convex-helpers/server/relationships";
import { Triggers } from "convex-helpers/server/triggers";
import type { DataModel } from "./_generated/dataModel";

export const triggers = new Triggers<DataModel>();

triggers.register("games", async (ctx, change) => {
	if (change.operation === "delete") {
		console.log("Deleting game", change.id);
		// Delete all teams for this game.
		await asyncMap(
			await getManyFrom(ctx.db, "teams", "by_gameId", change.id),
			(team) => ctx.db.delete(team._id),
		);
	}
});

triggers.register("teams", async (ctx, change) => {
	if (change.operation === "delete") {
		if (change.oldDoc.imageId) {
			await ctx.storage.delete(change.oldDoc.imageId);
		}
	}
	if (change.operation === "update") {
		if (change.oldDoc.imageId !== change.newDoc.imageId) {
			if (change.oldDoc.imageId) {
				await ctx.storage.delete(change.oldDoc.imageId);
			}
		}
	}
});
