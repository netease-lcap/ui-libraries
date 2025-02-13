/* eslint-disable no-shadow */
import { $formProvide } from '@/components/el-form/constants';

export function handleModelValue(props, { useState }) {
  const modelValue = props.get('model') ?? {};
  const [value, setFormValue] = useState(modelValue);
  const provide = props.get('provide');
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
  };
}
