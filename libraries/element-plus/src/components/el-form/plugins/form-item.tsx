import VusionValidator, { localizeRules } from '@lcap/validator';
import _ from 'lodash';
import { $formProvide } from '@/components/el-form/constants';

export function handleRules(props, { useState, useEffect, useMemo }) {
  const propName = useMemo(() => _.uniqueId('formItemPropName'), []);
  const rules = props.get('rules');
  const prop = props.get('prop') ?? propName;
  const inject = props.get('inject');
  const provide = props.get('provide');
  const { value, setValue: setFormValue } = inject?.value?.[$formProvide] ?? {};
  return {
    prop,
    rules: _.map(rules, (item) => {
      return {
        message: item.message,
        required: item.required,
        trigger: 'blur',
        validator: (rule, value, callback) => {
          const validator = new (VusionValidator as any)(undefined, localizeRules, [item]);
          return new Promise((resolve) => {
            validator
              .validate(value)
              .then(() => {
                resolve(true);
              })
              .catch((errorMessage) => {
                callback(new Error(errorMessage));
                resolve({
                  result: false,
                  message: errorMessage,
                });
              });
          });
        },
      };
    }),
    name: 'formItem',
    provide: Object.assign(provide, {
      [$formProvide]: {
        value,
        name: 'formitemname',
        setValue(arg) {
          console.log(value, 'formitem value');
          setFormValue({
            ...value.value,
            [prop]: arg,
          });
    
        },
      },
    }),
  };
}
