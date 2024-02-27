/* eslint-disable no-param-reassign */
/* eslint-disable react-refresh/only-export-components */
import _ from 'lodash';
import fp from 'lodash/fp';
import React from 'react';
// import moduleName from 'module';
import { useRequest } from 'ahooks';
import {
  $deletePropsList, $dataSourceField, $labelKey, $valueKey,
} from '@/plugins/constants';

export function useHandleTransformOption(props) {
  const dataSourceField = props.get($dataSourceField, 'options');
  const deletePropsList = props.get($deletePropsList, []).concat([$dataSourceField], 'reload');
  const dataSource = props.get('dataSource');
  const ref = props.get('ref');
  const myRef = React.useRef({});
  const requestDataSource = React.useMemo(() => {
    const wrapDataSource = _.cond([
      [_.isArray, _.constant(() => Promise.resolve(dataSource))],
      [_.isFunction, _.constant(() => Promise.resolve(dataSource()))],
      [_.stubTrue, _.constant(() => Promise.resolve([]))],
    ]);
    return wrapDataSource(dataSource);
  }, [dataSource]);
  const { data, run, loading } = useRequest(requestDataSource);
  const resultData = React.useMemo(() => {
    const conformsArray = _.cond([
      [Array.isArray, _.identity],
      [_.conforms({ list: _.isArray }), fp.get('list')],
      [_.stubTrue, _.stubArray],
    ]);
    return conformsArray(data);
  }, [data]);
  React.useImperativeHandle(ref, () => ({
    reload: run,
    ...myRef.current,
  }), [myRef, run]);
  return _.isNil(dataSource) ? {
    [$deletePropsList]: deletePropsList,
    ref: myRef,
  } : {
    [dataSourceField]: resultData,
    reload: run,
    ref: myRef,
    [$deletePropsList]: deletePropsList,
    loading,
  };
}
useHandleTransformOption.order = 5;
export function useHandleTextAndValueField(props) {
  const textField = props.get('textField', 'label');
  const valueField = props.get('valueField', 'value');
  const labelKey = props.get($labelKey, 'label');
  const valueKey = props.get($valueKey, 'value');
  const deletePropsList = props.get($deletePropsList, []).concat(['textField', 'valueField', $labelKey, $valueKey]);
  const dataSourceField = props.get($dataSourceField, 'options');
  // const dataSourceField = props.get(dataSourceFieldProps, 'options');
  const dataSource = props.get(dataSourceField);
  // console.log(labelKey, valueKey);
  const convertOption = React.useMemo(() => {
    const logicFn = _.map(dataSource, (item) => ({ [labelKey]: item[textField], [valueKey]: item[valueField] }));
    // console.log(logicFn, 'fn');
    return logicFn;
    // const decisionCallback = _.cond([
    //   [_.matches({ textField: _.isString }), _.constant(logicFn)],
    //   [_.matches({ valueField: _.isString }), _.constant(logicFn)],
    //   [_.stubTrue, _.constant(dataSource)],
    // ]);
    // return decisionCallback({ textField, valueField });
  }, [dataSource, textField, valueField, labelKey, valueKey]);
  // console.log(convertOption, 'convertOption');
  return _.isNil(dataSource)
    ? { [$deletePropsList]: deletePropsList }
    : { [dataSourceField]: convertOption, [$deletePropsList]: deletePropsList };
}
useHandleTextAndValueField.order = 6;
