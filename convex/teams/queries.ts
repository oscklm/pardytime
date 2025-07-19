import { zid } from "convex-helpers/server/zod";
import { zodQuery } from "../utils/functions";

export const getById = zodQuery({
  args: {
    id: zid("teams"),
  },
  handler: async (ctx, { id }) => {
    const team = await ctx.db.get(id);
    if (!team) {
      throw new Error(`Team with ID ${id} not found.`);
    }
    return team;
  },
});
