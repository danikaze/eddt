import { InfoGeneratorMiddleware } from '@main/info-generators/middleware';
import { OnlyInMilestones } from '@main/info-generators/middleware/milestone';
import { EdDataNumericKey } from '@main/ed/data-manager';
import { InfoMiddlewareSetting } from '@main/settings/types';
import { msgError } from '@main/utils/msgs';

export function createInfoGeneratorMiddleware(
  settings: InfoMiddlewareSetting
): InfoGeneratorMiddleware<{}> | undefined {
  if (settings.type !== 'milestones') {
    msgError(
      `InfoGeneratorMiddleware "${
        (settings as { type: string }).type
      }" not supported`
    );
    return;
  }

  const { cap, extend } = settings;

  return new OnlyInMilestones(
    settings.data as EdDataNumericKey,
    settings.values,
    { cap, extend }
  );
}
