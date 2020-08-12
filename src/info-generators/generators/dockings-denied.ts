import { getSimpleInfoGenerator } from '../get-simple-info-generator';

export const DockingsDeniedInfoGenerator = getSimpleInfoGenerator(
  'dockingsDenied',
  ['sessionTotalDockingsDenied', 'lastDockingDeniedReason']
);
