/* eslint-disable no-shadow */
import _ from 'lodash';
import { ref } from 'vue';
import { $deletePropsList } from '@/plugins/constants';
import { $formProvide } from '@/components/el-form/constants';

export function handleModelValue(props, { useState }) {
  const modelValue = props.get('model') ?? {};
  const [value, setValue2] = useState(modelValue);
  console.log(value, 'formmodelvalue');
  const provide = props.get('provide');
  return {
    model: value,
    provide: Object.assign(provide, {
      [$formProvide]: {
        value,
        setValue(value) {
          setValue2((old) => {
            console.log(old,'fomrvalue');
            return {
              ...old,
              ...value,
            };
          });
        },
      },
    }),
  };
}
