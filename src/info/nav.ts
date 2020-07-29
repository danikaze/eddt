import { join } from 'path';
import { OUTPUT_FOLDER } from '@src/constants';
import { EdData } from '@src/ed/data-manager';
import { OutputGeneratorWriteFile } from '.';

type Data = Pick<
  EdData,
  | 'currentBody'
  | 'currentStation'
  | 'currentSystem'
  | 'routeTargetSystem'
  | 'routeJumpsLeft'
>;

export const NavInfo: OutputGeneratorWriteFile = {
  type: 'writeFile',
  data: [
    'currentBody',
    'currentStation',
    'currentSystem',
    'routeTargetSystem',
    'routeJumpsLeft',
  ],
  output: join(OUTPUT_FOLDER, 'nav.txt'),
  clearOnStart: true,
  generator: ({
    currentBody,
    currentStation,
    currentSystem,
    routeTargetSystem,
    routeJumpsLeft,
  }: Data): string => {
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

    return ` ${txt} `;
  },
};
