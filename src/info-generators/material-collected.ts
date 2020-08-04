import { EdData } from '@src/ed/data-manager';
import { InfoGenerator } from '.';

type DataKeys = 'sessionTotalMaterialsCollected';
type Data = Pick<EdData, DataKeys>;

export class MaterialsCollectedInfoGenerator extends InfoGenerator<DataKeys> {
  constructor() {
    super(['sessionTotalMaterialsCollected']);
  }

  protected generate({ sessionTotalMaterialsCollected }: Data): string {
    return `${sessionTotalMaterialsCollected} materiales recogidos a lo largo del día`;
  }
}
