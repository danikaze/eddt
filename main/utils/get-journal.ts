import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';
import { FolderWatcher } from './folder-watcher';
import { msgLog } from './msgs';

const JOURNAL_REGEX = /Journal\.\d+\.\d+\.log$/;

export async function getJournalPath(
  folder: string,
  verbose: boolean,
  timeout = 0
): Promise<string> {
  const lastJournalFullPath = getLastJournalPath(folder);

  if (isJournalActive(lastJournalFullPath)) {
    return lastJournalFullPath;
  }

  return new Promise<string>((resolve, reject) => {
    if (verbose) {
      msgLog('Waiting for a new journal to be created...');
    }

    const watcher = new FolderWatcher(folder);

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

function getLastJournalPath(folder: string): string {
  const logs = readdirSync(folder)
    .filter((file) => JOURNAL_REGEX.test(file))
    .sort();
  return join(folder, logs[logs.length - 1]);
}

function isJournalActive(fullPath: string): boolean {
  const contents = readFileSync(fullPath).toString();

  return contents.indexOf('"event":"Shutdown"') === -1;
}
