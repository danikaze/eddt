import { getSimpleInfoGenerator } from '../get-simple-info-generator';

export const BountyInfoGenerator = getSimpleInfoGenerator('bounty', [
  'lastBountyReward',
  'lastBountyRewardCr',
  'lastBountyShip',
  'sessionTotalBounty',
  'sessionTotalBountyCr',
  'sessionTotalPiratesKilled',
]);
