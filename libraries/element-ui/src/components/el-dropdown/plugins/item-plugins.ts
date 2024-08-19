import { $deletePropList, NaslComponentPluginOptions } from '@lcap/nasl-hoc-vue/index';
import ElIcon from '../../el-icon';

export const useExtendsPlugin: NaslComponentPluginOptions = {
  setup(props, { h }) {
    return {
      slotDefault() {
        const icon = props.get('icon');
        const slotDefault = props.get('slotDefault');

        const vnodes: any[] = typeof slotDefault === 'function' ? slotDefault() : [];

        if (icon) {
          vnodes.unshift(h(ElIcon, { attrs: { name: icon } }));
        }

        return vnodes;
      },
      [$deletePropList]: ['icon'],
    };
  },
};
