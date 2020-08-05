import { EdData } from '@src/ed/data-manager';
import { t } from '@src/utils/i18n';
import { InfoGenerator } from '.';

type DataKeys = 'sessionTotalBodiesApproached';
type Data = Pick<EdData, DataKeys>;
export type TranslationData = Data;

export class BodiesApproachedInfoGenerator extends InfoGenerator<DataKeys> {
  constructor() {
    super(['sessionTotalBodiesApproached']);
  }

  protected generate(data: Data): string | string[] | undefined {
    return t('bodiesApproached', data);
  }
}
