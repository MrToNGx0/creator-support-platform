export class DonationEntity {
  id: string;
  creatorId: string;
  donatorName: string;
  amount: number;
  message?: string | null;
  createdAt: Date;
}
