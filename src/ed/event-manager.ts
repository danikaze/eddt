import { homedir } from 'os';
import { EventEmitter } from 'eventemitter3';
import { readFileSync } from 'fs';
import { join, basename } from 'path';
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
  EdProspectedAsteroidEvent,
  EdMaterialCollectedEvent,
  EdLaunchDroneEvent,
  EdMiningRefinedEvent,
  EdEscapeInterdictionEvent,
  EdInterdictedEvent,
  EdMissionAcceptedEvent,
  EdMissionCompletedEvent,
  EdMissionFailedEvent,
  EdMissionAbandonedEvent,
  EdDockingDeniedEvent,
  EdDockingGrantedEvent,
  EdDockingRequestedEvent,
  EdFactionKillBondEvent,
  EdFSSDiscoveryScanEvent,
  EdFSSSignalDiscoveredEvent,
  EdScanEvent,
  EdSellExplorationDataEvent,
  EdMultiSellExplorationDataEvent,
  EdLoadGameEvent,
} from './events';
import { ReadLineWatcher } from '@src/utils/read-line-watcher';
import { dataManager } from './data-manager';

export type LogEvent = 'used' | 'unused';

export type EventManagerMiddleware = <E extends EventType>(
  event: EventData[E]
) => EventData[E] | undefined;

export interface EventManagerOptions {
  journalFolder: string;
  verbose?: boolean;
  logEvents?: LogEvent[];
  middleware?: EventManagerMiddleware[];
  ignoreBefore?: number;
}

export interface EventData {
  LoadGame: EdLoadGameEvent;
  NavRoute: EdNavRouteEvent;
  FSDJump: EdFSDJumpEvent;
  Docked: EdDockedEvent;
  Undocked: EdUnDockedEvent;
  ApproachBody: EdApproachBodyEvent;
  LeaveBody: EdLeaveBodyEvent;
  Bounty: EdBountyEvent;
  FactionKillBond: EdFactionKillBondEvent;
  ShipTargeted: EdShipTargetedEvent;
  EscapeInterdiction: EdEscapeInterdictionEvent;
  Interdicted: EdInterdictedEvent;
  Scanned: EdScannedEvent;
  HeatWarning: EdEvent<'HeatWarning'>;
  LaunchDrone: EdLaunchDroneEvent;
  ProspectedAsteroid: EdProspectedAsteroidEvent;
  MaterialCollected: EdMaterialCollectedEvent;
  MiningRefined: EdMiningRefinedEvent;
  MissionAccepted: EdMissionAcceptedEvent;
  MissionCompleted: EdMissionCompletedEvent;
  MissionFailed: EdMissionFailedEvent;
  MissionAbandoned: EdMissionAbandonedEvent;
  DockingDenied: EdDockingDeniedEvent;
  DockingGranted: EdDockingGrantedEvent;
  DockingRequested: EdDockingRequestedEvent;
  FSSDiscoveryScan: EdFSSDiscoveryScanEvent;
  FSSSignalDiscovered: EdFSSSignalDiscoveredEvent;
  Scan: EdScanEvent;
  SellExplorationData: EdSellExplorationDataEvent;
  MultiSellExplorationData: EdMultiSellExplorationDataEvent;
  Shutdown: EdEvent<'Shutdown'>;
}

export type EventType = keyof EventData;
export type EventListener<T extends EventType> = (data: EventData[T]) => void;

type FileEventType =
  // | 'Cargo'
  // | 'Market'
  // | 'ModulesInfo'
  'NavRoute';
// | 'Outfitting'
// | 'Shipyard'
// | 'Status'
export type NoFileEventType = Exclude<EventType, FileEventType>;

export interface EdEventManager {
  on<E extends EventType>(event: E, listener: EventListener<E>): void;
}

class EventManager extends EventEmitter<EventType> {
  public static readonly defaultOptions: Required<EventManagerOptions> = {
    journalFolder: join(
      homedir(),
      'Saved Games',
      'Frontier Developments',
      'Elite Dangerous'
    ),
    verbose: true,
    logEvents: ['used'],
    middleware: [],
    ignoreBefore: 30000,
  };

  protected static fileEvents: EventType[] = [
    // 'Cargo',
    // 'Market',
    // 'ModulesInfo',
    'NavRoute',
    // 'Outfitting
    // 'Shipyard',
    // 'Status',
  ];

  protected readonly options: Required<EventManagerOptions>;
  protected readonly logingEvents: EventType[] = [];
  protected readonly dateFormat: Intl.DateTimeFormat;
  protected readonly timeFormat: Intl.DateTimeFormat;

  constructor(journalPath: string, options: Required<EventManagerOptions>) {
    super();

    this.journalListener = this.journalListener.bind(this);

    this.options = options;
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

    if (this.options.verbose) {
      console.log('Using journal file', basename(journalPath));
    }

    const watcher = new ReadLineWatcher(journalPath);
    watcher.addListener('line', this.journalListener);

    this.on('Shutdown', () => watcher.stop());
  }

  protected static parseEdEvent<E extends EventType>(
    json: string
  ): EventData[E] | undefined {
    try {
      return JSON.parse(json, (name, data) =>
        name === 'timestamp' ? new Date(data) : data
      ) as EventData[E];
    } catch (e) {
      console.error(`Error parsing event: ${json}`);
    }
  }

  protected static parseEdEventFile<E extends EventType>(
    path: string
  ): EventData[E] | undefined {
    let json: string;
    try {
      json = readFileSync(path).toString();
    } catch (e) {
      console.error(`Error reading file: ${path}`);
      return;
    }

    return EventManager.parseEdEvent(json);
  }

  protected static isFileEvent(
    data: EdEvent<EventType>
  ): data is EdEvent<FileEventType> {
    return EventManager.fileEvents.includes(data.event);
  }

  public emit<E extends EventType>(event: E, data: EventData[E]): boolean {
    this.log(data);
    dataManager.eventsEnabled =
      Date.now() < data.timestamp.getTime() + this.options.ignoreBefore;
    return super.emit(event, data);
  }

  public use(middleware: EventManagerMiddleware): this {
    this.options.middleware.push(middleware);
    return this;
  }

  protected journalListener(line: string) {
    let data = EventManager.parseEdEvent<EventType>(line);

    data = this.options.middleware.reduce(
      (event, middleware) => (event ? middleware(event) : event),
      data
    );

    if (!data) return;

    if (EventManager.isFileEvent(data)) {
      this.fileEvent(data.event);
    } else {
      this.emit(data.event, data);
    }
  }

  protected fileEvent<E extends FileEventType>(event: E): void {
    const path = join(this.options.journalFolder, `${event}.json`);
    const data = EventManager.parseEdEventFile<E>(path);
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

  protected log(data: EdEvent<EventType>): void {
    const { logEvents: verbose } = this.options;

    if (verbose.length === 0) return;
    const listeners = this.listeners(data.event as EventType);
    if (listeners.length === 0 && !verbose.includes('unused')) return;
    if (listeners.length > 0 && !verbose.includes('used')) return;

    const timestamp = this.formatDate(data.timestamp);
    console.log(`[${timestamp}] ${data.event}`);
  }
}

let instance: EventManager;

export async function initEventManager(
  options?: Partial<EventManagerOptions>
): Promise<void> {
  const TIMEOUT = 0;
  const opt = {
    ...EventManager.defaultOptions,
    ...options,
  };
  const journalPath = await getJournalPath(
    opt.journalFolder,
    opt.verbose,
    TIMEOUT
  );

  if (!instance) {
    instance = new EventManager(journalPath, opt);
  }
}

export function getEventManager(): EventManager {
  if (!instance) throw new Error('Need to call initEventManager() first');

  return instance;
}
