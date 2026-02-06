import { Module } from '@nestjs/common';
import { MilestoneController } from './milestone.controller';
import { MilestoneService } from './milestone.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { DiscordModule } from 'src/discord/discord.module';

@Module({
  imports: [PrismaModule, DiscordModule],
  controllers: [MilestoneController],
  providers: [MilestoneService],
  exports: [MilestoneService],
})
export class MilestoneModule {}
