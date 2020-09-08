import { existsSync, readdirSync, statSync, copyFileSync } from 'fs';
import { UNPACKED_DIR, PACKED_DIR } from '@main/constants';
import { join, dirname } from 'path';
import { sync as mkdirp } from 'mkdirp';

/**
 * Unpacks the data from the `app.asar` file into real folders
 * so anyone can edit them
 *
 * It's done basically the first time the app is run (or when a file is deleted)
 * because if the file exists, it's skipped
 */
export async function unpackData(): Promise<void> {
  getPackedFiles(PACKED_DIR).forEach((from) => {
    const to = from.replace(PACKED_DIR, UNPACKED_DIR);
    if (existsSync(to)) return;

    mkdirp(dirname(to));
    copyFileSync(from, to);
  });
}

function getPackedFiles(path: string, files: string[] = []): string[] {
  readdirSync(path).forEach((file) => {
    const fullPath = join(path, file);
    const stats = statSync(fullPath);
    if (stats.isDirectory()) {
      getPackedFiles(fullPath, files);
    } else {
      files.push(fullPath);
    }
  });

  return files;
}
