/* 组件功能扩展插件 */
import type { NaslComponentPluginOptions } from '@lcap/nasl-hoc-vue/index';

// 菜单激活回调 绑定事件select
export const useTransferSelect: NaslComponentPluginOptions = {
  setup: (props) => {
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
    };
  },
  order: 3,
};

// sub-menu 展开的回调 绑定事件open
export const useTransferOpen: NaslComponentPluginOptions = {
  setup: (props) => {
    return {
      onOpen: (index, indexPath) => {
        const onOpen = props.get('onOpen');
        if (typeof onOpen === 'function') {
          onOpen({
            index,
            indexPath,
          });
        }
      },
    };
  },
  order: 3,
};

// sub-menu 收起的回调 绑定事件close
export const useTransferClose: NaslComponentPluginOptions = {
  setup: (props) => {
    return {
      onClose: (index, indexPath) => {
        const onClose = props.get('onClose');
        if (typeof onClose === 'function') {
          onClose({
            index,
            indexPath,
          });
        }
      },
    };
  },
  order: 3,
};
