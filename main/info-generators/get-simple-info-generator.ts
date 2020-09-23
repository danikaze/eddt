import { InfoGenerator } from '.';
import { EdDataKey, EdData } from '@main/ed/data-manager';
import { TranslationData, t } from '@main/utils/i18n';

export function getSimpleInfoGenerator<K extends EdDataKey = EdDataKey>(
  textKey: string,
  dataKeys: K | K[]
) {
  return class SimpleInfoGenerator extends InfoGenerator<K> {
    constructor() {
      super(Array.isArray(dataKeys) ? dataKeys : [dataKeys]);
    }

    protected generate(data: EdData): string | string[] | undefined {
      return t(textKey, data as TranslationData);
    }
  };
}
