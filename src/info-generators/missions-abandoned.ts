import { EdData } from '@src/ed/data-manager';
import { InfoGenerator } from '.';

type DataKeys = 'sessionTotalMissionsAbandoned';
type Data = Pick<EdData, DataKeys>;

export class MissionsAbandonedInfoGenerator extends InfoGenerator<DataKeys> {
  constructor() {
    super(['sessionTotalMissionsAbandoned']);
  }

  protected generate({ sessionTotalMissionsAbandoned }: Data): string {
    if (sessionTotalMissionsAbandoned === 1) {
      return 'Primera misión que abandonamos hoy =_=';
    }
    return `Ya hemos abandonado ${sessionTotalMissionsAbandoned} misiones hoy...`;
  }
}
