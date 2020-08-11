import { EdData } from '@src/ed/data-manager';
import { t } from '@src/utils/i18n';
import { InfoGenerator } from '.';

type DataKeys = 'sessionTotalJumpDistance' | 'sessionTotalJumpDistanceLy';
type Data = Pick<EdData, DataKeys>;
export type TranslationData = Data;

export class JumpDistanceInfoGenerator extends InfoGenerator<DataKeys> {
  constructor() {
    super(['sessionTotalJumpDistance', 'sessionTotalJumpDistanceLy']);
  }

  protected generate(data: Data): string | string[] | undefined {
    return t('jumpDistance', data);
  }
}
