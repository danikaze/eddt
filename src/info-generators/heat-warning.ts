import { EdData } from '@src/ed/data-manager';
import { t } from '@src/utils/i18n';
import { InfoGenerator } from '.';

type DataKeys = 'sessionTotalHeatWarnings';
type Data = Pick<EdData, DataKeys>;
export type TranslationData = Data;

export class HeatWarningsInfoGenerator extends InfoGenerator<DataKeys> {
  constructor() {
    super(['sessionTotalHeatWarnings']);
  }

  protected generate(data: Data): string | string[] | undefined {
    return t('heatWarning', data);
  }
}
