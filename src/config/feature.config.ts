export const featureConfig = {
  donation: process.env.FEATURE_DONATION === 'true',

  leaderboard: {
    creator: process.env.FEATURE_LEADERBOARD_CREATOR === 'true',
    donator: process.env.FEATURE_LEADERBOARD_DONATOR === 'true',
  },

  cron: {
    creatorLeaderboard: process.env.CRON_POST_CREATOR_LEADERBOARD === 'true',
    donatorLeaderboard: process.env.CRON_POST_DONATOR_LEADERBOARD === 'true',
  },

  leaderboardLimit: Number(process.env.LEADERBOARD_LIMIT ?? 5),
};
