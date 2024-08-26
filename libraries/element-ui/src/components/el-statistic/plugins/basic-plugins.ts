/* 组件功能扩展插件 */
import type { NaslComponentPluginOptions } from '@lcap/vue2-utils/plugins/index';

// basic-plugins.ts
export const useFormatFunction: NaslComponentPluginOptions = {
  props: ['formatter'],
  setup: (props) => {
    // 指定进度条文字内容
    const formatterFunction = props.useComputed(['formatter'], (formatter: any) => {
      if (!formatter) {
        return null;
      }

      if (typeof formatter === 'function') {
        return formatter;
      }

      return (value: number | string) => {
        // 可以改成字符串模板类似的方式 例如：`¥ ${value}`
        return formatter;
      };
    });

    return {
      formatter: formatterFunction,
    };
  },
  order: 2,
};
