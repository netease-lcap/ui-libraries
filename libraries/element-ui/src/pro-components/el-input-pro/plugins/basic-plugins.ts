import { createUseUpdateSync, $deletePropList, $ref } from '@lcap/vue2-utils';
import type { NaslComponentPluginOptions, Slot } from '@lcap/vue2-utils/plugins/types';
import { isFunction, isNil } from 'lodash';
import { getCurrentInstance } from '@vue/composition-api';

export { useFormFieldClass } from '../../../plugins/use-form-field-class';

export const useUpdateSync = createUseUpdateSync([{ name: 'value', event: 'change' }]);

export const useIcon: NaslComponentPluginOptions = {
  order: 1,
  props: ['prefixIcon', 'suffixIcon'],
  setup: (props, { h }) => {
    const onEnter = props.get('onEnter');
    const onKeydown = props.get('onKeydown');
    const onKeypress = props.get('onKeypress');
    const onKeyup = props.get('onKeyup');
    const instance = getCurrentInstance();
    return {
      [$ref]: {
        focus: () => {
          instance?.refs?.$base?.focus();
        },
        blur: () => {
          instance?.refs?.$base?.blur();
        },
        select: () => {
          instance?.refs?.$base?.$el.querySelector('input')?.select();
        },
        clear: () => {
          instance?.refs?.$base?.emitClear();
        },
      },
      onEnter: (value, event) => {
        if (isFunction(onEnter)) {
          onEnter({ value, event });
        }
      },
      onKeydown: (value, event) => {
        if (isFunction(onKeydown)) {
          onKeydown({ value, event });
        }
      },
      onKeypress: (value, event) => {
        if (isFunction(onKeypress)) {
          onKeypress({ value, event });
        }
      },
      onKeyup: (value, event) => {
        if (isFunction(onKeyup)) {
          onKeyup({ value, event });
        }
      },
      slotPrefixIcon: () => {
        const slotPrefixIcon = props.get<Slot>('slotPrefixIcon');
        const prefixIcon = props.get<string>('prefixIcon');

        return prefixIcon
          ? h('el-icon', {
              attrs: { name: prefixIcon },
            })
          : slotPrefixIcon && slotPrefixIcon();
      },
      slotSuffixIcon: () => {
        const slotSuffixIcon = props.get<Slot>('slotSuffixIcon');
        const suffixIcon = props.get<string>('suffixIcon');

        return suffixIcon
          ? h('el-icon', {
              attrs: { name: suffixIcon },
            })
          : slotSuffixIcon && slotSuffixIcon();
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
