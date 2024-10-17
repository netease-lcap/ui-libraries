/* 组件功能扩展插件 */
import { createUseUpdateSync } from '@lcap/vue2-utils';
import type { NaslComponentPluginOptions } from '@lcap/vue2-utils/plugins/types';

export const useUpdateSync = createUseUpdateSync([{ name: 'value', event: 'change' }]);

export const useExtendprops: NaslComponentPluginOptions = {
  props: ['iconname'],
  setup({ get: propGet, useComputed }, { h }) {
    const iconProp = useComputed(['iconname'], (icon) => {
      if (!icon) {
        return null;
      }
      return () => h('el-icon', { attrs: { name: icon } });
    });
    return {
      slotIcon: iconProp,
    };
  },
};
