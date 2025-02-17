/* eslint-disable no-underscore-dangle */
import { RenderBaseComponent, RENDER_COMPONENT_KEY } from '@lcap/vue2-utils';
import { IN_ELEMENT_FORM, IN_ELEMENT_FORM_ITEM } from './pro-components/el-form-pro/constants';

export const INJECT_BASE_COMPONENT_KEY = RENDER_COMPONENT_KEY;
export const BaseComponent = RenderBaseComponent;

export const extendComponent = (component: any, ec: any) => {
  if (component && typeof component.__extend === 'function') {
    return component.__extend(ec);
  }

  return component;
};

export const lowCodeFormFieldMixin = (tagName, formTagName) => {
  return {
    inject: [IN_ELEMENT_FORM, IN_ELEMENT_FORM_ITEM],
    mounted() {
      const self = this as any;
      const nodePath = self.$attrs['data-nodepath'];
      if (!nodePath) {
        return;
      }

      const { IN_ELEMENT_FORM: inForm, IN_ELEMENT_FORM_ITEM: inFormItem } = self as any;
      const elem = self.$el;
      if (!elem) {
        return;
      }

      elem.setAttribute('data-element-tag', inForm && !inFormItem ? formTagName : tagName);
      elem.setAttribute('data-nodepath', nodePath);
      elem.setAttribute('data-has-mutation', 'true');
    },
  };
};
