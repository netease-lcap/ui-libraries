import { type VNode } from 'vue';
import type { NaslComponentPluginOptions } from '@lcap/vue2-utils';
import { isEmptyVNodes } from '@lcap/vue2-utils/plugins/utils';
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
  provide,
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
import { FormExtendsContext, FormItemExtendsContext } from '../types';

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
}

export const useExtensPlugin: NaslComponentPluginOptions = {
  props: [
    'colSpan',
    'labelWidthType',
    'labelEllipsis',
    'useRangeValue',
    'startFieldName',
    'endFieldName',
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

    const rules = useComputed<any>('rules', (v) => {
      if (!v) {
        return [];
      }

      return map(v, (item) => {
        return {
          required: item.required,
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

    const ellipsisRef = useComputed<boolean | undefined>('labelEllipsis');

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

    const getFieldName = () => unref(fieldName) as string;

    const proxyRangeFieldVNode = (vnode: VNode) => {
      const [startProp, endProp] = (vnode.componentOptions.Ctor as any).options.rangeModel;
      const propData: Record<string, any> = vnode.componentOptions.propsData || {};
      const listeners: Record<string, any> = vnode.componentOptions.listeners || {};

      propData.formRangeField = initFormRangeField({
        uid,
        name: [startFieldName.value, endFieldName.value],
        value: [propData[startProp], propData[endProp]],
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

    const proxyFormFieldVNode = (vnode: VNode) => {
      const { prop = 'value' } = (vnode.componentOptions.Ctor as any).options.model;
      const formFieldName = getFieldName();
      const propData: Record<string, any> = vnode.componentOptions.propsData || {};
      const listeners: Record<string, any> = vnode.componentOptions.listeners || {};

      propData.formField = initFormField({ name: formFieldName, value: propData[prop] });

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
        removeField(uid);
      }
    });

    provide<FormItemExtendsContext>(FORM_ITEM_CONTEXT, {
      name: computed(() => (name.value || unref(nameRef))),
    });

    return {
      rules,
      class: className,
      labelWidth,
      name: fieldName,
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

        const useRangeValue = getUseRangeValue();

        if (useRangeValue) {
          const index = vnodes.findIndex((v) => {
            return v.componentOptions
            && v.componentOptions.Ctor
            && (v.componentOptions.Ctor as any).options
            && Array.isArray((v.componentOptions.Ctor as any).options.rangeModel)
            && (v.componentOptions.Ctor as any).options.rangeModel.length === 2;
          });

          if (index !== -1) {
            vnodes[index] = proxyRangeFieldVNode(vnodes[index]);
          }
        } else {
          const index = vnodes.findIndex((v) => (
            v.componentOptions
            && v.componentOptions.Ctor
            && (v.componentOptions.Ctor as any).options
            && typeof (v.componentOptions.Ctor as any).options.model === 'object'
          ));
          if (index !== -1) {
            vnodes[index] = proxyFormFieldVNode(vnodes[index]);
          }
        }

        return vnodes;
      },
    };
  },
};
