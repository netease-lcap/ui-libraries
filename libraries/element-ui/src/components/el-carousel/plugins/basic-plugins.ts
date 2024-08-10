/* 组件功能扩展插件 */
import type { NaslComponentPluginOptions } from '@lcap/nasl-hoc-vue/index';
export const useTransferChange: NaslComponentPluginOptions  = {
  setup: (props) => {
    return {
      onChange: (index, oldIndex) => {
        // 获取当前绑定 change 事件
        const onChange = props.get('onChange');

        if (typeof onChange === 'function') {
          onChange({
            index,
            oldIndex,
          });
        }
      }
    };
  },
  order: 2,
}

