import { createUseUpdateSync, $deletePropList } from '@lcap/vue2-utils';
import type { NaslComponentPluginOptions, Slot } from '@lcap/vue2-utils/plugins/types';
import { isFunction } from 'lodash';

export const useUpdateSync = createUseUpdateSync([{ name: 'value', event: 'change' }]);

export const useAutoSize: NaslComponentPluginOptions = {
  order: 1,
  props: ['minRows', 'maxRows'],
  setup: (props, { h }) => {
    const size = props.useRef(['autosize', 'minRows', 'maxRows'], (autosize, minRows, maxRows) => {
      let v = autosize;
      if (autosize && (minRows || maxRows)) {
        v = {
          minRows: minRows || 1,
          maxRows: maxRows || minRows || 1,
        };
      }

      return v;
    });

    return {
      autosize: size,
      [$deletePropList]: ['minRows', 'maxRows'],
    };
  },
};

export const useValue: NaslComponentPluginOptions = {
  setup: (props) => {
    return {
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
