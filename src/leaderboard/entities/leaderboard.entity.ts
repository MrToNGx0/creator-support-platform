import { CreatorEntity } from '../../creator/entities/creator.entity';

export class LeaderboardEntity {
  id: string;
  creatorId: string;
  totalAmount: number;
  updatedAt: Date;

  creator?: CreatorEntity;
}
