import type { VNode } from 'vue';
import type { NaslComponentPluginOptions, Slot } from '@lcap/nasl-hoc-vue/plugin';
import { $deletePropList } from '@lcap/nasl-hoc-vue/index';
import ElIcon from '../../el-icon';

export const useIcon: NaslComponentPluginOptions = {
  order: 1,
  setup: (props, { h }) => {
    return {
      slotDefault: () => {
        const slotDefault = props.get<Slot>('slotDefault');
        const icon = props.get<string>('icon');
        const src = props.get<string>('src');
        const fallbackSrc = props.get<string>('fallbackSrc');

        let slots: VNode[] = [];

        // src优先级高于icon
        if (src && fallbackSrc) {
          slots.push(h('img', {
            attrs: { src: fallbackSrc },
          }));
        } else if (icon) {
          slots.push(h(ElIcon, {
            attrs: { name: icon },
          }));
        } else {
          const defaultNode = slotDefault && slotDefault();
          slots = defaultNode;
        }

        return slots;
      },
      [$deletePropList]: ['icon'],
    };
  },
};
