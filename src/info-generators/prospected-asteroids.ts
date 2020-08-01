import { EdData } from '@src/ed/data-manager';
import { InfoGenerator } from '.';

type DataKeys = 'sessionTotalAsteroidsProspected';
type Data = Pick<EdData, DataKeys>;

export class ProspectedAsteroidsInfoGenerator extends InfoGenerator<DataKeys> {
  constructor() {
    super(['sessionTotalAsteroidsProspected']);
  }

  protected generate({ sessionTotalAsteroidsProspected }: Data): string {
    return `Llevamos ${sessionTotalAsteroidsProspected} asteroides analizados hoy`;
  }
}
