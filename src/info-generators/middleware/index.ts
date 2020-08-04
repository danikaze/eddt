export abstract class InfoGeneratorMiddleware<D extends {}> {
  /**
   * Receive the data passed to the InfoGenerator where the middleware is
   * being used (or the result from previous middleware)
   * Return the data to use in the next one or `undefined` to discard it
   */
  public abstract apply(data: D): D | undefined;
}
