import { existsSync, readFileSync } from 'fs';
import { Settings } from './types';

export function readSettingsFile(path: string): Partial<Settings> {
  if (existsSync(`${path}.js`)) {
    return __non_webpack_require__<Partial<Settings>>(`${path}.js`);
  }

  if (existsSync(`${path}.json`)) {
    const json = readFileSync(`${path}.json`).toString();
    return JSON.parse(json) as Partial<Settings>;
  }

  throw new Error('Settings file not found');
}
