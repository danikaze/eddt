import { EdData } from '@src/ed/data-manager';
import { t } from '@src/utils/i18n';
import { InfoGenerator } from '.';

type DataKeys = 'sessionTotalAsteroidsProspected';
type Data = Pick<EdData, DataKeys>;
export type TranslationData = Data;

export class ProspectedAsteroidsInfoGenerator extends InfoGenerator<DataKeys> {
  constructor() {
    super(['sessionTotalAsteroidsProspected']);
  }

  protected generate(data: Data): string | string[] | undefined {
    return t('prospectedAsteroids', data);
  }
}
