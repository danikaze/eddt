import { EdData } from '@src/ed/data-manager';
import { formatCredits } from '@src/utils/format';
import { t } from '@src/utils/i18n';
import { InfoGenerator } from '.';

type DataKeys =
  | 'lastBountyReward'
  | 'lastBountyShip'
  | 'sessionTotalBounty'
  | 'sessionTotalPiratesKilled';
type Data = Pick<EdData, DataKeys>;
export interface TranslationData extends Data {
  cr: string;
  totalCr: string;
}

export class BountyInfoGenerator extends InfoGenerator<DataKeys> {
  constructor() {
    super([
      'lastBountyReward',
      'lastBountyShip',
      'sessionTotalBounty',
      'sessionTotalPiratesKilled',
    ]);
  }

  protected generate(data: Data): string | string[] | undefined {
    return t('bounty', {
      ...data,
      cr: formatCredits(data.lastBountyReward!),
      totalCr: formatCredits(data.sessionTotalBounty!),
    });
  }
}
