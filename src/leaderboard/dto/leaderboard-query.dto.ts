/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsInt, IsOptional, IsPositive, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class LeaderboardQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  limit?: number;

  @IsOptional()
  @IsString()
  creatorCode?: string;
}
