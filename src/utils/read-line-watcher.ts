// tslint:disable:no-console

import EventEmitter from 'eventemitter3';
import { open, watch, FSWatcher, createReadStream, read } from 'fs';
import { O_RDONLY } from 'constants';

export interface ReadLineWatcherOptions {
  readOnlyNewChanges: boolean;
  crlf: string;
  bufferSize: number;
}

/**
 * NodeJS' readline read lines but doesn't watch
 * fs' watch watches, but doesn't read line.
 * Combine both functionalities and get this class
 */
export class ReadLineWatcher extends EventEmitter<'line'> {
  public static readonly defaultOptions: ReadLineWatcherOptions = {
    readOnlyNewChanges: false,
    crlf: '\n',
    bufferSize: 0,
  };

  protected readonly watcher: FSWatcher;
  protected readBytes = 0;
  protected isReading = false;

  protected path: string;
  protected readOnlyNewChanges: boolean;
  protected crlf: string;

  constructor(path: string, options?: Partial<ReadLineWatcherOptions>) {
    super();
    this.read = this.read.bind(this);

    const opt = { ...ReadLineWatcher.defaultOptions, ...options };
    this.path = path;
    this.readOnlyNewChanges = opt.readOnlyNewChanges;
    this.crlf = opt.crlf;

    this.watcher = watch(path);
    this.watcher.addListener('change', this.read);
    if (!this.readOnlyNewChanges) {
      this.read();
    }
  }

  public stop(): void {
    this.watcher.close();
  }

  protected read(): void {
    if (this.isReading) return;
    this.isReading = true;

    open(this.path, O_RDONLY, (err, fd) => {
      if (err) {
        console.error(`Error opening file ${this.path}`);
        this.isReading = false;
        return;
      }

      const rs = createReadStream(this.path, {
        fd,
        start: this.readBytes,
      });

      let previous = '';

      rs.on('data', (data) => {
        this.readBytes += data.length;
        const lines = (previous + data.toString()).split(this.crlf);
        previous = lines[lines.length - 1];
        lines.slice(0, -1).forEach((line) => {
          const trimmedLine = line.trim();
          if (!trimmedLine) return;
          this.emit('line', trimmedLine);
        });
      });

      rs.on('end', () => {
        if (previous) {
          const trimmedLine = previous.trim();
          if (!trimmedLine) return;
          this.emit('line', trimmedLine);
        }
        this.isReading = false;
      });
    });
  }
}
