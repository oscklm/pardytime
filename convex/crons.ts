import { cronJobs } from 'convex/server';
import { internal } from './_generated/api';

const crons = cronJobs();

crons.hourly(
  'delete_old_games',
  { minuteUTC: 0 },
  internal.games.mutations.deleteOldGames
);

export default crons;
