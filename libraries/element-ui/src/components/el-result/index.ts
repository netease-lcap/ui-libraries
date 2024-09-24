import Result from 'element-ui/lib/result';

import { registerComponent } from '@lcap/vue2-utils/plugins/index';
import * as plugins from './plugins';

export const ElResult = registerComponent(Result, plugins, {
  nativeEvents: [],
  slotNames: ['icon', 'title', 'subTitle', 'extra'],
  methodNames: [],
});

export default ElResult;
