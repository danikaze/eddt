import { EdData } from '@src/ed/data-manager';
import { InfoGenerator } from '.';

type DataKeys = 'sessionTotalDockingsRequested';
type Data = Pick<EdData, DataKeys>;

export class DockingsRequestedInfoGenerator extends InfoGenerator<DataKeys> {
  constructor() {
    super(['sessionTotalDockingsRequested']);
  }

  protected generate({ sessionTotalDockingsRequested }: Data): string {
    if (sessionTotalDockingsRequested === 1) {
      return 'Primer permiso de atraque pedido...';
    }
    return `Permiso de atraque número ${sessionTotalDockingsRequested} pedido hoy...`;
  }
}
