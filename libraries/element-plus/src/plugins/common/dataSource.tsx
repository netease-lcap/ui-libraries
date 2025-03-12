/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
/* eslint-disable react-refresh/only-export-components */
import _ from 'lodash';
import fp from 'lodash/fp';
import { watch } from 'vue';
import { useRequest } from 'vue-hooks-plus';
import { useMemo, useState, useRef } from '@/plugins/hooks';
import { DataSourceType, DataSourceArrayType, DataSourceFunctionType } from '@/types';

export function useHandleMapField(filedInfo: {
  label?: string;
  value?: string;
  textField?: string;
  valueField?: string;
  dataSource: DataSourceType;
}) {
  const { label = 'label', value = 'value', textField = 'label', valueField = 'value', dataSource } = filedInfo;
  return useMemo(() => {
    return _.map(dataSource, (item: any) => ({
      ...item,
      [label]: !_.isObject(item) ? item : _.get(item, textField || 'label', ''),
      [value]: !_.isObject(item) ? item : _.get(item, valueField || 'value', ''),
    }));
  }, [label, value, textField, valueField, dataSource]) as DataSourceArrayType;
}
const handleDataSouceToFn = (dataSource: DataSourceType) => _.cond([
    [_.isArray, _.constant(async () => dataSource)],
    [_.isFunction, _.constant(async (...arg) => (dataSource as DataSourceFunctionType)(...arg))],
    [_.stubTrue, _.constant(async () => [] as unknown as DataSourceArrayType)],
  ]);
export function useRequestDataSource(dataSource: DataSourceType, options = {}) {
  const [resultData, setResult] = useState({});
  const stop = useRef(() => {});
  const dataSourceFn = useMemo(() => handleDataSouceToFn(dataSource), [dataSource]);
  const result = useMemo(() => useRequest(dataSourceFn, { ...options, refreshDeps: [() => dataSource] }), [dataSourceFn]) as any;
  stop.value();
  stop.value = watch(
    () => result,
    (value) => {
      setResult(value);
    },
    { immediate: true, deep: true },
  );
  const { data, run, loading } = resultData as {
    data: DataSourceArrayType;
    run: (...args: any[]) => void;
    loading: boolean;
  };
  return { data, run, loading };
}

export function useFormatDataSource(dataSource: DataSourceArrayType): DataSourceArrayType {
  const conformsArray = _.cond([
    [Array.isArray, _.identity],
    [_.conforms({ list: _.isArray }), fp.get('list')],
    [_.stubTrue, _.stubArray],
  ]);
  return useMemo(() => conformsArray(dataSource), [dataSource]);
}

export function useDataSourceToTree(
  dataSource: DataSourceArrayType,
  parentField: string,
  valueField: string = 'value',
): DataSourceArrayType {
  if (_.isNil(parentField)) return dataSource;
  const map = new Map<string, Record<string, any>>(dataSource.map((item) => [_.get(item, valueField), item]));
  return dataSource.reduce((acc, item) => {
    const parent = map.get(_.get(item, parentField));
    const value = map.get(_.get(item, valueField));
    if (parent) {
      parent.children = _.isArray(parent.children) ? parent.children.concat(value) : [value];
    } else {
      acc.push(value);
    }
    return acc;
  }, []) as DataSourceArrayType;
}
