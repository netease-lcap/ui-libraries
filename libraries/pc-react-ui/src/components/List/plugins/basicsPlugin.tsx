import React from 'react';
import fp from 'lodash/fp';
import _ from 'lodash';
import { useAntdTable } from 'ahooks';

export function useHandleTransformOption(props) {
  const dataSource = props.get('dataSource');
  const pagination = props.get('pagination');
  const onBefore = props.get('onBefore', () => { });
  const onSuccess = props.get('onSuccess', () => { });
  const current = props.get('current', 1);
  const pageSizeProps = props.get('pageSize');
  const refProps = props.get('ref');
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
      [fp.isArray, fp.constant(async () => ({ list: dataSource, total: dataSource.length }))],
      [fp.isFunction, fp.constant((...arg) => Promise.resolve(dataSource(...arg)).then(warpList))],
      [fp.stubTrue, fp.constant(async () => ({ list: [], total: 0 }))],
    ]),
    [dataSource],
  );

  const { tableProps, run } = useAntdTable(transformOption(dataSource), {
    onBefore: (params) => _.attempt(onBefore, params),
    onSuccess: (data, params) => _.attempt(onSuccess, data, params),
    defaultParams: [
      { current, pageSize: pageSizeProps },
    ],
  });
  const { dataSource: data, pagination: { pageSize } } = tableProps;
  const ref = _.assign(refProps, { reload: run, data, pageSize });
  const resultTableProps = _.isEqual(pagination, false) ? _.assign(tableProps, { pagination: false }) : tableProps;
  return fp.isNil(dataSource) ? {} : _.assign(resultTableProps, ref);
}

export function useHandlePagination(props) {
  const pagination = props.get('pagination');
  const showSizeChanger = props.get('showSizeChanger');
  const pageSizeOptions = props.get('pageSizeOptions');
  const onChange = props.get('onPageonChange');
  const showTotal = props.get('showTotal');
  const showTotalText = fp.cond([
    [fp.isEqual(true), fp.constant((total) => `共 ${total} 条`)],
    [fp.stubTrue, fp.constant(() => '')],
  ])(showTotal);
  const showQuickJumper = props.get('showQuickJumper');
  const paginationConfig = {
    ...(fp.isPlainObject(pagination) ? pagination : {}),
    ...(_.filterUnderfinedValue({
      showSizeChanger,
      pageSizeOptions,
      showTotal: showTotalText,
      showQuickJumper,
      onChange: _.wrap(pagination.onChange, (fn, ...arg) => {
        _.attempt(fn, arg);
        _.attempt(onChange, arg);
      }),
    })),
  };
  const paginationProps = fp.cond([
    [fp.isEqual(false), fp.constant({ pagination: false })],
    [fp.stubTrue, fp.constant({ pagination: paginationConfig })],
  ])(pagination);
  return paginationProps;
}
useHandlePagination.order = 5;

export function useHandleRenderItem(props) {
  const renderItemProps = props.get('renderItem');
  return {
    renderItem(item) {
      return renderItemProps({ item });
    },
  };
}
