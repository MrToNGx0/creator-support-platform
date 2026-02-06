import { Module } from '@nestjs/common';
import { CreatorController } from './creator.controller';
import { CreatorService } from './creator.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CreatorController],
  providers: [CreatorService],
  exports: [CreatorService],
})
export class CreatorModule {}
