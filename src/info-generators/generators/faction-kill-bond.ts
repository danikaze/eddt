import { getSimpleInfoGenerator } from '../get-simple-info-generator';

export const FactionKillBondInfoGenerator = getSimpleInfoGenerator(
  'factionKillBonds',
  [
    'sessionTotalFactionKillBonds',
    'sessionTotalFactionKillBondRewards',
    'sessionTotalFactionKillBondRewardsCr',
    'lastFactionKillReward',
    'lastFactionKillRewardCr',
  ]
);
