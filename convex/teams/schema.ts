import { z } from 'zod';
import { defineTable } from 'convex/server';
import { zid, zodToConvex } from 'convex-helpers/server/zod';

const teamSchema = z.object({
  ownerId: zid('users'),
  gameId: zid('games').nullable(),
  nickname: z
    .string()
    .min(2, 'Nickname must be at least 2 characters')
    .max(16, 'Nickname must be less than 16 characters'),
  score: z.number(),
  imageId: zid('_storage').optional(),
});

const teamTables = {
  teams: defineTable(zodToConvex(teamSchema)).index('by_gameId', ['gameId']),
};

export { teamSchema, teamTables };
