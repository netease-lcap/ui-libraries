import { type VNode, type CreateElement } from 'vue';
import type { NaslComponentPluginOptions } from '@lcap/vue2-utils';
import { isEmptyVNodes } from '@lcap/vue2-utils/plugins/utils';
import type { MapGet } from '@lcap/vue2-utils/plugins/types';
import VusionValidator, { localizeRules } from '@lcap/validator';
import { CustomValidateResolveType, FormRule } from '@element-pro';
import { isFunction, map, uniqueId } from 'lodash';
import {
  computed,
  ComputedRef,
  inject,
  onBeforeUnmount,
  onMounted,
  onUnmounted,
  // provide,
  Ref,
  SetupContext,
  unref,
  watch,
} from '@vue/composition-api';
import {
  FORM_CONTEXT,
  FORM_ITEM_CONTEXT,
  LabelWidthType,
  LCAP_FORM_UID,
} from '../constants';
import { FormExtendsContext, FormItemExtendsContext, FormRangeField } from '../types';
import { findVNode } from '../../../utils/vnode';
import { isFormVNode, isModelVNode, isRangeModelVNode } from '../utils';

function getFieldKey(name: ComputedRef<string> | Ref<string> | string, parentKey: ComputedRef<string> | Ref<string> | string): string {
  const k = unref(name) as string;
  const pk = unref(parentKey) as string;
  if (!k || typeof k !== 'string') {
    return '';
  }

  if (pk) {
    return [pk, k].join('.');
  }

  return k;
}

const useRegisterInstance = (ctx: SetupContext) => {
  const { addFormItemInstance = () => {}, removeFormItemInstance = () => {} } = inject<FormExtendsContext>(FORM_CONTEXT, {} as any);

  onMounted(() => {
    addFormItemInstance(ctx.refs.$base);
  });

  onBeforeUnmount(() => {
    removeFormItemInstance(ctx.refs.$base);
  });
};

const useExtendsFormProps = (props: MapGet) => {
  const computedMap: Record<string, ComputedRef<any>> = {};
  [
    'labelEllipsis',
    'requiredMark',
    'showErrorMessage',
    'statusIcon',
  ].forEach((key) => {
    computedMap[key] = props.useComputed(key, (val) => {
      if (typeof val === 'boolean') {
        return val;
      }

      if (!val) {
        return undefined;
      }

      return val === 'show';
    });
  });

  return computedMap;
};

const getNotUndefinedValue = (v, initV = null) => (v === undefined ? initV : v);

const useRules = ({ useComputed }: MapGet) => {
  const rules = useComputed<any>('rules', (v) => {
    if (!v) {
      return [];
    }

    return map(v, (item) => {
      return {
        // required: item.required,
        // message: item.message,
        // ...item,
        trigger: 'all',
        validator: (val) => {
          const validator = new (VusionValidator as any)(undefined, localizeRules, [item]);
          return new Promise((resolve) => {
            validator.validate(val).then(() => {
              resolve(true as CustomValidateResolveType);
            }).catch((errorMessage) => {
              resolve({
                result: false,
                message: errorMessage,
              } as CustomValidateResolveType);
            });
          });
        },
      } as FormRule;
    });
  });
  const disableValidate = useComputed('disableValidate', (val) => val ?? false);

  return computed(() => (disableValidate.value ? [] : rules.value));
};

const cloneComponentVNode = (h: CreateElement, vnode: VNode, { propData, listeners }) => {
  return h(vnode.componentOptions.tag, {
    attrs: {
      ...vnode.data.attrs,
    },
    props: { ...propData },
    on: listeners,
    nativeOn: vnode.data.nativeOn,
    scopedSlots: vnode.data.scopedSlots,
    staticClass: vnode.data.staticClass,
    staticStyle: vnode.data.staticStyle,
    class: vnode.data.class,
    style: vnode.data.style,
  }, vnode.componentOptions.children || []);
};

const useProxyFormFieldVNode = (h: CreateElement, { fieldName, initialValue, initFormField }) => {
  let isControlled = false;

  return (vnode: VNode) => {
    const { prop = 'value', event } = (vnode.componentOptions.Ctor as any).options.model;
    if (!vnode.componentInstance && vnode.componentOptions && vnode.componentOptions.propsData) {
      isControlled = Object.prototype.hasOwnProperty.call(vnode.componentOptions.propsData, prop);
    }

    const formFieldName = unref(fieldName) as string;
    const propData: Record<string, any> = vnode.componentOptions.propsData || {};
    const listeners: Record<string, any> = vnode.componentOptions.listeners || {};
    const formField = initFormField({
      name: formFieldName,
      value: getNotUndefinedValue(propData[prop], initialValue),
    });

    formField.setInitalValue(initialValue);

    console.log(vnode);

    if (isControlled) {
      if (formField.getValue() !== propData[prop]) {
        formField.setValue(propData[prop], false);
      }

      const updateValue = listeners[event];

      formField.setChangeListener((v) => {
        updateValue(v);
      });

      listeners[event] = (v) => {
        formField.setValue(v, false);
        updateValue(v);
      };

      return vnode;
    }

    propData[prop] = formField.getValue();
    listeners[event] = (v) => {
      formField.setValue(v);
    };

    return cloneComponentVNode(h, vnode, { propData, listeners });
  };
};

const useProxyRangeFieldVNode = (h: CreateElement, {
  initFormRangeField, uid,
  startFieldName, endFieldName,
  startInitialValue, endInitialValue,
}) => {
  let isControlled = false;
  return (vnode: VNode) => {
    const [startProp, endProp] = (vnode.componentOptions.Ctor as any).options.rangeModel;
    const startEvent = `update:${startProp}`;
    const endEvent = `update:${endProp}`;
    if (!vnode.componentInstance && vnode.componentOptions && vnode.componentOptions.propsData) {
      isControlled = Object.prototype.hasOwnProperty.call(vnode.componentOptions.propsData, startProp)
        && Object.prototype.hasOwnProperty.call(vnode.componentOptions.propsData, endProp);
    }

    const propData: Record<string, any> = vnode.componentOptions.propsData || {};
    const listeners: Record<string, any> = vnode.componentOptions.listeners || {};

    const formRangeField: FormRangeField = initFormRangeField({
      uid,
      name: [startFieldName.value, endFieldName.value],
      value: [getNotUndefinedValue(propData[startProp], startInitialValue), getNotUndefinedValue(propData[endProp], endInitialValue)],
    });

    formRangeField.setInitalValue([startInitialValue, endInitialValue]);

    const models = [[startProp, startEvent], [endProp, endEvent]];
    if (isControlled) {
      models.forEach(([prop, event], i) => {
        if (formRangeField.getValue(i) !== propData[prop]) {
          formRangeField.setValue(i, propData[prop], false);
        }

        const updateValue = listeners[event];
        listeners[event] = (v) => {
          formRangeField.setValue(i, v, false);
          updateValue(v);
        };
      });

      formRangeField.setChangeListener(
        (val) => vnode.componentInstance?.$emit(startEvent, val),
        (val) => vnode.componentInstance?.$emit(endEvent, val),
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

    return h(vnode.componentOptions.tag, {
      attrs: vnode.data.attrs,
      props: { ...propData },
      on: listeners,
      nativeOn: vnode.data.nativeOn,
      scopedSlots: vnode.data.scopedSlots,
      staticClass: vnode.data.staticClass,
      staticStyle: vnode.data.staticStyle,
    }, vnode.componentOptions.children || []);
  };
};

export const useExtensPlugin: NaslComponentPluginOptions = {
  props: [
    'colSpan',
    'labelWidthType',
    'labelEllipsis',
    'useRangeValue',
    'startFieldName',
    'endFieldName',
    'initialValue',
    'startInitialValue',
    'endInitialValue',
    'disableValidate',
  ],
  setup(props, { h, isDesigner, setupContext: ctx }) {
    const { useComputed } = props;
    const {
      labelEllipsis,
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
    useRegisterInstance(ctx);
    const { name: nameRef } = inject<FormItemExtendsContext>(FORM_ITEM_CONTEXT, { } as any);
    const uid = uniqueId(LCAP_FORM_UID);

    const rules = useRules(props);
    const { labelEllipsis: ellipsisRef, ...extendsFormProps } = useExtendsFormProps(props);

    const className = computed<string>(() => {
      const e = unref(ellipsisRef);
      const ellipsis = typeof e === 'undefined' ? unref(labelEllipsis) : e;
      const classList: string[] = [];
      if (ellipsis) {
        classList.push('el-p-form__item--ellipsis');
      }

      return classList.join(' ');
    });

    const labelWidth = useComputed(['labelWidthType', 'labelWidth'], (
      labelWidthType = '',
      width = undefined,
    ) => {
      if (!labelWidthType) {
        return width;
      }

      return LabelWidthType[labelWidthType];
    });

    const getUseRangeValue = () => (props.get<boolean>('useRangeValue') || false);

    const propName = props.useComputed<string>(['name', 'useRangeValue'], (val, useRangeValue = false) => {
      if (!useRangeValue) {
        return val;
      }

      return '';
    });
    const startPropName = props.useComputed<string>(['startFieldName', 'useRangeValue'], (val, useRangeValue = false) => {
      if (useRangeValue) {
        return val;
      }

      return '';
    });
    const endPropName = props.useComputed<string>(['endFieldName', 'useRangeValue'], (val, useRangeValue = false) => {
      if (useRangeValue) {
        return val;
      }

      return '';
    });

    const name = computed(() => getFieldKey(propName, nameRef));
    const startFieldName = computed(() => getFieldKey(startPropName, nameRef));
    const endFieldName = computed(() => getFieldKey(endPropName, nameRef));

    const fieldName = computed(() => {
      if (name.value) {
        return name.value;
      }

      return uid;
    });

    const [
      initialValue,
      startInitialValue,
      endInitialValue,
    ] = props.get<[any, any, any]>(['initialValue', 'startInitialValue', 'endInitialValue']);

    const proxyFormFieldVNode = useProxyFormFieldVNode(h, { fieldName, initialValue, initFormField });
    const proxyRangeFieldVNode = useProxyRangeFieldVNode(h, {
      initFormRangeField,
      uid: fieldName.value,
      startFieldName,
      endFieldName,
      startInitialValue,
      endInitialValue,
    });

    onUnmounted(() => {
      removeField(fieldName.value);
      removeField(startFieldName.value);
      removeField(endFieldName.value);
    });

    watch(fieldName, (val, oldVal) => {
      if (oldVal && oldVal !== val) {
        removeField(oldVal);
      }
    });

    watch(() => ([startFieldName.value || '', endFieldName.value || ''].join('|')), (val, oldVal) => {
      if (oldVal && oldVal !== val) {
        oldVal.split('|').forEach((n) => removeField(n));
        removeField(fieldName.value);
      }
    });

    return {
      rules,
      class: className,
      labelWidth,
      name: fieldName,
      ...extendsFormProps,
      slotHelp: () => {
        const slotHelp = props.get('slotHelp');
        const helpIsSlot = props.get<boolean>('helpIsSlot');

        if (helpIsSlot) {
          return isFunction(slotHelp) ? slotHelp() : [];
        }

        return [props.get('help')];
      },
      slotDefault: () => {
        const slotDefault = props.get<any>('slotDefault') || (() => []);
        const vnodes: VNode[] = slotDefault();

        if (isEmptyVNodes(vnodes) || isDesigner) {
          return vnodes;
        }

        const result = findVNode(vnodes, (vnode) => {
          return isFormVNode(vnode) || isModelVNode(vnode) || isRangeModelVNode(vnode);
        });

        const useRangeValue = getUseRangeValue();

        if (result.vnode && (useRangeValue || (result.vnode.componentOptions.propsData && (result.vnode.componentOptions.propsData as any).range)) && isRangeModelVNode(result.vnode)) {
          result.collection[result.index] = proxyRangeFieldVNode(result.vnode);
        } else if (result.vnode && isModelVNode(result.vnode)) {
          result.collection[result.index] = proxyFormFieldVNode(result.vnode);
        }

        return vnodes;
      },
    };
  },
};

export const useLowcode: NaslComponentPluginOptions = {
  setup(props) {
    return {
      style: {
        overflow: 'hidden',
      },
    };
  },
  onlyUseIDE: true,
};
