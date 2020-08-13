import { default as nodeCleanup } from 'node-cleanup';

import { initEventManager, getEventManager } from './ed/event-manager';
import { registerAllEvents } from './event-processors/register-all-events';
import { dataManager } from './ed/data-manager';
import { setLocale } from './utils/i18n';
import { readSettings, Settings, registerOutputs } from './settings';
import { Outputter } from './outputters';
import { flattenObject } from './utils/flatten-object';

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
    console.table(flattenObject(settings, ['outputs']));
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
  registerOutputs(settings.outputs);
})();
