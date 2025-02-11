/* eslint-disable no-shadow */
import { watch, h, inject } from 'vue';
import _ from 'lodash';
// import { useFormItem } from 'element-plus/es/components/form/src/hooks/index';
// import { formItemContextKey } from 'element-plus/es/components/form/src/constants';

import { $deletePropsList } from '@/plugins/constants';
import { $formProvide } from '@/components/el-form/constants';

export function handleValue(props, { useState, useEffect, useMemo }) {
  // useFormItem()
  // const { form: elForm, formItem: elFormItem } = useFormItem();
  // console.log(elFormItem, 'elFormItem');
  // const setvalue = props.get('setvalue');
  const [value, setValue] = useState('');

  const propsValue = props.get('value', value);
  const onInputProps = props.get('onInput', () => {});
  const deletePropsList = props.get($deletePropsList);
  const myInject = props.get('inject');
  const { value: formValue, setValue: setFormValue } = myInject.value[$formProvide];

  // console.log(myInject, 'myInject');
  const emit = props.get('emit');

  return {
    [$deletePropsList]: [...deletePropsList, 'value'],
    onInput: _.wrap(onInputProps, (fn, value) => {
      emit('update:value', value);
      setValue(value);
      setFormValue(value);
    }),

    modelValue: propsValue,
  };
}
