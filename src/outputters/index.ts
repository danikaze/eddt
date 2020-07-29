export abstract class Outputter {
  protected next?: Outputter;

  public put(info: string): void {
    const promise = this.process(info);

    promise.then((processedText) => {
      if (processedText === false) return;
      this.next?.put(processedText === undefined ? info : processedText);
    });
  }

  public pipe(next: Outputter): this {
    this.next = next;
    return this;
  }

  /**
   * Process the information coming from a `InfoGenerator`
   *
   * In case there's another `Outputter` piped in, the returned value can be:
   * - undefined to pass the original info text to the next Outputter
   * - string to pass a modified or custom text to the next Outputter
   * - false to avoid calling the next Outputter
   *   (can be called manually with `this.next.put(info)`)
   */
  protected abstract process(info: string): Promise<string | false | void>;
}
