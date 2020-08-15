import { existsSync } from 'fs';
import { Outputter } from '@src/outputters';
import { WriteFileOutputter } from '@src/outputters/write-file';
import { OutputRotator } from '@src/outputters/middleware/rotator';
import { TextSpacer } from '@src/outputters/middleware/text-spacer';
import { createInfoGenerator } from '@src/info-generators/create-info-generator';
import {
  OutputterSetting,
  OutputterWriteFileSetting,
  OutputterRotatorFileSetting,
  OutputterTextSpacerSetting,
} from '@src/settings/types';
import { dirname } from 'path';

export function createOutputter(
  settings: OutputterSetting
): Outputter | undefined {
  const outputter: Outputter | undefined =
    settings.type === 'writeFile'
      ? getOutputterWriteFile(settings)
      : settings.type === 'rotator'
      ? getOutputterRotatorFile(settings)
      : settings.type === 'textSpacer'
      ? getTextSpacer(settings)
      : undefined;

  if (!outputter) {
    console.error(
      `Outputter "${(settings as { type: string }).type}" not supported`
    );
    return;
  }

  let middleware: Outputter | undefined;
  if (settings.onInput) {
    middleware = createOutputter(settings.onInput);
    middleware && middleware.pipe(outputter);
  }

  if (settings.sources) {
    settings.sources.forEach((infoGeneratorSettings) => {
      const infoGenerator = createInfoGenerator(infoGeneratorSettings);
      infoGenerator && infoGenerator.pipe(middleware ? middleware : outputter!);
    });
  }

  return outputter;
}

function getOutputterWriteFile(
  settings: OutputterWriteFileSetting
): WriteFileOutputter | undefined {
  const { path, clearOnStart, clearOnEnd, verbose } = settings;

  if (!path || !existsSync(dirname(path))) {
    console.error(`Error creating OutputterWriteFile: "${path}" doesn't exist`);
    return;
  }

  return new WriteFileOutputter(path, {
    clearOnStart,
    clearOnEnd,
    verbose,
  });
}

function getOutputterRotatorFile(
  settings: OutputterRotatorFileSetting
): OutputRotator {
  const { rotationTime, waitingTime, repeatTimes } = settings;

  return new OutputRotator({
    rotationTime,
    waitingTime,
    repeatTimes,
  });
}

function getTextSpacer(settings: OutputterTextSpacerSetting): TextSpacer {
  const { ignoreEmptyString, prefix, postfix } = settings;
  return new TextSpacer({
    ignoreEmptyString,
    prefix,
    postfix,
  });
}
