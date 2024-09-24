import { ComponentOptions, VNode } from 'vue';
import { LCAP_FORM_NAME, LCAP_FORM_ITEM_NAME } from './constants';

export const isModelOption = (option: ComponentOptions<any>) => {
  return option && option.model && !!option.model.prop;
};

export const isRangeModelOption = (option: any) => {
  return option && Array.isArray(option.rangeModel) && option.rangeModel.length === 2;
};

export const isFormOption = (option: ComponentOptions<any>) => {
  return option && [LCAP_FORM_NAME, LCAP_FORM_ITEM_NAME].includes(option.name);
};

export const isModelVNode = (vnode: VNode) => {
  return vnode && vnode.componentOptions
  && vnode.componentOptions.Ctor
  && (vnode.componentOptions.Ctor as any).options
  && isModelOption((vnode.componentOptions.Ctor as any).options);
};

export const isRangeModelVNode = (vnode: VNode) => {
  return vnode && vnode.componentOptions
  && vnode.componentOptions.Ctor
  && (vnode.componentOptions.Ctor as any).options
  && isRangeModelOption((vnode.componentOptions.Ctor as any).options);
};

export const isFormVNode = (vnode: VNode) => {
  return vnode && vnode.componentOptions
  && vnode.componentOptions.Ctor
  && (vnode.componentOptions.Ctor as any).options
  && isFormOption((vnode.componentOptions.Ctor as any).options);
};
