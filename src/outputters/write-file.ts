// tslint:disable:no-console
import { writeFileSync } from 'fs';
import { basename } from 'path';
import { Outputter } from '.';

export interface WriteFileOutputterOptions {
  verbose: boolean;
  clearOnStart: boolean;
  prefix: string;
  postfix: string;
}

export class WriteFileOutputter extends Outputter {
  public static readonly defaultOptions: WriteFileOutputterOptions = {
    verbose: true,
    clearOnStart: true,
    prefix: '',
    postfix: '',
  };

  protected readonly path: string;
  protected readonly options: WriteFileOutputterOptions;

  constructor(path: string, options?: Partial<WriteFileOutputterOptions>) {
    super();

    this.path = path;
    this.options = {
      ...WriteFileOutputter.defaultOptions,
      ...options,
    };

    if (!this.options.clearOnStart) return;
    try {
      writeFileSync(this.path, '');
    } catch (e) {
      console.error(`Error clearing ${this.path}`);
    }
  }

  public async put(info: string): Promise<void> {
    const { prefix, postfix } = this.options;
    const output = `${prefix}${info}${postfix}`;

    try {
      writeFileSync(this.path, output);
      if (this.options.verbose) {
        console.log(`${basename(this.path)} => ${output}`);
      }
    } catch (e) {
      console.error(`Error writting to ${this.path}`);
    }
  }
}
