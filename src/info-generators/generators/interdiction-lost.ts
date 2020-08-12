import { getSimpleInfoGenerator } from '../get-simple-info-generator';

export const InterdictionsLostInfoGenerator = getSimpleInfoGenerator(
  'interdictionsLost',
  ['sessionTotalInterdictionsReceivedLost']
);
