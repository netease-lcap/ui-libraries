import Link from 'element-ui/lib/link';

import { registerComponent } from '@lcap/vue2-utils/plugins/index';
import * as plugins from './plugins';

Link.methods.handleClick = function (event) {
  if (!this.disabled) {
    this.$emit('click', event);
  }
};

export const ElLink = registerComponent(Link, plugins, {
  nativeEvents: [
    'mouseenter', 'dblclick', 'contextmenu',
    'mousedown', 'mouseup', 'mouseenter',
    'mouseleave', 'focus', 'blur',
  ],
  slotNames: ['default'],
  methodNames: [],
});

export default ElLink;
