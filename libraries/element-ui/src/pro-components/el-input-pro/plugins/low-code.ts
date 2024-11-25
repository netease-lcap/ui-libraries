/* 仅在 ide 环境生效的插件 */
import type { NaslComponentPluginOptions } from '@lcap/vue2-utils/plugins/types';
import { getCurrentInstance, onMounted } from '@vue/composition-api';
import { createUseFormLowcode } from '../../../plugins/use-form-lowcode';
import { TAG_NAME, FORM_TAG_NAME } from '../constants';

export const useFormLowcode = createUseFormLowcode(TAG_NAME, FORM_TAG_NAME);

export const useNodePath: NaslComponentPluginOptions = {
  onlyUseIDE: true,
  setup: (props, ctx) => {
    const nodePath = props.get<string>('data-nodepath');

    onMounted(() => {
      const ins = getCurrentInstance();
      if (ins.refs.$base) {
        (ins.refs.$base as any).$el.setAttribute('data-nodepath', nodePath);
      }
    });

    return {};
  },
};
