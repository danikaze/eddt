import { EdData } from '@src/ed/data-manager';
import { t } from '@src/utils/i18n';
import { InfoGenerator } from '.';

type DataKeys = 'sessionTotalInterdictionsReceivedEscaped';
type Data = Pick<EdData, DataKeys>;
export type TranslationData = Data;

export class InterdictionsEscapedInfoGenerator extends InfoGenerator<DataKeys> {
  constructor() {
    super(['sessionTotalInterdictionsReceivedEscaped']);
  }

  protected generate(data: Data): string | string[] | undefined {
    return t('interdictionsEscaped', data);
  }
}
