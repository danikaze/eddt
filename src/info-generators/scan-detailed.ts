import { EdData } from '@src/ed/data-manager';
import { t } from '@src/utils/i18n';
import { InfoGenerator } from '.';

type DataKeys = 'sessionTotalDetailedScans';
type Data = Pick<EdData, DataKeys>;
export type TranslationData = Data;

export class ScanDetailedInfoGenerator extends InfoGenerator<DataKeys> {
  constructor() {
    super(['sessionTotalDetailedScans']);
  }

  protected generate(data: Data): string | string[] | undefined {
    return t('detailedScan', data);
  }
}
