import { getSimpleInfoGenerator } from '../get-simple-info-generator';

export const MissionsFailedInfoGenerator = getSimpleInfoGenerator(
  'missionsFailed',
  ['sessionTotalMissionsFailed']
);
