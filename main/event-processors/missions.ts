import { EdEventProcessor } from '.';

export const MissionAccepted: EdEventProcessor<'MissionAccepted'> = {
  event: 'MissionAccepted',
  processor: (dataManager): void => {
    dataManager.increase('sessionTotalMissionsAccepted');
  },
};

export const MissionCompleted: EdEventProcessor<'MissionCompleted'> = {
  event: 'MissionCompleted',
  processor: (dataManager): void => {
    dataManager.increase('sessionTotalMissionsCompleted');
  },
};

export const MissionFailed: EdEventProcessor<'MissionFailed'> = {
  event: 'MissionFailed',
  processor: (dataManager): void => {
    dataManager.increase('sessionTotalMissionsFailed');
  },
};

export const MissionAbandoned: EdEventProcessor<'MissionAbandoned'> = {
  event: 'MissionAbandoned',
  processor: (dataManager): void => {
    dataManager.increase('sessionTotalMissionsAbandoned');
  },
};
