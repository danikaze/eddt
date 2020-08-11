import { EdData } from '@src/ed/data-manager';
import { t } from '@src/utils/i18n';
import { InfoGenerator } from '.';

type DataKeys =
  | 'sessionTotalFactionKillBonds'
  | 'sessionTotalFactionKillBondRewards'
  | 'sessionTotalFactionKillBondRewardsCr'
  | 'lastFactionKillReward'
  | 'lastFactionKillRewardCr';
type Data = Pick<EdData, DataKeys>;
export type TranslationData = Data;

export class FactionKillBondInfoGenerator extends InfoGenerator<DataKeys> {
  constructor() {
    super([
      'sessionTotalFactionKillBonds',
      'sessionTotalFactionKillBondRewards',
      'sessionTotalFactionKillBondRewardsCr',
      'lastFactionKillReward',
      'lastFactionKillRewardCr',
    ]);
  }

  protected generate(data: Data): string | string[] | undefined {
    return t('factionKillBonds', data);
  }
}
