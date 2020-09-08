import { Settings, readSettings, registerOutputs } from '@main/settings';
import { initMessages, msgLog, msgError, msgTable } from '@utils/msgs';
import { setLocale } from '@utils/i18n';
import { flattenObject } from '@main/utils/flatten-object';
import { initEventManager, getEventManager } from './ed/event-manager';
import { dataManager } from './ed/data-manager';
import { registerAllEvents } from './event-processors/register-all-events';

export interface MainOptions {
  mainWindow: Electron.BrowserWindow;
}

/**
 * Main process called when the window is ready
 */
export const main: (options: MainOptions) => Promise<void> = async ({
  mainWindow,
}) => {
  initMessages(mainWindow);
  msgLog(`============= [${PACKAGE_NAME}-${PACKAGE_VERSION}] =============\n`);

  let settings: Required<Settings>;
  try {
    settings = readSettings();
  } catch (e) {
    msgError('Error reading settings file', e.message, '=> Exiting');
    return;
  }

  setLocale(settings.locale);

  if (settings.displaySettings) {
    msgTable(flattenObject(settings, ['outputs']));
  }

  try {
    await initEventManager(settings.eventManager);
    getEventManager().on('Shutdown', () => {
      if (!settings.displayFinalData) return;
      const data = flattenObject(
        dataManager.getAll(),
        settings.finalDataBlackList
      );
      msgTable(data);
    });
  } catch (e) {
    msgError(e, '=> Exiting');
    process.exit(1);
  }

  registerAllEvents();
  registerOutputs(settings.outputs);
};
