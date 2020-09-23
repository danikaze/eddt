import {
  InfoSetting,
  NavInfoSetting,
  DistanceInfoSetting,
  DataOutputInfoSetting,
} from '@main/settings/types';
import { InfoGenerator } from '@main/info-generators';
import { EdDataKey } from '@main/ed/data-manager';
import { getSimpleInfoGenerator } from '@main/info-generators/get-simple-info-generator';
import { createInfoGeneratorMiddleware } from './create-info-generator-middleware';
import { NavInfoGenerator } from './generators/nav';
import { DistanceInfoGenerator } from './generators/distance';
import { msgError } from '@main/utils/msgs';

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
    msgError(
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
