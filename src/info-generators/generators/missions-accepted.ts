import { getSimpleInfoGenerator } from '../get-simple-info-generator';

export const MissionsAcceptedInfoGenerator = getSimpleInfoGenerator(
  'missionsAccepted',
  ['sessionTotalMissionsAccepted']
);
