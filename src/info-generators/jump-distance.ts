import { EdData } from '@src/ed/data-manager';
import { t } from '@src/utils/i18n';
import { formatLy } from '@src/utils/format';
import { InfoGenerator } from '.';

type DataKeys = 'sessionTotalJumpDistance';
type Data = Pick<EdData, DataKeys>;
export type TranslationData = {
  sessionTotalJumpDistance: string;
};

export class JumpDistanceInfoGenerator extends InfoGenerator<DataKeys> {
  constructor() {
    super(['sessionTotalJumpDistance']);
  }

  protected generate({
    sessionTotalJumpDistance,
  }: Data): string | string[] | undefined {
    return t('jumpDistance', {
      sessionTotalJumpDistance: formatLy(sessionTotalJumpDistance!),
    });
  }
}
