import { SETTINGS_PATH } from '@main/constants';
import { createOutputter } from '@main/outputters/create-outputter';
import { Settings as S, OutputterSetting } from './types';
import { readSettingsFile } from './read-settings-file';

export type Settings = S;

export function readSettings(): Required<Settings> {
  const fileValues = readSettingsFile(SETTINGS_PATH);
  const userSettings: Partial<Settings> = {
    locale: 'en',
    displayFinalData: false,
    displaySettings: false,
    finalDataBlackList: [],
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
