/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
/* eslint-disable react-refresh/only-export-components */
import _ from 'lodash';
// import { watch } from 'vue';
// import { useRequest } from 'vue-hooks-plus';
import { useMemo, useState, useEffect } from '@/plugins/hooks';
import { DataSourceType, DataSourceArrayType, DataSourceFunctionType } from '@/types';
import { useCallback } from '../hooks';

export function useHandleMapField(filedInfo: {
  label?: string;
  value?: string;
  textField?: string;
  valueField?: string;
  dataSource: DataSourceType;
  fieldsMap?: Record<string, string>;
}): DataSourceArrayType {
  const {
    label = 'label',
    value = 'value',
    textField = 'label',
    valueField = 'value',
    dataSource,
    fieldsMap,
  } = filedInfo;
  return useMemo(
    () => _.map(dataSource, (item: any) => ({
        ...(_.isObject(item) ? item : {}),
        [label]: !_.isObject(item) ? item : _.get(item, textField || 'label', ''),
        [value]: !_.isObject(item) ? item : _.get(item, valueField || 'value', ''),
        ..._.omitBy(
          _.mapValues(fieldsMap, (path) => _.get(item, path, undefined)),
          _.isUndefined,
        ),
      })),
    [label, value, textField, valueField, dataSource],
  );
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
// 表格本地分页

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
  run: (...args: any[]) => void;
  loading?: boolean;
}
const useRequest = (dataSource: DataSourceFunctionType, options: RequestOptions = {}): RequestResult => {
  const [resultData, setResult] = useState<RequestResult>({ run: () => {} });
  const { onBefore = () => {}, onSuccess = () => {}, formatResult = (value) => value, defaultParams = [] } = options;
  const { refreshDeps = [] } = options;
  const fn = useCallback(
    (...res) => {
      const params = res.length > 0 ? res : defaultParams;
      onBefore(...params);
      setResult({ run: fn, loading: true });
      dataSource(...params).then((data) => {
        setResult({ data: formatResult(data), run: fn, loading: false });
        onSuccess(data, ...params);
      });
    },
    [dataSource, ...refreshDeps],
  );
  useEffect(() => fn(), [fn, ...refreshDeps]);

  return resultData ?? {};
};

export function useRequestDataSource(dataSource: DataSourceType, options: RequestOptions = {}): RequestResult {
  const dataSourceFn = useMemo(() => handleDataSouceToFn(dataSource as any), [_.cloneDeep(dataSource)]);

  const resultData = useRequest(dataSourceFn, options);
  return resultData;
}

export function useFormatDataSource(dataSource?: DataSourceArrayType): DataSourceArrayType {
  return useMemo(() => {
    if (Array.isArray(dataSource)) {
      return dataSource;
    }
    if (
      dataSource
      && typeof dataSource === 'object'
      && 'list' in dataSource
      && Array.isArray((dataSource as any).list)
    ) {
      return (dataSource as any).list;
    }
    return [];
  }, [dataSource]);
}

export interface TreeNode {
  [key: string]: any;
  children?: TreeNode[];
}

export function useDataSourceToTree(
  dataSource: DataSourceArrayType,
  parentField: string = 'parent',
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
