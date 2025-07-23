import _ from 'lodash';
import { useRef } from '@/plugins/hooks';

export function handleControllableValue(props) {
  return {};
}

export function handleFormData(props) {
  const model = props.get('model') ?? {};
  const modelValue = useRef(model);
  const provide = props.get('provide');
  const ref = props.get('ref');
  const formItemList = useRef({});
  const disabled = props.get('disabled') ?? false;
  const readonly = props.get('readonly') ?? false;

  return {
    model: modelValue,
    provide: Object.assign(provide, {
      isInForm: true,
      formData: modelValue,
      setFormData: (key, value) => {
        modelValue.value[key] = value;
      },
      setFormItem: (key, item) => {
        formItemList.value[key] = item;
      },
      deleteFormItem: (key) => {
        delete formItemList.value[key];
      },
      disabled,
      readonly,
    }),
    ref: Object.assign(ref, {
      validate: async () => {
        _.forEach(Object.entries(formItemList.value), ([key, item]: any) => {
          modelValue.value[key] = item?.getModelValue?.() ?? modelValue.value[key];
        });
        return ref.validate().then(
          () => ({ valid: true }),
          () => ({ valid: false }),
        );
      },
      resetForm: () => {
        ref.resetValidation();
        _.values(formItemList.value).forEach((item) => _.attempt(item.resetField));
      },
      submit: () => {
        const onSubmit = props.get('onSubmit');
        const onFailed = props.get('onFailed');

        ref.validate().then(
          () => {
            _.attempt(onSubmit, { values: modelValue.value });
          },
          (errors) => {
            _.attempt(onFailed, { errorFields: errors, values: modelValue.value });
          },
        );
      },
    }),
  };
}
