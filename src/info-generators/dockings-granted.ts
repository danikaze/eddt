import { EdData } from '@src/ed/data-manager';
import { t } from '@src/utils/i18n';
import { InfoGenerator } from '.';

type DataKeys = 'sessionTotalDockingsGranted';
type Data = Pick<EdData, DataKeys>;
export type TranslationData = Data;

export class DockingsGrantedInfoGenerator extends InfoGenerator<DataKeys> {
  constructor() {
    super(['sessionTotalDockingsGranted']);
  }

  protected generate(data: Data): string | string[] | undefined {
    return t('dockingsGranted', data);
  }
}
