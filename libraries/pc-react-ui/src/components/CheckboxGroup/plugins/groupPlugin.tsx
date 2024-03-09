/* eslint-disable no-param-reassign */
/* eslint-disable react-refresh/only-export-components */
import React, { useMemo } from 'react';
import _ from 'lodash';
import fp from 'lodash/fp';
import { useControllableValue, useRequest } from 'ahooks';
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
  const [value, setValue] = useControllableValue(_.filterUnderfinedValue({ value: React.Children.toArray(valueProps), onChange, defaultValue }));
  return {
    value,
    ref: _.assign(ref, { value, setValue }),
  };
}
useHandleRef.order = 1;

export function useHandleValue(props) {
  const valueProps = props.get('value');
  const onChangeProps = props.get('onChange');
  const defaultValue = props.get('defaultValue');
  const [value, onChange] = useControllableValue(_.filterUnderfinedValue({ value: valueProps, onChange: onChangeProps, defaultValue }));
  return {
    value,
    onChange,
  };
}

function formatData(data) {
  const conformsArray = _.cond([
    [Array.isArray, _.identity],
    [_.conforms({ list: _.isArray }), fp.get('list')],
    [_.stubTrue, _.stubArray],
  ]);
  function handleModelObjrrToArray(item) {
    return Object.entries(item).reduce((pre, [key, value]) => _.assign(pre, _.isObject(value) ? value : { [key]: value }), {});
  }

  return _.map(conformsArray(data), (item: any) => (_.isObject(item) ? handleModelObjrrToArray(item) : { label: item, value: item }));
}
function wrapDataToRequest(dataSource) {
  const wrapDataSource = _.cond([
    [_.isFunction, _.constant(async (...arg) => dataSource(...arg))],
    [_.stubTrue, _.constant(async () => dataSource)],
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
  React.useEffect(() => reload(), [dataSource]);
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

export { useHandleTextAndValueField } from '@/plugins/common/dataSource';
