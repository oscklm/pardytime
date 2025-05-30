import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';
import { boardTables } from './boards/schema';

export default defineSchema({
  // Users
  users: defineTable({
    clerkUserId: v.string(),
    email: v.string(),
    firstName: v.optional(v.string()),
    lastName: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    username: v.optional(v.string()),
    publicMetadata: v.optional(v.record(v.string(), v.any())),
    privateMetadata: v.optional(v.record(v.string(), v.any())),
    unsafeMetadata: v.optional(v.record(v.string(), v.any())),
  }).index('by_clerkUserId', ['clerkUserId']),

  // Boards
  ...boardTables,
});
