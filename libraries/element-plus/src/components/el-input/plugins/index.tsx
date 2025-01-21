/* eslint-disable no-shadow */
import { watch, h } from 'vue';
import _ from 'lodash';

import { $deletePropsList } from '@/plugins/constants';

export function handleValue(props, { useState, useEffect, useMemo }) {
  // const setvalue = props.get('setvalue');
  const [value, setValue] = useState('');
  const propsValue = props.get('value', value);
  const onInputProps = props.get('onInput', () => { });
  const deletePropsList = props.get($deletePropsList);
  const emit = props.get('emit');

  return {
    [deletePropsList]: [...deletePropsList, 'value'],
    onInput: _.wrap(onInputProps, (fn, value) => {
      emit('update:value', value);
      _.attempt(fn, value);
      setValue(value);
    }),
    modelValue: propsValue,

  };
}
