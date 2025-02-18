/* eslint-disable no-shadow */
import { watch, h, inject } from 'vue';
import _ from 'lodash';
import { $deletePropsList } from '@/plugins/constants';
// import { useFormItem } from 'element-plus/es/components/form/src/hooks/index';
// import { formItemContextKey } from 'element-plus/es/components/form/src/constants';
export { handleComponentInForm } from '@/components/el-form/plugins/form-item';

export function handleValue(props, { useState, useEffect, useMemo }) {
  const [value, setValue] = useState('');
  const emit = props.get('emit');
  const deletePropsList = props.get($deletePropsList).concat('value');
  const propsValue = props.get('modelValue') || props.get('value') || value;
  const changeValue = props.get('modelValue') ? _.bind(emit, 'update:modelValue') : setValue;
  const onInputProps = props.get('onInput', () => {});
  console.log(props.get('modelValue'), 'props.get(modelValue)');
  console.log(props.get('value'), 'props.get(value)');
  return {
    onInput: _.wrap(onInputProps, (fn, value) => {
      _.attempt(fn, value);
      changeValue(value);
    }),
    [$deletePropsList]: deletePropsList,
    modelValue: propsValue,
    formTagName: 'el-form-input',
  };
}
