import { EdData } from '@src/ed/data-manager';
import { t } from '@src/utils/i18n';
import { InfoGenerator } from '.';

type DataKeys = 'sessionTotalMissionsAccepted';
type Data = Pick<EdData, DataKeys>;
export type TranslationData = Data;

export class MissionsAcceptedInfoGenerator extends InfoGenerator<DataKeys> {
  constructor() {
    super(['sessionTotalMissionsAccepted']);
  }

  protected generate(data: Data): string | string[] | undefined {
    return t('missionsAccepted', data);
  }
}
