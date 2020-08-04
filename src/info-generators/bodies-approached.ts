import { EdData } from '@src/ed/data-manager';
import { InfoGenerator } from '.';

type DataKeys = 'sessionTotalBodiesApproached';
type Data = Pick<EdData, DataKeys>;

export class BodiesApproachedInfoGenerator extends InfoGenerator<DataKeys> {
  constructor() {
    super(['sessionTotalBodiesApproached']);
  }

  protected generate({ sessionTotalBodiesApproached }: Data): string {
    return `Entrada planetaria número ${sessionTotalBodiesApproached} de hoy`;
  }
}
