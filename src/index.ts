import { default as nodeCleanup } from 'node-cleanup';
import { join } from 'path';

import { initEventManager, EventType } from './ed/event-manager';
import { EdEvent } from './ed/events';

import { WriteFileOutputter } from './outputters/write-file';
import { OutputRotator } from './outputters/rotator';
import { TextSpacer } from './outputters/text-spacer';
import { Outputter } from './outputters';

import { NavInfoGenerator } from './info-generators/nav';
import { HeatWarningsInfoGenerator } from './info-generators/heat-warning';
import { ScannedInfoGenerator } from './info-generators/scanned';
import { initEventManager, EventType } from './ed/event-manager';
import { TextSpacer } from './outputters/text-spacer';
import { EdEvent } from './ed/events';
import { Outputter } from './outputters';

import { registerAllEvents } from './event-processors/register-all-events';

import { OUTPUT_FOLDER } from './constants';

const OUTPUT_NAV = join(OUTPUT_FOLDER, 'nav.txt');
const OUTPUT_EVENTS = join(OUTPUT_FOLDER, 'events.txt');
const spacer = { prefix: ' ', postfix: ' ' };

nodeCleanup((exitCode, signal) => {
  nodeCleanup.uninstall();
  console.log(`\nExiting... (${signal})`);
  Outputter.destroyAll().then(() => process.kill(process.pid, signal!));
  return false;
});

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

  registerAllEvents();

  new NavInfoGenerator().pipe(
    new TextSpacer(spacer).pipe(new WriteFileOutputter(OUTPUT_NAV))
  );

  new OutputRotator({ repeatTimes: 1 })
    .pipe(new TextSpacer(spacer).pipe(new WriteFileOutputter(OUTPUT_EVENTS)))
    .source([
      new HeatWarningsInfoGenerator(),
      new ScannedInfoGenerator(),
    .source([new HeatWarningsInfoGenerator(), new ScannedInfoGenerator()]);
    ]);
})();
