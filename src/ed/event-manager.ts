import { EventEmitter } from 'eventemitter3';
import { readFileSync } from 'fs';
import { join, basename } from 'path';
import { ED_FOLDER } from '@src/constants';
import { getJournalPath } from '@src/utils/get-journal';
import {
  EdNavRouteEvent,
  EdFSDJumpEvent,
  EdEvent,
  EdDockedEvent,
  EdUnDockedEvent,
  EdApproachBodyEvent,
  EdLeaveBodyEvent,
  EdBountyEvent,
  EdShipTargetedEvent,
  EdScannedEvent,
} from './events';
import { ReadLineWatcher } from '@src/utils/read-line-watcher';

type LogLevel = 'usedEvents' | 'pastEvents' | 'unusedEvents';

export type EventManagerMiddleware = <E extends EventType>(
  event: EdEvent<E>
) => undefined | EdEvent<E>;

export interface EventManagerOptions {
  verbose: LogLevel[];
  middleware: EventManagerMiddleware[];
  isOld: (event: EdEvent<EventType>) => boolean;
}

export interface EventData {
  old: EdEvent<EventType>;
  NavRoute: EdNavRouteEvent;
  FSDJump: EdFSDJumpEvent;
  Docked: EdDockedEvent;
  Undocked: EdUnDockedEvent;
  ApproachBody: EdApproachBodyEvent;
  LeaveBody: EdLeaveBodyEvent;
  Bounty: EdBountyEvent;
  ShipTargeted: EdShipTargetedEvent;
  Scanned: EdScannedEvent;
  HeatWarning: EdEvent<'HeatWarning'>;
  Shutdown: EdEvent<'Shutdown'>;
}

export type EventType = keyof EventData;
export type EventListener<T extends EventType> = (data: EventData[T]) => void;

export interface EdEventManager {
  on<E extends EventType>(event: E, listener: EventListener<E>): void;
}

class EventManager extends EventEmitter<EventType> {
  protected static readonly defaultOptions: EventManagerOptions = {
    verbose: ['usedEvents', 'pastEvents'],
    middleware: [],
    isOld: () => false,
  };

  protected static fileEvents: EventType[] = ['NavRoute'];

  protected readonly verbose: LogLevel[];
  protected readonly middleware: EventManagerMiddleware[];
  protected readonly isOld: (event: EdEvent<EventType>) => boolean;
  protected readonly logingEvents: EventType[] = [];
  protected readonly dateFormat: Intl.DateTimeFormat;
  protected readonly timeFormat: Intl.DateTimeFormat;

  constructor(journalPath: string, options?: Partial<EventManagerOptions>) {
    super();

    this.journalListener = this.journalListener.bind(this);

    const opt = {
      ...EventManager.defaultOptions,
      ...options,
    } as EventManagerOptions;
    this.verbose = opt.verbose;
    this.middleware = opt.middleware;
    this.isOld = opt.isOld;
    this.dateFormat = new Intl.DateTimeFormat('ja', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
    });
    this.timeFormat = new Intl.DateTimeFormat('ja', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });

    const watcher = new ReadLineWatcher(journalPath);
    watcher.addListener('line', this.journalListener);

    this.on('Shutdown', () => watcher.stop());
    this.on('old', (event: EdEvent) => {
      if (event.event === 'Shutdown') {
        watcher.stop();
      }
    });
  }

  protected static parseEdEvent<T extends string = string>(
    json: string
  ): EdEvent<T> | undefined {
    try {
      return JSON.parse(json, (name, data) =>
        name === 'timestamp' ? new Date(data) : data
      ) as EdEvent<T>;
    } catch (e) {
      console.error(`Error parsing event: ${json}`);
    }
  }

  protected static parseEdEventFile<T extends string = string>(
    path: string
  ): EdEvent<T> | undefined {
    let json: string;
    try {
      json = readFileSync(path).toString();
    } catch (e) {
      console.error(`Error reading file: ${path}`);
      return;
    }

    return EventManager.parseEdEvent(json);
  }

  public emit<E extends EventType>(event: E, data: EventData[E]): boolean {
    this.log(event, data);
    return super.emit(event, data);
  }

  protected journalListener(line: string) {
    let data = EventManager.parseEdEvent<EventType>(line);
    if (!data) return;

    data = this.middleware.reduce(
      (event, middleware) => (event ? middleware(event) : event),
      data as EdEvent<EventType> | undefined
    );

    if (!data) return;

    if (this.isOld(data)) {
      this.emit('old', data);
      return;
    }

    const eventType = data.event as EventType;

    if (EventManager.fileEvents.includes(eventType)) {
      this.fileEvent(eventType);
    } else {
      this.emit(eventType, data);
    }
  }

  protected fileEvent(event: EventType): void {
    const path = join(ED_FOLDER, `${event}.json`);
    const data = EventManager.parseEdEventFile<EventType>(path);
    if (data) {
      this.emit(event, data);
    }
  }

  protected formatDate(timestamp: Date): string {
    const [
      { value: month },
      ,
      { value: day },
      ,
      { value: year },
    ] = this.dateFormat.formatToParts(timestamp);
    const date = `${year}-${month}-${day}`;
    const time = this.timeFormat.format(timestamp);

    return `${date} ${time}`;
  }

  protected log<E extends EventType>(event: E, data: EventData[E]): void {
    const { verbose } = this;

    if (verbose.length === 0) return;
    if (event === 'old' && !verbose.includes('pastEvents')) return;
    const listeners = this.listeners(data.event as EventType);
    if (listeners.length === 0 && !verbose.includes('unusedEvents')) return;
    if (listeners.length > 0 && !verbose.includes('usedEvents')) return;

    const timestamp = this.formatDate(data.timestamp);
    const txt =
      event === 'old'
        ? `[${timestamp}] *${data.event}`
        : `[${timestamp}] ${data.event}`;

    console.log(txt);
  }
}

let instance: EventManager;

export async function initEventManager(
  options?: Partial<EventManagerOptions>
): Promise<void> {
  const TIMEOUT = 0;
  const journalPath = await getJournalPath(TIMEOUT);

  console.log('Using journal file', basename(journalPath));

  if (!instance) {
    instance = new EventManager(journalPath, options);
  }
}

export function getEventManager(): EventManager {
  if (!instance) throw new Error('Need to call initEventManager() first');

  return instance;
}
