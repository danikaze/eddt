import { InfoGeneratorMiddleware } from '.';
import { EdData, EdDataNumericKey } from '@src/ed/data-manager';

export interface OnlyInMilestonesOptions {
  extend: boolean;
  cap: boolean;
}

type Data = Pick<EdData, EdDataNumericKey>;

export class OnlyInMilestones extends InfoGeneratorMiddleware<Data> {
  public static readonly defaultOptions: OnlyInMilestonesOptions = {
    extend: true,
    cap: true,
  };

  protected readonly milestones: number[];
  protected readonly options: OnlyInMilestonesOptions;
  protected next: number;
  protected key: EdDataNumericKey;

  constructor(
    key: EdDataNumericKey,
    milestones: number[],
    options?: OnlyInMilestonesOptions
  ) {
    super();

    this.key = key;
    this.milestones = milestones;
    this.options = { ...OnlyInMilestones.defaultOptions, ...options };

    this.next = milestones[0];
  }

  public apply(data: Data): Data | undefined {
    const value = data[this.key];
    if (value === undefined) return;
    if (value < this.next) return;

    const { milestones } = this;
    const { cap, extend } = this.options;

    if (cap) {
      data[this.key] = this.next;
    }

    const index = milestones.indexOf(this.next);
    if (index === -1 || index === milestones.length - 1) {
      if (!extend) return;
      this.next +=
        milestones[milestones.length - 1] - milestones[milestones.length - 2];
    } else {
      this.next = milestones[index + 1];
    }

    return data;
  }
}
