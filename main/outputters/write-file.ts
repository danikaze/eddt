import { writeFileSync } from 'fs';
import { basename, dirname, isAbsolute, join } from 'path';
import { extendObjectsOnly } from '@common-utils/extend-objects-only';
import { Outputter } from '.';
import { msgError, msgLog } from '@main/utils/msgs';
import { sync as mkdirp } from 'mkdirp';
import { ROOT_PATH } from '@main/constants';

export interface WriteFileOutputterOptions {
  verbose: boolean;
  clearOnStart: boolean;
  clearOnEnd: boolean;
}

export class WriteFileOutputter extends Outputter {
  public static readonly defaultOptions: WriteFileOutputterOptions = {
    verbose: true,
    clearOnStart: true,
    clearOnEnd: true,
  };

  protected readonly path: string;
  protected readonly options: WriteFileOutputterOptions;

  constructor(path: string, options?: Partial<WriteFileOutputterOptions>) {
    super();

    this.path = this.resolve(path);
    this.options = extendObjectsOnly(
      {},
      WriteFileOutputter.defaultOptions,
      options
    ) as WriteFileOutputterOptions;

    if (!this.options.clearOnStart) return;
    try {
      this.write('');
    } catch (e) {
      msgError(`Error clearing ${this.path}`);
    }
  }

  protected async process(info: string): Promise<void> {
    try {
      this.write(info);
      if (this.options.verbose) {
        msgLog(`${basename(this.path)} => ${info}`);
      }
    } catch (e) {
      msgError(`Error writting to ${this.path}`);
    }
  }

  protected async destroy(): Promise<void> {
    if (!this.options.clearOnEnd) return;
    try {
      this.write('');
    } catch (e) {
      msgError(`Error clearing ${this.path}`);
    }
  }

  protected write(text: string): void {
    mkdirp(dirname(this.path));
    writeFileSync(this.path, text);
  }

  protected resolve(path: string): string {
    return isAbsolute(path) ? path : join(ROOT_PATH, path);
  }
}
