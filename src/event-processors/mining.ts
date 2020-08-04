import { EdEventProcessor } from '.';

export const LaunchDrone: EdEventProcessor<'LaunchDrone'> = {
  event: 'LaunchDrone',
  processor: (dataManager, event): void => {
    dataManager.increase('sessionTotalDronesLaunched');
    if (event.Type === 'Prospector') {
      dataManager.increase(`sessionTotalProspectorDronesLaunched`);
    } else if (event.Type === 'Collection') {
      dataManager.increase('sessionTotalCollectionDronesLaunched');
    }
  },
};

export const ProspectedAsteroid: EdEventProcessor<'ProspectedAsteroid'> = {
  event: 'ProspectedAsteroid',
  processor: (dataManager): void => {
    dataManager.increase('sessionTotalAsteroidsProspected');
  },
};

export const MaterialCollected: EdEventProcessor<'MaterialCollected'> = {
  event: 'MaterialCollected',
  processor: (dataManager, event): void => {
    dataManager.increase('sessionTotalMaterialsCollected', event.Count);
  },
};

export const MiningRefined: EdEventProcessor<'MiningRefined'> = {
  event: 'MiningRefined',
  processor: (dataManager): void => {
    dataManager.increase('sessionTotalMaterialsRefined');
  },
};
