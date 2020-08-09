import { EdData } from '@src/ed/data-manager';
import { t } from '@src/utils/i18n';
import { InfoGenerator } from '.';

type DataKeys = 'sessionTotalCargoScans';
type Data = Pick<EdData, DataKeys>;
export type TranslationData = Data;

export class ScanCargoInfoGenerator extends InfoGenerator<DataKeys> {
  constructor() {
    super(['sessionTotalCargoScans']);
  }

  protected generate(data: Data): string | string[] | undefined {
    return t('cargoScan', data);
  }
}
