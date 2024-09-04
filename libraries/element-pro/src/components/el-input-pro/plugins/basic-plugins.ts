import { createUseUpdateSync, $deletePropList } from '@lcap/vue2-utils';
import type { NaslComponentPluginOptions, Slot } from '@lcap/vue2-utils/plugins/types';
import { isFunction, isNil } from 'lodash';

export const useUpdateSync = createUseUpdateSync([{ name: 'value', event: 'change' }]);

export const useIcon: NaslComponentPluginOptions = {
  order: 1,
  props: ['prefixIcon', 'suffixIcon'],
  setup: (props, { h }) => {
    return {
      slotPrefixIcon: () => {
        const slotPrefixIcon = props.get<Slot>('slotPrefixIcon');
        const prefixIcon = props.get<string>('prefixIcon');

        return prefixIcon ? h('el-icon', {
          attrs: { name: prefixIcon },
        }) : slotPrefixIcon && slotPrefixIcon();
      },
      slotSuffixIcon: () => {
        const slotSuffixIcon = props.get<Slot>('slotSuffixIcon');
        const suffixIcon = props.get<string>('suffixIcon');

        return suffixIcon ? h('el-icon', {
          attrs: { name: suffixIcon },
        }) : slotSuffixIcon && slotSuffixIcon();
      },
      [$deletePropList]: ['prefixIcon', 'suffixIcon'],
    };
  },
};

export const useValue: NaslComponentPluginOptions = {
  setup: (props) => {
    return {
      value: props.useComputed('value', (v) => (isNil(v) ? '' : v)),
      onChange(v) {
        const onChange = props.get('onChange');
        const onUpdateValue = props.get('update:value');

        const value = v === '' ? null : v;

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
