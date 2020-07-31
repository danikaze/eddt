import { EdData } from '@src/ed/data-manager';
import { InfoGenerator } from '.';
import { formatLy } from '@src/utils/format';

type DataKeys = 'sessionTotalJumpDistance';
type Data = Pick<EdData, DataKeys>;

export class JumpDistanceInfoGenerator extends InfoGenerator<DataKeys> {
  public static readonly defaultReports = [1000, 2500, 5000, 10000];

  protected readonly reportOn: number[];
  protected nextReport: number;

  constructor(reportOn?: number[]) {
    super(['sessionTotalJumpDistance']);

    this.reportOn =
      !reportOn || reportOn.length < 2
        ? JumpDistanceInfoGenerator.defaultReports
        : reportOn;
    this.reportOn.sort();
    this.nextReport = this.reportOn[0];
  }

  protected generate({ sessionTotalJumpDistance }: Data): string | undefined {
    if (!sessionTotalJumpDistance) return;
    if (sessionTotalJumpDistance < this.nextReport) return;

    const ly = formatLy(this.nextReport);
    const msg = `Hemos saltado más de ${ly} en esta sesión de juego`;

    const { reportOn } = this;
    const index = reportOn.indexOf(this.nextReport);
    if (index === -1 || index === reportOn.length - 1) {
      this.nextReport +=
        reportOn[reportOn.length - 1] - reportOn[reportOn.length - 2];
    } else {
      this.nextReport = reportOn[index + 1];
    }

    return msg;
  }
}
