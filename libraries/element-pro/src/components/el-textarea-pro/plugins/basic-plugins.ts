import { createUseUpdateSync, $deletePropList } from '@lcap/vue2-utils';
import type { NaslComponentPluginOptions, Slot } from '@lcap/vue2-utils/plugins/types';

export const useUpdateSync = createUseUpdateSync([{ name: 'value', event: 'change' }]);

export const useAutoSize: NaslComponentPluginOptions = {
  order: 1,
  props: ['minRows', 'maxRows'],
  setup: (props, { h }) => {
    let autosize = props.get<boolean | { minRows: number, maxRows: number }>('autosize');
    const minRows = props.get<number>('minRows');
    const maxRows = props.get<number>('maxRows');

    if (autosize && (minRows || maxRows)) {
      autosize = {
        minRows: minRows || 1,
        maxRows: maxRows || minRows || 1,
      };
    }

    return {
      autosize,
      [$deletePropList]: ['minRows', 'maxRows'],
    };
  },
};
