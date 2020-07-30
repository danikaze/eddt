import { Outputter } from '.';

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

    this.options = {
      ...TextSpacer.defaultOptions,
      ...options,
    };
  }

  protected async process(info: string): Promise<string> {
    const { ignoreEmptyString, prefix, postfix } = this.options;

    return info === '' && ignoreEmptyString
      ? info
      : `${prefix}${info}${postfix}`;
  }
}
