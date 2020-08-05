import { EdData } from '@src/ed/data-manager';
import { t } from '@src/utils/i18n';
import { InfoGenerator } from '.';

type DataKeys = 'sessionTotalMaterialsCollected';
type Data = Pick<EdData, DataKeys>;
export type TranslationData = Data;

export class MaterialsCollectedInfoGenerator extends InfoGenerator<DataKeys> {
  constructor() {
    super(['sessionTotalMaterialsCollected']);
  }

  protected generate(data: Data): string | string[] | undefined {
    return t('materialCollected', data);
  }
}
