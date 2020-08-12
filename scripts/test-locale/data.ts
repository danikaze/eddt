// tslint:disable: no-magic-numbers

import { TranslationData } from '@src/utils/i18n';
import { formatLy, formatCredits } from '@src/utils/format';

export type TestCase = {
  key: string;
  data: TranslationData;
};

export const testCases: TestCase[] = [
  {
    key: 'bodiesApproached',
    data: { sessionTotalBodiesApproached: 1 },
  },
  {
    key: 'bodiesApproached',
    data: { sessionTotalBodiesApproached: 5 },
  },
  {
    key: 'bodiesLeft',
    data: { sessionTotalBodiesLeft: 1 },
  },
  {
    key: 'bodiesLeft',
    data: { sessionTotalBodiesLeft: 2 },
  },
  {
    key: 'bounty',
    data: {
      lastBountyReward: 12345,
      lastBountyRewardCr: formatCredits(12345),
      lastBountyShip: 'Imperial Eagle',
      sessionTotalBounty: 12345,
      sessionTotalBountyCr: formatCredits(12345),
      sessionTotalPiratesKilled: 1,
    },
  },
  {
    key: 'bounty',
    data: {
      lastBountyReward: 45678,
      lastBountyRewardCr: formatCredits(45678),
      lastBountyShip: 'Krait MK-II',
      sessionTotalBounty: 12345678,
      sessionTotalBountyCr: formatCredits(12345678),
      sessionTotalPiratesKilled: 8,
    },
  },
  {
    key: 'dockingsDenied',
    data: {
      sessionTotalDockingsDenied: 1,
      lastDockingDeniedReason: 'NoSpace',
    },
  },
  {
    key: 'dockingsDenied',
    data: {
      sessionTotalDockingsDenied: 3,
      lastDockingDeniedReason: 'Offences',
    },
  },
  {
    key: 'dockingsGranted',
    data: {
      sessionTotalDockingsGranted: 1,
    },
  },
  {
    key: 'dockingsGranted',
    data: {
      sessionTotalDockingsGranted: 2,
    },
  },
  {
    key: 'dockingsRequested',
    data: {
      sessionTotalDockingsRequested: 1,
    },
  },
  {
    key: 'dockingsRequested',
    data: {
      sessionTotalDockingsRequested: 4,
    },
  },
  {
    key: 'heatWarning',
    data: {
      sessionTotalHeatWarnings: 1,
    },
  },
  {
    key: 'heatWarning',
    data: {
      sessionTotalHeatWarnings: 3,
    },
  },
  {
    key: 'interdictionsEscaped',
    data: {
      sessionTotalInterdictionsReceivedEscaped: 1,
    },
  },
  {
    key: 'interdictionsEscaped',
    data: {
      sessionTotalInterdictionsReceivedEscaped: 3,
    },
  },
  {
    key: 'interdictionsLost',
    data: {
      sessionTotalInterdictionsReceivedLost: 1,
    },
  },
  {
    key: 'interdictionsLost',
    data: {
      sessionTotalInterdictionsReceivedLost: 2,
    },
  },
  {
    key: 'interdictionsSubmitted',
    data: {
      sessionTotalInterdictionsReceivedSubmitted: 1,
    },
  },
  {
    key: 'interdictionsSubmitted',
    data: {
      sessionTotalInterdictionsReceivedSubmitted: 10,
    },
  },
  {
    key: 'jumpDistance',
    data: {
      sessionTotalJumpDistance: 150.123456789,
      sessionTotalJumpDistanceLy: formatLy(150.123456789),
    },
  },
  {
    key: 'launchedDrones',
    data: {
      sessionTotalDronesLaunched: 1,
    },
  },
  {
    key: 'launchedDrones',
    data: {
      sessionTotalDronesLaunched: 19,
    },
  },
  {
    key: 'materialCollected',
    data: {
      sessionTotalMaterialsCollected: 1,
    },
  },
  {
    key: 'materialCollected',
    data: {
      sessionTotalMaterialsCollected: 235,
    },
  },
  {
    key: 'miningRefined',
    data: {
      sessionTotalMiningRefined: 1,
    },
  },
  {
    key: 'miningRefined',
    data: {
      sessionTotalMiningRefined: 395,
    },
  },
  {
    key: 'missionsAbandoned',
    data: {
      sessionTotalMissionsAbandoned: 1,
    },
  },
  {
    key: 'missionsAbandoned',
    data: {
      sessionTotalMissionsAbandoned: 3,
    },
  },
  {
    key: 'missionsAccepted',
    data: {
      sessionTotalMissionsAccepted: 1,
    },
  },
  {
    key: 'missionsAccepted',
    data: {
      sessionTotalMissionsAccepted: 20,
    },
  },
  {
    key: 'missionsCompleted',
    data: {
      sessionTotalMissionsCompleted: 1,
    },
  },
  {
    key: 'missionsCompleted',
    data: {
      sessionTotalMissionsCompleted: 10,
    },
  },
  {
    key: 'missionsFailed',
    data: {
      sessionTotalMissionsFailed: 1,
    },
  },
  {
    key: 'missionsFailed',
    data: {
      sessionTotalMissionsFailed: 3,
    },
  },
  {
    key: 'prospectedAsteroids',
    data: {
      sessionTotalAsteroidsProspected: 1,
    },
  },
  {
    key: 'prospectedAsteroids',
    data: {
      sessionTotalAsteroidsProspected: 4,
    },
  },
  {
    key: 'scanned',
    data: {
      sessionTotalScanned: 1,
    },
  },
  {
    key: 'scanned',
    data: {
      sessionTotalScanned: 15,
    },
  },
  {
    key: 'detailedScan',
    data: {
      sessionTotalDetailedScans: 1,
    },
  },
  {
    key: 'detailedScan',
    data: {
      sessionTotalDetailedScans: 23,
    },
  },
  {
    key: 'cargoScan',
    data: {
      sessionTotalCargoScans: 1,
    },
  },
  {
    key: 'cargoScan',
    data: {
      sessionTotalCargoScans: 23,
    },
  },
  {
    key: 'soldExplorationData',
    data: {
      sessionTotalSoldExplorationDataValue: 150000,
      sessionTotalSoldExplorationDataValueCr: formatCredits(150000),
      lastSoldExplorationDataValue: 150000,
      lastSoldExplorationDataValueCr: formatCredits(150000),
      sessionTotalSoldExplorationData: 1,
    },
  },
  {
    key: 'soldExplorationData',
    data: {
      sessionTotalSoldExplorationDataValue: 12345678,
      sessionTotalSoldExplorationDataValueCr: formatCredits(12345678),
      lastSoldExplorationDataValue: 654321,
      lastSoldExplorationDataValueCr: formatCredits(654321),
      sessionTotalSoldExplorationData: 5,
    },
  },
  {
    key: 'gameMode',
    data: {
      gameMode: 'Solo',
    },
  },
];
