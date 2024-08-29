import { NaslComponentPluginOptions } from '@lcap/vue2-utils';
import VusionValidator, { localizeRules } from '@lcap/validator';
import { CustomValidateResolveType, FormRule } from '@element-pro';
import { isFunction, map } from 'lodash';
import { computed, inject, unref } from '@vue/composition-api';
import { FORM_CONTEXT, LabelWidthType } from '../constants';
import { FormExtendsContext } from '../types';

export const useExtensPlugin: NaslComponentPluginOptions = {
  props: ['colSpan', 'labelWidthType', 'labelEllipsis'],
  setup(props) {
    const { useComputed } = props;
    const { labelEllipsis } = inject<FormExtendsContext>(FORM_CONTEXT, {} as any);

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

    return {
      rules,
      class: className,
      labelWidth,
      slotHelp: () => {
        const slotHelp = props.get('slotHelp');
        const helpIsSlot = props.get<boolean>('helpIsSlot');

        if (helpIsSlot) {
          return isFunction(slotHelp) ? slotHelp() : [];
        }

        return [props.get('help')];
      },
    };
  },
};
