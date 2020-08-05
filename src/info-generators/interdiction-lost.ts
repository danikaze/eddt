import { EdData } from '@src/ed/data-manager';
import { t } from '@src/utils/i18n';
import { InfoGenerator } from '.';

type DataKeys = 'sessionTotalInterdictionsReceivedLost';
type Data = Pick<EdData, DataKeys>;
export type TranslationData = Data;

export class InterdictionsLostInfoGenerator extends InfoGenerator<DataKeys> {
  constructor() {
    super(['sessionTotalInterdictionsReceivedLost']);
  }

  protected generate(data: Data): string | string[] | undefined {
    return t('interdictionsLost', data);
  }
}
