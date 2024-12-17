import Tag from 'element-ui/lib/tag';

import { registerComponent } from '@lcap/vue2-utils/plugins/index';
import * as plugins from './plugins';

export const ElTag = registerComponent(Tag, plugins, {
  nativeEvents: [
    'dblclick', 'contextmenu',
    'mousedown', 'mouseup', 'mouseenter',
    'mouseleave',
  ],
  slotNames: ['default'],
  methodNames: [],
});

export default ElTag;
