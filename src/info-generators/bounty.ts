import { EdData } from '@src/ed/data-manager';
import { InfoGenerator } from '.';
import { formatCredits } from '@src/utils/format-credits';

type DataKeys =
  | 'lastBountyReward'
  | 'lastBountyShip'
  | 'sessionTotalBounty'
  | 'sessionTotalPiratesKilled';
type Data = Pick<EdData, DataKeys>;

export class BountyInfoGenerator extends InfoGenerator<DataKeys> {
  constructor() {
    super([
      'lastBountyReward',
      'lastBountyShip',
      'sessionTotalBounty',
      'sessionTotalPiratesKilled',
    ]);
  }

  protected generate({
    lastBountyReward,
    lastBountyShip,
    sessionTotalBounty,
    sessionTotalPiratesKilled,
  }: Data): string {
    const cr = formatCredits(lastBountyReward!);
    return `BOOM! Pirata eliminado en su ${lastBountyShip} (${cr})`;
  }
}
