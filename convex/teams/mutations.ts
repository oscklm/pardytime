import { zid } from "convex-helpers/server/zod";
import { zodMutation } from "../utils/functions";
import { teamSchema } from "./schema";
import { z } from "zod";

export const createTeam = zodMutation({
  args: {
    values: teamSchema,
  },
  handler: async (ctx, { values }) => {
    return ctx.db.insert("teams", values);
  },
});

export const updateTeam = zodMutation({
  args: {
    teamId: zid("teams"),
    values: teamSchema.partial(),
  },
  handler: async (ctx, { teamId, values }) => {
    return ctx.db.patch(teamId, values);
  },
});

export const deleteTeam = zodMutation({
  args: {
    teamId: zid("teams"),
  },
  handler: async (ctx, { teamId }) => {
    return ctx.db.delete(teamId);
  },
});

export const updateTeamScore = zodMutation({
  args: {
    teamId: zid("teams"),
    score: z.number(),
  },
  handler: async (ctx, { teamId, score }) => {
    return ctx.db.patch(teamId, { score });
  },
});
