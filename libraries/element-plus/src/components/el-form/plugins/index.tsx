/* eslint-disable no-shadow */
import _ from 'lodash';
import { $formProvide } from '@/components/el-form/constants';
import { useRef } from '@/plugins/hooks';

export function handleModelValue(props) {
  const modelValue = props.get('model') ?? {};
  const model = useRef(modelValue);
  const provide = props.get('provide');
  const ref = props.get('ref');
  const formItemList = useRef({});
  return {
    model,
    provide: Object.assign(provide, {
      [$formProvide]: {
        isInForm: true,
        value: model.value,
        setValue: (key, value) => {
          model.value[key] = value;
        },
        setFormitem: (key, value) => {
          formItemList.value[key] = value;
        },
        deleteFormitem: (key) => {
          delete formItemList.value[key];
        },
      },
    }),
    ref: Object.assign(ref, {
      validated: async () => ref.validate().then(
          () => true,
          () => false,
        ),
      resetForm: () => {
        ref.resetFields();
        _.values(formItemList.value).forEach((item) => _.attempt(item.resetField));
      },
    }),
  };
}
