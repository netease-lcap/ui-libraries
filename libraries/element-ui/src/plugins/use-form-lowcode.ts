import type { NaslComponentPluginOptions } from '@lcap/vue2-utils';
import { getCurrentInstance, inject, onMounted } from '@vue/composition-api';
import { IN_ELEMENT_FORM, IN_ELEMENT_FORM_ITEM } from '../pro-components/el-form-pro/constants';

export const createUseFormLowcode = (name, formTagName) => {
  return {
    setup(props) {
      const inForm = inject(IN_ELEMENT_FORM);
      const inFormItem = inject(IN_ELEMENT_FORM_ITEM);
      const instance = getCurrentInstance();
      onMounted(() => {
        if (!instance) {
          return;
        }

        const elem = (instance.refs.$base as Vue)?.$el;
        if (!elem) {
          return;
        }
        const nodePath = props.get<string>('data-nodepath');
        if (nodePath) {
          elem.setAttribute('data-element-tag', inForm && !inFormItem ? formTagName : name);
          elem.setAttribute('data-nodepath', nodePath);
          elem.setAttribute('data-has-mutation', 'true');
        }
      });
    },
    order: 10,
    onlyUseIDE: true,
  } as NaslComponentPluginOptions;
};
