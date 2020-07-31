import { EdData } from '@src/ed/data-manager';
import { InfoGenerator } from '.';
import { formatLy } from '@src/utils/format';

type DataKeys = 'sessionTotalJumpDistance';
type Data = Pick<EdData, DataKeys>;

export class JumpDistanceInfoGenerator extends InfoGenerator<DataKeys> {
  constructor() {
    super(['sessionTotalJumpDistance']);
  }

  protected generate({ sessionTotalJumpDistance }: Data): string | undefined {
    if (!sessionTotalJumpDistance) return;

    const ly = formatLy(sessionTotalJumpDistance);

    return `Hemos saltado más de ${ly} en esta sesión de juego`;
  }
}
