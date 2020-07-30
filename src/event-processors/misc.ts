import { EdEventProcessor } from '.';

export const Scanned: EdEventProcessor<'Scanned'> = {
  event: 'Scanned',
  processor: (dataManager): void => {
    dataManager.increase('sessionTotalScanned');
  },
};

export const HeatWarning: EdEventProcessor<'HeatWarning'> = {
  event: 'HeatWarning',
  processor: (dataManager): void => {
    dataManager.increase('sessionTotalHeatWarnings');
  },
};
