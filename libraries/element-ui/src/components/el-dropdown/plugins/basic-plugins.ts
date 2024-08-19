/* 组件功能扩展插件 */
import DropdownMenu from 'element-ui/lib/dropdown-menu';
import { NaslComponentPluginOptions } from '@lcap/nasl-hoc-vue/index';

export const useExtendsPlugin: NaslComponentPluginOptions = {
  setup: (props, { h }) => {
    return {
      slotDropdown: () => {
        const [slotDropdown, slotItems] = props.get(['slotDropdown', 'slotItems']);

        const itemVNodes = typeof slotItems === 'function' ? slotItems() : [];
        if (!slotItems || !Array.isArray(itemVNodes) || itemVNodes.length === 0) {
          return typeof slotDropdown === 'function' ? slotDropdown() : [];
        }

        return [
          h(DropdownMenu, {}, itemVNodes),
        ];
      },
    };
  },
};
