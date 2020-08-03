import { EdData } from '@src/ed/data-manager';
import { InfoGenerator } from '.';

type DataKeys = 'sessionTotalMissionsFailed';
type Data = Pick<EdData, DataKeys>;

export class MissionsFailedInfoGenerator extends InfoGenerator<DataKeys> {
  constructor() {
    super(['sessionTotalMissionsFailed']);
  }

  protected generate({ sessionTotalMissionsFailed }: Data): string {
    if (sessionTotalMissionsFailed === 1) {
      return 'Primera misión que fallamos hoy :(';
    }
    return `Hoy hemos fallado ${sessionTotalMissionsFailed} misiones T_T`;
  }
}
