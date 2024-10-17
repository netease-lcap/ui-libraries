/* 组件功能扩展插件 */
import type { NaslComponentPluginOptions } from '@lcap/vue2-utils/plugins';
import { getCurrentInstance } from '@vue/composition-api';

export const useResponsiveProps: NaslComponentPluginOptions = {
  props: ['xsSpan', 'xsOffset', 'smSpan', 'xsOffset', 'mdSpan', 'mdOffset', 'lgSpan', 'lgOffset', 'xlSpan', 'xlOffset'],
  setup(props) {
    const instance = getCurrentInstance() as any;
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
    const newprops = {
      onClick: (event) => {
        const colInstance = instance.parent;
        const vnodes = colInstance?.parent?.slots?.default || [];
        const columnIndex = vnodes.findIndex((vnode) => vnode === colInstance?.vnode);
        // 获取当前绑定 change 事件
        const onClick = props.get('onClick');

        if (typeof onClick === 'function') {
          onClick({
            column: columnIndex,
          });
        }
      },
      ...newKeys,
    };
    return newprops;
  },
};
