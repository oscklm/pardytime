import { defineTable } from 'convex/server';
import { v } from 'convex/values';
import { imageIdValidator } from '../validators';

const changelogSchema = {
  version: v.string(),
  entries: v.array(
    v.object({
      title: v.string(),
      imageId: imageIdValidator,
      description: v.optional(v.string()),
      type: v.union(
        v.literal('feature'),
        v.literal('fix'),
        v.literal('improvement')
      ),
      href: v.optional(v.string()),
    })
  ),
};

const changelogTables = {
  changelogs: defineTable(changelogSchema),
};

export { changelogSchema, changelogTables };
