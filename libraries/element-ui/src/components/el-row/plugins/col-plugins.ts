/* 组件功能扩展插件 */
import type { NaslComponentPluginOptions } from '@lcap/vue2-utils/plugins';

export const useResponsiveProps: NaslComponentPluginOptions = {
  props: ['xsSpan', 'xsOffset', 'smSpan', 'xsOffset', 'mdSpan', 'mdOffset', 'lgSpan', 'lgOffset', 'xlSpan', 'xlOffset'],
  setup(props) {
    const transformResponsiveProps = (key, keys) => {
      return props.useComputed(keys, (span, offset) => {
        if (span === undefined && offset === undefined) {
          return props.get(key);
        }
        if (offset === undefined) {
          return span;
        }
        return { span, offset };
      });
    };
    const keys = ['xs', 'sm', 'md', 'lg', 'xl'];
    const newKeys = {};
    keys.forEach((key) => {
      const newKey = [`${key}Span`, `${key}Offset`];
      newKeys[key] = transformResponsiveProps(key, newKey);
    });
    return newKeys;
  },
};
