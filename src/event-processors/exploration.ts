import { EdEventProcessor } from '.';

export const SellExplorationData: EdEventProcessor<'SellExplorationData'> = {
  event: 'SellExplorationData',
  processor: (dataManager, event): void => {
    const totalEarnings = event.BaseValue + event.Bonus;
    dataManager.set('lastSoldExplorationDataValue', totalEarnings);
    dataManager.increase('sessionTotalSoldExplorationDataValue', totalEarnings);
    dataManager.increase('sessionTotalSoldExplorationData');
  },
};

export const MultiSellExplorationData: EdEventProcessor<'MultiSellExplorationData'> = {
  event: 'MultiSellExplorationData',
  processor: (dataManager, event): void => {
    const totalEarnings = event.TotalEarnings;
    dataManager.set('lastSoldExplorationDataValue', totalEarnings);
    dataManager.increase('sessionTotalSoldExplorationDataValue', totalEarnings);
    dataManager.increase('sessionTotalSoldExplorationData');
  },
};

export const Scan: EdEventProcessor<'Scan'> = {
  event: 'Scan',
  processor: (dataManager, event): void => {
    dataManager.increase('sessionTotalScans');

    if (event.ScanType === 'AutoScan') {
      dataManager.increase('sessionTotalAutoScanScans');
      return;
    }
    if (event.ScanType === 'Basic') {
      dataManager.increase('sessionTotalBasicScans');
      return;
    }
    if (event.ScanType === 'Cargo') {
      dataManager.increase('sessionTotalCargoScans');
      return;
    }
    if (event.ScanType === 'Detailed') {
      dataManager.increase('sessionTotalDetailedScans');
      return;
    }
  },
};
