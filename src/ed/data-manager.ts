import EventEmitter from 'eventemitter3';
import { CombatRank } from './definitions';

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
  lastJumpDistance: number;
  sessionTotalJumpDistance: number;
  lastBountyReward: number;
  lastBountyShip: string;
  targetBounty: number;
  targetPilotName: string;
  targetPilotRank: CombatRank;
  targetShipShield: number;
  targetShipHull: number;
  sessionTotalBounty: number;
  sessionTotalPiratesKilled: number;
  sessionTotalInterdictionsReceived: number;
  sessionTotalInterdictionsReceivedEscaped: number;
  sessionTotalInterdictionsReceivedSubmitted: number;
  sessionTotalInterdictionsReceivedLost: number;
  sessionTotalScanned: number;
  sessionTotalHeatWarnings: number;
  sessionTotalDronesLaunched: number;
  sessionTotalProspectorDronesLaunched: number;
  sessionTotalCollectionDronesLaunched: number;
  sessionTotalAsteroidsProspected: number;
  sessionTotalMaterialsCollected: number;
  sessionTotalMaterialsRefined: number;
  sessionTotalMissionsAccepted: number;
  sessionTotalMissionsCompleted: number;
  sessionTotalMissionsFailed: number;
  sessionTotalMissionsAbandoned: number;
}>;

export type EdDataKey = keyof EdData;
type PickKeys<T, C> = { [P in keyof T]: T[P] extends C ? P : never }[keyof T];
export type EdDataNumericKey = PickKeys<Required<EdData>, number>;

export interface EdDataManager {
  eventsEnabled: boolean;
  set<K extends EdDataKey>(key: K, data: EdData[K]): void;
  increase<K extends EdDataNumericKey>(key: K, qty?: number): void;
  decrease<K extends EdDataNumericKey>(key: K, qty?: number): void;
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
  public eventsEnabled: boolean = false;

  protected readonly data: EdData = {};
  protected readonly events: EdDataKey[] = [];

  constructor() {
    super();
  }

  public set<K extends EdDataKey>(key: K, data: EdData[K]): void {
    if (this.data[key] === data) return;

    this.data[key] = data;

    if (this.eventsEnabled && this.events.indexOf(key) === -1) {
      this.events.push(key);
    }
  }

  public increase<K extends EdDataNumericKey>(key: K, qty: number = 1): void {
    this.set(key, ((this.data[key] as number) || 0) + qty);
  }

  public decrease<K extends EdDataNumericKey>(key: K, qty: number = 1): void {
    this.set(key, ((this.data[key] as number) || 0) - qty);
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

  protected modify<K extends EdDataKey>(key: K, data: EdData[K]): void {}
}

export const dataManager = new DataManager() as EdDataManager;
