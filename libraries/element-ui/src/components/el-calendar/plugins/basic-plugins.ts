import { NaslComponentPluginOptions } from '@/plugins/plugin.ts';
/* 组件功能扩展插件 */
export { useVModelSync } from '@lcap/nasl-hoc-vue/index';

export const handleDateRange: NaslComponentPluginOptions = {
  setup: (props) => {
    return {
      onInput: (v) => {
        const onInput = props.get('onInput');
        const onUpdateValue = props.get('update:value');
        if (typeof onInput === 'function') {
          onInput(v);
        }

        if (typeof onUpdateValue === 'function') {
          onUpdateValue(v);
        }
      },
    };
  },
};
