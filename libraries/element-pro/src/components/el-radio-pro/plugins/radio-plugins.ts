import type { NaslComponentPluginOptions } from '@lcap/vue2-utils/plugins';
import { uid } from 'uid';

export const useDefaultValue: NaslComponentPluginOptions = {
  setup({ useComputed }) {
    const defaultValue = uid();
    const valueAttr = useComputed('value', (v) => (v === undefined ? defaultValue : v));
    return {
      value: valueAttr,
    };
  },
};
