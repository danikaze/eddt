import { EdData } from '@src/ed/data-manager';
import { t } from '@src/utils/i18n';
import { InfoGenerator } from '.';

type DataKeys = 'sessionTotalDronesLaunched';
type Data = Pick<EdData, DataKeys>;
export type TranslationData = Data;

export class LaunchedDronesInfoGenerator extends InfoGenerator<DataKeys> {
  constructor() {
    super(['sessionTotalDronesLaunched']);
  }

  protected generate(data: Data): string | string[] | undefined {
    return t('launchedDrones', data);
  }
}
