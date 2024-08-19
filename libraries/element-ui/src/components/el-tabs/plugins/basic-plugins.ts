/* 组件功能扩展插件 */
import type { NaslComponentPluginOptions } from '@lcap/nasl-hoc-vue/index';

export const useExtendsPlugin: NaslComponentPluginOptions = {
  setup: ({ get: propGet, useComputed }) => {
    return {
      onTabClick(tab) {
        const onTabClick = propGet('onTabClick');
        if (typeof onTabClick === 'function') {
          onTabClick({
            active: tab.active,
            loaded: tab.loaded,
            isClosable: tab.isClosable,
            value: tab.paneName,
          });
        }
      },
      onEdit(value, action) {
        const [onTabEdit, onEdit] = propGet(['onTabEdit', 'onEdit']);
        if (typeof onTabEdit === 'function') {
          onTabEdit({
            value,
            action,
          });
        }

        if (typeof onEdit === 'function') {
          onEdit(value, action);
        }
      },
    };
  },
};
