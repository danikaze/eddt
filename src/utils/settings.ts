import { dirname } from 'path';
import { existsSync, readFileSync } from 'fs';
import { SETTINGS_PATH } from '@src/constants';
import { LogEvent } from '@src/ed/event-manager';

export interface Settings {
  locale?: string;
  displaySettings?: boolean;
  displayFinalData?: boolean;
  eventManager: {
    journalFolder?: string;
    verbose?: boolean;
    logEvents?: LogEvent[];
    ignoreBefore?: number;
  };
  navFilePath?: string;
  navFileOptions?: {
    verbose?: boolean;
    clearOnStart?: boolean;
    clearOnEnd?: boolean;
  };
  eventsFilePath?: string;
  eventsFileOptions?: {
    verbose?: boolean;
    clearOnStart?: boolean;
    clearOnEnd?: boolean;
  };
}

export function readSettings(): Required<Settings> {
  const fileValues = readFile(SETTINGS_PATH);
  const userSettings: Partial<Settings> = {
    locale: 'en',
    displayFinalData: false,
    displaySettings: false,
    ...fileValues,
    eventManager: {
      verbose: true,
      logEvents: [],
      ignoreBefore: 30000,
      ...fileValues.eventManager,
    },
    navFileOptions: {
      clearOnStart: true,
      clearOnEnd: true,
      verbose: false,
      ...fileValues.navFileOptions,
    },
    eventsFileOptions: {
      clearOnStart: true,
      clearOnEnd: true,
      verbose: false,
      ...fileValues.navFileOptions,
    },
  };

  if (userSettings.navFilePath) {
    requireFile('outputNavFile', dirname(userSettings.navFilePath!));
  }
  if (userSettings.eventsFilePath) {
    requireFile('outputEventsFile', dirname(userSettings.eventsFilePath!));
  }

  return userSettings as Required<Settings>;
}

function readFile(path: string): Partial<Settings> {
  if (existsSync(`${path}.js`)) {
    const module = __non_webpack_require__(`${path}.js`);
    return module as Partial<Settings>;
  }

  if (existsSync(`${path}.json`)) {
    const json = readFileSync(`${path}.json`).toString();
    return JSON.parse(json) as Partial<Settings>;
  }

  throw new Error('Settings file not found');
}

function requireFile(name: string, path?: string): void {
  if (path && existsSync(path)) return;
  throw new Error(`${name} (${path}) doesn't exist`);
}
