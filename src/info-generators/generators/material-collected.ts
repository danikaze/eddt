import { getSimpleInfoGenerator } from '../get-simple-info-generator';

export const MaterialsCollectedInfoGenerator = getSimpleInfoGenerator(
  'materialCollected',
  ['sessionTotalMaterialsCollected']
);
