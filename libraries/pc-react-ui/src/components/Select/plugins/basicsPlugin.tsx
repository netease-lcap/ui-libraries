/* eslint-disable no-param-reassign */
/* eslint-disable react-refresh/only-export-components */
import _ from 'lodash';
import React from 'react';
import { useRequest } from 'ahooks';
import { $deletePropsList, $dataSourceField } from '@/plugins/constants';
// import moduleName from 'antd/lib/select/';

// import {renm} from 'futil';
// import type { ButtonProps } from 'antd';
// import F from 'futil';
// import { hookType } from '@/plugins/type';

export { useHandleTextAndValueField, useHandleTransformOption } from '@/plugins/common/dataSource';

export function useHandleTransform(props) {
  const deletePropsList = props.get($deletePropsList, []).concat(['dataSource', 'childrenField']);
  const textField = props.get('textField', 'label');
  const valueField = props.get('valueField', 'value');
  const childrenField = props.get('childrenField', 'children');
  const fieldNames = props.get('fieldNames');
  return {
    [$deletePropsList]: deletePropsList,
    [$dataSourceField]: 'options',
    fieldNames: {
      label: textField,
      value: valueField,
      children: childrenField,
      ...fieldNames,
    },
  };
}

useHandleTransform.order = 3;

function useHandleTransformOption1(props) {
  const options = props.get('options');
  const transformOption = _.cond([
    [_.isArray, _.constant(() => Promise.resolve(options))],
    [_.isFunction, _.constant(() => Promise.resolve(options()))],
    [_.stubTrue, _.constant(() => Promise.resolve([]))],
  ]);
  const conformsArray = _.cond([
    [Array.isArray, _.identity],
    [_.stubTrue, _.stubArray],
  ]);
  const { data, loading } = useRequest(transformOption(options));
  return _.isNil(options) ? {} : { options: conformsArray(data), loading };
}

function useHandleTextAndValueField1(props) {
  const textField = props.get('textField', 'label');
  const valueField = props.get('valueField', 'value');
  const deletePropsList = props.get($deletePropsList, []).concat(['textField', 'valueField']);
  const options = props.get('options');

  const convertOption = React.useMemo(() => {
    const logicFn = _.map(options, (item) => ({ label: item[textField], value: item[valueField] }));
    const decisionCallback = _.cond([
      [_.matches({ textField: _.isString }), _.constant(logicFn)],
      [_.matches({ valueField: _.isString }), _.constant(logicFn)],
      [_.stubTrue, _.constant(options)],
    ]);
    return decisionCallback({ textField, valueField });
  }, [options, textField, valueField]);

  return _.isNil(options)
    ? { [$deletePropsList]: deletePropsList }
    : { options: convertOption, [$deletePropsList]: deletePropsList };
}
