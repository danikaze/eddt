import { EdData } from '@src/ed/data-manager';
import { t } from '@src/utils/i18n';
import { InfoGenerator } from '.';
import { formatCredits } from '@src/utils/format';

type DataKeys =
  | 'sessionTotalSoldExplorationDataValue'
  | 'lastSoldExplorationDataValue'
  | 'sessionTotalSoldExplorationData';
type Data = Pick<EdData, DataKeys>;
export interface TranslationData extends Data {
  cr: string;
  totalCr: string;
}

export class SoldExplorationDataInfoGenerator extends InfoGenerator<DataKeys> {
  constructor() {
    super([
      'sessionTotalSoldExplorationDataValue',
      'lastSoldExplorationDataValue',
      'sessionTotalSoldExplorationData',
    ]);
  }

  protected generate(data: Data): string | string[] | undefined {
    return t('soldExplorationData', {
      ...data,
      cr: formatCredits(data.lastSoldExplorationDataValue!),
      totalCr: formatCredits(data.sessionTotalSoldExplorationDataValue!),
    });
  }
}
