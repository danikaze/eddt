import { EdData } from '@src/ed/data-manager';
import { t } from '@src/utils/i18n';
import { InfoGenerator } from '.';

type DataKeys = 'sessionTotalBodiesLeft';
type Data = Pick<EdData, DataKeys>;
export type TranslationData = Data;

export class BodiesLeftInfoGenerator extends InfoGenerator<DataKeys> {
  constructor() {
    super(['sessionTotalBodiesLeft']);
  }

  protected generate(data: Data): string | string[] | undefined {
    return t('bodiesLeft', data);
  }
}
