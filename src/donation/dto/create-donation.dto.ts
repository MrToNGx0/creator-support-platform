/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  IsString,
  IsInt,
  IsOptional,
  IsPositive,
  MaxLength,
} from 'class-validator';

export class CreateDonationDto {
  @IsString()
  @MaxLength(100)
  donatorName: string;

  @IsInt()
  @IsPositive()
  amount: number;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  message?: string;
}
