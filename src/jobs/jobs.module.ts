import { Module } from '@nestjs/common';
import { LeaderboardCron } from './leaderboard.job';
import { ScheduleModule } from '@nestjs/schedule';
import { LeaderboardModule } from 'src/leaderboard/leaderboard.module';
import { DiscordModule } from 'src/discord/discord.module';

@Module({
  imports: [ScheduleModule.forRoot(), LeaderboardModule, DiscordModule],
  providers: [LeaderboardCron],
})
export class JobsModule {}
