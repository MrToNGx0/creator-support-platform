import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDonationDto } from './dto/create-donation.dto';
import { LeaderboardService } from 'src/leaderboard/leaderboard.service';
import { MilestoneService } from 'src/milestone/milestone.service';
import { DiscordEmbed, DiscordService } from 'src/discord/discord.service';
import { CreatorService } from 'src/creator/creator.service';
import { DonatorService } from 'src/donator/donator.service';
import { Creator, Donation, Donator } from '@prisma/client';
import { getDonateLevel } from 'src/utils/donate-level.util';

@Injectable()
export class DonationService {
  private readonly logger = new Logger(DonationService.name);

  private readonly donateColor = 0xf47fff;

  constructor(
    private readonly prisma: PrismaService,
    private readonly leaderboardService: LeaderboardService,
    private readonly creatorService: CreatorService,
    private readonly donatorService: DonatorService,
    private readonly milestoneService: MilestoneService,
    private readonly discordService: DiscordService,
  ) {}

  async handleWebhook(creatorCode: string, dto: CreateDonationDto) {
    const creator = await this.creatorService.getOrCreate(creatorCode);
    const donator = await this.donatorService.getOrCreate(dto.donatorName);

    const donation = await this.prisma.donation.create({
      data: {
        creatorId: creator.id,
        donatorId: donator.id,
        amount: dto.amount,
        message: dto.message,
      },
    });

    await this.discordService.sendDonationEmbed(
      this.buildDonationEmbed(creator, donator, donation),
    );

    await this.leaderboardService.updateCreator(creator.id);
    await this.leaderboardService.updateDonator(donator);

    await this.milestoneService.checkDonator(donator);

    return donation;
  }

  private buildDonationEmbed(
    creator: Creator,
    donator: Donator,
    donation: Donation,
  ): DiscordEmbed {
    const level = getDonateLevel(donation.amount);

    return {
      title: level.title,
      description:
        `✨ __**${donator.name || 'ผู้สนับสนุน'}**__ ✨\n\n` +
        `ร่วมสนับสนุนจำนวน **${donation.amount.toLocaleString()} บาท** 💖\n\n` +
        `ให้ **${creator.name}** \n\n` +
        `💬 ข้อความ:\n> ${donation.message || '-'}`,
      color: this.donateColor,
      image: level.gif ? { url: level.gif } : undefined,
      timestamp: donation.createdAt.toISOString(),
    };
  }
}
