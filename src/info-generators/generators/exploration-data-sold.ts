import { getSimpleInfoGenerator } from '../get-simple-info-generator';

export const SoldExplorationDataInfoGenerator = getSimpleInfoGenerator(
  'soldExplorationData',
  [
    'sessionTotalSoldExplorationDataValue',
    'sessionTotalSoldExplorationDataValueCr',
    'lastSoldExplorationDataValue',
    'lastSoldExplorationDataValueCr',
    'sessionTotalSoldExplorationData',
  ]
);
