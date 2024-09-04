/* eslint-disable no-shadow */
import { NaslComponentPluginOptions } from '@lcap/vue2-utils/plugins';
/* 组件功能扩展插件 */
export { useVModelSync } from '@lcap/vue2-utils/plugins/index';

export const handleDateRange: NaslComponentPluginOptions = {
  setup: (props) => {
    // const range = props.useComputed(['range'], (range: any) => {
    //   const listRange = range?.split(',');
    //   return Array.isArray(listRange) ? listRange : undefined;
    // });
    return {
      // range,
      // range: Array.isArray(props.get('range')?.splice(',')),
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
