import Card from 'element-ui/lib/card';

import { registerComponent } from '@lcap/vue2-utils/plugins/index';
import * as plugins from './plugins';
import './index.less';

export const ElCard = registerComponent(Card, plugins, {
  nativeEvents: [
    'click', 'dblclick', 'contextmenu',
    'mousedown', 'mouseup', 'mouseenter',
    'mouseleave',
  ],
  slotNames: ['default', 'header'],
  methodNames: [],
});

export default ElCard;
