import { type VNode } from 'vue';
import type { NaslComponentPluginOptions } from '@lcap/vue2-utils';
import type { MapGet } from '@lcap/vue2-utils/plugins/types';
import VusionValidator, { localizeRules } from '@lcap/validator';
import { CustomValidateResolveType, FormRule } from '@element-pro';
import { isFunction, map } from 'lodash';
import {
  computed,
  ComputedRef,
  inject,
  unref,
} from '@vue/composition-api';
import {
  FORM_CONTEXT,
  LabelWidthType,
} from '../constants';
import { FormExtendsContext } from '../types';
import { useRegisterInstance, useFormField } from '../hooks';

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
    } = inject<FormExtendsContext>(FORM_CONTEXT, {} as any);
    useRegisterInstance(ctx);

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

    const { fieldName, proxyVNodes } = useFormField(props, h, isDesigner);

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

        return proxyVNodes(vnodes);
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
