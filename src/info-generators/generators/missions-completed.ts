import { getSimpleInfoGenerator } from '../get-simple-info-generator';

export const MissionsCompletedInfoGenerator = getSimpleInfoGenerator(
  'missionsCompleted',
  ['sessionTotalMissionsCompleted']
);
