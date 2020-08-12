import { getSimpleInfoGenerator } from '../get-simple-info-generator';

export const DockingsRequestedInfoGenerator = getSimpleInfoGenerator(
  'dockingsRequested',
  ['sessionTotalDockingsRequested']
);
