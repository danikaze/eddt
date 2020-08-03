import { EdData } from '@src/ed/data-manager';
import { InfoGenerator } from '.';

type DataKeys = 'sessionTotalDockingsDenied' | 'lastDockingDeniedReason';
type Data = Pick<EdData, DataKeys>;

export class DockingsDeniedInfoGenerator extends InfoGenerator<DataKeys> {
  constructor() {
    super(['sessionTotalDockingsDenied', 'lastDockingDeniedReason']);
  }

  protected generate({
    sessionTotalDockingsDenied,
    lastDockingDeniedReason,
  }: Data): string | string[] {
    if (sessionTotalDockingsDenied === 1) {
      return `Permiso de atraque denegado (${lastDockingDeniedReason})`;
    }
    return [
      `Nos han denegado el permiso de atraque (${lastDockingDeniedReason})...`,
      `Ya van ${sessionTotalDockingsDenied} permisos denegados hoy`,
    ];
  }
}
