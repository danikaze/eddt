// tslint:disable: no-magic-numbers

import { default as nodeCleanup } from 'node-cleanup';

import { initEventManager, getEventManager } from './ed/event-manager';
import { registerAllEvents } from './event-processors/register-all-events';
import { dataManager } from './ed/data-manager';
import { setLocale } from './utils/i18n';
import { readSettings, Settings } from './utils/settings';

import { WriteFileOutputter } from './outputters/write-file';
import { OutputRotator } from './outputters/middleware/rotator';
import { TextSpacer } from './outputters/middleware/text-spacer';
import { Outputter } from './outputters';

import { NavInfoGenerator } from './info-generators/nav';
import { GameModeInfoGenerator } from './info-generators/generators/game-mode';
import { HeatWarningsInfoGenerator } from './info-generators/generators/heat-warning';
import { ScannedInfoGenerator } from './info-generators/generators/scanned';
import { BountyInfoGenerator } from './info-generators/generators/bounty';
import { JumpDistanceInfoGenerator } from './info-generators/generators/jump-distance';
import { OnlyInMilestones } from './info-generators/middleware/milestone';
import { MaterialsCollectedInfoGenerator } from './info-generators/generators/material-collected';
import { MiningRefinedInfoGenerator } from './info-generators/generators/mining-refined';
import { ProspectedAsteroidsInfoGenerator } from './info-generators/generators/prospected-asteroids';
import { LaunchedDronesInfoGenerator } from './info-generators/generators/launched-drones';
import { InterdictionsEscapedInfoGenerator } from './info-generators/generators/interdiction-escaped';
import { InterdictionsLostInfoGenerator } from './info-generators/generators/interdiction-lost';
import { InterdictionsSubmittedInfoGenerator } from './info-generators/generators/interdiction-submitted';
import { MissionsCompletedInfoGenerator } from './info-generators/generators/missions-completed';
import { DockingsRequestedInfoGenerator } from './info-generators/generators/dockings-requested';
import { DockingsGrantedInfoGenerator } from './info-generators/generators/dockings-granted';
import { DockingsDeniedInfoGenerator } from './info-generators/generators/dockings-denied';
import { BodiesApproachedInfoGenerator } from './info-generators/generators/bodies-approached';
import { FactionKillBondInfoGenerator } from './info-generators/generators/faction-kill-bond';
import { SoldExplorationDataInfoGenerator } from './info-generators/generators/exploration-data-sold';
import { ScanDetailedInfoGenerator } from './info-generators/generators/scan-detailed';
import { ScanCargoInfoGenerator } from './info-generators/generators/scan-cargo';

const spacer = { prefix: ' ', postfix: ' ' };

nodeCleanup((exitCode, signal) => {
  nodeCleanup.uninstall();
  console.log(`\nExiting... (${exitCode}, ${signal})`);
  Outputter.destroyAll().then(() => process.exit(exitCode || undefined));
  return false;
});

(async () => {
  console.log(
    `============ [${PACKAGE_NAME}-${PACKAGE_VERSION}] ============\n`
  );

  let settings: Required<Settings>;
  try {
    settings = readSettings();
  } catch (e) {
    console.error('Error reading settings file', e.message, '=> Exiting');
    process.exit(1);
  }

  setLocale(settings.locale);

  if (settings.displaySettings) {
    console.table(settings);
  }

  try {
    await initEventManager(settings.eventManager);
    getEventManager().on('Shutdown', () => {
      if (settings.displayFinalData) {
        console.table(dataManager.getAll());
      }
      process.kill(0);
    });
  } catch (e) {
    console.error(e, '=> Exiting');
    process.exit(1);
  }

  registerAllEvents();

  if (settings.navFilePath) {
    new NavInfoGenerator().pipe(
      new TextSpacer(spacer).pipe(
        new WriteFileOutputter(settings.navFilePath, settings.navFileOptions)
      )
    );
  }

  if (settings.gameModeFilePath) {
    new GameModeInfoGenerator().pipe(
      new TextSpacer(spacer).pipe(
        new WriteFileOutputter(
          settings.gameModeFilePath,
          settings.gameModeFileOptions
        )
      )
    );
  }

  if (!settings.eventsFilePath) return;
  new OutputRotator({ repeatTimes: 1 })
    .pipe(
      new TextSpacer(spacer).pipe(
        new WriteFileOutputter(
          settings.eventsFilePath,
          settings.eventsFileOptions
        )
      )
    )
    .source([
      new HeatWarningsInfoGenerator(),
      new ScannedInfoGenerator(),
      new BountyInfoGenerator(),
      new FactionKillBondInfoGenerator(),
      new JumpDistanceInfoGenerator().use(
        new OnlyInMilestones(
          'sessionTotalJumpDistance',
          [100, 250, 500, 1000, 2500, 5000],
          { cap: true }
        )
      ),
      new MaterialsCollectedInfoGenerator().use(
        new OnlyInMilestones('sessionTotalMaterialsCollected', [5, 10, 25, 50])
      ),
      new MiningRefinedInfoGenerator().use(
        new OnlyInMilestones('sessionTotalMiningRefined', [5, 10, 25, 50])
      ),
      new ProspectedAsteroidsInfoGenerator().use(
        new OnlyInMilestones('sessionTotalAsteroidsProspected', [5, 10, 25, 50])
      ),
      new LaunchedDronesInfoGenerator().use(
        new OnlyInMilestones('sessionTotalDronesLaunched', [5, 10, 25, 50])
      ),
      new MissionsCompletedInfoGenerator().use(
        new OnlyInMilestones('sessionTotalMissionsCompleted', [1, 3, 5, 10])
      ),
      new InterdictionsEscapedInfoGenerator(),
      new InterdictionsLostInfoGenerator(),
      new InterdictionsSubmittedInfoGenerator(),
      new DockingsRequestedInfoGenerator().use(
        new OnlyInMilestones('sessionTotalDockingsRequested', [1, 5, 10, 20])
      ),
      new DockingsGrantedInfoGenerator().use(
        new OnlyInMilestones('sessionTotalDockingsGranted', [1, 5, 10, 20])
      ),
      new DockingsDeniedInfoGenerator(),
      new BodiesApproachedInfoGenerator().use(
        new OnlyInMilestones('sessionTotalBodiesApproached', [1, 5, 10, 20])
      ),
      new SoldExplorationDataInfoGenerator(),
      new ScanDetailedInfoGenerator(),
      new ScanCargoInfoGenerator(),
    ]);
})();
