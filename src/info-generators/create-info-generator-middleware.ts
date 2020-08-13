import { InfoGeneratorMiddleware } from '@src/info-generators/middleware';
import { OnlyInMilestones } from '@src/info-generators/middleware/milestone';
import { EdDataNumericKey } from '@src/ed/data-manager';
import { InfoMiddlewareSetting } from '@src/settings/types';

export function createInfoGeneratorMiddleware(
  settings: InfoMiddlewareSetting
): InfoGeneratorMiddleware<{}> | undefined {
  if (settings.type !== 'milestones') {
    console.error(
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
