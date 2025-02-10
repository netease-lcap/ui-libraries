/* eslint-disable no-shadow */
import { watch, h, inject } from 'vue';
import _ from 'lodash';

import { $deletePropsList } from '@/plugins/constants';
import { $formProvide } from '@/components/el-form/constants';

export function handleValue(props, { useState, useEffect, useMemo }) {
  // const setvalue = props.get('setvalue');
  const [value, setValue] = useState('');
  const propsValue = props.get('value', value);
  const onInputProps = props.get('onInput', () => {});
  const deletePropsList = props.get($deletePropsList);
  const myInject = props.get('inject');
  // console.log(myInject.value[$formProvide], 'myInject');
  const { value: formValue, setValue: setFormValue } = myInject.value[$formProvide];
  console.log(formValue, '===formvalue');
  // console.log(myInject, 'myInject');
  const emit = props.get('emit');

  return {
    [$deletePropsList]: [...deletePropsList, 'value'],
    onInput: _.wrap(onInputProps, (fn, value) => {
      // console.log(value, 'oninput value=');
      emit('update:value', value);
      _.attempt(fn, value);
      setValue(value);
      // formValue.value.input = value;
      console.log(formValue, '====');
      // setFormValue('input',value)
      setFormValue({
        input: value,
      });
    }),

    modelValue: propsValue,
  };
}
