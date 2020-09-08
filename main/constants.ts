import { join, dirname, resolve } from 'path';
import { app } from 'electron';

const DATA_FOLDER = 'data';

// where static data is packed when building
export const PACKED_DIR = join(app.getAppPath(), 'app', DATA_FOLDER);

// where static data is stored
export const UNPACKED_DIR = IS_PRODUCTION
  ? resolve(join(dirname(app.getAppPath()), '..', DATA_FOLDER))
  : join(__dirname, DATA_FOLDER);

// where locales are stored
export const LOCALES_FOLDER = join(UNPACKED_DIR, 'locales');
// settings file location without extension (will be resolved to .js or .json)
export const SETTINGS_PATH = join(UNPACKED_DIR, 'settings');

export const ROOT_PATH = IS_PRODUCTION
  ? resolve(join(dirname(app.getAppPath()), '..'))
  : __dirname;
