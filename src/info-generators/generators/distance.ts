import { EdData } from '@src/ed/data-manager';
import { InfoGenerator } from '..';
import { StarPos } from '@src/ed/definitions';
import { formatLy } from '@src/utils/format';
import { t } from '@src/utils/i18n';

type DataKeys = 'currentCoords';
type Data = Pick<EdData, DataKeys>;

export class DistanceInfoGenerator extends InfoGenerator<DataKeys> {
  protected readonly target: StarPos;
  protected readonly name: string;

  constructor(target: StarPos, name: string) {
    super(['currentCoords']);

    this.target = target;
    this.name = name;
  }

  protected generate({ currentCoords }: Data): string | undefined {
    if (!currentCoords) return;

    const dx = currentCoords[0] - this.target[0];
    const dy = currentCoords[1] - this.target[1];
    const dz = currentCoords[2] - this.target[2];

    const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
    const roundedDistance = Math.floor(distance);

    return t('distance', {
      distance,
      roundedDistance,
      distanceLy: formatLy(distance),
      roundedDistanceLy: formatLy(distance),
      name: this.name,
    }) as string;
  }
}
