import { EdData } from '@src/ed/data-manager';
import { t } from '@src/utils/i18n';
import { InfoGenerator } from '.';

type DataKeys = 'sessionTotalMissionsCompleted';
type Data = Pick<EdData, DataKeys>;
export type TranslationData = Data;

export class MissionsCompletedInfoGenerator extends InfoGenerator<DataKeys> {
  constructor() {
    super(['sessionTotalMissionsCompleted']);
  }

  protected generate(data: Data): string | string[] | undefined {
    return t('missionsCompleted', data);
  }
}
