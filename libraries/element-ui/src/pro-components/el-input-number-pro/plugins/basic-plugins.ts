import { createUseUpdateSync } from '@lcap/vue2-utils';
import type { NaslComponentPluginOptions } from '@lcap/vue2-utils/plugins/types';
import { shallowRef, computed } from '@vue/composition-api';
import { isFunction, isNil } from 'lodash';

export { useFormFieldClass } from '../../../plugins/use-form-field-class';

export const useUpdateSync = createUseUpdateSync([{ name: 'value', event: 'change' }]);

export const useValue: NaslComponentPluginOptions = {
  setup: (props) => {
    const focused = shallowRef(false);
    const onEnter = props.get('onEnter');
    const onKeydown = props.get('onKeydown');
    const onKeypress = props.get('onKeypress');
    const onKeyup = props.get('onKeyup');
    return {
      value: props.useComputed('value', (v) => (isNil(v) ? undefined : v)),
      class: computed(() => {
        const v = props.get('class');
        return [v, focused.value ? 'cw-is-focus' : ''].filter((css) => !!css).join(' ');
      }),
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
      onFocus: (...args) => {
        focused.value = true;
        const onFocus = props.get('onFocus');
        if (isFunction(onFocus)) {
          onFocus(...args);
        }
      },
      onBlur: (...args) => {
        focused.value = false;
        const onBlur = props.get('onBlur');
        if (isFunction(onBlur)) {
          onBlur(...args);
        }
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
    };
  },
};

export const useAutoFocus: NaslComponentPluginOptions = {
  setup: (props) => {
    const inputProps = props.useComputed('autofocus', (v) => {
      return {
        autofocus: v,
      };
    });

    return {
      inputProps,
    };
  },
};
