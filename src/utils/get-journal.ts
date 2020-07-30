import { readdirSync } from 'fs';
import { join } from 'path';
import { ED_FOLDER } from '@src/constants';

export async function getJournalPath(): Promise<string> {
  const logs = readdirSync(ED_FOLDER)
    .filter((file) => /Journal\.\d+\.\d+\.log$/.test(file))
    .sort();
  return join(ED_FOLDER, logs[logs.length - 1]);
}
