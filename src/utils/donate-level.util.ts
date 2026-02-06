import { DONATE_LEVELS, DonateLevel } from 'src/config/donate-level.config';

export function getDonateLevel(amount: number): DonateLevel {
  return (
    DONATE_LEVELS.find((level) => amount >= level.min && amount <= level.max) ??
    DONATE_LEVELS[0]
  );
}
