// tslint:disable:no-console

import { EventEmitter } from 'eventemitter3';
import { readFileSync } from 'fs';
import { join } from 'path';
import { ED_FOLDER } from '@src/constants';
import { getJournalPath } from '@src/utils/get-journal';
import { EdNavRouteEvent, EdFSDJumpEvent, EdEvent } from './interfaces';
import { ReadLineWatcher } from '@src/utils/read-line-watcher';

type LogLevel = 'usedEvents' | 'pastEvents' | 'unusedEvents';

export interface EventManagerOptions {
  verbose: LogLevel[];
  /**
   * number of milliseconds to start ignoring past events
   * (0 -by default- to disable)
   */
  ignorePast: number;
}

export interface EventData {
  old: EdEvent;
  NavRoute: EdNavRouteEvent;
  FSDJump: EdFSDJumpEvent;
  Shutdown: EdEvent;
}

export type EventType = keyof EventData;
export type EventListener<T extends EventType> = (data: EventData[T]) => void;

export interface EdEventManager {
  on<E extends EventType>(event: E, listener: EventListener<E>): void;
}

class EventManager extends EventEmitter<EventType> {
  protected static readonly defaultOptions: Partial<EventManagerOptions> = {
    verbose: [],
    ignorePast: 0,
  };

  protected static fileEvents: EventType[] = ['NavRoute'];

  protected readonly verbose: LogLevel[];
  protected readonly ignorePast: number;
  protected readonly logingEvents: EventType[] = [];
  protected readonly dateFormat: Intl.DateTimeFormat;
  protected readonly timeFormat: Intl.DateTimeFormat;

  constructor(options?: Partial<EventManagerOptions>) {
    super();

    this.journalListener = this.journalListener.bind(this);

    const opt = {
      ...EventManager.defaultOptions,
      ...options,
    } as EventManagerOptions;
    this.verbose = opt.verbose;
    this.ignorePast = opt.ignorePast;
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

    const journalPath = getJournalPath();
    const watcher = new ReadLineWatcher(journalPath);
    watcher.addListener('line', this.journalListener);

    this.on('Shutdown', () => watcher.stop());
    this.on('old', (event: EdEvent) => {
      if (event.event === 'Shutdown') {
        watcher.stop();
      }
    });
  }

  protected static parseEdEvent<T extends EdEvent = EdEvent>(
    json: string
  ): T | undefined {
    try {
      return JSON.parse(json, (name, data) =>
        name === 'timestamp' ? new Date(data) : data
      ) as T;
    } catch (e) {
      console.error(`Error parsing event: ${json}`);
    }
  }

  protected static parseEdEventFile<T extends EdEvent = EdEvent>(
    path: string
  ): T | undefined {
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
    const ignoreBefore = new Date().getTime() - this.ignorePast;
    const data = EventManager.parseEdEvent(line);
    if (!data) return;

    if (this.ignorePast > 0 && data.timestamp.getTime() < ignoreBefore) {
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
    const data = EventManager.parseEdEventFile(path);
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

const instance = new EventManager({
  verbose: ['usedEvents', 'pastEvents'],
});

export const eventManager = (instance as unknown) as EdEventManager;
