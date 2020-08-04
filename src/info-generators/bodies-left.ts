import { EdData } from '@src/ed/data-manager';
import { InfoGenerator } from '.';

type DataKeys = 'sessionTotalBodiesLeft';
type Data = Pick<EdData, DataKeys>;

export class BodiesLeftInfoGenerator extends InfoGenerator<DataKeys> {
  constructor() {
    super(['sessionTotalBodiesLeft']);
  }

  protected generate({ sessionTotalBodiesLeft }: Data): string {
    return `Salida planetaria número ${sessionTotalBodiesLeft} de hoy`;
  }
}
