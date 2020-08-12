import { getSimpleInfoGenerator } from '../get-simple-info-generator';

export const LaunchedDronesInfoGenerator = getSimpleInfoGenerator(
  'launchedDrones',
  ['sessionTotalDronesLaunched']
);
