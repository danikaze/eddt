import { EdData } from '@src/ed/data-manager';
import { t } from '@src/utils/i18n';
import { InfoGenerator } from '.';

type DataKeys =
  | 'sessionTotalSoldExplorationDataValue'
  | 'sessionTotalSoldExplorationDataValueCr'
  | 'lastSoldExplorationDataValue'
  | 'lastSoldExplorationDataValueCr'
  | 'sessionTotalSoldExplorationData';
type Data = Pick<EdData, DataKeys>;
export type TranslationData = Data;

export class SoldExplorationDataInfoGenerator extends InfoGenerator<DataKeys> {
  constructor() {
    super([
      'sessionTotalSoldExplorationDataValue',
      'sessionTotalSoldExplorationDataValueCr',
      'lastSoldExplorationDataValue',
      'lastSoldExplorationDataValueCr',
      'sessionTotalSoldExplorationData',
    ]);
  }

  protected generate(data: Data): string | string[] | undefined {
    return t('soldExplorationData', data);
  }
}
