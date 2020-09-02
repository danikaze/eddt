import {
  InfoSetting,
  NavInfoSetting,
  DistanceInfoSetting,
  DataOutputInfoSetting,
} from '@src/settings/types';
import { InfoGenerator } from '@src/info-generators';
import { EdDataKey } from '@src/ed/data-manager';
import { NavInfoGenerator } from '@src/info-generators/generators/nav';
import { getSimpleInfoGenerator } from '@src/info-generators/get-simple-info-generator';
import { createInfoGeneratorMiddleware } from './create-info-generator-middleware';
import { DistanceInfoGenerator } from './generators/distance';

export function createInfoGenerator(
  settings: InfoSetting
): InfoGenerator<EdDataKey> | undefined {
  let infoGenerator: InfoGenerator<EdDataKey> | undefined;

  if (isNavSettings(settings)) {
    infoGenerator = new NavInfoGenerator();
  } else if (isDistanceSettings(settings)) {
    infoGenerator = new DistanceInfoGenerator(settings.target, settings.name);
  } else if (isDataOutputInfoSettings(settings)) {
    const Ctor = getSimpleInfoGenerator(
      settings.i18n,
      settings.infoData as EdDataKey[]
    );
    infoGenerator = new Ctor();
  }

  if (!infoGenerator) {
    console.error(
      `InfoGenerator "${(settings as { type: string }).type}" not supported`
    );
  } else if (settings.onInput) {
    settings.onInput.forEach((middlewareSettings) => {
      const middleware = createInfoGeneratorMiddleware(middlewareSettings);
      middleware && infoGenerator!.use(middleware);
    });
  }

  return infoGenerator;
}

function isNavSettings(settings: InfoSetting): settings is NavInfoSetting {
  return settings.type === 'nav';
}

function isDistanceSettings(
  settings: InfoSetting
): settings is DistanceInfoSetting {
  return settings.type === 'distance';
}

function isDataOutputInfoSettings(
  settings: InfoSetting
): settings is DataOutputInfoSetting {
  return settings.type === 'dataOutput';
}
