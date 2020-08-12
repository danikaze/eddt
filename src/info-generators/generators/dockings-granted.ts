import { getSimpleInfoGenerator } from '../get-simple-info-generator';

export const DockingsGrantedInfoGenerator = getSimpleInfoGenerator(
  'dockingsGranted',
  ['sessionTotalDockingsGranted']
);
