import { EdData } from '@src/ed/data-manager';
import { InfoGenerator } from '.';

type DataKeys = 'sessionTotalInterdictionsReceivedEscaped';
type Data = Pick<EdData, DataKeys>;

export class InterdictionsEscapedInfoGenerator extends InfoGenerator<DataKeys> {
  constructor() {
    super(['sessionTotalInterdictionsReceivedEscaped']);
  }

  protected generate({
    sessionTotalInterdictionsReceivedEscaped,
  }: Data): string {
    return `Hemos escapado ${sessionTotalInterdictionsReceivedEscaped} interdicciones hoy!`;
  }
}
