import { Body, Controller, Param, Post } from '@nestjs/common';
import { DonationService } from './donation.service';
import { CreateDonationDto } from './dto/create-donation.dto';

@Controller('donation')
export class DonationController {
  constructor(private readonly donationService: DonationService) {}

  @Post('webhook/:creatorCode')
  handleWebhook(
    @Param('creatorCode') creatorCode: string,
    @Body() dto: CreateDonationDto,
  ) {
    return this.donationService.handleWebhook(creatorCode, dto);
  }
}
