import { EdDataKey, EdData, dataManager } from '@src/ed/data-manager';
import { Outputter } from '@src/outputters';

export abstract class InfoGenerator<E extends EdDataKey> {
  protected lastCall: number = 0;
  protected dataKeys: E[];
  protected pipeList: Outputter[] = [];

  constructor(dataKeys: E[]) {
    this.eventListener = this.eventListener.bind(this);

    this.dataKeys = [...dataKeys];

    this.dataKeys.forEach((key) => {
      dataManager.on(key, this.eventListener);
    });
  }

  public pipe(next: Outputter): this {
    this.pipeList.push(next);
    return this;
  }

  protected abstract generate(data: Pick<EdData, E>): string;

  protected eventListener(timestamp: number): void {
    if (timestamp <= this.lastCall) return;
    this.lastCall = timestamp;

    const data = this.dataKeys.reduce((acc, key) => {
      const val = dataManager.get(key);
      if (val !== undefined) {
        acc[key] = val;
      }
      return acc;
    }, {} as EdData);

    const info = this.generate(data);
    this.executePipe(info);
  }

  protected async executePipe(info: string): Promise<void> {
    this.pipeList.forEach((outputter) => {
      outputter.put(info);
    });
  }
}
