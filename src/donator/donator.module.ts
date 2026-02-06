import { Module } from '@nestjs/common';
import { DonatorService } from './donator.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [DonatorService],
  exports: [DonatorService],
})
export class DonatorModule {}
