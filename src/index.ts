import { addEdEventListener } from './event-processors';
import {
  NavRoute,
  FSDJump,
  Docked,
  Undocked,
  ApproachBody,
  LeaveBody,
} from './event-processors/nav';
import { addOutputGenerator } from './info';
import { NavInfo } from './info/nav';

/*
 * Nav
 */
addEdEventListener(NavRoute);
addEdEventListener(FSDJump);
addEdEventListener(Docked);
addEdEventListener(Undocked);
addEdEventListener(ApproachBody);
addEdEventListener(LeaveBody);

addOutputGenerator(NavInfo);
