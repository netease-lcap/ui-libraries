/* 组件功能扩展插件 */
import type { NaslComponentPluginOptions } from '@lcap/vue2-utils/plugins/index';

export { useVModelSync } from '@lcap/vue2-utils/plugins/index';

// basic-plugins.ts
export const useFormatFunction: NaslComponentPluginOptions = {
  props: ['formatTooltip'],
  setup: (props) => {
    const formatFunction = props.useComputed(['formatTooltip'], (formatTooltip: any) => {
      if (!formatTooltip) {
        return null;
      }
      return (value: string) => {
        return value + formatTooltip;
      };
    });
    return {
      formatTooltip: formatFunction,
    };
  },
  order: 2,
};
