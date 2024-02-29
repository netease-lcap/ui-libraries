/* eslint-disable no-param-reassign */
/* eslint-disable react-refresh/only-export-components */
// import React from 'react';
import {
  $deletePropsList, $dataSourceField, $labelKey, $valueKey,
} from '@/plugins/constants';

export function useHandleTransform(props) {
  const deletePropsList = props.get($deletePropsList, []).concat(['dataSource', 'loading', 'textField', 'valueField', 'childrenField']);
  // const textField = props.get('textField', 'label');
  // const valueField = props.get('valueField', 'value');
  return {
    [$deletePropsList]: deletePropsList,
    [$dataSourceField]: 'options',
    // fieldNames: {
    //   label: textField,
    //   value: valueField,
    // },
  };
}

export { useHandleTransformOption, useHandleTextAndValueField } from '@/plugins/common/dataSource';
