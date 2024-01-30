/* eslint-disable no-param-reassign */
/* eslint-disable react-refresh/only-export-components */
// import React from 'react';
import { $deletePropsList } from '@/plugins/constants';

export function useHandleTransform(props) {
  const deletePropsList = props.get($deletePropsList, []).concat(['dataSourceField', 'textField', 'valueField', 'childrenField']);
  const textField = props.get('textField', 'label');
  const valueField = props.get('valueField', 'value');
  const childrenField = props.get('childrenField', 'children');
  const fieldNames = props.get('fieldNames');
  return {
    [$deletePropsList]: deletePropsList,
    dataSourceField: 'options',
    fieldNames: {
      label: textField,
      value: valueField,
      children: childrenField,
      ...fieldNames,
    },
  };
}

useHandleTransform.order = 3;
