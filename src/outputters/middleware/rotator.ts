import { extendObjectsOnly } from '@src/utils/extend-objects-only';
import { Outputter } from '..';

export interface OutputRotatorOptions {
  /**
   * Milliseconds to show a text before going to the next one
   * Default: 7.5 secs
   */
  rotationTime: number;
  /**
   * Waiting time between text. 0 to disable
   * Default: 2 sec
   */
  waitingTime: number;
  /**
   * Number of times to show a text before removing it from the queue
   * Default: Infinity
   */
  repeatTimes: number;
}

interface QueuedInfoItem {
  info: string;
  remainingTimes: number;
}

export class OutputRotator extends Outputter {
  public static readonly defaultOptions: OutputRotatorOptions = {
    rotationTime: 7500,
    waitingTime: 2000,
    repeatTimes: Infinity,
  };

  protected readonly options: OutputRotatorOptions;
  protected readonly queuedInfo: QueuedInfoItem[] = [];
  protected currentIndex: number = -1;
  protected active: boolean = false;

  constructor(options?: Partial<OutputRotatorOptions>) {
    super();

    this.showNext = this.showNext.bind(this);
    this.waitBeforeNext = this.waitBeforeNext.bind(this);

    this.options = extendObjectsOnly(
      {},
      OutputRotator.defaultOptions,
      options
    ) as OutputRotatorOptions;
  }

  protected async process(info: string): Promise<false> {
    this.queuedInfo.push({
      info,
      remainingTimes: this.options.repeatTimes,
    });

    if (!this.active) {
      this.showNext();
    }

    return false;
  }

  protected showNext(): void {
    if (this.queuedInfo.length === 0) {
      this.active = false;
      return;
    }
    this.currentIndex++;
    if (this.currentIndex >= this.queuedInfo.length) {
      this.currentIndex = 0;
    }
    const elem = this.queuedInfo[this.currentIndex];

    this.active = true;
    elem.remainingTimes--;
    if (elem.remainingTimes <= 0) {
      this.queuedInfo.splice(this.currentIndex, 1);
      this.currentIndex--;
    }
    this.output(elem.info);

    setTimeout(() => {
      this.clean();
      if (this.options.waitingTime > 0) {
        this.waitBeforeNext();
      } else {
        this.showNext();
      }
    }, this.options.rotationTime);
  }

  protected clean(): void {
    this.output('');
  }

  protected waitBeforeNext(): void {
    setTimeout(this.showNext, this.options.waitingTime);
  }

  protected output(info: string): void {
    this.next?.put(info);
  }
}
