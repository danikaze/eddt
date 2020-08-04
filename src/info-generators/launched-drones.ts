import { EdData } from '@src/ed/data-manager';
import { InfoGenerator } from '.';

type DataKeys = 'sessionTotalDronesLaunched';
type Data = Pick<EdData, DataKeys>;

export class LaunchedDronesInfoGenerator extends InfoGenerator<DataKeys> {
  constructor() {
    super(['sessionTotalDronesLaunched']);
  }

  protected generate({ sessionTotalDronesLaunched }: Data): string {
    return `Ya son ${sessionTotalDronesLaunched} drones utilizados hoy`;
  }
}
