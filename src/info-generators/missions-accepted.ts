import { EdData } from '@src/ed/data-manager';
import { InfoGenerator } from '.';

type DataKeys = 'sessionTotalMissionsAccepted';
type Data = Pick<EdData, DataKeys>;

export class MissionsAcceptedInfoGenerator extends InfoGenerator<DataKeys> {
  constructor() {
    super(['sessionTotalMissionsAccepted']);
  }

  protected generate({ sessionTotalMissionsAccepted }: Data): string {
    if (sessionTotalMissionsAccepted === 1) {
      return 'Aquí viene la primera misión del día!';
    }
    return `Hoy hemos aceptado ${sessionTotalMissionsAccepted} misiones ya`;
  }
}
