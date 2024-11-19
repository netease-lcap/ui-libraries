import { $deletePropList, NaslComponentPluginOptions } from '@lcap/vue2-utils';

/* 仅在 ide 环境生效的插件 */
export const useLowcodePlugin: NaslComponentPluginOptions = {
  setup() {
    return {
      [$deletePropList]: ['expandedRowKeys'],
    }
  },
  onlyUseIDE: true,
};
