/* eslint-disable no-param-reassign */
/* eslint-disable react-refresh/only-export-components */
// import React from 'react';
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

export { useHandleTransformOption, useHandleTextAndValueField } from '@/plugins/common/dataSource';
