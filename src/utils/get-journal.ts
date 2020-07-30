import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';
import { ED_FOLDER } from '@src/constants';
import { FolderWatcher } from './folder-watcher';

const JOURNAL_REGEX = /Journal\.\d+\.\d+\.log$/;

export async function getJournalPath(timeout = 0): Promise<string> {
  const lastJournalFullPath = getLastJournalPath();

  if (isJournalActive(lastJournalFullPath)) {
    return lastJournalFullPath;
  }

  return new Promise<string>((resolve, reject) => {
    console.log('Waiting for a new journal to be created...');

    const watcher = new FolderWatcher(ED_FOLDER);

    watcher.on('fileAdded', (newFileFullPath: string) => {
      if (!JOURNAL_REGEX.test(newFileFullPath)) return;
      if (!isJournalActive(newFileFullPath)) return;

      resolve(newFileFullPath);
    });

    if (timeout) {
      setTimeout(() => {
        watcher.stop();
        reject('Timeout while waiting for journal file');
      }, timeout);
    }
  });
}

function getLastJournalPath(): string {
  const logs = readdirSync(ED_FOLDER)
    .filter((file) => JOURNAL_REGEX.test(file))
    .sort();
  return join(ED_FOLDER, logs[logs.length - 1]);
}

function isJournalActive(fullPath: string): boolean {
  const contents = readFileSync(fullPath).toString();

  return contents.indexOf('"event":"Shutdown"') === -1;
}
