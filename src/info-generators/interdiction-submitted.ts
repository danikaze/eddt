import { EdData } from '@src/ed/data-manager';
import { t } from '@src/utils/i18n';
import { InfoGenerator } from '.';

type DataKeys = 'sessionTotalInterdictionsReceivedSubmitted';
type Data = Pick<EdData, DataKeys>;
export type TranslationData = Data;

export class InterdictionsSubmittedInfoGenerator extends InfoGenerator<
  DataKeys
> {
  constructor() {
    super(['sessionTotalInterdictionsReceivedSubmitted']);
  }

  protected generate(data: Data): string | string[] | undefined {
    return t('interdictionsSubmitted', data);
  }
}
