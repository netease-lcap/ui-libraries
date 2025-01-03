/* 仅在 ide 环境生效的插件 */
import type { NaslComponentPluginOptions } from '@lcap/vue2-utils';
import { ref } from '@vue/composition-api';

export const useManualClickPlugin: NaslComponentPluginOptions = {
  setup(props, { setupContext: ctx }) {
    const visible = ref(false);
    return {
      manual: true,
      value: visible,
      onClick() {
        visible.value = !visible.value;
        const popperRef = ctx.refs.$base?.$refs?.popper;
        const nodepath = props.get<string>('data-nodepath');
        if (popperRef && nodepath) {
          popperRef.setAttribute('data-nodepath', nodepath);
        }
      },
    };
  },
  onlyUseIDE: true,
};
