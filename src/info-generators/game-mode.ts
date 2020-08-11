import { EdData } from '@src/ed/data-manager';
import { InfoGenerator } from '.';

type DataKeys = 'gameMode';
type Data = Pick<EdData, DataKeys>;

export class GameModeInfoGenerator extends InfoGenerator<DataKeys> {
  constructor() {
    super(['gameMode']);
  }

  protected generate({ gameMode }: Data): string {
    return gameMode!;
  }
}
