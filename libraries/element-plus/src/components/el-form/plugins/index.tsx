/* eslint-disable no-shadow */
import _ from 'lodash';
import { watch } from 'vue';
import { $formProvide } from '@/components/el-form/constants';
import { useRef, useEffect } from '@/plugins/hooks';

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
      },
    }),
    ref: Object.assign(ref, {
      validated: async () => {
        _.forEach(Object.entries(formItemList.value), ([key, item]) => {
          model.value[key] = item?.getModelValue?.() ?? model.value[key];
        });
        return ref.validate().then(
          () => ({ valid: true }),
          () => ({ valid: false }),
        );
      },
      resetForm: () => {
        ref.resetFields();
        _.values(formItemList.value).forEach((item) => _.attempt(item.resetField));
      },
    }),
  };
}
