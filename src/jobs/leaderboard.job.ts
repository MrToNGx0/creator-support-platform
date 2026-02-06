import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { LeaderboardService } from '../leaderboard/leaderboard.service';
import { DiscordService } from '../discord/discord.service';
import { featureConfig } from 'src/config/feature.config';

interface TopDonator {
  donatorName: string;
  totalAmount: number;
}

@Injectable()
export class LeaderboardCron {
  private readonly logger = new Logger(LeaderboardCron.name);

  constructor(
    private readonly leaderboardService: LeaderboardService,
    private readonly discordService: DiscordService,
  ) {}

  // @Cron('*/10 * * * * *')
  @Cron('0 20 * * 0')
  async postTopDonators(): Promise<void> {
    if (!featureConfig.cron.donatorLeaderboard) return;

    this.logger.debug('⏰ Donator leaderboard cron triggered');

    try {
      const limit = featureConfig.leaderboardLimit;

      const donators: TopDonator[] =
        await this.leaderboardService.getTopDonators(limit);

      if (!donators.length) {
        this.logger.debug('No donator leaderboard data');
        return;
      }

      await this.discordService.sendLeaderboardEmbed(
        this.buildDonatorLeaderboardEmbed(donators, limit),
      );

      this.logger.log('✅ Donator leaderboard sent to Discord');
    } catch (err) {
      this.logger.error(
        '❌ Failed to post donator leaderboard',
        err instanceof Error ? err.stack : undefined,
      );
    }
  }

  private buildDonatorLeaderboardEmbed(data: TopDonator[], limit: number) {
    const rankEmoji = ['🥇', '🥈', '🥉'];

    return {
      title: 'จัดอันดับฝันร้ายคนรักเดียว',
      description: [
        `ผู้สนับสนุนที่มียอดโดเนทสูงสุด`,
        `Top ${limit} ประจำสัปดาห์`,
      ].join('\n'),

      color: 0xff5fa2,

      fields: data.map((item, index) => ({
        name: `${rankEmoji[index] ?? `#${index + 1}`} อันดับ ${index + 1}`,
        value: [
          `**${item.donatorName}** ยอดโดเนท ${item.totalAmount.toLocaleString()} บาท`,
        ].join('\n'),
        inline: false,
      })),

      image: {
        url: 'https://c.tenor.com/csQ5jd2CGPcAAAAC/tenor.gif',
      },

      footer: {
        text: 'ขอบคุณทุกแรงสนับสนุน ❤️',
      },

      timestamp: new Date().toISOString(),
    };
  }
}
