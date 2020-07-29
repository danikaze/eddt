import EventEmitter from 'eventemitter3';

/**
 * List of used and accessible data
 * Everything optional since could not be available depending on the situation
 */
export type EdData = Partial<{
  currentBody: string;
  currentStation: string;
  currentSystem: string;
  routeTargetSystem: string;
  routeFull: string[];
  routeJumpsLeft: number;
}>;

export type EdDataKey = keyof EdData;

export interface EdDataManager {
  set<K extends EdDataKey>(key: K, data: EdData[K]): void;
  delete<K extends EdDataKey>(key: K): void;
  get<K extends EdDataKey>(key: K): EdData[K];
  update(): void;
  on(event: EdDataKey, listener: (value: number) => void): void;
}

/**
 * Centralize all the data extracted from the Journal
 * so it's shared across the modules
 */
class DataManager extends EventEmitter<EdDataKey> implements EdDataManager {
  protected readonly data: EdData = {};
  protected readonly events: EdDataKey[] = [];

  constructor() {
    super();
  }

  public set<K extends EdDataKey>(key: K, data: EdData[K]): void {
    if (this.data[key] === data) return;

    this.data[key] = data;

    if (this.events.indexOf(key) === -1) {
      this.events.push(key);
    }
  }

  public delete<K extends EdDataKey>(key: K): void {
    this.set(key, undefined);
  }

  public get<K extends EdDataKey>(key: K): EdData[K] {
    return this.data[key];
  }

  public update(): void {
    const timestamp = Date.now();

    while (this.events.length > 0) {
      const event = this.events.shift() as EdDataKey;
      this.emit(event, timestamp);
    }
  }
}

export const dataManager = new DataManager() as EdDataManager;
