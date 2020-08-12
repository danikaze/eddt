import { getSimpleInfoGenerator } from '../get-simple-info-generator';

export const InterdictionsSubmittedInfoGenerator = getSimpleInfoGenerator(
  'interdictionsSubmitted',
  ['sessionTotalInterdictionsReceivedSubmitted']
);
