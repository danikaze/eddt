import { EdData } from '@src/ed/data-manager';
import { InfoGenerator } from '.';

type DataKeys = 'sessionTotalDockingsGranted';
type Data = Pick<EdData, DataKeys>;

export class DockingsGrantedInfoGenerator extends InfoGenerator<DataKeys> {
  constructor() {
    super(['sessionTotalDockingsGranted']);
  }

  protected generate({ sessionTotalDockingsGranted }: Data): string {
    if (sessionTotalDockingsGranted === 1) {
      return 'Primer permiso de atraque aprobado';
    }
    return `Permiso de atraque número ${sessionTotalDockingsGranted} que nos aprueban hoy...`;
  }
}
