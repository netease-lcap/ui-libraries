/* eslint-disable no-param-reassign */
/* eslint-disable react-refresh/only-export-components */
import _ from 'lodash';
import React, { useMemo } from 'react';
import fp from 'lodash/fp';
import { useRequest } from 'ahooks';
import {
  $deletePropsList, $dataSourceField, $labelKey, $valueKey,
} from '@/plugins/constants';

function formatData(data) {
  const conformsArray = _.cond([
    [Array.isArray, _.identity],
    [_.conforms({ list: _.isArray }), fp.get('list')],
    [_.stubTrue, _.stubArray],
  ]);
  return conformsArray(data);
}
function wrapDataToRequest(dataSource) {
  const wrapDataSource = _.cond([
    [_.isArray, _.constant(async () => dataSource)],
    [_.isFunction, _.constant(async (...arg) => dataSource(...arg))],
    [_.stubTrue, _.constant(async () => [])],
  ]);
  return wrapDataSource(dataSource);
}
export function useHandleTransformOption(props) {
  const dataSourceField = props.get($dataSourceField, 'options');
  const deletePropsList = props.get($deletePropsList, []).concat([$dataSourceField]);
  const dataSource = props.get('dataSource');
  const ref = props.get('ref');
  const requestDataSource = useMemo(() => wrapDataToRequest(dataSource), [dataSource]);
  const { data, run: reload, loading } = useRequest(requestDataSource);
  const resultData = useMemo(() => formatData(data), [data]);
  const selfRef = useMemo(() => _.assign(ref, { reload, data }), [data, reload, ref]);
  return _.isNil(dataSource) ? {
    [$deletePropsList]: deletePropsList,
  } : {
    [$deletePropsList]: deletePropsList,
    [dataSourceField]: resultData,
    ref: selfRef,
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
  const dataSource = props.get(dataSourceField);
  const convertOption = useMemo(() => {
    const logicFn = _.map(dataSource, (item) => ({ [labelKey]: _.get(item, textField), [valueKey]: _.get(item, valueField) }));
    return logicFn;
  }, [dataSource, textField, valueField, labelKey, valueKey]);
  return _.isNil(dataSource)
    ? { [$deletePropsList]: deletePropsList }
    : { [dataSourceField]: convertOption, [$deletePropsList]: deletePropsList };
}
useHandleTextAndValueField.order = 6;
// const nodeId = React.useMemo(() => _.uniqueId('button_'), []);

export function useHandleMapField(filedInfo) {
  const {
    label = 'label',
    value = 'value',
    textField = 'label',
    valueField = 'value',
    dataSource,
  } = filedInfo;
  return useMemo(() => {
    return _.map(dataSource, (item) => ({
      [label]: _.get(item, textField),
      [value]: _.get(item, valueField),
    }));
  }, [label, value, textField, valueField, dataSource]);
}
export function useHandleDataSourceToRequest(dataSource) {
  const wrapDataSource = _.cond([
    [_.isArray, _.constant(async () => dataSource)],
    [_.isFunction, _.constant(async (...arg) => dataSource(...arg))],
    [_.stubTrue, _.constant(async () => [])],
  ]);
  return useMemo(() => wrapDataSource(dataSource), [dataSource]);
}

export function useFormatDataSource(dataSource) {
  const conformsArray = _.cond([
    [Array.isArray, _.identity],
    [_.conforms({ list: _.isArray }), fp.get('list')],
    [_.stubTrue, _.stubArray],
  ]);
  return useMemo(() => conformsArray(dataSource), [dataSource]);
}
