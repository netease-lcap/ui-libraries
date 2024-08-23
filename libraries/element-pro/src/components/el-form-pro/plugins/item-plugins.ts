import { NaslComponentPluginOptions } from '@lcap/vue2-utils';
import VusionValidator, { localizeRules } from '@lcap/validator';
import { CustomValidateResolveType, FormRule } from '@element-pro';
import { isFunction, map } from 'lodash';

export const useExtensPlugin: NaslComponentPluginOptions = {
  setup(props) {
    const rules = props.useComputed<any>('rules', (v) => {
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

    return {
      rules,
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
