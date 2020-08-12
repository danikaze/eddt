import { getSimpleInfoGenerator } from '../get-simple-info-generator';

export const JumpDistanceInfoGenerator = getSimpleInfoGenerator(
  'jumpDistance',
  ['sessionTotalJumpDistance', 'sessionTotalJumpDistanceLy']
);
