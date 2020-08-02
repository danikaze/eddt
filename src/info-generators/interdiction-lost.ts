import { EdData } from '@src/ed/data-manager';
import { InfoGenerator } from '.';

type DataKeys = 'sessionTotalInterdictionsReceivedLost';
type Data = Pick<EdData, DataKeys>;

export class InterdictionsLostInfoGenerator extends InfoGenerator<DataKeys> {
  constructor() {
    super(['sessionTotalInterdictionsReceivedLost']);
  }

  protected generate({ sessionTotalInterdictionsReceivedLost }: Data): string {
    if (sessionTotalInterdictionsReceivedLost === 1) {
      return `Primera interdicción que perdemos hoy :(`;
    }
    return `Nos han interdiccionado ${sessionTotalInterdictionsReceivedLost} veces :(`;
  }
}
