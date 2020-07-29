import { EdEventProcessor } from '.';

export const Bounty: EdEventProcessor<'Bounty'> = {
  event: 'Bounty',
  processor: (dataManager, event): void => {
    dataManager.set('lastBountyReward', event.TotalReward);
    dataManager.set('lastBountyShip', event.Target_Localised);
    dataManager.increase('sessionTotalBounty', event.TotalReward);
    dataManager.increase('sessionTotalPiratesKilled');
  },
};

export const ShipTargeted: EdEventProcessor<'ShipTargeted'> = {
  event: 'ShipTargeted',
  processor: (dataManager, event): void => {
    if (!event.TargetLocked) {
      dataManager.delete('targetBounty');
      dataManager.delete('targetShipShield');
      dataManager.delete('targetShipHull');
      dataManager.delete('targetPilotRank');
      return;
    }

    dataManager.set('targetBounty', event.Bounty);
    dataManager.set('targetShipShield', event.ShieldHealth);
    dataManager.set('targetShipHull', event.HullHealth);
    dataManager.set('targetPilotRank', event.PilotRank);
  },
};
