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

const spacer = {
  prefix: ' ',
  postfix: ' ',
};

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
  new WriteFileOutputter(join(OUTPUT_FOLDER, 'nav.txt'), spacer)
);
