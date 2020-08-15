import { InfoSetting } from '@src/settings/types';
import { InfoGenerator } from '@src/info-generators';
import { EdDataKey } from '@src/ed/data-manager';
import { NavInfoGenerator } from '@src/info-generators/nav';
import { getSimpleInfoGenerator } from '@src/info-generators/get-simple-info-generator';
import { createInfoGeneratorMiddleware } from './create-info-generator-middleware';

export function createInfoGenerator(
  settings: InfoSetting
): InfoGenerator<EdDataKey> | undefined {
  const Ctor =
    settings.type === 'nav'
      ? NavInfoGenerator
      : settings.type === 'dataOutput'
      ? getSimpleInfoGenerator(settings.i18n, settings.infoData as EdDataKey[])
      : undefined;

  const infoGenerator = Ctor && new Ctor();

  if (!infoGenerator) {
    console.error(
      `InfoGenerator "${(settings as { type: string }).type}" not supported`
    );
  } else if (settings.onInput) {
    settings.onInput.forEach((middlewareSettings) => {
      const middleware = createInfoGeneratorMiddleware(middlewareSettings);
      middleware && infoGenerator.use(middleware);
    });
  }

  return infoGenerator;
}
