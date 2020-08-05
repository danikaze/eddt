import { EdData } from '@src/ed/data-manager';
import { t } from '@src/utils/i18n';
import { InfoGenerator } from '.';

type DataKeys = 'sessionTotalMissionsAbandoned';
type Data = Pick<EdData, DataKeys>;
export type TranslationData = Data;

export class MissionsAbandonedInfoGenerator extends InfoGenerator<DataKeys> {
  constructor() {
    super(['sessionTotalMissionsAbandoned']);
  }

  protected generate(data: Data): string | string[] | undefined {
    return t('missionsAbandoned', data);
  }
}
