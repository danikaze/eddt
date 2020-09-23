import { Outputter } from '@main/outputters';
import { WriteFileOutputter } from '@main/outputters/write-file';
import { OutputRotator } from '@main/outputters/middleware/rotator';
import { TextSpacer } from '@main/outputters/middleware/text-spacer';
import { createInfoGenerator } from '@main/info-generators/create-info-generator';
import {
  OutputterSetting,
  OutputterWriteFileSetting,
  OutputterRotatorFileSetting,
  OutputterTextSpacerSetting,
} from '@main/settings/types';
import { dirname } from 'path';
import { msgError } from '@main/utils/msgs';

export function createOutputter(
  settings: OutputterSetting
): Outputter | undefined {
  const outputter =
    settings.type === 'writeFile'
      ? getOutputterWriteFile(settings)
      : settings.type === 'rotator'
      ? getOutputterRotatorFile(settings)
      : settings.type === 'textSpacer'
      ? getTextSpacer(settings)
      : undefined;

  if (!outputter) {
    msgError(
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

  if (!path) {
    msgError(`Error creating OutputterWriteFile: path is not defined`);
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
