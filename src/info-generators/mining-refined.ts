import { EdData } from '@src/ed/data-manager';
import { InfoGenerator } from '.';

type DataKeys = 'sessionTotalMaterialsRefined';
type Data = Pick<EdData, DataKeys>;

export class MiningRefinedInfoGenerator extends InfoGenerator<DataKeys> {
  constructor() {
    super(['sessionTotalMaterialsRefined']);
  }

  protected generate({ sessionTotalMaterialsRefined }: Data): string {
    return `${sessionTotalMaterialsRefined} minerales refinados hoy`;
  }
}
