import { EdDataKey, EdData, dataManager } from '@main/ed/data-manager';
import { Outputter } from '@main/outputters';
import { InfoGeneratorMiddleware } from './middleware';

export abstract class InfoGenerator<E extends EdDataKey> {
  protected readonly middleware: InfoGeneratorMiddleware<
    Pick<EdData, E>
  >[] = [];
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

  public use(middleware: InfoGeneratorMiddleware<Pick<EdData, E>>): this {
    this.middleware.push(middleware);
    return this;
  }

  /**
   * Function to call when some of the listened data changes
   * It returns the text to pass to the piped `Outputter`s if any,
   * or `undefined` to ignore the change
   */
  protected abstract generate(
    data: Pick<EdData, E>
  ): string | string[] | undefined;

  protected eventListener(timestamp: number): void {
    if (timestamp <= this.lastCall) return;
    this.lastCall = timestamp;

    let data: Pick<EdData, E> | undefined = this.dataKeys.reduce((acc, key) => {
      const val = dataManager.get(key);
      if (val !== undefined) {
        acc[key] = val;
      }
      return acc;
    }, {} as Pick<EdData, E>);

    data = this.middleware.reduce((acc, middleware) => {
      return acc ? (middleware.apply(acc) as Pick<EdData, E>) : acc;
    }, data as Pick<EdData, E> | undefined);

    if (!data) return;

    const info = this.generate(data);
    if (info === undefined) return;
    if (typeof info === 'string') {
      this.executePipe(info);
    } else {
      info.forEach((i) => this.executePipe(i));
    }
  }

  protected executePipe(info: string): void {
    this.pipeList.forEach((outputter) => {
      outputter.put(info);
    });
  }
}
