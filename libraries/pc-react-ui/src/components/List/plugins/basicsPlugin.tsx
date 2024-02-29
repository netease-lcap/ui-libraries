import React from 'react';
import fp from 'lodash/fp';
import _ from 'lodash';
import { useAntdTable } from 'ahooks';

export function useHandleTransformOption(props) {
  const dataSource = props.get('dataSource');
  const warpList = _.cond([
    [Array.isArray, (list) => ({ list, total: list.length })],
    [_.conforms({ list: _.isArray }), _.identity],
    [fp.stubTrue, fp.constant({ list: [], total: 0 })],
  ]) as (Target: {
    list: unknown;
  }) => {
    list: any;
    total: number;
  };
  const transformOption = React.useMemo(
    () => fp.cond([
      [fp.isArray, fp.constant(() => Promise.resolve({ list: dataSource, total: dataSource.length }))],
      [fp.isFunction, fp.constant(() => Promise.resolve(dataSource()).then(warpList))],
      [fp.stubTrue, fp.constant(() => Promise.resolve({ list: [], total: 0 }))],
    ]),
    [dataSource],
  );

  const { tableProps } = useAntdTable(transformOption(dataSource));
  return fp.isNil(dataSource) ? {} : tableProps;
}

export function useHandlePagination(props) {
  const pagination = props.get('pagination');
  const pageSize = props.get('pageSize');
  const showSizeChanger = props.get('showSizeChanger');
  const pageSizeOptions = props.get('pageSizeOptions');
  const onChange = props.get('onPageonChange');
  const current = props.get('current');
  const showTotal = props.get('showTotal');
  const showTotalText = fp.cond([
    [fp.isEqual(true), fp.constant((total) => `共 ${total} 条`)],
    [fp.stubTrue, fp.constant(() => '')],
  ])(showTotal);
  const showQuickJumper = props.get('showQuickJumper');
  const paginationConfig = {
    ...(fp.isPlainObject(pagination) ? pagination : {}),
    ...(_.filterUnderfinedValue({
      pageSize,
      showSizeChanger,
      pageSizeOptions,
      current,
      showTotal: showTotalText,
      showQuickJumper,
      onChange,
    })),
  };
  const paginationProps = fp.cond([
    [fp.matches({ pagination: false }), fp.constant({ pagination: false })],
    [fp.matches({ pagination: true }), fp.constant({ pagination: paginationConfig })],
    [fp.stubTrue, fp.stubObject],
  ])({
    pagination,
  });
  return paginationProps;
}
