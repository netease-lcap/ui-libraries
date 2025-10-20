/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
/* eslint-disable react-refresh/only-export-components */
import _ from 'lodash';
// import { watch } from 'vue';
// import { useRequest } from 'vue-hooks-plus';
import type { Ref, ComponentPublicInstance } from 'vue';
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
type TargetValue<T> = T | undefined | null;
type TargetType = HTMLElement | Element | Window | Document | ComponentPublicInstance;

export type BasicTarget<T extends TargetType = Element> = (() => TargetValue<T>) | TargetValue<T> | Ref<TargetValue<T>>;

interface UseInfiniteScrollOptions {
  /**
   * specifies the parent element. If it exists, it will trigger the `loadMore` when scrolling to the bottom. Needs to work with `isNoMore` to know when there is no more data to load
   */
  target?: BasicTarget<Element | Document>;

  /**
   * determines if there is no more data, the input parameter is the latest merged `data`
   * @param data TData
   * @returns boolean
   */
  isNoMore?: (data?: any) => boolean;

  /**
   * The pixel threshold to the bottom for the scrolling to load
   */
  threshold?: number;

  /**
   * - The default is `false`. That is, the service is automatically executed during initialization.
   * - If set to `true`, you need to manually call `run` or `runAsync` to trigger execution.
   */
  manual?: boolean;

  /**
   * When the content of the array changes, `reload` will be triggered
   */
  reloadDeps?: any[];

  /**
   * Triggered before service execution
   * @returns void
   */
  onBefore?: () => void;

  /**
   * Triggered when service resolve
   * @param data TData
   * @returns void
   */
  onSuccess?: (data: any) => void;

  /**
   * Triggered when service reject
   * @param e Error
   * @returns void
   */
  onError?: (e: Error) => void;

  /**
   * Triggered when service execution is complete
   * @param data TData
   * @param e Error
   * @returns void
   */
  onFinally?: (data?: any, e?: Error) => void;
  currentPage: number;
  setCurrentPage?: (currentPage: number) => void;
  pageSize?: number;
  setPageSize?: (pageSize: number) => void;
  pageSizes?: number[];
}
interface RequestResult {
  data?: DataSourceArrayType;
  run: (...args: any[]) => void;
  loading?: boolean;
}
const useRequest = (dataSource: DataSourceFunctionType, options: RequestOptions = {}): RequestResult => {
  const [resultData, setResult] = useState<RequestResult>({ run: () => {} });
  const [loading, setLoading] = useState(false);
  const { onBefore = () => {}, onSuccess = () => {}, formatResult = (value) => value, defaultParams = [] } = options;
  const { refreshDeps = [] } = options;
  const fn = useCallback(
    (...res) => {
      const params = res.length > 0 ? res : defaultParams;
      onBefore(...params);
      setLoading(true);
      dataSource(...params).then((data) => {
        setResult((prev) => {
          console.log(prev,'prev',data,'data');
          return { data: formatResult(data, prev.data), run: fn, loading: false };
        });
        setLoading(false);
        onSuccess(data, ...params);
      });
    },
    [dataSource, ...refreshDeps],
  );
  useEffect(() => fn(), [fn, ...refreshDeps]);

  return { ...resultData, loading };
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
