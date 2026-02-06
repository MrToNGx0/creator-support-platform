import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';

type AxiosInstance = ReturnType<typeof axios.create>;

export interface DiscordEmbed {
  title?: string;
  description?: string;
  color?: number;
  timestamp?: string;
  image?: { url: string };
  fields?: {
    name: string;
    value: string;
    inline?: boolean;
  }[];
}

@Injectable()
export class DiscordService {
  private readonly logger = new Logger(DiscordService.name);
  private readonly http: AxiosInstance;

  private readonly generalWebhook?: string;
  private readonly donateWebhook?: string;
  private readonly leaderboardWebhook?: string;

  constructor() {
    this.generalWebhook = process.env.DISCORD_GENERAL_WEBHOOK;
    this.donateWebhook = process.env.DISCORD_DONATE_WEBHOOK;
    this.leaderboardWebhook = process.env.DISCORD_LEADERBOARD_WEBHOOK;

    this.http = axios.create({
      timeout: 5000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!this.generalWebhook) {
      this.logger.warn('DISCORD_WEBHOOK_URL is not defined');
    }

    if (!this.donateWebhook) {
      this.logger.warn('DISCORD_DONATE_WEBHOOK is not defined');
    }
  }

  /* ---------------------- base helpers ---------------------- */

  private async postWebhook(
    webhookUrl: string | undefined,
    payload: unknown,
  ): Promise<void> {
    if (!webhookUrl) return;

    try {
      await this.http.post(webhookUrl, payload);
    } catch (error) {
      this.logger.error(
        'Failed to send Discord webhook',
        error instanceof Error ? error.message : undefined,
      );
    }
  }

  /* ---------------------- public APIs ----------------------- */

  async sendGeneralMessage(message: string): Promise<void> {
    await this.postWebhook(this.generalWebhook, { content: message });
  }

  async sendDonationEmbed(embed: DiscordEmbed): Promise<void> {
    await this.postWebhook(this.donateWebhook, { embeds: [embed] });
  }

  async sendLeaderboardEmbed(embed: DiscordEmbed): Promise<void> {
    await this.postWebhook(this.leaderboardWebhook, { embeds: [embed] });
  }
}
