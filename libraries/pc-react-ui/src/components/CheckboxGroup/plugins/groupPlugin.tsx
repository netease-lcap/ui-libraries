/* eslint-disable no-param-reassign */
/* eslint-disable react-refresh/only-export-components */
// import React from 'react';
import _ from 'lodash';
import { useControllableValue } from 'ahooks';
import {
  $deletePropsList, $dataSourceField,
} from '@/plugins/constants';

export function useHandleTransform(props) {
  const deletePropsList = props.get($deletePropsList, []).concat(['dataSource', 'loading']);
  return {
    [$deletePropsList]: deletePropsList,
    [$dataSourceField]: 'options',
  };
}

export function useHandleRef(props) {
  const ref = props.get('ref');
  const valueProps = props.get('value');
  const onChange = props.get('onChange');
  const defaultValue = props.get('defaultValue');
  const [value, setValue] = useControllableValue(_.filterUnderfinedValue({ value: valueProps, onChange, defaultValue }));
  return {
    value,
    ref: _.assign(ref, { value, setValue }),
  };
}
useHandleRef.order = 1;
export { useHandleTransformOption, useHandleTextAndValueField } from '@/plugins/common/dataSource';
