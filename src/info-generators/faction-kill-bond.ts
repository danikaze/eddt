import { EdData } from '@src/ed/data-manager';
import { formatCredits } from '@src/utils/format';
import { t } from '@src/utils/i18n';
import { InfoGenerator } from '.';

type DataKeys =
  | 'sessionTotalFactionKillBonds'
  | 'sessionTotalFactionKillBondRewards'
  | 'lastFactionKillReward';
type Data = Pick<EdData, DataKeys>;
export interface TranslationData extends Data {
  cr: string;
  totalCr: string;
}

export class FactionKillBondInfoGenerator extends InfoGenerator<DataKeys> {
  constructor() {
    super([
      'sessionTotalFactionKillBonds',
      'sessionTotalFactionKillBondRewards',
      'lastFactionKillReward',
    ]);
  }

  protected generate(data: Data): string | string[] | undefined {
    return t('factionKillBonds', {
      ...data,
      cr: formatCredits(data.lastFactionKillReward!),
      totalCr: formatCredits(data.sessionTotalFactionKillBondRewards!),
    });
  }
}
