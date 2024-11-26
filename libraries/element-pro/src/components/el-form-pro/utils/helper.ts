import { isObject, isNil } from 'lodash';
import Vue, { type ComponentOptions, type CreateElement, type VNode } from 'vue';
import { LCAP_FORM_NAME, LCAP_FORM_ITEM_NAME } from '../constants';

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

export const cloneComponentVNode = (h: CreateElement, vnode: VNode, { propData, listeners }) => {
  if (!vnode.componentOptions || !vnode.componentOptions.Ctor) {
    return vnode;
  }

  return h(vnode.componentOptions.Ctor, {
    attrs: {
      ...vnode.data?.attrs,
    },
    props: { ...propData },
    on: listeners,
    nativeOn: vnode.data?.nativeOn,
    scopedSlots: vnode.data?.scopedSlots,
    staticClass: vnode.data?.staticClass,
    staticStyle: vnode.data?.staticStyle,
    class: vnode.data?.class,
    style: vnode.data?.style,
  }, vnode.componentOptions.children || []);
};

export function splitNameToPath(name) {
  return name.replace(/\[/g, '.').replace(/\]/g, '').split('.');
}

export const getNotUndefinedValue = (v, initV = null) => (v === undefined ? initV : v);

export function deepVueSet(data: any, name: string, value: any = null) {
  const keys = splitNameToPath(name);
  let current = data;
  while (true) {
    const key = keys.shift();
    const val = current[key];
    if (keys.length === 0) {
      if (val === undefined) {
        Vue.set(current, key, value);
      }
      break;
    }

    const nextKey = key;
    if (!Number.isNaN(Number(nextKey)) && !Array.isArray(val)) {
      Vue.set(current, key, []);
    } else if (!Array.isArray(val) && !isObject(val)) {
      Vue.set(current, key, {});
    }

    current = current[key];
  }
}

export const normalizeRangeFieldValue = (startValue: any, endValue: any) => {
  if (isNil(startValue) && isNil(endValue)) {
    return null;
  }

  return [startValue, endValue];
};

export const getTemplateCount = (counts: number | string) => {
  if (!Number.isNaN(counts as number) || typeof counts === 'string') {
    return `repeat(${counts}, minmax(0,1fr))`;
  }

  return counts;
};
