import { getSimpleInfoGenerator } from '../get-simple-info-generator';

export const MissionsAbandonedInfoGenerator = getSimpleInfoGenerator(
  'missionsAbandoned',
  ['sessionTotalMissionsAbandoned']
);
