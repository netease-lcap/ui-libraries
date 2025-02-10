/* eslint-disable no-shadow */
import _ from 'lodash';
import { ref } from 'vue';
import { $deletePropsList } from '@/plugins/constants';
import { $formProvide } from '@/components/el-form/constants';
import { useRequestDataSource, useHandleMapField, useFormatDataSource } from '@/plugins/common/dataSource';

export function handleModelValue(props, { useState }) {
  const modelValue = props.get('model') ?? {};
  // console.log(modelValue, '===');
  const [value, setValue] = useState(modelValue);
  // const value = ref(modelValue);
  const provide = props.get('provide');
  // const
  console.log(value, 'logvalue');
  return {
    model: value,
    provide: Object.assign(provide, {
      [$formProvide]: {
        value,
        // setValue: (name, item) => {
        //   value.value[name] = item;
        // },
        setValue,
      },
    }),
  };
}
