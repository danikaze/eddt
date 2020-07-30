import { InfoGenerator } from '@src/info-generators';
import { EdDataKey } from '@src/ed/data-manager';
import { Outputter } from '.';

export interface OutputRotatorOptions {
  /**
   * Milliseconds to show a text before going to the next one
   * Default: 5 secs
   */
  rotationTime: number;
  /**
   * Waiting time between text. 0 to disable
   * Default: 1 sec
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
    rotationTime: 5000,
    waitingTime: 1000,
    repeatTimes: Infinity,
  };

  protected readonly options: OutputRotatorOptions;
  protected readonly queuedInfo: QueuedInfoItem[] = [];
  protected currentIndex: number = 0;
  protected active: boolean = false;

  constructor(options?: Partial<OutputRotatorOptions>) {
    super();

    this.showNext = this.showNext.bind(this);
    this.waitBeforeNext = this.waitBeforeNext.bind(this);

    this.options = {
      ...OutputRotator.defaultOptions,
      ...options,
    };
  }

  public source(sourceList: InfoGenerator<EdDataKey>[]): this {
    sourceList.forEach((info) => info.pipe(this));
    return this;
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
    this.currentIndex = (this.currentIndex + 1) % this.queuedInfo.length;
    const elem = this.queuedInfo[this.currentIndex];
    if (!elem) {
      this.active = false;
      this.clean();
      return;
    }

    this.active = true;
    elem.remainingTimes--;
    if (elem.remainingTimes <= 0) {
      this.queuedInfo.splice(this.currentIndex, 1);
      this.currentIndex--;
    }
    this.next?.put(elem.info);

    setTimeout(
      this.options.waitingTime > 0 ? this.waitBeforeNext : this.showNext,
      this.options.rotationTime
    );
  }

  protected clean(): void {
    this.next?.put('');

    if (this.active) {
      this.showNext();
    }
  }

  protected waitBeforeNext(): void {
    this.clean();
    setTimeout(this.showNext, this.options.waitingTime);
  }
}
