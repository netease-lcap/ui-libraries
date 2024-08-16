/* 组件功能扩展插件 */
import type { NaslComponentPluginOptions } from '@lcap/nasl-hoc-vue/index';

// basic-plugins.ts
export const useFormatFunction: NaslComponentPluginOptions = {
  props: ['format'],
  setup: (props) => {
    // 指定进度条文字内容
    const formatFunction = props.useComputed(['format'], (format: any) => {
      if (!format) {
        return null;
      }

      if (typeof format === 'function') {
        return format;
      }

      return (percentage: number) => {
        // return percentage === 100 ? format : `${percentage}%`;
        return format;
      };
    });

    return {
      format: formatFunction,
    };
  },
  order: 2,
};
