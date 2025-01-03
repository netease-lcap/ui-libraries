/* 仅在 ide 环境生效的插件 */
import type { NaslComponentPluginOptions } from '@lcap/vue2-utils';
import { ref } from '@vue/composition-api';

export const useManualClickPlugin: NaslComponentPluginOptions = {
  setup(props) {
    const visible = ref(false);
    return {
      manual: true,
      value: visible,
      onClick() {
        visible.value = !visible.value;
      },
    };
  },
  onlyUseIDE: true,
};
