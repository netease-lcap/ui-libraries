import _ from 'lodash';
import { $formProvide } from '@/components/van-form/constants';
import { useRef } from '@/plugins/hooks';

export function handleModelValue(props) {
  const modelValue = props.get('model') ?? {};
  const model = useRef(modelValue);
  const provide = props.get('provide');
  const ref = props.get('ref');
  const formItemList = useRef({});
  const preview = props.get('preview') ?? false;

  return {
    model,
    provide: Object.assign(provide, {
      [$formProvide]: {
        isInForm: true,
        value: model,
        setValue: (key, value) => {
          model.value[key] = value;
        },
        setFormitem: (key, value) => {
          formItemList.value[key] = value;
        },
        deleteFormitem: (key) => {
          delete formItemList.value[key];
        },
        preview,
      },
    }),
    ref: Object.assign(ref, {
      validated: async () => {
        _.forEach(Object.entries(formItemList.value), ([key, item]: any) => {
          model.value[key] = item?.getModelValue?.() ?? model.value[key];
        });
        const groupValidated = _.map(
          formItemList.value,
          (item: any) => typeof item?.validated === 'function' && item?.validated?.(),
        );

        return ref
          .validate()
          .then(() => Promise.all(groupValidated).then((results) => {
              // 任一分组成员返回 { valid: false } 时走异常分支
              if (_.some(results, (item) => _.has(item, 'valid') && item.valid === false)) {
                return Promise.reject(results);
              }
              return results;
            }))
          .then(
            () => ({ valid: true }),
            () => ({ valid: false }),
          );
      },
      resetForm: () => {
        ref.resetValidation();
        _.values(formItemList.value).forEach((item) => _.attempt(item.resetField));
      },
    }),
  };
}
