/* eslint-disable no-shadow */
import { $formProvide } from '@/components/el-form/constants';
import { useState } from '@/plugins/hooks';

export function handleModelValue(props) {
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
        setValue: (value) => setFormValue((state) => ({
            ...state,
            ...value,
          })),
      },
    }),
    ref: Object.assign(ref, {
      validate: async () => {
        const result = await ref.value
          .validate()
          .then(() => {
            return true;
          })
          .catch(() => {
            return false;
          });
        return result;
      },
    }),
  };
}
