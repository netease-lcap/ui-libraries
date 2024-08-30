import { type VNode } from 'vue';
import type { NaslComponentPluginOptions } from '@lcap/vue2-utils';
import { isEmptyVNodes } from '@lcap/vue2-utils/plugins/utils';
import VusionValidator, { localizeRules } from '@lcap/validator';
import { CustomValidateResolveType, FormRule } from '@element-pro';
import { isFunction, map, uniqueId } from 'lodash';
import {
  computed,
  inject,
  onUnmounted,
  provide,
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

export const useExtensPlugin: NaslComponentPluginOptions = {
  props: ['colSpan', 'labelWidthType', 'labelEllipsis'],
  setup(props, { h }) {
    const { useComputed } = props;
    const {
      labelEllipsis,
      getFieldValue,
      setFieldValue,
      initField,
      removeField,
    } = inject<FormExtendsContext>(FORM_CONTEXT, {
      getFieldValue: () => undefined,
      setFieldValue: () => {},
      initField: () => {},
      removeField: () => {},
    } as any);
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

    const propName = props.useComputed('name');

    const name = computed(() => {
      const k = unref(propName);
      const pk = unref(nameRef);
      if (!k || typeof k !== 'string') {
        return pk || '';
      }

      if (pk) {
        return [pk, k].join('.');
      }

      return k;
    });

    const fieldName = computed(() => {
      if (name.value) {
        return name.value;
      }

      return uid;
    });

    const getFieldName = () => unref(fieldName);

    const handleChangeValue = (v) => {
      setFieldValue(unref(fieldName), v);
    };

    let oldBindValue;
    let changeListener;
    const proxyFormFieldVNode = (vnode: VNode) => {
      const { prop = 'value', event = 'input' } = (vnode.componentOptions.Ctor as any).options.model;
      const formFieldName = getFieldName();
      const propData: Record<string, any> = vnode.componentOptions.propsData || {};
      const listeners: Record<string, any> = vnode.componentOptions.listeners || {};

      if (!changeListener) {
        changeListener = listeners[event];
      }

      initField({
        name: formFieldName,
        change: changeListener,
        value: propData[prop],
      });

      let formFieldValue = getFieldValue(formFieldName);
      if (Object.prototype.hasOwnProperty.call(propData, prop) && propData[prop] !== oldBindValue && propData[prop] !== formFieldValue) {
        setFieldValue(formFieldName, propData[prop]);
        formFieldValue = propData[prop];
      }

      oldBindValue = propData[prop];
      propData[prop] = formFieldValue;
      listeners[event] = handleChangeValue;

      return h(vnode.componentOptions.tag, {
        attrs: vnode.data.attrs,
        props: { ...propData },
        on: listeners,
        nativeOn: vnode.data.nativeOn,
        scopedSlots: vnode.data.scopedSlots,
      }, vnode.componentOptions.children || []);
    };

    onUnmounted(() => {
      removeField(getFieldName());
    });

    watch(fieldName, (val, oldVal) => {
      if (oldVal && oldVal !== val) {
        removeField(oldVal);
      }
    });

    provide<FormItemExtendsContext>(FORM_ITEM_CONTEXT, {
      name,
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

        if (isEmptyVNodes(vnodes)) {
          return vnodes;
        }

        let proxyed = false;
        return vnodes.map((v) => {
          if (
            v.componentOptions
            && v.componentOptions.Ctor
            && (v.componentOptions.Ctor as any).options
            && typeof (v.componentOptions.Ctor as any).options.model === 'object'
            && !proxyed
          ) {
            proxyed = true;
            return proxyFormFieldVNode(v);
          }

          return v;
        });
      },
    };
  },
};
