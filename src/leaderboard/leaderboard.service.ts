import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Donator } from '@prisma/client';

@Injectable()
export class LeaderboardService {
  private readonly logger = new Logger(LeaderboardService.name);

  constructor(private readonly prisma: PrismaService) {}

  /* ---------- Creator ---------- */
  async updateCreator(creatorId: string) {
    const sum = await this.prisma.donation.aggregate({
      where: { creatorId },
      _sum: { amount: true },
    });

    const totalAmount = sum._sum.amount ?? 0;

    await this.prisma.creatorLeaderboard.upsert({
      where: { creatorId },
      update: { totalAmount },
      create: { creatorId, totalAmount },
    });
  }

  async getTopCreators(limit = 10) {
    const safeLimit = Math.max(1, Math.min(limit, 50));

    const results = await this.prisma.creatorLeaderboard.findMany({
      orderBy: { totalAmount: 'desc' },
      take: safeLimit,
      select: {
        totalAmount: true,
        creator: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return results.map((item) => ({
      creatorId: item.creator.id,
      creatorName: item.creator.name,
      totalAmount: item.totalAmount,
    }));
  }

  /* ---------- Donator ---------- */
  async updateDonator(donator: Donator): Promise<void> {
    this.logger.debug(`Updating leaderboard for ${donator.name}`);

    const sum = await this.prisma.donation.aggregate({
      where: { donatorId: donator.id },
      _sum: { amount: true },
    });

    const totalAmount = sum._sum.amount ?? 0;

    await this.prisma.donatorLeaderboard.upsert({
      where: { donatorId: donator.id },
      update: { totalAmount },
      create: {
        donatorId: donator.id,
        totalAmount,
      },
    });

    this.logger.log(`${donator.name} totalAmount=${totalAmount}`);
  }

  async getTopDonators(limit = 10) {
    const safeLimit = Math.max(1, Math.min(limit, 50));

    const results = await this.prisma.donatorLeaderboard.findMany({
      orderBy: { totalAmount: 'desc' },
      take: safeLimit,
      select: {
        totalAmount: true,
        donator: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return results.map((item) => ({
      donatorId: item.donator.id,
      donatorName: item.donator.name,
      totalAmount: item.totalAmount,
    }));
  }
}
