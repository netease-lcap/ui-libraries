import { NaslComponentPluginOptions } from '../plugin';

/**
 * v-model 兼容 update:sync
 */
export const useVModelSync: NaslComponentPluginOptions = {
  setup: (props) => {
    return {
      onInput: (v: any) => {
        const onInput = props.get('onInput');
        const onUpdateValue = props.get('update:value');
        if (typeof onInput === 'function') {
          onInput(v);
        }

        if (typeof onUpdateValue === 'function') {
          onUpdateValue(v);
        }
      },
    };
  },
};
