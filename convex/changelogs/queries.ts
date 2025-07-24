import { query } from '../_generated/server';

export const getAll = query({
  args: {},
  handler: async (ctx) => {
    const changelogs = await ctx.db.query('changelogs').collect();
    return changelogs;
  },
});
