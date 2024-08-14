/* 组件功能扩展插件 */
import type { NaslComponentPluginOptions } from '@lcap/nasl-hoc-vue/index';

export { useVModelSync } from '@lcap/nasl-hoc-vue/index';
export const useRateChange: NaslComponentPluginOptions = {
  setup: (props) => {
    return {
      onChange: (value) => {
        // 获取当前绑定 change 事件
        const onChange = props.get('onChange');

        if (typeof onChange === 'function') {
          onChange({
            value,
          });
        }
      },
    };
  },
  order: 2,
};
