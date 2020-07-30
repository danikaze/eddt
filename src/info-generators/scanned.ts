import { EdData } from '@src/ed/data-manager';
import { InfoGenerator } from '.';

type DataKeys = 'sessionTotalScanned';
type Data = Pick<EdData, DataKeys>;

export class ScannedInfoGenerator extends InfoGenerator<DataKeys> {
  constructor() {
    super(['sessionTotalScanned']);
  }

  protected generate({ sessionTotalScanned }: Data): string {
    if (sessionTotalScanned === 1) return 'Primer scan del día!';
    return `Hoy nos han escaneado ${sessionTotalScanned} veces`;
  }
}
