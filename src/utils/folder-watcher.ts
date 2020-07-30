import EventEmitter from 'eventemitter3';
import { readdirSync } from 'fs';
import { join } from 'path';

type EventType = 'fileAdded' | 'fileRemoved';

export interface FolderWatcherOptions {
  pollInterval: number;
  listenTo: EventType[];
}

/**
 * fs' watch method has some caveats so here's a poll-based implementation
 */
export class FolderWatcher extends EventEmitter<EventType> {
  public static readonly defaultOptions: FolderWatcherOptions = {
    pollInterval: 1000,
    listenTo: ['fileAdded'],
  };

  protected readonly path: string;
  protected readonly options: FolderWatcherOptions;
  protected lastFiles: string[];
  protected pollInterval: number;

  constructor(path: string, options?: Partial<FolderWatcherOptions>) {
    super();

    this.read = this.read.bind(this);

    this.path = path;
    this.options = { ...FolderWatcher.defaultOptions, ...options };
    this.lastFiles = readdirSync(this.path);

    this.pollInterval = (setInterval(
      this.read,
      this.options.pollInterval
    ) as unknown) as number;
  }

  public stop(): void {
    this.pollInterval && clearInterval(this.pollInterval);
  }

  protected read(): void {
    const currentFiles = readdirSync(this.path);
    const { options, lastFiles } = this;

    if (options.listenTo.includes('fileAdded')) {
      currentFiles.forEach((file) => {
        if (!lastFiles.includes(file)) {
          this.emit('fileAdded', join(this.path, file));
        }
      });
    }

    if (options.listenTo.includes('fileRemoved')) {
      lastFiles.forEach((file) => {
        if (!currentFiles.includes(file)) {
          this.emit('fileRemoved', join(this.path, file));
        }
      });
    }

    this.lastFiles = currentFiles;
  }
}
