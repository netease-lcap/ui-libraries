import { $render, type NaslComponentPluginOptions } from '@lcap/vue2-utils/plugins';
import { inject, unref } from '@vue/composition-api';
import { RadioButton } from '@element-pro';
import { uid } from 'uid';

export const useDefaultValue: NaslComponentPluginOptions = {
  props: [
    'value',
  ],
  setup({ useComputed }) {
    const defaultValue = uid();
    const valueAttr = useComputed('value', (v) => (v === undefined ? defaultValue : v));

    const shape = inject('EL_RADIO_GROUP_SHAPE', null);

    return {
      value: valueAttr,
      [$render](resultVNode, h, { childrenNodes, propsData }) {
        const button = unref(shape) === 'button';

        if (button) {
          return h(RadioButton, propsData, childrenNodes);
        }

        return resultVNode;
      },
    };
  },
};
