import Descriptions from 'element-ui/lib/descriptions';
import DescriptionsItem from 'element-ui/lib/descriptions-item';
import { registerComponent } from '@lcap/nasl-hoc-vue/index';
import * as plugins from './plugins';

import { normalizeArray } from '@/plugins/utils';

const { getSlots } = Descriptions.methods;
Descriptions.methods.getSlots = function (vnode) {
  const slots = getSlots.call(this, vnode);
  const scopedSlots = vnode.data && vnode.data.scopedSlots ? vnode.data.scopedSlots : {};
  Object.keys(scopedSlots).forEach((name) => {
    if (typeof scopedSlots[name] !== 'function') {
      return;
    }

    const nodes = scopedSlots[name]({});
    normalizeArray(nodes).forEach((child) => {
      if (!this.isEmptyElement(child)) {
        slots[name] = slots[name] || [];
        if (child.tag === 'template') {
          slots[name].push(child.children);
        } else {
          slots[name].push(child);
        }
      }
    });
  });

  return { ...slots };
};

export const ElDescriptions = registerComponent(Descriptions, plugins, {
  nativeEvents: [],
  slotNames: ['title', 'extra', 'default'],
  methodNames: [],
});
export const ElDescriptionsItem = DescriptionsItem;

export default ElDescriptions;
