import { createUseUpdateSync, $deletePropList } from '@lcap/vue2-utils';
import type { NaslComponentPluginOptions } from '@lcap/vue2-utils/plugins/types';

export const useUpdateSync = createUseUpdateSync([
  { name: 'current', event: 'change' },
  { name: 'pageSize', event: 'change' },
]);

export const useDisabled: NaslComponentPluginOptions = {
  props: ['disabledPrev', 'disabledCurrent', 'disabledNext'],
  setup: (props, { h }) => {
    const disabled = {
      prev: props.get<boolean>('disabledPrev'),
      current: props.get<boolean>('disabledCurrent'),
      next: props.get<boolean>('disabledNext'),
    };

    return {
      disabled,
      [$deletePropList]: ['disabledPrev', 'disabledCurrent', 'disabledNext'],
    };
  },
};

export const useTips: NaslComponentPluginOptions = {
  props: ['prevTips', 'currentTips', 'nextTips'],
  setup: (props, { h }) => {
    const prevTips = props.get<string>('prevTips');
    const currentTips = props.get<string>('currentTips');
    const nextTips = props.get<string>('nextTips');

    const tips = {
      prev: prevTips,
      current: currentTips,
      next: nextTips,
    };

    return {
      tips,
      [$deletePropList]: ['prevTips', 'currentTips', 'nextTips'],
    };
  },
};
