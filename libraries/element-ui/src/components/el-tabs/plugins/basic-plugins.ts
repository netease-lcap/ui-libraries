/* 组件功能扩展插件 */
import type { NaslComponentPluginOptions } from '@lcap/nasl-hoc-vue/index';

type AllowBeforeLeave = '允许切换' | '阻止切换';

export const useTabBeforeLeave: NaslComponentPluginOptions = {
  props: ['allowBeforeLeave'],
  setup: (props) => {
    const beforeLeave = props.useComputed(['allowBeforeLeave', 'beforeLeave'], (allowBeforeLeave: AllowBeforeLeave, beforeLeave: any) => {
      // 兼容 beforeLeave 原有功能
      if (beforeLeave) {
        return beforeLeave;
      }

      if (allowBeforeLeave === '阻止切换') {
        return false
      }

      return true;
    });

    return {
      beforeLeave,
    };
  },
  order: 2,
};