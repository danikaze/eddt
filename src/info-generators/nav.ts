import { join } from 'path';
import { EdData } from '@src/ed/data-manager';
import { InfoGenerator } from '.';

type DataKeys =
  | 'currentBody'
  | 'currentStation'
  | 'currentSystem'
  | 'routeTargetSystem'
  | 'routeJumpsLeft';
type Data = Pick<EdData, DataKeys>;

export class NavInfoGenerator extends InfoGenerator<DataKeys> {
  constructor() {
    super([
      'currentBody',
      'currentStation',
      'currentSystem',
      'routeTargetSystem',
      'routeJumpsLeft',
    ]);
  }

  protected generate({
    currentBody,
    currentStation,
    currentSystem,
    routeTargetSystem,
    routeJumpsLeft,
  }: Data): string {
    let txt: string;

    const currentLocationTxt = currentStation
      ? `${currentStation} (${currentSystem})`
      : currentBody || currentSystem || '';

    if (routeJumpsLeft) {
      txt =
        routeJumpsLeft === 1
          ? `${currentLocationTxt} > ${routeTargetSystem}`
          : routeJumpsLeft > 1
          ? `${currentLocationTxt} > ${routeJumpsLeft} jumps > ${routeTargetSystem}`
          : `${currentLocationTxt} > ??? > ${routeTargetSystem}`;
    } else {
      txt = currentLocationTxt;
    }

    return txt;
  }
}
