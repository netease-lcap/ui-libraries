/* eslint-disable no-param-reassign */
/* eslint-disable react-refresh/only-export-components */
// import React from 'react';
import { useControllableValue } from 'ahooks';
import _ from 'lodash';
import {
  $deletePropsList, $dataSourceField,
} from '@/plugins/constants';

export function useHandleTransform(props) {
  const deletePropsList = props.get($deletePropsList, []).concat(['dataSource', 'loading', 'textField', 'valueField', 'childrenField']);
  return {
    [$deletePropsList]: deletePropsList,
    [$dataSourceField]: 'options',
  };
}
export function useHandleValue(props) {
  const onChangeProps = props.get('onChange');
  return {
    onChange: _.wrap(onChangeProps, (fn, e) => {
      _.attempt(fn, e.target.value, e);
    }),
  };
}

export function useHandleRef(props) {
  const ref = props.get('ref');
  const valueProps = props.get('value');
  const onChangeProps = props.get('onChange');
  const defaultValue = props.get('defaultValue');
  const [value, onChange] = useControllableValue(_.filterUnderfinedValue({ value: valueProps, onChange: onChangeProps, defaultValue }));
  return {
    value,
    onChange,
    ref: _.assign(ref, { value, setValue: onChange }),
  };
}
useHandleRef.order = 1;
export { useHandleTransformOption, useHandleTextAndValueField } from '@/plugins/common/dataSource';
