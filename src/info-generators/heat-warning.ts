import { EdData } from '@src/ed/data-manager';
import { InfoGenerator } from '.';

type DataKeys = 'sessionTotalHeatWarnings';
type Data = Pick<EdData, DataKeys>;

export class HeatWarningsInfoGenerator extends InfoGenerator<DataKeys> {
  constructor() {
    super(['sessionTotalHeatWarnings']);
  }

  protected generate({ sessionTotalHeatWarnings }: Data): string {
    if (sessionTotalHeatWarnings === 1) return 'Primer overheat del día!';
    return `Overheat! La nave se ha sobrecalentado ${sessionTotalHeatWarnings} veces en lo que llevamos de día`;
  }
}
