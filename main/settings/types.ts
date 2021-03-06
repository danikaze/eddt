import { LogEvent } from '@main/ed/event-manager';
import { StarPos } from '@main/ed/definitions';

export interface Settings {
  locale?: string;
  displaySettings?: boolean;
  displayFinalData?: boolean;
  finalDataBlackList?: string[];
  eventManager: {
    journalFolder?: string;
    verbose?: boolean;
    logEvents?: LogEvent[];
    ignoreBefore?: number;
  };
  outputs?: OutputterSetting[];
}

export type OutputterSetting =
  | OutputterWriteFileSetting
  | OutputterRotatorFileSetting
  | OutputterTextSpacerSetting;
export type InfoSetting =
  | DataOutputInfoSetting
  | NavInfoSetting
  | DistanceInfoSetting;
export type InfoMiddlewareSetting = InfoMiddlewareMilestoneSetting;

type OutputterTypes = OutputterSetting['type'];
interface BaseOutputterSetting {
  type: OutputterTypes;
  onInput?: OutputterSetting;
  sources?: InfoSetting[];
}

export interface OutputterWriteFileSetting extends BaseOutputterSetting {
  type: 'writeFile';
  path: string;
  clearOnStart: boolean;
  clearOnEnd: boolean;
  verbose: boolean;
}

export interface OutputterRotatorFileSetting extends BaseOutputterSetting {
  type: 'rotator';
  rotationTime?: number;
  waitingTime?: number;
  repeatTimes?: number;
}

export interface OutputterTextSpacerSetting extends BaseOutputterSetting {
  type: 'textSpacer';
  ignoreEmptyString?: boolean;
  prefix?: string;
  postfix?: string;
}

interface BaseInfoSetting<T extends string> {
  type: T;
  onInput: InfoMiddlewareSetting[];
}

export interface DataOutputInfoSetting extends BaseInfoSetting<'dataOutput'> {
  i18n: string;
  infoData: string[];
}

export type NavInfoSetting = BaseInfoSetting<'nav'>;

export interface DistanceInfoSetting extends BaseInfoSetting<'distance'> {
  target: StarPos;
  name: string;
}

interface BaseInfoMiddlewareSetting<T extends string> {
  type: T;
}

export interface InfoMiddlewareMilestoneSetting
  extends BaseInfoMiddlewareSetting<'milestones'> {
  data: string;
  values: number[];
  cap?: boolean;
  extend?: boolean;
}
