import { homedir } from 'os';
import { join } from 'path';

export const ED_FOLDER = join(
  homedir(),
  'Saved Games',
  'Frontier Developments',
  'Elite Dangerous'
);

export const OUTPUT_FOLDER = join('D:', 'Videos', 'tokyoretrogames', 'elite');
