import { v } from 'convex/values';
import invariant from 'tiny-invariant';
import { query } from '../_generated/server';

export const getByClerkId = query({
  args: { clerkId: v.string() },
  handler: async (ctx, { clerkId }) => {
    const userDoc = await ctx.db
      .query('users')
      .withIndex('by_clerkId', (q) => q.eq('clerkId', clerkId))
      .unique();

    if (!userDoc) {
      return undefined;
    }

    return userDoc;
  },
});

export const getById = query({
  args: { id: v.id('users') },
  handler: async (ctx, { id }) => {
    const userDoc = await ctx.db.get(id);

    invariant(userDoc, 'User not found');

    return userDoc;
  },
});

export const getByUsername = query({
  args: { username: v.string() },
  handler: async (ctx, { username }) => {
    const userDoc = await ctx.db
      .query('users')
      .withIndex('by_username', (q) => q.eq('username', username))
      .unique();

    invariant(userDoc, 'User not found');

    return userDoc;
  },
});
