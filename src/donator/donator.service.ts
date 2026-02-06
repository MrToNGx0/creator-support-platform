import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Donator } from '@prisma/client';

@Injectable()
export class DonatorService {
  constructor(private readonly prisma: PrismaService) {}

  async getOrCreate(rawName?: string): Promise<Donator> {
    const name = this.normalizeName(rawName);

    return this.prisma.donator.upsert({
      where: { name: name },
      update: {},
      create: { name },
    });
  }

  private normalizeName(rawName?: string): string {
    return rawName?.trim() || 'ผู้สนับสนุน';
  }
}
