/* eslint-disable @typescript-eslint/no-unsafe-return */

import { Controller, Get, Query } from '@nestjs/common';
import { LeaderboardService } from './leaderboard.service';
import { LeaderboardQueryDto } from './dto/leaderboard-query.dto';

@Controller('leaderboard')
export class LeaderboardController {
  constructor(private readonly leaderboardService: LeaderboardService) {}

  @Get('top')
  async getTop(@Query() query: LeaderboardQueryDto) {
    const limit = query.limit ?? 10;
    return this.leaderboardService.getTopCreators(limit);
  }

  @Get('donators')
  async getTopDonators(@Query() query: LeaderboardQueryDto) {
    const limit = query.limit ?? 10;
    return this.leaderboardService.getTopDonators(limit);
  }
}
