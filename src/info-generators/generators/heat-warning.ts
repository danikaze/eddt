import { getSimpleInfoGenerator } from '../get-simple-info-generator';

export const HeatWarningsInfoGenerator = getSimpleInfoGenerator('heatWarning', [
  'sessionTotalHeatWarnings',
]);
