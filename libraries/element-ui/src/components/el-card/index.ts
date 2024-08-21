import Card from 'element-ui/lib/card';

import { registerComponent } from '@lcap/vue2-utils/plugins/index';
import * as plugins from './plugins';

export const ElCard = registerComponent(Card, plugins, {
  nativeEvents: [],
  slotNames: ['default', 'header'],
  methodNames: [],
});

export default ElCard;
