import { createUseUpdateSync, $deletePropList } from '@lcap/vue2-utils';
import type { NaslComponentPluginOptions } from '@lcap/vue2-utils/plugins/types';

export const useUpdateSync = createUseUpdateSync([
  { name: 'current', event: 'current-change' },
  { name: 'pageSize', event: 'page-size-change' },
]);

export const useTotalContent: NaslComponentPluginOptions = {
  props: ['hideTotal'],
  setup: (props, { h }) => {
    const hideTotal = props.get<boolean>('hideTotal');
    let totalContent = props.get<string | false>('totalContent');

    if (hideTotal) {
      totalContent = false;
    }

    return {
      totalContent,
      [$deletePropList]: ['hideTotal'],
    };
  },
};
