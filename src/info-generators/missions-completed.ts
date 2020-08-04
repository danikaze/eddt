import { EdData } from '@src/ed/data-manager';
import { InfoGenerator } from '.';

type DataKeys = 'sessionTotalMissionsCompleted';
type Data = Pick<EdData, DataKeys>;

export class MissionsCompletedInfoGenerator extends InfoGenerator<DataKeys> {
  constructor() {
    super(['sessionTotalMissionsCompleted']);
  }

  protected generate({ sessionTotalMissionsCompleted }: Data): string {
    if (sessionTotalMissionsCompleted === 1) {
      return 'Primera misión del día finalizada!';
    }
    return `Ya van ${sessionTotalMissionsCompleted} misiones completadas hoy!`;
  }
}
