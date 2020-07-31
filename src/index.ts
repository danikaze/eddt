import { join } from 'path';
import { addEdEventListener } from './event-processors';
import {
  NavRoute,
  FSDJump,
  Docked,
  Undocked,
  ApproachBody,
  LeaveBody,
} from './event-processors/nav';
import { NavInfoGenerator } from './info-generators/nav';
import { WriteFileOutputter } from './outputters/write-file';
import { OUTPUT_FOLDER } from './constants';
import { Scanned, HeatWarning } from './event-processors/misc';
import { Bounty, ShipTargeted } from './event-processors/pirates';
import { OutputRotator } from './outputters/rotator';
import { HeatWarningsInfoGenerator } from './info-generators/heat-warning';
import { ScannedInfoGenerator } from './info-generators/scanned';
import { initEventManager, EventType } from './ed/event-manager';
import { TextSpacer } from './outputters/text-spacer';
import { EdEvent } from './ed/events';

const OUTPUT_NAV = join(OUTPUT_FOLDER, 'nav.txt');
const OUTPUT_EVENTS = join(OUTPUT_FOLDER, 'events.txt');
const spacer = { prefix: ' ', postfix: ' ' };

const OLD_TIME = 30000; // 30 s
const OLD_EVENTS: EventType[] = [
  'Scanned',
  'HeatWarning',
  'Bounty',
  'ShipTargeted',
];
const isOld = (data: EdEvent<EventType>): boolean => {
  return (
    OLD_EVENTS.includes(data.event) &&
    Date.now() > data.timestamp.getTime() + OLD_TIME
  );
};

(async () => {
  try {
    await initEventManager({ isOld });
  } catch (e) {
    console.error(e, '=> Exiting');
    return;
  }

  /*
   * Nav
   */
  addEdEventListener(NavRoute);
  addEdEventListener(FSDJump);
  addEdEventListener(Docked);
  addEdEventListener(Undocked);
  addEdEventListener(ApproachBody);
  addEdEventListener(LeaveBody);

  new NavInfoGenerator().pipe(
    new TextSpacer(spacer).pipe(new WriteFileOutputter(OUTPUT_NAV))
  );

  /*
   * Events
   */
  addEdEventListener(Scanned);
  addEdEventListener(HeatWarning);
  addEdEventListener(Bounty);
  addEdEventListener(ShipTargeted);

  new OutputRotator({ repeatTimes: 1 })
    .pipe(new TextSpacer(spacer).pipe(new WriteFileOutputter(OUTPUT_EVENTS)))
    .source([new HeatWarningsInfoGenerator(), new ScannedInfoGenerator()]);
})();
