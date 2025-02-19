/* eslint-disable no-shadow */
import {
  watch, h, inject, nextTick,
} from 'vue';
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

export function handleNodePath(props, { useMemo, useEffect }) {
  const nodePath = props.get('data-nodepath');
  const myClass = props.get('class', '');
  const deletePropsList = props.get($deletePropsList).concat('data-nodepath');
  const nodeId = useMemo(() => _.uniqueId('Input_'), []);
  useEffect(() => {
    nextTick(() => {
      const node = document.querySelector(`.${nodeId}`);
      const inputParent = node?.closest('.el-input');
      inputParent?.setAttribute('data-nodepath', nodePath);
    });
  }, []);
  return {
    class: `${myClass} ${nodeId}`,
    [$deletePropsList]: deletePropsList,
  };
}
