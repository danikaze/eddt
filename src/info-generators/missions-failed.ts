import { EdData } from '@src/ed/data-manager';
import { t } from '@src/utils/i18n';
import { InfoGenerator } from '.';

type DataKeys = 'sessionTotalMissionsFailed';
type Data = Pick<EdData, DataKeys>;
export type TranslationData = Data;

export class MissionsFailedInfoGenerator extends InfoGenerator<DataKeys> {
  constructor() {
    super(['sessionTotalMissionsFailed']);
  }

  protected generate(data: Data): string | string[] | undefined {
    return t('missionsFailed', data);
  }
}
