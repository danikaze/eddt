import { EdData } from '@src/ed/data-manager';
import { t } from '@src/utils/i18n';
import { InfoGenerator } from '.';

type DataKeys = 'sessionTotalDockingsRequested';
type Data = Pick<EdData, DataKeys>;
export type TranslationData = Data;

export class DockingsRequestedInfoGenerator extends InfoGenerator<DataKeys> {
  constructor() {
    super(['sessionTotalDockingsRequested']);
  }

  protected generate(data: Data): string | string[] | undefined {
    return t('dockingsRequested', data);
  }
}
