import { EdData } from '@main/ed/data-manager';
import { StarPos } from '@main/ed/definitions';
import { formatLy } from '@main/utils/format';
import { t } from '@main/utils/i18n';
import { InfoGenerator } from '..';

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
