import { EdEventProcessor } from '.';

export const Bounty: EdEventProcessor<'Bounty'> = {
  event: 'Bounty',
  processor: (dataManager, event): void => {
    if (event.Target === 'Skimmer') {
      dataManager.increase('sessionTotalSkimmersKilled');
      return;
    }

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

export const EscapeInterdiction: EdEventProcessor<'EscapeInterdiction'> = {
  event: 'EscapeInterdiction',
  processor: (dataManager, event): void => {
    if (!event.IsPlayer) return;
    dataManager.increase('sessionTotalInterdictionsReceived');
    dataManager.increase('sessionTotalInterdictionsReceivedEscaped');
  },
};

export const Interdicted: EdEventProcessor<'Interdicted'> = {
  event: 'Interdicted',
  processor: (dataManager, event): void => {
    if (!event.IsPlayer) return;
    const key = event.Submitted
      ? 'sessionTotalInterdictionsReceivedSubmitted'
      : 'sessionTotalInterdictionsReceivedLost';
    dataManager.increase('sessionTotalInterdictionsReceived');
    dataManager.increase(key);
  },
};

export const FactionKillBond: EdEventProcessor<'FactionKillBond'> = {
  event: 'FactionKillBond',
  processor: (dataManager, event): void => {
    dataManager.increase('sessionTotalFactionKillBonds');
    dataManager.increase('sessionTotalFactionKillBondRewards', event.Reward);
    dataManager.set('lastFactionKillReward', event.Reward);
  },
};
