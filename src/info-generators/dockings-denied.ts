import { EdData } from '@src/ed/data-manager';
import { t } from '@src/utils/i18n';
import { InfoGenerator } from '.';

type DataKeys = 'sessionTotalDockingsDenied' | 'lastDockingDeniedReason';
type Data = Pick<EdData, DataKeys>;
export type TranslationData = Data;

export class DockingsDeniedInfoGenerator extends InfoGenerator<DataKeys> {
  constructor() {
    super(['sessionTotalDockingsDenied', 'lastDockingDeniedReason']);
  }

  protected generate(data: Data): string | string[] | undefined {
    return t('dockingsDenied', data);
  }
}
