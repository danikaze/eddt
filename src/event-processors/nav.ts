import { EdEventProcessor } from '.';

export const NavRoute: EdEventProcessor<'NavRoute'> = {
  event: 'NavRoute',
  processor: (dataManager, event): void => {
    const route = event.Route.map((elem) => elem.StarSystem);
    dataManager.set('routeFull', route);
    dataManager.set('currentSystem', route[0]);
    dataManager.set('routeTargetSystem', route[route.length - 1]);
    dataManager.set('routeJumpsLeft', route.length - 1);
  },
};

export const FSDJump: EdEventProcessor<'FSDJump'> = {
  event: 'FSDJump',
  processor: (dataManager, event): void => {
    const currentSystem = event.StarSystem;
    dataManager.set('currentSystem', currentSystem);
    dataManager.set('lastJumpDistance', event.JumpDist);
    dataManager.set('currentCoords', event.StarPos);
    dataManager.increase('sessionTotalJumpDistance', event.JumpDist);
    dataManager.delete('currentBody');

    const route = dataManager.get('routeFull');
    if (!route) return;

    const targetSystem = dataManager.get('routeTargetSystem');
    const index = route.indexOf(currentSystem);

    if (index === -1 || currentSystem === targetSystem) {
      dataManager.delete('routeFull');
      dataManager.delete('routeJumpsLeft');
    } else {
      dataManager.set('routeJumpsLeft', route.length - index - 1);
    }
  },
};

export const Docked: EdEventProcessor<'Docked'> = {
  event: 'Docked',
  processor: (dataManager, event): void => {
    dataManager.set('currentSystem', event.StarSystem);
    dataManager.set('currentStation', event.StationName);
  },
};

export const Undocked: EdEventProcessor<'Undocked'> = {
  event: 'Undocked',
  processor: (dataManager): void => {
    dataManager.delete('currentStation');
  },
};

export const ApproachBody: EdEventProcessor<'ApproachBody'> = {
  event: 'ApproachBody',
  processor: (dataManager, event): void => {
    dataManager.set('currentSystem', event.StarSystem);
    dataManager.set('currentBody', event.Body);
    dataManager.increase('sessionTotalBodiesApproached');
  },
};

export const LeaveBody: EdEventProcessor<'LeaveBody'> = {
  event: 'LeaveBody',
  processor: (dataManager): void => {
    dataManager.delete('currentBody');
    dataManager.increase('sessionTotalBodiesLeft');
  },
};
