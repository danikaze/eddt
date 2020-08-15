import { SETTINGS_PATH } from '@src/constants';
import { createOutputter } from '@src/outputters/create-outputter';
import { Settings, OutputterSetting } from './types';
import { readSettingsFile } from './read-settings-file';

export { Settings };

export function readSettings(): Required<Settings> {
  const fileValues = readSettingsFile(SETTINGS_PATH);
  const userSettings: Partial<Settings> = {
    locale: 'en',
    displayFinalData: false,
    displaySettings: false,
    outputs: [],
    ...fileValues,
    eventManager: {
      verbose: true,
      logEvents: [],
      ignoreBefore: 30000,
      ...fileValues.eventManager,
    },
  };

  return userSettings as Required<Settings>;
}

export function registerOutputs(outputs: OutputterSetting[]): void {
  if (!outputs) return;

  outputs.forEach(createOutputter);
}
