import { Module } from '@nestjs/common';
import { DonationController } from './donation.controller';
import { DonationService } from './donation.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { LeaderboardModule } from 'src/leaderboard/leaderboard.module';
import { MilestoneModule } from 'src/milestone/milestone.module';
import { DiscordModule } from 'src/discord/discord.module';
import { CreatorModule } from 'src/creator/creator.module';
import { DonatorModule } from 'src/donator/donator.module';

@Module({
  imports: [
    PrismaModule,
    LeaderboardModule,
    MilestoneModule,
    DiscordModule,
    CreatorModule,
    DonatorModule,
  ],
  controllers: [DonationController],
  providers: [DonationService],
})
export class DonationModule {}
