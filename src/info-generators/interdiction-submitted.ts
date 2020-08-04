import { EdData } from '@src/ed/data-manager';
import { InfoGenerator } from '.';

type DataKeys = 'sessionTotalInterdictionsReceivedSubmitted';
type Data = Pick<EdData, DataKeys>;

export class InterdictionsSubmittedInfoGenerator extends InfoGenerator<
  DataKeys
> {
  constructor() {
    super(['sessionTotalInterdictionsReceivedSubmitted']);
  }

  protected generate({
    sessionTotalInterdictionsReceivedSubmitted,
  }: Data): string {
    if (sessionTotalInterdictionsReceivedSubmitted === 1) {
      return `Primera interdicción del día a la que nos rendimos!`;
    }
    return `Nos hemos rendido a ${sessionTotalInterdictionsReceivedSubmitted} interdicciones hoy!`;
  }
}
