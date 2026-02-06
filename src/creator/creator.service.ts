import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Creator } from '@prisma/client';

@Injectable()
export class CreatorService {
  constructor(private readonly prisma: PrismaService) {}

  async getOrCreate(creatorCode?: string): Promise<Creator> {
    if (creatorCode) {
      return this.prisma.creator.upsert({
        where: { creatorCode },
        update: {},
        create: { creatorCode, name: creatorCode },
      });
    }

    return this.prisma.creator.findFirstOrThrow({
      where: { isPrimary: true },
    });
  }
}
