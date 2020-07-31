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
  }: Data): string | string[] {
    const cr = formatCredits(lastBountyReward!);
    const current = `BOOM! Pirata eliminado en su ${lastBountyShip} (${cr})`;

    if (sessionTotalPiratesKilled === 1) return current;

    const totalCr = formatCredits(sessionTotalBounty!);
    return [
      current,
      `Eso hacen ${sessionTotalPiratesKilled} piratas por un total de ${totalCr} hoy`,
    ];
  }
}
