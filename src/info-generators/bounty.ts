import { EdData } from '@src/ed/data-manager';
import { t } from '@src/utils/i18n';
import { InfoGenerator } from '.';

type DataKeys =
  | 'lastBountyReward'
  | 'lastBountyRewardCr'
  | 'lastBountyShip'
  | 'sessionTotalBounty'
  | 'sessionTotalBountyCr'
  | 'sessionTotalPiratesKilled';
type Data = Pick<EdData, DataKeys>;
export type TranslationData = Data;

export class BountyInfoGenerator extends InfoGenerator<DataKeys> {
  constructor() {
    super([
      'lastBountyReward',
      'lastBountyRewardCr',
      'lastBountyShip',
      'sessionTotalBounty',
      'sessionTotalBountyCr',
      'sessionTotalPiratesKilled',
    ]);
  }

  protected generate(data: Data): string | string[] | undefined {
    return t('bounty', data);
  }
}
