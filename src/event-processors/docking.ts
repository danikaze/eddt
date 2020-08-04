import { EdEventProcessor } from '.';

export const DockingRequested: EdEventProcessor<'DockingRequested'> = {
  event: 'DockingRequested',
  processor: (dataManager): void => {
    dataManager.increase('sessionTotalDockingsRequested');
  },
};

export const DockingGranted: EdEventProcessor<'DockingGranted'> = {
  event: 'DockingGranted',
  processor: (dataManager): void => {
    dataManager.increase('sessionTotalDockingsGranted');
  },
};

export const DockingDenied: EdEventProcessor<'DockingDenied'> = {
  event: 'DockingDenied',
  processor: (dataManager, event): void => {
    dataManager.increase('sessionTotalDockingsDenied');
    dataManager.set('lastDockingDeniedReason', event.Reason);
  },
};
