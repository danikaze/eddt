import { NavRoute } from './nav-route';
import { join } from 'path';
import { OUTPUT_FOLDER } from './constants';

new NavRoute({
  output: join(OUTPUT_FOLDER, 'nav.txt'),
});
