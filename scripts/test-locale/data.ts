// tslint:disable: no-magic-numbers

import { TranslationData } from '@src/utils/i18n';
import { formatLy, formatCredits } from '@src/utils/format';

export type TestCase<
  K extends keyof TranslationData = keyof TranslationData
> = {
  key: K;
  data: TranslationData[K];
};

export const testCases: TestCase[] = [
  {
    key: 'bodiesApproached',
    data: { sessionTotalBodiesApproached: 1 },
  } as TestCase<'bodiesApproached'>,
  {
    key: 'bodiesApproached',
    data: { sessionTotalBodiesApproached: 5 },
  } as TestCase<'bodiesApproached'>,
  {
    key: 'bodiesLeft',
    data: { sessionTotalBodiesLeft: 1 },
  } as TestCase<'bodiesLeft'>,
  {
    key: 'bodiesLeft',
    data: { sessionTotalBodiesLeft: 2 },
  } as TestCase<'bodiesLeft'>,
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
  } as TestCase<'bounty'>,
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
  } as TestCase<'bounty'>,
  {
    key: 'dockingsDenied',
    data: {
      sessionTotalDockingsDenied: 1,
      lastDockingDeniedReason: 'NoSpace',
    },
  } as TestCase<'dockingsDenied'>,
  {
    key: 'dockingsDenied',
    data: {
      sessionTotalDockingsDenied: 3,
      lastDockingDeniedReason: 'Offences',
    },
  } as TestCase<'dockingsDenied'>,
  {
    key: 'dockingsGranted',
    data: {
      sessionTotalDockingsGranted: 1,
    },
  } as TestCase<'dockingsGranted'>,
  {
    key: 'dockingsGranted',
    data: {
      sessionTotalDockingsGranted: 2,
    },
  } as TestCase<'dockingsGranted'>,
  {
    key: 'dockingsRequested',
    data: {
      sessionTotalDockingsRequested: 1,
    },
  } as TestCase<'dockingsRequested'>,
  {
    key: 'dockingsRequested',
    data: {
      sessionTotalDockingsRequested: 4,
    },
  } as TestCase<'dockingsRequested'>,
  {
    key: 'heatWarning',
    data: {
      sessionTotalHeatWarnings: 1,
    },
  } as TestCase<'heatWarning'>,
  {
    key: 'heatWarning',
    data: {
      sessionTotalHeatWarnings: 3,
    },
  } as TestCase<'heatWarning'>,
  {
    key: 'interdictionsEscaped',
    data: {
      sessionTotalInterdictionsReceivedEscaped: 1,
    },
  } as TestCase<'interdictionsEscaped'>,
  {
    key: 'interdictionsEscaped',
    data: {
      sessionTotalInterdictionsReceivedEscaped: 3,
    },
  } as TestCase<'interdictionsEscaped'>,
  {
    key: 'interdictionsLost',
    data: {
      sessionTotalInterdictionsReceivedLost: 1,
    },
  } as TestCase<'interdictionsLost'>,
  {
    key: 'interdictionsLost',
    data: {
      sessionTotalInterdictionsReceivedLost: 2,
    },
  } as TestCase<'interdictionsLost'>,
  {
    key: 'interdictionsSubmitted',
    data: {
      sessionTotalInterdictionsReceivedSubmitted: 1,
    },
  } as TestCase<'interdictionsSubmitted'>,
  {
    key: 'interdictionsSubmitted',
    data: {
      sessionTotalInterdictionsReceivedSubmitted: 10,
    },
  } as TestCase<'interdictionsSubmitted'>,
  {
    key: 'jumpDistance',
    data: {
      sessionTotalJumpDistance: 150.123456789,
      sessionTotalJumpDistanceLy: formatLy(150.123456789),
    },
  } as TestCase<'jumpDistance'>,
  {
    key: 'launchedDrones',
    data: {
      sessionTotalDronesLaunched: 1,
    },
  } as TestCase<'launchedDrones'>,
  {
    key: 'launchedDrones',
    data: {
      sessionTotalDronesLaunched: 19,
    },
  } as TestCase<'launchedDrones'>,
  {
    key: 'materialCollected',
    data: {
      sessionTotalMaterialsCollected: 1,
    },
  } as TestCase<'materialCollected'>,
  {
    key: 'materialCollected',
    data: {
      sessionTotalMaterialsCollected: 235,
    },
  } as TestCase<'materialCollected'>,
  {
    key: 'miningRefined',
    data: {
      sessionTotalMiningRefined: 1,
    },
  } as TestCase<'miningRefined'>,
  {
    key: 'miningRefined',
    data: {
      sessionTotalMiningRefined: 395,
    },
  } as TestCase<'miningRefined'>,
  {
    key: 'missionsAbandoned',
    data: {
      sessionTotalMissionsAbandoned: 1,
    },
  } as TestCase<'missionsAbandoned'>,
  {
    key: 'missionsAbandoned',
    data: {
      sessionTotalMissionsAbandoned: 3,
    },
  } as TestCase<'missionsAbandoned'>,
  {
    key: 'missionsAccepted',
    data: {
      sessionTotalMissionsAccepted: 1,
    },
  } as TestCase<'missionsAccepted'>,
  {
    key: 'missionsAccepted',
    data: {
      sessionTotalMissionsAccepted: 20,
    },
  } as TestCase<'missionsAccepted'>,
  {
    key: 'missionsCompleted',
    data: {
      sessionTotalMissionsCompleted: 1,
    },
  } as TestCase<'missionsCompleted'>,
  {
    key: 'missionsCompleted',
    data: {
      sessionTotalMissionsCompleted: 10,
    },
  } as TestCase<'missionsCompleted'>,
  {
    key: 'missionsFailed',
    data: {
      sessionTotalMissionsFailed: 1,
    },
  } as TestCase<'missionsFailed'>,
  {
    key: 'missionsFailed',
    data: {
      sessionTotalMissionsFailed: 3,
    },
  } as TestCase<'missionsFailed'>,
  {
    key: 'prospectedAsteroids',
    data: {
      sessionTotalAsteroidsProspected: 1,
    },
  } as TestCase<'prospectedAsteroids'>,
  {
    key: 'prospectedAsteroids',
    data: {
      sessionTotalAsteroidsProspected: 4,
    },
  } as TestCase<'prospectedAsteroids'>,
  {
    key: 'scanned',
    data: {
      sessionTotalScanned: 1,
    },
  } as TestCase<'scanned'>,
  {
    key: 'scanned',
    data: {
      sessionTotalScanned: 15,
    },
  } as TestCase<'scanned'>,
  {
    key: 'detailedScan',
    data: {
      sessionTotalDetailedScans: 1,
    },
  } as TestCase<'detailedScan'>,
  {
    key: 'detailedScan',
    data: {
      sessionTotalDetailedScans: 23,
    },
  } as TestCase<'detailedScan'>,
  {
    key: 'cargoScan',
    data: {
      sessionTotalCargoScans: 1,
    },
  } as TestCase<'cargoScan'>,
  {
    key: 'cargoScan',
    data: {
      sessionTotalCargoScans: 23,
    },
  } as TestCase<'cargoScan'>,
  {
    key: 'soldExplorationData',
    data: {
      sessionTotalSoldExplorationDataValue: 150000,
      sessionTotalSoldExplorationDataValueCr: formatCredits(150000),
      lastSoldExplorationDataValue: 150000,
      lastSoldExplorationDataValueCr: formatCredits(150000),
      sessionTotalSoldExplorationData: 1,
    },
  } as TestCase<'soldExplorationData'>,
  {
    key: 'soldExplorationData',
    data: {
      sessionTotalSoldExplorationDataValue: 12345678,
      sessionTotalSoldExplorationDataValueCr: formatCredits(12345678),
      lastSoldExplorationDataValue: 654321,
      lastSoldExplorationDataValueCr: formatCredits(654321),
      sessionTotalSoldExplorationData: 5,
    },
  } as TestCase<'soldExplorationData'>,
];
