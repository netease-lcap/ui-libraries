import _ from 'lodash';
import { $formProvide } from '@/temp/van-form/constants';
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
        return ref.validate().then(
          () => ({ valid: true }),
          () => ({ valid: false }),
        );
      },
      resetForm: () => {
        _.values(formItemList.value).forEach((item) => _.attempt(item.resetField));
      },
    }),
  };
}
