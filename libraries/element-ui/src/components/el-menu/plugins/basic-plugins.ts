/* 组件功能扩展插件 */
import type { NaslComponentPluginOptions } from '@lcap/nasl-hoc-vue/index';
import { VNode } from 'vue';

export const useExtendsPlugin: NaslComponentPluginOptions = {
  setup: (props, { h }) => {
    return {
      onSelect: (index, indexPath) => {
        const onSelect = props.get('onSelect');
        if (typeof onSelect === 'function') {
          onSelect({
            index,
            indexPath,
          });
        }
      },
      onOpen: (index, indexPath) => {
        const onOpen = props.get('onOpen');
        if (typeof onOpen === 'function') {
          onOpen({
            index,
            indexPath,
          });
        }
      },
      onClose: (index, indexPath) => {
        const onClose = props.get('onClose');
        if (typeof onClose === 'function') {
          onClose({
            index,
            indexPath,
          });
        }
      },
      slotDefault: () => {
        const mode = props.get('mode');
        const [slotDefault, slotLeft, slotRight] = props.get<Array<() => VNode[]>>(['slotDefault', 'slotLeft', 'slotRight']);

        let vnodes = typeof slotDefault === 'function' ? slotDefault() : [];
        if (!Array.isArray(vnodes)) {
          vnodes = [];
        }

        if (mode === 'horizontal') {
          const leftNodes = typeof slotLeft === 'function' ? slotLeft() : [];
          const rightNodes = typeof slotRight === 'function' ? slotRight() : [];
          if (Array.isArray(leftNodes) && leftNodes.length > 0) {
            vnodes.unshift(...leftNodes);
          }

          if (Array.isArray(rightNodes) && rightNodes.length > 0) {
            vnodes.push(h('div', { class: 'el-menu__extra' }, rightNodes));
          }
        }

        return vnodes;
      },
    };
  },
};
