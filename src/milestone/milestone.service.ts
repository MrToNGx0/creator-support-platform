import { Injectable, Logger } from '@nestjs/common';
import { Donator } from '@prisma/client';
import {
  DONATOR_MILESTONE_CONFIG,
  DONATOR_MILESTONES,
  NEAR_MILESTONE_IMAGE,
  NEAR_MILESTONE_THRESHOLD,
} from 'src/config/milestone.config';
import { DiscordEmbed, DiscordService } from 'src/discord/discord.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MilestoneService {
  private readonly logger = new Logger(MilestoneService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly discordService: DiscordService,
  ) {}

  async checkDonator(donator: Donator): Promise<void> {
    const milestones = [...DONATOR_MILESTONES].sort((a, b) => a - b);

    const { _sum } = await this.prisma.donation.aggregate({
      where: { donatorId: donator.id },
      _sum: { amount: true },
    });

    const total = _sum.amount ?? 0;

    this.logger.debug(
      `${donator.name} total=${total}, last=${donator.lastMilestoneNotified}`,
    );

    const nextMilestone = milestones.find(
      (m) => m > donator.lastMilestoneNotified,
    );

    if (!nextMilestone) return;

    const diff = nextMilestone - total;

    // ------------------ near milestone ------------------
    if (diff > 0 && diff <= NEAR_MILESTONE_THRESHOLD) {
      await this.sendNearMilestone(donator, diff, nextMilestone);
      return;
    }

    // ------------------ reached milestone ------------------
    if (total >= nextMilestone) {
      await this.sendReachedMilestone(donator, nextMilestone);
    }
  }

  /* ---------------------- helpers ---------------------- */

  private async sendNearMilestone(
    donator: Donator,
    diff: number,
    milestone: number,
  ): Promise<void> {
    const embed: DiscordEmbed = {
      title: 'ใกล้ถึงแล้วอีกนิดนึงนะ!',
      description:
        `✨ __**${donator.name || 'ผู้สนับสนุน'}**__ ✨\n\n` +
        `อีกแค่ **${diff.toLocaleString()} บาท** ` +
        `จะถึง **${milestone.toLocaleString()} บาท** แล้ว! 💖`,
      color: 0xffa500,
      image: { url: NEAR_MILESTONE_IMAGE },
    };

    await this.discordService.sendDonationEmbed(embed);

    this.logger.log(
      `Near milestone ${milestone} for ${donator.name} (${diff} left)`,
    );
  }

  private async sendReachedMilestone(
    donator: Donator,
    milestone: number,
  ): Promise<void> {
    const config = DONATOR_MILESTONE_CONFIG[milestone];
    if (!config) return;

    const embed: DiscordEmbed = {
      title: config.title,
      description:
        `✨ __**${donator.name || 'ผู้สนับสนุน'}**__ ✨\n\n` +
        `โดเนทสะสมครบ **${milestone.toLocaleString()} บาท** แล้ว!\n\n` +
        `${config.message}`,
      color: 0xffd700,
      image: { url: config.image },
    };

    await this.discordService.sendDonationEmbed(embed);

    await this.prisma.donator.update({
      where: { id: donator.id },
      data: { lastMilestoneNotified: milestone },
    });

    this.logger.log(`Milestone ${milestone} reached by ${donator.name}`);
  }
}
