import { type VNode, type CreateElement } from 'vue';
import {
  computed,
  inject,
  onUnmounted,
  unref,
} from '@vue/composition-api';
import { MapGet } from '@lcap/vue2-utils/plugins/types';
import { isEmptyVNodes } from '@lcap/vue2-utils/plugins/utils';
import { uniqueId } from 'lodash';
import { FORM_CONTEXT, LCAP_FORM_UID } from '../constants';
import {
  cloneComponentVNode,
  getNotUndefinedValue,
  isFormVNode,
  isModelVNode,
  isRangeModelVNode,
} from '../utils';
import { FormExtendsContext, FormField, FormRangeField } from '../types';
import { findVNode } from '../../../utils/vnode';

export const useFieldName = (props: MapGet) => {
  const uid = uniqueId(LCAP_FORM_UID);

  const propName = props.useComputed<string>(['name', 'useRangeValue'], (val, useRangeValue = false) => {
    if (!useRangeValue) {
      return val;
    }

    return '';
  });
  const startFieldName = props.useComputed<string>(['startFieldName', 'useRangeValue'], (val, useRangeValue = false) => {
    if (useRangeValue) {
      return val || `${uid}_START`;
    }

    return uid;
  });
  const endFieldName = props.useComputed<string>(['endFieldName', 'useRangeValue'], (val, useRangeValue = false) => {
    if (useRangeValue) {
      return val || `${uid}_END`;
    }

    return '';
  });

  const fieldName = computed(() => {
    const useRangeValue = props.get('useRangeValue');
    if (useRangeValue) {
      if (startFieldName.value && endFieldName.value) {
        return [LCAP_FORM_UID, startFieldName.value, endFieldName.value, 'RANGE'].join('_');
      }

      return [uid, 'RANGE'].join('_');
    }

    if (propName.value) {
      return propName.value;
    }

    return uid;
  });

  return {
    propName,
    fieldName,
    startFieldName,
    endFieldName,
  };
};

export const useProxyFormFieldVNode = (h: CreateElement, {
  fieldName,
  initialValue,
  initFormField,
  removeField,
}) => {
  let isControlled = false;
  let lastField: FormField | null = null;

  const proxyVNodes = (vnode: VNode) => {
    const { prop = 'value', event } = (vnode.componentOptions?.Ctor as any).options.model;
    if (!vnode.componentInstance && vnode.componentOptions && vnode.componentOptions.propsData) {
      isControlled = Object.prototype.hasOwnProperty.call(vnode.componentOptions.propsData, prop);
    }

    const formFieldName = unref(fieldName) as string;

    if (!isControlled && (!formFieldName || formFieldName.startsWith(LCAP_FORM_UID))) {
      return vnode;
    }

    const propData: Record<string, any> = vnode.componentOptions?.propsData || {};
    const listeners: Record<string, any> = vnode.componentOptions?.listeners || {};
    const formField = initFormField({
      name: formFieldName,
      value: getNotUndefinedValue(propData[prop], initialValue),
    });

    formField.setInitalValue(initialValue);

    lastField = formField;

    if (isControlled) {
      if (formField.getValue() !== propData[prop]) {
        formField.setValue(propData[prop], false);
      }

      formField.setChangeListener((v) => {
        vnode.componentInstance?.$emit(event, v);
      });

      return vnode;
    }

    propData[prop] = formField.getValue();
    listeners[event] = (v) => {
      formField.setValue(v);
    };

    return cloneComponentVNode(h, vnode, { propData, listeners });
  };

  const clearOnRerender = () => {
    if (!lastField) {
      return;
    }

    removeField(lastField.name);
    lastField = null;
  };

  return [proxyVNodes, clearOnRerender] as [(vnode: VNode) => VNode, () => void];
};

export const useProxyRangeFieldVNode = (h: CreateElement, {
  initFormRangeField, fieldName,
  startFieldName, endFieldName,
  startInitialValue, endInitialValue,
  removeField,
}) => {
  let isControlled = false;
  let lastRangeField: FormRangeField | null = null;
  const proxyVNodes = (vnode: VNode) => {
    const [startProp, endProp] = (vnode.componentOptions?.Ctor as any).options.rangeModel;
    const startEvent = `update:${startProp}`;
    const endEvent = `update:${endProp}`;
    if (!vnode.componentInstance && vnode.componentOptions && vnode.componentOptions.propsData) {
      isControlled = Object.prototype.hasOwnProperty.call(vnode.componentOptions.propsData, startProp)
        && Object.prototype.hasOwnProperty.call(vnode.componentOptions.propsData, endProp);
    }

    if (!isControlled && (!startFieldName.value || !endFieldName.value)) {
      return vnode;
    }

    const propData: Record<string, any> = vnode.componentOptions?.propsData || {};
    const listeners: Record<string, any> = vnode.componentOptions?.listeners || {};

    const formRangeField: FormRangeField = initFormRangeField({
      uid: unref(fieldName),
      name: [startFieldName.value, endFieldName.value],
      value: [getNotUndefinedValue(propData[startProp], startInitialValue), getNotUndefinedValue(propData[endProp], endInitialValue)],
    });

    formRangeField.setInitalValue([startInitialValue, endInitialValue]);
    lastRangeField = formRangeField;

    const models = [[startProp, startEvent], [endProp, endEvent]];
    if (isControlled) {
      models.forEach(([prop], i) => {
        if (formRangeField.getValue(i) !== propData[prop]) {
          formRangeField.setValue(i, propData[prop], false);
        }
      });

      formRangeField.setChangeListener(
        (v) => vnode.componentInstance?.$emit(startEvent, v),
        (v) => vnode.componentInstance?.$emit(endEvent, v),
      );

      return vnode;
    }

    models.forEach(([prop, event], i) => {
      propData[prop] = formRangeField.getValue(i);

      listeners[event] = (v) => {
        formRangeField.setValue(i, v);
      };

      formRangeField.setChangeListener(null, null);
    });

    return cloneComponentVNode(h, vnode, { propData, listeners });
  };

  const clearOnRerender = () => {
    if (!lastRangeField) {
      return;
    }
    removeField(lastRangeField.uid, ...lastRangeField.name);
    lastRangeField = null;
  };

  return [proxyVNodes, clearOnRerender] as [(vnode: VNode) => VNode, () => void];
};

export const useFormField = (props: MapGet, h: CreateElement, isDesigner: boolean) => {
  const {
    initFormField,
    initFormRangeField,
    removeField,
  } = inject<FormExtendsContext>(FORM_CONTEXT, {
    getFieldValue: () => undefined,
    setFieldValue: () => {},
    removeField: () => {},
    initFormField: () => null,
    initFormRangeField: () => null,
  } as any);

  const {
    fieldName,
    startFieldName,
    endFieldName,
  } = useFieldName(props);

  const [
    initialValue,
    startInitialValue,
    endInitialValue,
  ] = props.get<[any, any, any]>(['initialValue', 'startInitialValue', 'endInitialValue']);

  const [proxyFormFieldVNode, clearLastFormField] = useProxyFormFieldVNode(h, {
    fieldName,
    initialValue,
    initFormField,
    removeField,
  });
  const [proxyRangeFieldVNode, clearLastFormRangeField] = useProxyRangeFieldVNode(h, {
    initFormRangeField,
    removeField,
    fieldName,
    startFieldName,
    endFieldName,
    startInitialValue,
    endInitialValue,
  });

  onUnmounted(() => {
    removeField(fieldName.value, startFieldName.value, endFieldName.value);
  });

  const getUseRangeValue = () => (props.get<boolean>('useRangeValue') || false);

  const proxyVNodes = (vnodes: VNode[] = []) => {
    clearLastFormField();
    clearLastFormRangeField();
    if (isEmptyVNodes(vnodes) || isDesigner) {
      return vnodes;
    }

    const result = findVNode(vnodes, (vnode) => {
      return isFormVNode(vnode) || isModelVNode(vnode) || isRangeModelVNode(vnode);
    });

    const useRangeValue = getUseRangeValue();

    if (result.vnode && useRangeValue && isRangeModelVNode(result.vnode)) {
      result.collection[result.index] = proxyRangeFieldVNode(result.vnode);
    } else if (result.vnode && isModelVNode(result.vnode)) {
      result.collection[result.index] = proxyFormFieldVNode(result.vnode);
    }

    return vnodes;
  };

  return {
    fieldName,
    proxyVNodes,
  };
};
