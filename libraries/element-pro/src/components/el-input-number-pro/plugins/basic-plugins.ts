import { createUseUpdateSync } from '@lcap/vue2-utils';
import type { NaslComponentPluginOptions } from '@lcap/vue2-utils/plugins/types';
import { isFunction, isNil } from 'lodash';

export const useUpdateSync = createUseUpdateSync([{ name: 'value', event: 'change' }]);

export const useValue: NaslComponentPluginOptions = {
  setup: (props) => {
    return {
      value: props.useComputed('value', (v) => (isNil(v) ? undefined : v)),
      onChange(v) {
        const onChange = props.get('onChange');
        const onUpdateValue = props.get('update:value');

        const value = v === undefined ? null : v;

        if (isFunction(onChange)) {
          onChange(value);
        }

        if (isFunction(onUpdateValue)) {
          onUpdateValue(value);
        }
      },
    };
  },
};
