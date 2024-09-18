import type { NaslComponentPluginOptions } from '@lcap/vue2-utils/plugins/types';

export const useColon: NaslComponentPluginOptions = {
  setup: (props) => {
    return {
      colon: false,
    };
  },
};
