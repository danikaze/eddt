import { EdData } from '@src/ed/data-manager';
import { t } from '@src/utils/i18n';
import { InfoGenerator } from '.';

type DataKeys = 'sessionTotalScanned';
type Data = Pick<EdData, DataKeys>;
export type TranslationData = Data;

export class ScannedInfoGenerator extends InfoGenerator<DataKeys> {
  constructor() {
    super(['sessionTotalScanned']);
  }

  protected generate(data: Data): string | string[] | undefined {
    return t('scanned', data);
  }
}
