/* eslint-disable no-shadow */
import { $formProvide } from '@/components/el-form/constants';

export function handleModelValue(props, { useState, componentRef }) {
  const modelValue = props.get('model') ?? {};
  const [value, setFormValue] = useState(modelValue);
  const provide = props.get('provide');
  const ref = props.get('ref');
  return {
    model: value,
    provide: Object.assign(provide, {
      [$formProvide]: {
        isInForm: true,
        value,
        setValue: (value) =>
          setFormValue((state) => ({
            ...state,
            ...value,
          })),
      },
    }),
    ref: Object.assign(ref, {
      validate: async () => {
        const result = await componentRef.value
          .validate()
          .then((result) => {
            return true;
          })
          .catch((err) => {
            return false;
          });
        return result;
      },
    }),
  };
}
