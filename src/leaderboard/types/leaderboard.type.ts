export interface LeaderboardEntry {
  creatorId: string;
  totalAmount: number;
}

export interface LeaderboardOptions {
  limit?: number;
  creatorCode?: string;
  fromDate?: Date;
  toDate?: Date;
}
