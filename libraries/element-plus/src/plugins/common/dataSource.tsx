/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
/* eslint-disable react-refresh/only-export-components */
import _ from 'lodash';
import { watch } from 'vue';
import { useRequest } from 'vue-hooks-plus';
import { useMemo, useState, useRef, useEffect } from '@/plugins/hooks';
import { DataSourceType, DataSourceArrayType } from '@/types';

export function useHandleMapField(filedInfo: {
  label?: string;
  value?: string;
  disabled?: string;
  divided?: string;
  textField?: string;
  valueField?: string;
  disabledField?: string;
  dividedField?: string;
  dataSource: DataSourceType;
  fieldsMap?: Record<string, string>;
}): DataSourceArrayType {
  const {
    label = 'label',
    value = 'value',
    textField = 'label',
    valueField = 'value',
    dataSource,
    disabled = 'disabled',
    disabledField,
    dividedField,
    divided = 'divided',
    fieldsMap,
  } = filedInfo;
  return useMemo(
    () => _.map(dataSource, (item: any) => ({
        ...item,
        ...Object.fromEntries(Object.entries(fieldsMap || {}).map(([key, path]) => [key, _.get(item, path, undefined)])),
        [label]: !_.isObject(item) ? item : _.get(item, textField || 'label', ''),
        [value]: !_.isObject(item) ? item : _.get(item, valueField || 'value', ''),
        [disabled]: !_.isObject(item) ? false : _.get(item, disabledField || 'disabled', false),
        [divided]: !_.isObject(item) ? false : _.get(item, dividedField || 'divided', false),
      })),
    [label, value, textField, valueField, dataSource],
  ) as DataSourceArrayType;
}

const handleLocalPageData = _.cond([
  [
    _.conforms({ currentPage: _.isNumber, pageSize: _.isNumber, dataSource: _.isArray, pagination: (el: any) => el }),
    (params: any) => {
      const { currentPage = 1, pageSize = 10, dataSource } = params;
      const start = (currentPage - 1) * pageSize;
      const end = start + pageSize;
      return { list: dataSource.slice(start, end), total: dataSource.length };
    },
  ],
  [_.stubTrue, (params: any) => params.dataSource],
]);

const handleDataSouceToFn = _.cond([
  [_.isArray, (dataSource: any[]) => async (params: any) => handleLocalPageData({ dataSource, ...params })],
  [
    _.isFunction,
    (dataSource: any) => async (params: any) => {
      const data = await dataSource(params);
      return handleLocalPageData({ dataSource: data, ...params });
    },
  ],
  [_.stubTrue, () => async (params: any) => handleLocalPageData({ dataSource: [], ...params })],
]);
interface RequestOptions {
  refreshDeps?: any[];
  [key: string]: any;
}

interface RequestResult {
  data?: DataSourceArrayType;
  run?: (...args: any[]) => void;
  loading?: boolean;
}

export function useRequestDataSource(
  dataSource: DataSourceType,
  options: RequestOptions = {},
): RequestResult {
  const [resultData, setResult] = useState<RequestResult>({});
  const resultRef = useRef<any>({});
  const dataSourceFn = useMemo(() => handleDataSouceToFn(dataSource as any), [_.cloneDeep(dataSource)]);

  resultRef.value = useMemo(
    () => useRequest(dataSourceFn, { ...options, refreshDeps: [() => dataSourceFn] }),
    [dataSourceFn],
  );

  useEffect(() => {
    watch(
      resultRef,
      (value: any) => {
        return setResult({ ...value, data: _.cloneDeep(value.data) });
      },
      { immediate: true, deep: true },
    );
  }, []);

  const { data, run, loading } = resultData ?? ({} as RequestResult);
  return { data, run, loading };
}

export function useFormatDataSource(dataSource?: DataSourceArrayType): DataSourceArrayType {
  return useMemo(() => {
    if (Array.isArray(dataSource)) {
      return dataSource;
    }
    if (dataSource && typeof dataSource === 'object' && 'list' in dataSource && Array.isArray((dataSource as any).list)) {
      return (dataSource as any).list;
    }
    return [];
  }, [dataSource]);
}

interface TreeNode {
  [key: string]: any;
  children?: TreeNode[];
}

export function useDataSourceToTree(
  dataSource: DataSourceArrayType,
  parentField: string,
  valueField: string = 'value',
): TreeNode[] {
  if (_.isNil(parentField)) return dataSource;
  const map = new Map<string, TreeNode>(dataSource.map((item) => [_.get(item, valueField, item), item]));
  return dataSource.reduce((acc: TreeNode[], item) => {
    const parent = map.get(_.get(item, parentField));
    const value = map.get(_.get(item, valueField, item));
    if (parent && value) {
      parent.children = _.isArray(parent.children) ? parent.children.concat(value) : [value];
    } else if (value) {
      acc.push(value);
    }
    return acc;
  }, []);
}
