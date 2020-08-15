import { extendObjectsOnly } from '@src/utils/extend-objects-only';
import { Outputter } from '..';

export interface TextSpacerOptions {
  ignoreEmptyString: boolean;
  prefix: string;
  postfix: string;
}

export class TextSpacer extends Outputter {
  public static readonly defaultOptions: TextSpacerOptions = {
    ignoreEmptyString: true,
    prefix: '',
    postfix: '',
  };

  protected readonly options: TextSpacerOptions;

  constructor(options?: Partial<TextSpacerOptions>) {
    super();

    this.options = extendObjectsOnly(
      {},
      TextSpacer.defaultOptions,
      options
    ) as TextSpacerOptions;
  }

  protected async process(info: string): Promise<string> {
    const { ignoreEmptyString, prefix, postfix } = this.options;

    return info === '' && ignoreEmptyString
      ? info
      : `${prefix}${info}${postfix}`;
  }
}
