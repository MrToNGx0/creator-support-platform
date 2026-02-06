import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DonationModule } from './donation/donation.module';
import { LeaderboardModule } from './leaderboard/leaderboard.module';
import { MilestoneModule } from './milestone/milestone.module';
import { DiscordModule } from './discord/discord.module';
import { CreatorModule } from './creator/creator.module';
// import { RedisModule } from './redis/redis.module';
import { PrismaModule } from './prisma/prisma.module';
import { JobsModule } from './jobs/jobs.module';
import { DonatorModule } from './donator/donator.module';

@Module({
  imports: [
    DonationModule,
    LeaderboardModule,
    MilestoneModule,
    DiscordModule,
    CreatorModule,
    // RedisModule,
    PrismaModule,
    JobsModule,
    DonatorModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
