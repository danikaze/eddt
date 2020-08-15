import { existsSync, readFileSync } from 'fs';
import { Settings } from './types';

export function readSettingsFile(path: string): Partial<Settings> {
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
